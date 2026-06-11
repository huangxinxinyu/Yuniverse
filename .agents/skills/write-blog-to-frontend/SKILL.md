---
name: write-blog-to-frontend
description: Use when the user says 写博客, wants to write a blog post, publish a blog, add an article, update the blog page, or turn notes into a frontend blog entry in this repo.
---

# Write Blog To Frontend

## Core Rule

Do not stop at content generation. This skill is complete only after approved blog content has been implemented in the frontend files and pushed, unless the user explicitly pauses before implementation.

Use `grill-me` before drafting. Discuss the topic, audience, claim, boundaries, evidence, structure, tone, and what should be excluded. Keep questioning until the blog's scope is sharp enough to write without inventing unsupported details.

## Workflow

1. Inspect the current repo state.
   - Run `git status --short`.
   - Read the current blog data under `frontend/src/content/posts`.
   - Confirm the existing `BlogPost` shape in `frontend/src/data/types.ts`.
2. Grill the user on the post.
   - Start from the user's rough idea or ask for one if none exists.
   - Resolve: title direction, target reader, core argument, source material, boundaries, publish readiness, and anything private or sensitive that must be omitted.
   - Ask concise questions one at a time when the answer changes the post.
3. Draft the post.
   - Produce the proposed title, slug, excerpt, category, tags, reading time, AI disclosure, and body.
   - Preserve the user's voice. Prefer Chinese when the user is writing in Chinese.
   - Mark uncertain facts instead of filling them in.
4. Stop for user review.
   - Ask the user to review the draft.
   - Do not modify frontend files until the user explicitly approves the content.
5. Implement the approved post in the frontend.
   - Add a new file in `frontend/src/content/posts/<slug>.ts`.
   - Export a named object satisfying `BlogPost`.
   - Add the import and entry to `frontend/src/content/posts/index.ts`.
   - Update focused tests when existing tests assert exact blog slug order or article routes.
   - Only change blog UI code if the approved post requires rendering behavior that the current components cannot support.
6. Verify and push.
   - From `frontend/`, run the smallest relevant tests first, then `npm test`.
   - Run `npm run build` before pushing when dependencies are already installed.
   - Commit only the files needed for the blog post.
   - Push the branch after tests pass and the user has approved publishing.

## Frontend Contract

Current blog posts live in `frontend/src/content/posts`. Each post file imports `BlogPost` from `../../data/types` and exports an object with:

```ts
{
  slug: string
  title: string
  date: string
  excerpt: string
  content: readonly string[]
  aiDisclosure?: string
  readingMinutes: number
  category: 'software' | 'systems' | 'life' | 'taste' | 'notes'
  featured?: boolean
  tags: readonly string[]
  status: 'draft' | 'planned' | 'published'
} satisfies BlogPost
```

Use paragraph strings in `content`. Existing rendering supports plain paragraphs, markdown-style headings, lists, and fenced code blocks; verify in `frontend/src/pages/BlogPostPage.tsx` before relying on formatting.

## Review Gates

| Gate | Requirement |
| --- | --- |
| Topic gate | User has answered enough grill-me questions to define the post's point and boundaries. |
| Draft gate | User has reviewed and approved the full proposed content. |
| Frontend gate | Approved content is represented in `frontend/src/content/posts` and indexed. |
| Publish gate | Relevant tests pass, commit is created, and push succeeds. |

## Common Mistakes

- Producing a polished article but never editing `frontend/`.
- Modifying frontend files before the user approves the draft.
- Inventing personal experiences, company details, metrics, or private context.
- Forgetting to update tests that assert exact blog post order.
- Pushing broad unrelated changes or unreviewed drafts.
