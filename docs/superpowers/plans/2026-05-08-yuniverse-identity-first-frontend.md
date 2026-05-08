# Yuniverse Identity-First Frontend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a frontend-only, Vercel-friendly personal homepage that introduces Xinyu first, keeps work content easy to reach, and gives Yuniverse a more distinctive UI and navigation experience.

**Architecture:** Keep the existing Vue + Vite static app. Extend the centralized portfolio data, make navigation data-driven, add focused section components, then polish the two-panel layout and mobile navigation. No backend, CMS, database, or runtime API dependency.

**Tech Stack:** Vue 3, Vite, Pinia, CSS, local static assets in `frontend/public`.

---

## File Structure

- Modify `frontend/src/data/portfolio.js`
  - Owns all localized content for English and Chinese.
  - Add section order, identity, journey, navigation hub, shelf, and moments data.
- Modify `frontend/src/stores/portfolio.js`
  - Expose a computed `sectionIds` array from localized data.
- Modify `frontend/src/composables/useScrollspy.js`
  - Read section IDs from the store instead of hardcoding `about`, `experience`, `projects`.
- Modify `frontend/src/components/ScrollspyNav.vue`
  - Render localized navigation from the new section order.
- Modify `frontend/src/components/IntroSection.vue`
  - Keep it as the left-panel identity anchor, but make the intro less resume-heavy.
- Create `frontend/src/components/IdentitySection.vue`
  - First right-panel section. Introduces current status, focus, and personality.
- Create `frontend/src/components/JourneySection.vue`
  - Narrative timeline from Sydney to UCSD.
- Create `frontend/src/components/NavigationHubSection.vue`
  - Clear lightweight links to Work, Projects, Resume, Contact, Shelf, and Moments.
- Modify `frontend/src/components/ExperienceSection.vue`
  - Keep existing work content, but change section ID to `work`.
- Modify `frontend/src/components/ProjectsSection.vue`
  - Keep existing project content and scanability.
- Create `frontend/src/components/ShelfSection.vue`
  - Curated music and film taste section.
- Create `frontend/src/components/MomentsSection.vue`
  - Lightweight seed section for future personal photos/fragments.
- Modify `frontend/src/components/RightPanel.vue`
  - Reorder sections to identity-first structure.
- Modify `frontend/src/assets/styles/variables.css`
  - Add small visual tokens for orbit lines, accent surfaces, and section cards.
- Modify `frontend/src/assets/styles/main.css`
  - Polish background, focus states, mobile spacing, and readability.

## Implementation Tasks

### Task 1: Add Localized Homepage Data

**Files:**
- Modify: `frontend/src/data/portfolio.js`

- [ ] **Step 1: Add section order and nav labels to English data**

In `portfolioData.en`, replace the current `nav` object with:

```js
nav: {
  identity: "Identity",
  journey: "Journey",
  hub: "Navigate",
  work: "Work",
  projects: "Projects",
  shelf: "Shelf",
  moments: "Moments"
},
sectionOrder: ["identity", "journey", "hub", "work", "projects", "shelf", "moments"],
```

- [ ] **Step 2: Add section order and nav labels to Chinese data**

In `portfolioData.zh`, replace the current `nav` object with:

```js
nav: {
  identity: "我是谁",
  journey: "轨迹",
  hub: "导航",
  work: "工作",
  projects: "项目",
  shelf: "收藏",
  moments: "瞬间"
},
sectionOrder: ["identity", "journey", "hub", "work", "projects", "shelf", "moments"],
```

- [ ] **Step 3: Add English identity data**

Add this object under `portfolioData.en`:

```js
identity: {
  title: "Current Orbit",
  eyebrow: "Identity snapshot",
  lead: "I am Xinyu, an incoming UC San Diego ECE M.S. student and software engineer building toward backend systems, AI agent infrastructure, and reliable products.",
  cards: [
    { label: "Now", value: "Incoming UCSD ECE M.S. student" },
    { label: "Focus", value: "Backend systems and AI agent infrastructure" },
    { label: "Research", value: "Embodied AI, robotics, and LLM-controlled systems" },
    { label: "Off-screen", value: "Gym, Neo-Soul, Funk, and films" }
  ]
},
```

