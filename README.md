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
- `/life` - public life and education timeline
- `/blog` - planned writing index with categories and status filters
- `/collection` - music, movie, and picture collection notes

## Content Notes

Profile, contact, education, and interest copy now reflects the current public draft. Project writeups, blog posts, and collection entries can be expanded as more details are ready to publish.
