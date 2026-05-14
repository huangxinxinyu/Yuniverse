import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('deployment routing', () => {
  it('rewrites direct SPA paths to the app shell on Vercel', () => {
    const config = JSON.parse(readFileSync('vercel.json', 'utf8'))

    expect(config.rewrites).toContainEqual({
      source: '/(.*)',
      destination: '/index.html',
    })
  })
})
