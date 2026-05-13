import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('static assets', () => {
  it('uses the 宇 mark as the site favicon', () => {
    const indexHtml = readFileSync(join(process.cwd(), 'index.html'), 'utf8')

    expect(indexHtml).toContain('rel="icon" type="image/png" href="/favicon.png"')
    expect(existsSync(join(process.cwd(), 'public/favicon.png'))).toBe(true)
  })
})
