# Yuniverse Identity-First Homepage Design

Date: 2026-05-08

## Goal

Evolve the personal site from a concise portfolio into a lightweight personal homepage that introduces who Xinyu is first, while keeping work, projects, resume, and contact easy to reach.

The first impression should feel like a personal orientation map, not a heavy professional pitch. Recruiters should quickly understand where to go, but the page should first answer: who is this person?

The site must remain a frontend-only Vercel-deployable project. The main quality bar is visual design, distinct personality, and easy navigation, not backend functionality.

## Design Direction

Use an identity-first, work-light structure.

The homepage should open with personal information, current life context, and a clear life trajectory. Work content should remain visible through navigation and direct entry points, but it should not dominate the top of the page.

The site should preserve the existing bilingual, starry "Yuniverse" feel and the current two-panel structure:

- Left panel: identity anchor, short intro, social links, resume, navigation.
- Right panel: scrollable sections that build a fuller picture of the person.

The design should feel distinctive enough to be memorable, but simple enough for a first-time visitor to navigate without learning a custom interaction model.

## Recommended Page Structure

1. Identity
2. Journey
3. Navigation Hub
4. Work
5. Projects
6. Shelf
7. Moments

## Section Responsibilities

### Identity

Purpose: introduce Xinyu as a person before introducing a resume.

Content should include:

- Name and current identity.
- Incoming UCSD ECE M.S. context.
- Software engineering focus.
- A short human introduction.
- Current interests across engineering, school, research, music, films, and fitness.

This section should feel polished and vivid. It can replace or substantially evolve the existing About section.

### Journey

Purpose: explain life and learning trajectory in a narrative way.

Content should include:

- University of Sydney background.
- Research and thesis direction.
- Internship path.
- Transition toward UCSD.
- How backend systems, AI agents, and embodied AI became core interests.

This is not a duplicate of Experience. It should tell the story behind the resume.

### Navigation Hub

Purpose: let visitors quickly choose what they care about.

Suggested entries:

- Work
- Projects
- Resume
- Contact
- Shelf
- Moments

Work-related entries should be clear, but visually lightweight. The hub should act like a map of the site rather than a sales block.

### Work

Purpose: provide a direct path for recruiters and technical visitors.

Keep the existing Experience content, but avoid making it the emotional center of the homepage. It should be easy to navigate to and scan.

### Projects

Purpose: demonstrate engineering ability through selected projects.

Keep the existing project section. Later, individual project cards can grow into case studies, but that is outside the first design pass.

### Shelf

Purpose: show taste and personality.

Start with a lightweight collection:

- Music, especially Neo-Soul and Funk.
- Films.
- Optional books or essays later.

Each item should be curated rather than exhaustive. Short notes are better than long reviews.

### Moments

Purpose: reserve space for future photos and personal fragments.

This can begin as a minimal seed section if there are not enough photos yet. It should not feel empty or unfinished; it can be framed as a growing section.

## Navigation

The left navigation should move from pure resume categories to a fuller personal map:

- Identity
- Journey
- Work
- Projects
- Shelf
- Moments

Resume and contact can remain as direct action links rather than full sections.

Navigation must be obvious on both desktop and mobile. Recruiters should be able to reach Work, Projects, Resume, and Contact in one clear action from the first screen.

The site should avoid hidden-only navigation patterns. Visual flair is welcome, but core links should remain text-readable and predictable.

## Visual Design Priorities

The UI is the main product of this redesign.

Priorities:

- Preserve the Yuniverse concept through a refined space/orbit visual language.
- Make the first screen visually distinctive without making it feel like a landing page.
- Use clear section hierarchy, strong spacing, and readable text.
- Keep work links visible but visually light.
- Make interest sections feel curated and tasteful.
- Ensure mobile navigation is simple and not cramped.

Avoid:

- Heavy dashboard-like recruiter blocks at the top.
- Backend-dependent features.
- Complex dynamic systems that make Vercel deployment harder.
- Decorative effects that reduce readability or make navigation ambiguous.

## Tone

The writing should be:

- Personal but not overly casual.
- Clear and concise.
- Warm without sounding like a blog diary.
- Professional enough for recruiters, but not shaped entirely around recruitment.

Avoid making the first screen feel like LinkedIn. Avoid turning interest sections into long catalogs.

## Implementation Notes

The current codebase already supports the right approach:

- Content is centralized in `frontend/src/data/portfolio.js`.
- Sections are componentized under `frontend/src/components/`.
- Scrollspy navigation already exists and can be extended.
- Bilingual content is already supported.

Likely implementation work:

- Add new localized data for identity, journey, shelf, and moments.
- Update nav labels and section IDs.
- Add new Vue section components.
- Reorder the right panel sections.
- Keep existing Experience and Projects components with minor naming/navigation adjustments.
- Keep all content local and static so deployment remains simple on Vercel.

## Out of Scope For First Pass

- Blog system.
- Full photo gallery.
- Project case-study pages.
- CMS or external data source.
- Backend APIs or database integration.
- Heavy animation redesign.

These can be added later once the identity-first homepage is stable.

## Success Criteria

- A first-time visitor can quickly understand who Xinyu is.
- Recruiters can still reach work, projects, resume, and contact without confusion.
- The homepage feels lighter and more personal than a resume site.
- Interest sections show taste without overwhelming the page.
- The existing Yuniverse visual identity remains recognizable.
- The site remains frontend-only and easy to deploy on Vercel.
- Navigation is clear on desktop and mobile.
