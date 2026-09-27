# Apricus IT Infrastructure Website

Static HTML, CSS, and JavaScript site. Open `index.html` in a browser — no build step required.

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home — hero, solutions, customers, value proposition, contact |
| `about.html` | Mission, vision, story, team |
| `eam.html` | AI-Powered Enterprise Management System |
| `ndr.html` | AI-Powered Network Detection & Response |
| `sd-wan.html` | SD-WAN solution |

## Local preview

Open `.io/index.html` directly in your browser, or serve the folder:

```bash
npx serve .
```

(run from the `.io` directory)

## Assets to replace

- **Customer logos:** `assets/customers/client-01.svg` … `client-08.svg`
- **Section images:** `assets/images/*.svg` — swap for photography or branded visuals
- **Team photos:** `assets/team/` — see README in that folder

## Contact form

The form validates on the client only. To connect a live inbox:

1. Sign up at [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com)
2. Add the form `action` and `method` to `#contact-form` in `index.html`
3. Remove or update the frontend-only status message

Demo CTAs from solution pages pre-select interest via URL query, e.g. `index.html?interest=Request%20EAM%20Demo#contact`.

## Theme

Visual design matches the `AI.com` site: deep navy hero, indigo/cyan accents, Space Grotesk + Inter, glass panels, scroll reveals.

CSS structure:

- `css/style.css` — entry (imports theme + components)
- `css/theme.css` — base design system
- `css/components.css` — .io-specific components

## Content source

Copy is based on `.io/Apricus Website Content (1).docx`, rewritten for a premium enterprise tone.