- [ ] **Step 4: Add Chinese identity data**

Add this object under `portfolioData.zh`:

```js
identity: {
  title: "当前轨道",
  eyebrow: "个人状态速写",
  lead: "我是新宇，即将赴 UC San Diego 攻读 ECE 硕士，也是一名专注后端系统、AI Agent 基础设施和可靠产品的 software engineer。",
  cards: [
    { label: "现在", value: "即将赴 UCSD 攻读 ECE 硕士" },
    { label: "关注", value: "后端系统与 AI Agent 基础设施" },
    { label: "研究", value: "Embodied AI、机器人与 LLM 控制系统" },
    { label: "生活", value: "健身、Neo-Soul、Funk 和电影" }
  ]
},
```

- [ ] **Step 5: Add English journey, hub, shelf, and moments data**

Add:

```js
journey: {
  title: "Journey",
  items: [
    { period: "Sydney", title: "Software Engineering foundation", text: "Studied Software Engineering at the University of Sydney and built a foundation in systems, product thinking, and engineering discipline." },
    { period: "Research", title: "Embedded AI and robotics", text: "Worked on embodied AI research and became interested in how intelligent systems behave when software meets the physical world." },
    { period: "Internships", title: "Backend and AI agent infrastructure", text: "Moved from backend systems into AI agent infrastructure, focusing on reliable execution, orchestration, and product-facing systems." },
    { period: "Next", title: "UC San Diego ECE", text: "Preparing for graduate study at UCSD while continuing to build practical systems and explore AI infrastructure." }
  ]
},
hub: {
  title: "Find Your Path",
  items: [
    { label: "Work", target: "work", description: "Internships and professional experience" },
    { label: "Projects", target: "projects", description: "Selected engineering projects" },
    { label: "Resume", href: "/resume-en.pdf", description: "Full resume PDF" },
    { label: "Contact", href: "mailto:xinyuhimself@mgmail.com", description: "Email me directly" },
    { label: "Shelf", target: "shelf", description: "Music, films, and taste" },
    { label: "Moments", target: "moments", description: "Personal fragments" }
  ]
},
shelf: {
  title: "Shelf",
  intro: "A small shelf for taste, not a complete archive.",
  groups: [
    { title: "Music", items: ["Neo-Soul", "Funk", "albums with groove and warmth"] },
    { title: "Films", items: ["films with rhythm, style, and human texture"] }
  ]
},
moments: {
  title: "Moments",
  intro: "A growing space for photos, places, and small fragments from life outside the resume.",
  items: ["Campus life", "Travel", "Gym", "Concerts", "Everyday scenes"]
},
```

- [ ] **Step 6: Add Chinese journey, hub, shelf, and moments data**

Add:

```js
journey: {
  title: "人生轨迹",
  items: [
    { period: "Sydney", title: "软件工程基础", text: "在悉尼大学完成软件工程学习，建立了系统设计、产品理解和工程纪律的基础。" },
    { period: "Research", title: "嵌入式 AI 与机器人", text: "毕业设计接触 embodied AI 研究，也开始关注智能系统进入真实物理环境后的行为与安全问题。" },
    { period: "Internships", title: "后端与 AI Agent 基础设施", text: "从后端系统逐步走向 AI Agent Infra，关注可靠执行、任务编排和面向产品的工程系统。" },
    { period: "Next", title: "UC San Diego ECE", text: "即将赴 UCSD 读研，同时继续构建实际系统并探索 AI 基础设施方向。" }
  ]
},
hub: {
  title: "你可以从这里开始",
  items: [
    { label: "工作经历", target: "work", description: "实习与专业经历" },
    { label: "个人项目", target: "projects", description: "精选工程项目" },
    { label: "简历", href: "/resume-zh.pdf", description: "完整 PDF 简历" },
    { label: "联系", href: "mailto:xinyuhimself@mgmail.com", description: "直接邮件联系" },
    { label: "收藏", target: "shelf", description: "音乐、电影和 taste" },
    { label: "瞬间", target: "moments", description: "生活碎片" }
  ]
},
shelf: {
  title: "收藏",
  intro: "这里不是完整档案，更像一个关于 taste 的小架子。",
  groups: [
    { title: "音乐", items: ["Neo-Soul", "Funk", "有律动和温度的专辑"] },
    { title: "电影", items: ["有节奏、风格和人味的电影"] }
  ]
},
moments: {
  title: "瞬间",
  intro: "留给照片、地点和简历之外生活碎片的生长空间。",
  items: ["校园生活", "旅行", "健身", "演出", "日常画面"]
},
```

