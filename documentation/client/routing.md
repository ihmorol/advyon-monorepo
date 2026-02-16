# Routing

Client-side routing is handled by **React Router v6**.

## Router Structure

Routes are defined in `src/routes.jsx` or `src/App.jsx`.

- **/auth***: Public authentication routes.
- **/dashboard**: Protected (All authenticated users).
- **/workspace**: Protected (Lawyers/Admins).
- **/admin**: Protected (Admin only).

## Route Protection

We use a `ProtectedRoute` wrapper component to enforce authentication and roles.

```jsx
<Route
  path="/admin"
  element={
    <ProtectedRoute allowedRoles={['admin', 'superAdmin']}>
      <AdminLayout />
    </ProtectedRoute>
  }
/>
```

## Navigation

Navigation logic is centralized in the `Sidebar` and `Navbar` components, which dynamically render links based on the user's role from `useAuthStore`.
