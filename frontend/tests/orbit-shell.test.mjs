import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { portfolioData } from '../src/data/portfolio.js'

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8')

test('app shell is a full-screen routed orbit interface without left column layout', () => {
  const app = read('../src/App.vue')

  assert.match(app, /<RouterView/)
  assert.doesNotMatch(app, /LeftPanel|RightPanel|CommandDeck|MissionStatus/)
  assert.match(app, /class="site-shell"/)
})

test('home view is an orbit entrance with sparse copy', () => {
  const home = read('../src/views/HomeView.vue')

  assert.match(home, /orbit-stage/)
  assert.match(home, /archive-node/)
  assert.doesNotMatch(home, /NavigationHubSection/)
})

test('page metadata stays short enough for user-owned writing later', () => {
  for (const lang of ['en', 'zh']) {
    for (const page of portfolioData[lang].sitePages) {
      assert.ok(page.description.length <= 48, `${lang} ${page.path} description is too long`)
    }
  }
})
