# Components

The component library is divided into generic UI primitives and complex custom components.

## UI Primitives (`src/components/ui`)

These components are built on top of **Radix UI** primitives and styled with **Tailwind CSS**. They are accessible by default.

- **Accordion**: Collapsible content sections.
- **Button**: Standard interactive buttons with variants (default, destructive, outline).
- **Card**: Container for grouping content.
- **Dialog**: Modal dialogs for overlays.
- **Form**: Wrapper for React Hook Form integration.
- **Sheet**: Slide-out panels (used for mobile navigation and sidebars).
- **Sonner**: Toast notification system.
- **Table**: Responsive data tables.

## Custom Visual Components

Premium visual components designed to give Advyon its distinct look.

### DynamicBackground
`src/components/ui/DynamicBackground.jsx`

Top-level background wrapper that provides the gradient or mesh background effect.

### RippleBackground
`src/components/ui/RippleBackground.jsx`

Interactive background that responds to mouse movement with a ripple effect. Used on the landing/login pages.

### WaterWaveEffect
`src/components/ui/WaterWaveEffect.jsx`

A subtle wave animation used in headers or hero sections.

### RichTextEditor
`src/components/ui/RichTextEditor.jsx`

A WYSIWYG editor implementation (likely Tiptap or similar) for composing case descriptions and messages.

### StatusTimeline
`src/components/ui/StatusTimeline.jsx`

A vertical or horizontal timeline component to visualize the progression of a legal case.
