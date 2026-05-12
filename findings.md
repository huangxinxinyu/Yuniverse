# Findings

- The project is a React/Vite personal website.
- The project directory is not currently a git repository, so file history is unavailable from `git`.
- Existing screenshots are stored in `output/playwright/` and `artifacts/screenshots/`; new review screenshots should use `output/playwright/`.
- `README.md` explicitly says all current profile, project, notes, and contact copy is mock content.
- The main editable content sources are `src/data/content.ts` and `src/content/siteContent.ts`.
- Direct placeholder signals include `mock`, `placeholder`, `fictional`, `invented`, `Future state`, `Replaceable content`, `hello@yuniverse.dev`, `Online studio`, and `Imagined city routes`.
- Pages render mostly from the content files: `/` uses profile and section summaries; `/about` uses `aboutPageContent`; `/work`, `/life`, `/blog`, and `/collection` use mapped content from `siteSections` and `collections`.
- New screenshots were captured in `output/playwright/` with names beginning `content-audit-`.
- The requested intake document is `site-content-intake.md`.