- [ ] **Step 7: Run build to verify data syntax**

Run:

```bash
cd frontend
npm run build
```

Expected: Vite build completes with no JavaScript syntax errors.

- [ ] **Step 8: Commit**

```bash
git add frontend/src/data/portfolio.js
git commit -m "Add identity-first portfolio content"
```

### Task 2: Make Navigation and Scrollspy Data-Driven

**Files:**
- Modify: `frontend/src/stores/portfolio.js`
- Modify: `frontend/src/composables/useScrollspy.js`
- Modify: `frontend/src/components/ScrollspyNav.vue`

- [ ] **Step 1: Expose section IDs in the store**

In `frontend/src/stores/portfolio.js`, add this computed value after `const t = computed(...)`:

```js
const sectionIds = computed(() => t.value.sectionOrder || ['identity', 'journey', 'hub', 'work', 'projects', 'shelf', 'moments'])
```

Return `sectionIds` from the store:

```js
return {
    currentLang,
    isDarkMode,
    activeSection,
    t,
    sectionIds,
    toggleTheme,
    toggleLanguage,
    setActiveSection,
    initializePreferences
}
```

- [ ] **Step 2: Update scrollspy to use store section IDs**

Replace `frontend/src/composables/useScrollspy.js` with:

```js
import { usePortfolioStore } from '@/stores/portfolio'

export function useScrollspy() {
    const store = usePortfolioStore()

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            store.setActiveSection(sectionId)
        }
    }

    const updateActiveSection = () => {
        const sections = store.sectionIds
        const scrollPosition = window.scrollY + window.innerHeight / 2

        for (let i = sections.length - 1; i >= 0; i--) {
            const element = document.getElementById(sections[i])
            if (element && element.offsetTop <= scrollPosition) {
                store.setActiveSection(sections[i])
                break
            }
        }
    }

    return {
        scrollToSection,
        updateActiveSection
    }
}
```

- [ ] **Step 3: Update scrollspy navigation**

In `frontend/src/components/ScrollspyNav.vue`, remove the local hardcoded `sections` array and read `sectionIds` from the store:

```js
const { t, activeSection, sectionIds } = storeToRefs(store)
```

Change the template loop to:

```vue
<div
    v-for="sectionId in sectionIds"
    :key="sectionId"
    class="nav-item"
    :class="{ active: activeSection === sectionId }"
    @click="scrollToSection(sectionId)"
>
  <div class="nav-line"></div>
  <span class="nav-text">{{ t.nav[sectionId] }}</span>
</div>
```

- [ ] **Step 4: Run build**

Run:

```bash
cd frontend
npm run build
```

