const visitorStorageKey = 'yuniverse:visitor-id'
let ephemeralVisitorId: string | null = null

export function getVisitorId() {
  let generatedVisitorId: string | null = null

  try {
    const savedVisitorId = window.localStorage.getItem(visitorStorageKey)

    if (savedVisitorId) {
      return savedVisitorId
    }

    generatedVisitorId = window.crypto.randomUUID()
    window.localStorage.setItem(visitorStorageKey, generatedVisitorId)
    return generatedVisitorId
  } catch {
    ephemeralVisitorId ??= generatedVisitorId ?? window.crypto.randomUUID()
    return ephemeralVisitorId
  }
}
