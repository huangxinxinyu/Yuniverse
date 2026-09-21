import { useEffect, useState } from 'react'

type PostMetricCounts = {
  liked: boolean
  likes: number
  views: number
}

type MetricsStatus = 'loading' | 'ready' | 'unavailable'

type PostMetricsProps = {
  slug: string
}

const visitorStorageKey = 'yuniverse:visitor-id'
let ephemeralVisitorId: string | null = null

function getVisitorId() {
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

async function updateMetrics(
  slug: string,
  action: 'toggle-like' | 'view',
  visitorId: string,
  signal?: AbortSignal,
) {
  const response = await fetch(`/api/post-metrics?slug=${encodeURIComponent(slug)}`, {
    body: JSON.stringify({ action, visitorId }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    signal,
  })

  if (!response.ok) {
    throw new Error(`Post metrics request failed with ${response.status}`)
  }

  return response.json() as Promise<PostMetricCounts>
}

export function PostMetrics({ slug }: PostMetricsProps) {
  const [metrics, setMetrics] = useState<PostMetricCounts | null>(null)
  const [status, setStatus] = useState<MetricsStatus>('loading')
  const [isUpdatingLike, setIsUpdatingLike] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    updateMetrics(slug, 'view', getVisitorId(), controller.signal)
      .then((nextMetrics) => {
        setMetrics(nextMetrics)
        setStatus('ready')
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }

        setStatus('unavailable')
      })

    return () => controller.abort()
  }, [slug])

  const handleLikeClick = async () => {
    if (!metrics || isUpdatingLike) {
      return
    }

    setIsUpdatingLike(true)

    try {
      setMetrics(await updateMetrics(slug, 'toggle-like', getVisitorId()))
    } catch {
      // Keep the last confirmed counts and let the reader try again.
    } finally {
      setIsUpdatingLike(false)
    }
  }

  return (
    <div
      aria-label="Post engagement"
      aria-live="polite"
      className="post-metrics"
      data-status={status}
      role="group"
    >
      <span className="post-metric post-view-count">
        <span aria-hidden="true">◉</span>
        {metrics ? `${metrics.views.toLocaleString('en-US')} views` : '— views'}
      </span>
      <button
        aria-label={metrics?.liked ? 'Unlike this post' : 'Like this post'}
        aria-pressed={metrics?.liked ?? false}
        className="post-metric post-like-button"
        disabled={status !== 'ready' || isUpdatingLike}
        onClick={handleLikeClick}
        type="button"
      >
        <span aria-hidden="true">♥</span>
        <span>{metrics ? `${metrics.likes.toLocaleString('en-US')} likes` : '— likes'}</span>
      </button>
    </div>
  )
}