Expected: Build succeeds and no template variable errors appear.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/stores/portfolio.js frontend/src/composables/useScrollspy.js frontend/src/components/ScrollspyNav.vue
git commit -m "Make portfolio navigation data-driven"
```

### Task 3: Build Identity Section

**Files:**
- Create: `frontend/src/components/IdentitySection.vue`

- [ ] **Step 1: Create the component**

Create `frontend/src/components/IdentitySection.vue`:

```vue
<template>
  <section
    id="identity"
    class="content-section identity-section"
    :class="{ active: activeSection === 'identity' }"
  >
    <p class="section-eyebrow">{{ t.identity.eyebrow }}</p>
    <h3 class="section-title">{{ t.identity.title }}</h3>
    <p class="identity-lead">{{ t.identity.lead }}</p>

    <div class="identity-grid">
      <article v-for="card in t.identity.cards" :key="card.label" class="identity-card">
        <span class="identity-label">{{ card.label }}</span>
        <p>{{ card.value }}</p>
      </article>
    </div>
  </section>
</template>

<script setup>
import { usePortfolioStore } from '@/stores/portfolio'
import { storeToRefs } from 'pinia'

const store = usePortfolioStore()
const { t, activeSection } = storeToRefs(store)
</script>

<style scoped>
.content-section {
  margin-bottom: 5rem;
  opacity: 0.72;
  transition: opacity var(--transition-base);
}

.content-section.active {
  opacity: 1;
}

.section-eyebrow {
  color: var(--primary-color);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}

.section-title {
  color: var(--text-primary);
  font-size: 1.6rem;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.identity-lead {
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.75;
  margin-bottom: 1.5rem;
}

.identity-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem;
}

.identity-card {
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.035);
  padding: 1rem;
}

.identity-label {
  display: block;
  color: var(--secondary-color);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 0.45rem;
}

.identity-card p {
  color: var(--text-primary);
  font-size: 0.9rem;
  line-height: 1.55;
}

