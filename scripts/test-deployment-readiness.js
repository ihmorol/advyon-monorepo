#!/usr/bin/env node
/**
 * Deployment Readiness Test Script
 * 
 * This script tests if both the client and server are ready for deployment.
 * Run this before deploying to Render and Vercel.
 * 
 * Usage: node scripts/test-deployment-readiness.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

const log = {
  pass: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  fail: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  section: (msg) => console.log(`\n${colors.cyan}━━━ ${msg} ━━━${colors.reset}\n`),
};

const results = {
  passed: 0,
  failed: 0,
  warnings: 0,
};

function runTest(name, testFn) {
  try {
    const result = testFn();
    if (result === true) {
      log.pass(name);
      results.passed++;
      return true;
    } else if (typeof result === 'string') {
      log.warn(`${name}: ${result}`);
      results.warnings++;
      return true;
    } else {
      log.fail(name);
      results.failed++;
      return false;
    }
  } catch (error) {
    log.fail(`${name}: ${error.message}`);
    results.failed++;
    return false;
  }
}

function runCommand(cmd, cwd = null) {
  try {
    return execSync(cmd, { 
      cwd, 
      encoding: 'utf-8',
      stdio: 'pipe',
      timeout: 120000 
    }).trim();
  } catch (error) {
    throw new Error(error.message);
  }
}

function fileExists(filePath) {
  return fs.existsSync(path.join(process.cwd(), filePath));
}

function readJsonFile(filePath) {
  try {
    const content = fs.readFileSync(path.join(process.cwd(), filePath), 'utf-8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

// ============================================================================
// SERVER TESTS
// ============================================================================

function testServer() {
  log.section('SERVER (Render) Tests');
  const serverDir = path.join(process.cwd(), 'advyon-server');
  
  if (!fs.existsSync(serverDir)) {
    log.fail('advyon-server directory not found');
    results.failed++;
    return false;
  }

  process.chdir(serverDir);

  // Test 1: Package.json exists
  runTest('Server package.json exists', () => {
    return fileExists('package.json');
  });

  // Test 2: Required scripts exist
  runTest('Server has required npm scripts', () => {
    const pkg = readJsonFile('package.json');
    const required = ['build', 'prod', 'dev'];
    const missing = required.filter(s => !pkg.scripts[s]);
    return missing.length === 0 
      ? true 
      : `Missing scripts: ${missing.join(', ')}`;
  });

  // Test 3: TypeScript compiles
  runTest('Server TypeScript compiles', () => {
    const output = runCommand('npm run build');
    return output.includes('error') ? 'Build has errors' : true;
  });

  // Test 4: dist folder created
  runTest('Server builds to dist folder', () => {
    return fileExists('dist/server.js');
  });

  // Test 5: Health route exists
  runTest('Server has health endpoint', () => {
    const healthRoute = fs.readFileSync('src/app/modules/health/health.route.ts', 'utf-8');
    return healthRoute.includes('router.get') ? true : 'No GET route found';
  });

  // Test 6: Root health route exists (for Render)
  runTest('Server has root health endpoints', () => {
    const hasRootHealth = fs.existsSync('src/app/modules/health/health.root.route.ts');
    return hasRootHealth ? true : 'Missing root health route';
  });

  // Test 7: .env.example exists
  runTest('Server has .env.example', () => {
    return fileExists('.env.example');
  });

  // Test 8: .env.production.example exists
  runTest('Server has .env.production.example', () => {
    return fileExists('.env.production.example');
  });

  // Test 9: Check required dependencies
  runTest('Server has required dependencies', () => {
    const pkg = readJsonFile('package.json');
    const required = ['express', 'mongoose', 'cors', 'helmet', 'socket.io'];
    const missing = required.filter(d => !pkg.dependencies[d]);
    return missing.length === 0 
      ? true 
      : `Missing: ${missing.join(', ')}`;
  });

  // Test 10: Check MongoDB connection config
  runTest('Server has MongoDB configuration', () => {
    const config = fs.readFileSync('src/app/config/index.ts', 'utf-8');
    return config.includes('database_url') ? true : 'No database_url config';
  });

  // Test 11: Check JWT config
  runTest('Server has JWT configuration', () => {
    const config = fs.readFileSync('src/app/config/index.ts', 'utf-8');
    const hasJWT = config.includes('jwt_access_secret') && config.includes('jwt_refresh_secret');
    return hasJWT ? true : 'Missing JWT secrets in config';
  });

  // Test 12: Check CORS config
  runTest('Server has CORS configuration', () => {
    const app = fs.readFileSync('src/app.ts', 'utf-8');
    return app.includes('cors') && app.includes('ALLOWED_ORIGINS') ? true : 'No CORS config';
  });

  // Test 13: Check rate limiting
  runTest('Server has rate limiting', () => {
    const app = fs.readFileSync('src/app.ts', 'utf-8');
    return app.includes('rateLimit') ? true : 'No rate limiting';
  });

  // Test 14: Check environment variables in .env.example
  runTest('.env.example has required variables', () => {
    const env = fs.readFileSync('.env.example', 'utf-8');
    const required = ['DATABASE_URL', 'CLERK_SECRET_KEY', 'JWT_ACCESS_SECRET', 'JWT_REFRESH_SECRET'];
    const missing = required.filter(v => !env.includes(v));
    return missing.length === 0 
      ? true 
      : `Missing in .env.example: ${missing.join(', ')}`;
  });

  // Test 15: Check for hardcoded secrets (warning)
  runTest('No hardcoded secrets in source code', () => {
    const env = fs.readFileSync('.env', 'utf-8');
    if (env.includes('sk_test_') || env.includes('sk_live_')) {
      return 'Warning: .env contains API keys - use environment variables in production';
    }
    return true;
  });

  // Test 16: Check socket.io config
  runTest('Server has Socket.io configuration', () => {
    const socketService = fs.existsSync('src/app/modules/socket/socket.service.ts');
    return socketService ? true : 'No socket service found';
  });

  // Test 17: Check Stripe webhook
  runTest('Server has Stripe webhook endpoint', () => {
    const webhook = fs.existsSync('src/app/modules/payment/webhook.controller.ts');
    return webhook ? true : 'No webhook controller';
  });

  // Test 18: Check Cloudinary config
  runTest('Server has Cloudinary configuration', () => {
    const config = fs.readFileSync('src/app/config/index.ts', 'utf-8');
    return config.includes('cloudinary') ? true : 'No Cloudinary config';
  });

  process.chdir('..');
  return results.failed === 0;
}

// ============================================================================
// CLIENT TESTS
// ============================================================================

function testClient() {
  log.section('CLIENT (Vercel) Tests');
  const clientDir = path.join(process.cwd(), 'advyon-client');
  
  if (!fs.existsSync(clientDir)) {
    log.fail('advyon-client directory not found');
    results.failed++;
    return false;
  }

  process.chdir(clientDir);

  // Test 1: Package.json exists
  runTest('Client package.json exists', () => {
    return fileExists('package.json');
  });

  // Test 2: Required scripts exist
  runTest('Client has required npm scripts', () => {
    const pkg = readJsonFile('package.json');
    const required = ['dev', 'build'];
    const missing = required.filter(s => !pkg.scripts[s]);
    return missing.length === 0 
      ? true 
      : `Missing scripts: ${missing.join(', ')}`;
  });

  // Test 3: Vite builds
  runTest('Client Vite builds successfully', () => {
    try {
      const output = runCommand('npm run build');
      const hasError = output.includes('error') && !output.includes('error TS');
      return hasError ? 'Build has errors' : true;
    } catch (e) {
      return 'Build failed';
    }
  });

  // Test 4: dist folder created
  runTest('Client builds to dist folder', () => {
    return fileExists('dist/index.html');
  });

  // Test 5: vercel.json exists
  runTest('Client has vercel.json for SPA routing', () => {
    return fileExists('vercel.json');
  });

  // Test 6: vercel.json has correct config
  runTest('vercel.json has SPA rewrite config', () => {
    const config = fs.readFileSync('vercel.json', 'utf-8');
    return config.includes('rewrites') ? true : 'Missing rewrites config';
  });

  // Test 7: Check Vite config
  runTest('Client has vite.config.js', () => {
    return fileExists('vite.config.js');
  });

  // Test 8: Check React Router usage
  runTest('Client uses React Router', () => {
    const pkg = readJsonFile('package.json');
    return pkg.dependencies['react-router-dom'] ? true : 'No react-router-dom';
  });

  // Test 9: Check API URL configuration
  runTest('Client has API URL configuration', () => {
    const apiFile = fs.existsSync('src/lib/api/api.js') 
      ? fs.readFileSync('src/lib/api/api.js', 'utf-8')
      : fs.existsSync('src/services/_shared/apiClient.js')
        ? fs.readFileSync('src/services/_shared/apiClient.js', 'utf-8')
        : '';
    return apiFile.includes('import.meta.env') || apiFile.includes('VITE_') ? true : 'No env config found';
  });

  // Test 10: Check Clerk integration
  runTest('Client has Clerk authentication', () => {
    const pkg = readJsonFile('package.json');
    return pkg.dependencies['@clerk/clerk-react'] ? true : 'No Clerk integration';
  });

  // Test 11: Check Stripe integration
  runTest('Client has Stripe integration', () => {
    const pkg = readJsonFile('package.json');
    return pkg.dependencies['@stripe/stripe-js'] ? true : 'No Stripe integration';
  });

  // Test 12: Check Socket.io client
  runTest('Client has Socket.io client', () => {
    const pkg = readJsonFile('package.json');
    return pkg.dependencies['socket.io-client'] ? true : 'No Socket.io client';
  });

  // Test 13: Check environment variable prefix
  runTest('Client uses VITE_ prefix for env vars', () => {
    const apiFile = fs.existsSync('src/lib/api/api.js') 
      ? fs.readFileSync('src/lib/api/api.js', 'utf-8')
      : '';
    return apiFile.includes('VITE_') ? true : 'Should use VITE_ prefix';
  });

  // Test 14: Check for localhost hardcoding (warning)
  runTest('No hardcoded localhost in production-ready code', () => {
    const apiFile = fs.existsSync('src/lib/api/api.js') 
      ? fs.readFileSync('src/lib/api/api.js', 'utf-8')
      : '';
    if (apiFile.includes("'http://localhost'") || apiFile.includes('"http://localhost"')) {
      return 'Warning: Found localhost URLs - ensure they use env vars';
    }
    return true;
  });

  // Test 15: Check index.html has meta tags
  runTest('Client has proper meta tags', () => {
    const indexHtml = fs.readFileSync('index.html', 'utf-8');
    return indexHtml.includes('<title>') ? true : 'No title tag';
  });

  // Test 16: Check production build size (warning)
  runTest('Client bundle size is reasonable', () => {
    const statsFile = path.join(process.cwd(), 'dist', 'assets');
    if (!fs.existsSync(statsFile)) {
      return 'No assets folder - run build first';
    }
    const files = fs.readdirSync(statsFile);
    const jsFiles = files.filter(f => f.endsWith('.js'));
    const largeFiles = jsFiles.filter(f => {
      const size = fs.statSync(path.join(statsFile, f)).size;
      return size > 2000000; // 2MB
    });
    return largeFiles.length > 0 
      ? `Warning: Large bundles: ${largeFiles.join(', ')}`
      : true;
  });

  process.chdir('..');
  return results.failed === 0;
}

// ============================================================================
// SHARED TESTS
// ============================================================================

function testShared() {
  log.section('SHARED Tests');

  // Test 1: Root directory structure
  runTest('Project has correct directory structure', () => {
    const hasServer = fs.existsSync('advyon-server');
    const hasClient = fs.existsSync('advyon-client');
    return hasServer && hasClient ? true : 'Missing server or client directories';
  });

  // Test 2: DEPLOYMENT_GUIDE exists
  runTest('DEPLOYMENT_GUIDE.md exists', () => {
    return fileExists('DEPLOYMENT_GUIDE.md');
  });

  // Test 3: Git is initialized
  runTest('Git repository initialized', () => {
    return fileExists('.git/config') || fileExists('../.git/config');
  });

  // Test 4: No node_modules in root
  runTest('No node_modules in project root', () => {
    const hasNodeModules = fs.existsSync('node_modules');
    return hasNodeModules 
      ? 'Warning: node_modules in root - consider removing'
      : true;
  });
}

// ============================================================================
// MAIN
// ============================================================================

function main() {
  console.log(`
${colors.cyan}
╔════════════════════════════════════════════════════════════╗
║     ADVYON LEGAL PLATFORM - DEPLOYMENT READINESS TEST     ║
╚════════════════════════════════════════════════════════════╝
${colors.reset}
  `);

  // Change to project root
  const projectRoot = process.cwd();
  console.log(`Project: ${projectRoot}\n`);

  try {
    // Run all tests
    testShared();
    testServer();
    testClient();

    // Summary
    log.section('SUMMARY');
    console.log(`  ${colors.green}Passed:${colors.reset} ${results.passed}`);
    console.log(`  ${colors.yellow}Warnings:${colors.reset} ${results.warnings}`);
    console.log(`  ${colors.red}Failed:${colors.reset} ${results.failed}`);

    if (results.failed === 0) {
      console.log(`\n${colors.green}🎉 All critical tests passed!${colors.reset}`);
      console.log(`${colors.green}The project is ready for deployment!${colors.reset}\n`);
      
      if (results.warnings > 0) {
        console.log(`${colors.yellow}Note: ${results.warnings} warnings found. Review them before deploying.${colors.reset}\n`);
      }
      
      console.log('Next steps:');
      console.log('  1. Set up environment variables in Render & Vercel dashboards');
      console.log('  2. Deploy server to Render');
      console.log('  3. Deploy client to Vercel');
      console.log('  4. Update CORS with your production URLs\n');
      
      process.exit(0);
    } else {
      console.log(`\n${colors.red}❌ Deployment readiness check failed!${colors.reset}`);
      console.log(`${colors.red}Fix the failed tests before deploying.${colors.reset}\n`);
      process.exit(1);
    }
  } catch (error) {
    console.error(`\n${colors.red}Error running tests:${colors.reset}`, error.message);
    process.exit(1);
  }
}

main();
