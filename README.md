# Sentiantal website

Next.js (App Router), React, TypeScript, Tailwind CSS v4, Radix UI.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
npm run typecheck
npm test           # node --test lib/status.test.ts
```

Next.js 16 here has breaking changes from older versions. Read `node_modules/next/dist/docs/` before changing routing, caching or config.

## Structure

```
app/
  (brand)/      Home, About, Contact, on the neutral brand theme
  (products)/   /products and /products/[slug], on the dark aubergine theme
  (services)/   /services and /services/[slug], on the light indigo theme
  api/enquiry/  Contact form delivery
components/
  site/         Header, footer, shell, logo, arch frame, node-chain tabs
  home/         Home sections (gateway, fields, samples, closing)
  products/     Arch rail and product page template
  services/     Service lines and project list
  demos/        The eight interactive demos
content/        All copy and lists. Edit here, not in the pages.
lib/            Demo thresholds (status.ts) and interview scoring, with tests
public/         brand logos, product images, field photos
```

## Editing content

- **Products:** `content/products.ts`. Each entry drives the arch rail, the page, the table and the footer. Add a product by adding an entry, an arch image in `public/products/`, and (optionally) a demo in `components/demos/index.tsx`.
- **Service projects and service lines:** `content/services.ts`.
- **Company text, fields, partner topics, leadership, contact details:** `content/company.ts`.
- **Demo numbers:** `lib/status.ts`. These are sample thresholds, labelled "Sample data" on the site.

## Themes

Each route group wraps its pages in `Shell` with a theme: `brand`, `products` or `services`. Tokens (`ground`, `surface`, `ink`, `accent`, and so on) are CSS variables set per `[data-theme]` in `app/globals.css`. Use the Tailwind names (`bg-ground`, `text-muted`, `border-line`) and the page follows the wing it is in. Per-product colour comes from the `glow` field in the content files.

## Enquiry form

`POST /api/enquiry` emails the message through Resend. Copy `.env.example` to `.env.local` and set `RESEND_API_KEY`, `ENQUIRY_TO` and `ENQUIRY_FROM` (a sender on a domain verified in Resend). Without them the form tells the visitor to use email or WhatsApp. There is no rate limit; add one if the form attracts spam.

## Fonts and assets

- Kallisto (brand font) is in `app/fonts/`. Confirm the licence covers web use before launch. Kallisto has no ₹, ₂ or µ, so those fall back to the body font.
- Body font is Atkinson Hyperlegible Next. Noto Sans Telugu and Devanagari load only when that text appears (the soil-report language switch).
- Product arch images were cropped from the product deck PDF. Replace them with original device renders when available (same file names).
- Telugu and Hindi strings in `components/demos/soil-test.tsx` need review by a native speaker.