@media (max-width: 768px) {
  .identity-grid {
    grid-template-columns: 1fr;
  }
}
</style>
```

- [ ] **Step 2: Run build**

Run:

```bash
cd frontend
npm run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/IdentitySection.vue
git commit -m "Add identity snapshot section"
```

### Task 4: Build Journey Section

**Files:**
- Create: `frontend/src/components/JourneySection.vue`

- [ ] **Step 1: Create the component**

Create `frontend/src/components/JourneySection.vue`:

```vue
<template>
  <section
    id="journey"
    class="content-section"
    :class="{ active: activeSection === 'journey' }"
  >
    <h3 class="section-title">{{ t.journey.title }}</h3>
    <div class="journey-list">
      <article v-for="item in t.journey.items" :key="item.period" class="journey-item">
        <span class="journey-period">{{ item.period }}</span>
        <div>
          <h4>{{ item.title }}</h4>
          <p>{{ item.text }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { usePortfolioStore } from '@/stores/portfolio'
import { storeToRefs } from 'pinia'

const store = usePortfolioStore()
const { t, activeSection } = storeToRefs(store)
</script>

<style scoped>
.content-section {
  margin-bottom: 5rem;
  opacity: 0.72;
  transition: opacity var(--transition-base);
}

.content-section.active {
  opacity: 1;
}

.section-title {
  color: var(--text-primary);
  font-size: 1.4rem;
  margin-bottom: 1.4rem;
}

.journey-list {
  display: grid;
  gap: 1rem;
}

.journey-item {
  display: grid;
  grid-template-columns: 6.5rem 1fr;
  gap: 1rem;
  padding: 1.1rem 0;
  border-top: 1px solid var(--border-color);
}

.journey-period {
  color: var(--primary-color);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.journey-item h4 {
  color: var(--text-primary);
  font-size: 1rem;
  margin-bottom: 0.35rem;
}

.journey-item p {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.65;
}

@media (max-width: 640px) {
  .journey-item {
    grid-template-columns: 1fr;
    gap: 0.35rem;
  }
}
</style>
```

- [ ] **Step 2: Run build**

Run:

```bash
cd frontend
npm run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/JourneySection.vue
git commit -m "Add personal journey section"
```

### Task 5: Build Navigation Hub Section

**Files:**
- Create: `frontend/src/components/NavigationHubSection.vue`

- [ ] **Step 1: Create the component**

Create `frontend/src/components/NavigationHubSection.vue`:

```vue
<template>
  <section
    id="hub"
    class="content-section"
    :class="{ active: activeSection === 'hub' }"
  >
    <h3 class="section-title">{{ t.hub.title }}</h3>
    <div class="hub-grid">
      <a
        v-for="item in t.hub.items"
        :key="item.label"
        class="hub-link"
        :href="item.href || `#${item.target}`"
        :target="item.href && item.href.startsWith('http') ? '_blank' : undefined"
        :rel="item.href && item.href.startsWith('http') ? 'noopener noreferrer' : undefined"
        @click="handleClick($event, item)"
      >
        <span>{{ item.label }}</span>
        <p>{{ item.description }}</p>
      </a>
    </div>
  </section>
</template>

<script setup>
import { usePortfolioStore } from '@/stores/portfolio'
import { useScrollspy } from '@/composables/useScrollspy'
import { storeToRefs } from 'pinia'

const store = usePortfolioStore()
const { t, activeSection } = storeToRefs(store)
const { scrollToSection } = useScrollspy()

const handleClick = (event, item) => {
  if (!item.target) return
  event.preventDefault()
  scrollToSection(item.target)
}
</script>

<style scoped>
.content-section {
  margin-bottom: 5rem;
  opacity: 0.72;
  transition: opacity var(--transition-base);
}

.content-section.active {
  opacity: 1;
}

.section-title {
  color: var(--text-primary);
  font-size: 1.4rem;
  margin-bottom: 1rem;
}

.hub-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.85rem;
}

.hub-link {
  display: block;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 1rem;
  background: rgba(255, 215, 0, 0.04);
  text-decoration: none;
}

.hub-link span {
  color: var(--text-primary);
  font-size: 0.95rem;
  font-weight: 700;
}

.hub-link p {
  color: var(--text-secondary);
  font-size: 0.82rem;
  line-height: 1.5;
  margin-top: 0.35rem;
}

.hub-link:hover {
  background: rgba(255, 215, 0, 0.1);
  transform: translateY(-2px);
}

@media (max-width: 640px) {
  .hub-grid {
    grid-template-columns: 1fr;
  }
}
</style>
```

- [ ] **Step 2: Run build**

Run:

```bash
cd frontend
npm run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/NavigationHubSection.vue
git commit -m "Add lightweight navigation hub"
```

### Task 6: Rename Experience Section ID to Work

**Files:**
- Modify: `frontend/src/components/ExperienceSection.vue`

- [ ] **Step 1: Update section identity**

In `ExperienceSection.vue`, change:

```vue
id="experience"
:class="{ active: activeSection === 'experience' }"
```

to:

```vue
id="work"
:class="{ active: activeSection === 'work' }"
```

- [ ] **Step 2: Keep data name stable**

Leave `t.experience.items` unchanged in the template. This keeps the content migration small while the navigation label becomes `Work`.

- [ ] **Step 3: Run build**

Run:

```bash
cd frontend
npm run build
```

Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/components/ExperienceSection.vue
git commit -m "Expose experience section as work"
```

### Task 7: Build Shelf and Moments Sections

**Files:**
- Create: `frontend/src/components/ShelfSection.vue`
- Create: `frontend/src/components/MomentsSection.vue`

- [ ] **Step 1: Create Shelf section**

Create `frontend/src/components/ShelfSection.vue`:

```vue
<template>
  <section
    id="shelf"
    class="content-section"
    :class="{ active: activeSection === 'shelf' }"
  >
    <h3 class="section-title">{{ t.shelf.title }}</h3>
    <p class="section-intro">{{ t.shelf.intro }}</p>
    <div class="shelf-grid">
      <article v-for="group in t.shelf.groups" :key="group.title" class="shelf-card">
        <h4>{{ group.title }}</h4>
        <ul>
          <li v-for="item in group.items" :key="item">{{ item }}</li>
        </ul>
      </article>
    </div>
  </section>
</template>

<script setup>
import { usePortfolioStore } from '@/stores/portfolio'
import { storeToRefs } from 'pinia'

const store = usePortfolioStore()
const { t, activeSection } = storeToRefs(store)
</script>

<style scoped>
.content-section {
  margin-bottom: 5rem;
  opacity: 0.72;
  transition: opacity var(--transition-base);
}

.content-section.active {
  opacity: 1;
}

.section-title {
  color: var(--text-primary);
  font-size: 1.4rem;
  margin-bottom: 0.6rem;
}

.section-intro {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.65;
  margin-bottom: 1.2rem;
}

.shelf-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem;
}

.shelf-card {
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 1rem;
  background: rgba(196, 160, 255, 0.06);
}

.shelf-card h4 {
  color: var(--text-primary);
  font-size: 1rem;
  margin-bottom: 0.75rem;
}

.shelf-card ul {
  color: var(--text-secondary);
  line-height: 1.65;
  margin-left: 1rem;
  font-size: 0.9rem;
}

@media (max-width: 640px) {
  .shelf-grid {
    grid-template-columns: 1fr;
  }
}
</style>
```

- [ ] **Step 2: Create Moments section**

Create `frontend/src/components/MomentsSection.vue`:

```vue
<template>
  <section
    id="moments"
    class="content-section"
    :class="{ active: activeSection === 'moments' }"
  >
    <h3 class="section-title">{{ t.moments.title }}</h3>
    <p class="section-intro">{{ t.moments.intro }}</p>
    <div class="moments-list">
      <span v-for="item in t.moments.items" :key="item" class="moment-pill">{{ item }}</span>
    </div>
  </section>
</template>

<script setup>
import { usePortfolioStore } from '@/stores/portfolio'
import { storeToRefs } from 'pinia'

const store = usePortfolioStore()
const { t, activeSection } = storeToRefs(store)
</script>

<style scoped>
.content-section {
  margin-bottom: 5rem;
  opacity: 0.72;
  transition: opacity var(--transition-base);
}

.content-section.active {
  opacity: 1;
}

.section-title {
  color: var(--text-primary);
  font-size: 1.4rem;
  margin-bottom: 0.6rem;
}

.section-intro {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.65;
  margin-bottom: 1.2rem;
}

.moments-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}

.moment-pill {
  border: 1px solid var(--border-color);
  border-radius: 999px;
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.04);
  padding: 0.45rem 0.85rem;
  font-size: 0.84rem;
}
</style>
```

- [ ] **Step 3: Run build**

Run:

```bash
cd frontend
npm run build
```

Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/components/ShelfSection.vue frontend/src/components/MomentsSection.vue
git commit -m "Add taste shelf and moments sections"
```

### Task 8: Reorder Right Panel Sections

**Files:**
- Modify: `frontend/src/components/RightPanel.vue`

- [ ] **Step 1: Replace imports**

In `RightPanel.vue`, use:

```js
import IdentitySection from './IdentitySection.vue'
import JourneySection from './JourneySection.vue'
import NavigationHubSection from './NavigationHubSection.vue'
import ExperienceSection from './ExperienceSection.vue'
import ProjectsSection from './ProjectsSection.vue'
import ShelfSection from './ShelfSection.vue'
import MomentsSection from './MomentsSection.vue'
```

- [ ] **Step 2: Replace template order**

Use:

```vue
<template>
  <div class="right-panel">
    <IdentitySection />
    <JourneySection />
    <NavigationHubSection />
    <ExperienceSection />
    <ProjectsSection />
    <ShelfSection />
    <MomentsSection />
  </div>
</template>
```

- [ ] **Step 3: Run build**

Run:

```bash
cd frontend
npm run build
```

Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/components/RightPanel.vue
git commit -m "Reorder homepage around identity"
```

### Task 9: Polish Left Panel and Mobile Navigation

**Files:**
- Modify: `frontend/src/components/IntroSection.vue`
- Modify: `frontend/src/components/ScrollspyNav.vue`
- Modify: `frontend/src/components/LeftPanel.vue`
- Modify: `frontend/src/assets/styles/main.css`

- [ ] **Step 1: Update intro copy usage**

Keep `IntroSection.vue` structurally similar, but ensure the `t.description` copy in `portfolio.js` is personal and not too recruiter-heavy. Use this English copy:

```js
description: "Welcome to Yuniverse: a small map of where I am, what I build, and the taste that keeps me moving."
```

Use this Chinese copy:

```js
description: "欢迎来到 Yuniverse：这里记录我现在的位置、正在构建的东西，以及让我保持流动的 taste。"
```

- [ ] **Step 2: Keep desktop nav visible and readable**

In `ScrollspyNav.vue`, keep the existing line-and-label pattern. Confirm that each label renders from `t.nav[sectionId]` and does not rely on hidden icons.

- [ ] **Step 3: Add mobile nav visibility**

In `ScrollspyNav.vue`, replace the mobile rule:

```css
@media (max-width: 1024px) {
  .scrollspy-nav {
    display: none;
  }
}
```

with:

```css
@media (max-width: 1024px) {
  .scrollspy-nav {
    display: flex;
    gap: 0.75rem;
    overflow-x: auto;
    margin: 1.5rem 0 0;
    padding-bottom: 0.25rem;
  }

  .nav-item {
    flex: 0 0 auto;
    padding: 0.45rem 0;
  }

  .nav-line {
    display: none;
  }

  .nav-text {
    border: 1px solid var(--border-color);
    border-radius: 999px;
    padding: 0.45rem 0.75rem;
    background: rgba(255, 255, 255, 0.04);
  }

  .nav-item.active .nav-text,
  .nav-item:hover .nav-text {
    color: var(--bg-primary);
    background: var(--primary-color);
    border-color: var(--primary-color);
  }
}
```

- [ ] **Step 4: Run build**

Run:

```bash
cd frontend
npm run build
```

Expected: Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/IntroSection.vue frontend/src/components/ScrollspyNav.vue frontend/src/components/LeftPanel.vue frontend/src/assets/styles/main.css frontend/src/data/portfolio.js
git commit -m "Polish identity panel navigation"
```

### Task 10: Final Visual QA for Static Deployment

**Files:**
- Modify only if QA reveals layout bugs.

- [ ] **Step 1: Build production assets**

Run:

```bash
cd frontend
npm run build
```

Expected: `dist` is generated successfully.

- [ ] **Step 2: Start local preview**

Run:

```bash
cd frontend
npm run preview
```

Expected: Vite prints a local preview URL.

- [ ] **Step 3: Manual desktop QA**

Open the preview URL at desktop width and verify:

```text
Left panel shows name, intro, social links, resume access, and navigation.
Right panel order is Identity, Journey, Navigate, Work, Projects, Shelf, Moments.
Work and Projects are reachable from the nav and navigation hub.
The first screen feels personal and not work-heavy.
Text does not overlap.
```

- [ ] **Step 4: Manual mobile QA**

Open the preview URL at mobile width and verify:

```text
The left panel stacks cleanly above content.
Navigation remains visible as horizontal pills.
The language toggle does not cover important text.
Section cards do not overflow the viewport.
Resume and contact remain easy to find.
```

- [ ] **Step 5: Commit final fixes**

If QA required edits, commit them:

```bash
git add frontend/src
git commit -m "Fix responsive Yuniverse homepage polish"
```

If QA required no edits, do not create an empty commit.

## Self-Review

- Spec coverage: The plan covers frontend-only deployment, identity-first content, clear navigation, work/project access, shelf, moments, mobile navigation, and visual QA.
- Scope control: The plan does not introduce backend APIs, CMS, database integration, blog functionality, full gallery, or project case-study pages.
- Type consistency: Section IDs are consistently `identity`, `journey`, `hub`, `work`, `projects`, `shelf`, and `moments`.
- Deployment fit: Verification relies on `npm run build` and `npm run preview`, matching Vite and Vercel static deployment.
