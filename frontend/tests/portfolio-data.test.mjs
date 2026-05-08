import test from 'node:test'
import assert from 'node:assert/strict'
import { portfolioData } from '../src/data/portfolio.js'
import { routes } from '../src/router/routes.js'

const expectedSections = ['identity', 'journey', 'hub', 'work', 'projects', 'blog', 'shelf', 'moments']

for (const lang of ['en', 'zh']) {
  test(`${lang} portfolio data exposes the identity-first site map`, () => {
    const data = portfolioData[lang]

    assert.deepEqual(data.sectionOrder, expectedSections)

    for (const sectionId of expectedSections) {
      assert.equal(typeof data.nav[sectionId], 'string')
      assert.ok(data.nav[sectionId].length > 0)
    }

    assert.equal(data.identity.cards.length, 4)
    assert.equal(data.journey.items.length, 4)
    assert.ok(data.blog.entries.length >= 3)
    assert.ok(data.blog.filters.length >= 3)
    assert.equal(data.shelf.groups.length, 2)
    assert.ok(data.moments.items.length >= 4)
  })

  test(`${lang} navigation hub links only to known sections or local actions`, () => {
    const data = portfolioData[lang]

    for (const item of data.hub.items) {
      if (item.target) {
        assert.ok(expectedSections.includes(item.target), `${item.label} targets ${item.target}`)
      } else if (item.path) {
        assert.ok(routes.some((route) => route.path === item.path), `${item.label} links to ${item.path}`)
      } else {
        assert.match(item.href, /^(\/|mailto:|https?:\/\/)/)
      }
    }
  })
}

test('site exposes a multi-page exploration structure', () => {
  const paths = routes.map((route) => route.path)

  assert.deepEqual(paths, ['/', '/journey', '/work', '/blog', '/collection'])

  for (const lang of ['en', 'zh']) {
    const pages = portfolioData[lang].sitePages
    assert.deepEqual(pages.map((page) => page.path), paths)
    assert.ok(pages.every((page) => page.title && page.description))
  }
})
