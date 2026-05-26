# Debargha Adhikary Portfolio

Premium Apple-inspired portfolio built with Next.js 15, React, TypeScript, Tailwind CSS, Framer Motion, Lenis smooth scrolling, Lucide Icons, and Three.js.

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Commands

```bash
npm run dev        # Start local development
npm run build      # Create production build
npm run start      # Serve production build
npm run type-check # Validate TypeScript
npm run lint       # Run Next lint
```

## Folder Structure

- `app/` - Next.js App Router pages, layout, metadata, and global app shell.
- `components/` - Reusable UI components, navigation, effects, and portfolio sections.
- `hooks/` - Client-side hooks for Lenis and scroll progress.
- `lib/` - Portfolio data and animation presets.
- `public/` - Static assets including the Open Graph image.
- `styles/` - Global Tailwind and custom CSS.
- `types/` - Shared TypeScript types.

## Customizing Content

Edit `lib/data.ts` to update navigation, skills, projects, experience, achievements, testimonials, and social links. Most sections render from that file, so content changes stay centralized.

Update SEO metadata in `app/layout.tsx`, including title, description, keywords, canonical URL, and social preview image.

## Framer Motion Setup

Animation presets live in `lib/motion.ts`. Sections use `whileInView`, staggered children, sticky project reveals, hover lift effects, stat counters, and loading transitions. Keep motion subtle and slow for the keynote-style feel.

## Smooth Scrolling Setup

Lenis is initialized in `hooks/use-lenis.ts` and mounted once through `components/client-shell.tsx`. Tuning values:

- `duration` controls scroll softness.
- `wheelMultiplier` controls perceived scroll speed.
- The `requestAnimationFrame` loop drives smooth scrolling globally.

## Performance Notes

- Three.js background is isolated to the hero and caps pixel ratio.
- CSS gradients and glass effects are used instead of large image assets.
- Framer animations use viewport triggers to avoid unnecessary continuous animation.
- Next metadata is configured for SEO and social previews.
- Keep future media assets compressed as AVIF/WebP and place them in `public/`.

## Accessibility

- Semantic section structure and accessible navigation labels are included.
- Inputs have labels through `sr-only` text.
- Motion respects `prefers-reduced-motion`.
- Color contrast is designed for the dark luxury palette.

## Vercel Deployment

1. Push this project to GitHub.
2. Import the repository in Vercel.
3. Use the default Next.js framework preset.
4. Build command: `npm run build`.
5. Output directory: `.next`.
6. Add a production domain and update `metadataBase` in `app/layout.tsx`.

No environment variables are required for the current static portfolio. If you later wire the contact form to an email provider, add secrets in Vercel under Project Settings → Environment Variables.

## Production Checklist

- Replace placeholder social URLs in `lib/data.ts`.
- Add real GitHub/live preview links for each project.
- Replace `hello@example.com` with your email address.
- Run `npm run type-check` and `npm run build`.
- Test desktop, tablet, and mobile viewports before deployment.
