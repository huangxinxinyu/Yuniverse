# Yuniverse

Personal website for Yuniverse. The project uses Vite, React, and TypeScript, with centralized content data that can be updated as the public profile grows.

## Local Setup

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run linting:

```bash
npm run lint
```

Run tests:

```bash
npm test
```

Preview a production build locally:

```bash
npm run preview
```

## Project Structure

- `src/components` - reusable UI pieces such as navigation and section headings
- `src/data` - site content and content-shape tests
- `src/pages` - page-level composition
- `src/sections` - homepage sections
- `src/styles` - site-level styles
- `src/assets` - bundled visual assets

## Routes

The site uses a lightweight in-app router with a restrained shared layout and navigation.

- `/` - concise overview with links into the main sections
- `/about` - public identity, values, craft, and personal details
- `/work` - selected project and software development notes
- `/blog` - planned writing index with categories and status filters
- `/collection` - music, movie, and picture collection notes

## Content Notes

Profile, contact, education, and interest copy now reflects the current public draft. Project writeups, blog posts, and collection entries can be expanded as more details are ready to publish.

## Anonymous Post Metrics

The article engagement widget uses one Vercel Function call per article view or
like action. Its shared counters live in an Upstash Redis database and are not
stored in the Vercel Function process.

Configure these variables in Vercel for Production, Preview, and Development:

```text
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
POST_METRICS_SALT
```

The first two values are provided by an Upstash Redis integration. Generate the
salt once (for example with `openssl rand -hex 32`) and keep the same value
across deployments. Changing it makes existing browsers appear as new anonymous
visitors, but it does not erase the stored counts.

For local end-to-end testing of both Vite and the function, copy `.env.example`
to `.env.local`, fill the values, and run the project through Vercel CLI:

```bash
npx vercel dev
```

The metrics endpoint performs one atomic Redis request per action. Views are
deduplicated per article, anonymous browser, and UTC day. If the service is not
configured or temporarily unavailable, the article remains readable and the
widget quietly disables itself.

## Site Summary Metrics

The Blog sidebar shows the number of published posts and days since the site's
2025-08-17 launch date. Site-wide views and visitors use the same anonymous
browser ID, salt, and Upstash database as post metrics. Each page load or
in-app route change records a view; repeat requests for the same route and
browser within 30 seconds are counted once. Unique visitors are an approximate
lifetime count from Redis HyperLogLog. Both counters begin when this feature is
deployed; historic site traffic cannot be recovered from the post-only counts.
If the metrics service is unavailable, the sidebar shows dashes for those two
counters.
