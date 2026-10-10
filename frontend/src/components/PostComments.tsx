import { useEffect, useState, type FormEvent } from 'react'
import { useSiteContent } from '../content/useSiteContent'
import { htmlLang, type Locale } from '../i18n/locale'
import { commentPersona } from '../lib/commentPersona'
import { getVisitorId } from '../lib/visitorId'

type PostComment = {
  body: string
  createdAt: string
  id: string
  persona: number
}

type CommentsStatus = 'loading' | 'ready' | 'unavailable'

type SubmitError = 'closed' | 'failed' | 'rateLimited'

type PostCommentsProps = {
  slug: string
}

const personaStorageKey = 'yuniverse:comment-persona'
// Set this in the browser console to show delete buttons:
// localStorage.setItem('yuniverse:comments-admin-token', '<COMMENTS_ADMIN_TOKEN>')
const adminTokenStorageKey = 'yuniverse:comments-admin-token'

function readStorage(key: string) {
  try {
    return window.localStorage.getItem(key) ?? ''
  } catch {
    return ''
  }
}

function writeStorage(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    // The remembered persona is only a convenience.
  }
}

function readStoredPersona() {
  const value = Number.parseInt(readStorage(personaStorageKey), 10)

  return Number.isFinite(value) ? value : null
}

function PersonaBadge({ locale, seed }: { locale: Locale, seed: number }) {
  const persona = commentPersona(seed, locale)

  return (
    <>
      <span
        aria-hidden="true"
        className="post-comment-avatar"
        style={{ backgroundColor: persona.color }}
      >
        {persona.emoji}
      </span>
      <span className="post-comment-name">{persona.name}</span>
    </>
  )
}

function commentsUrl(slug: string) {
  return `/api/post-comments?slug=${encodeURIComponent(slug)}`
}

export function PostComments({ slug }: PostCommentsProps) {
  const { locale, ui } = useSiteContent()
  const [comments, setComments] = useState<PostComment[]>([])
  const [status, setStatus] = useState<CommentsStatus>('loading')
  const [ownPersona, setOwnPersona] = useState(readStoredPersona)
  const [body, setBody] = useState('')
  const [website, setWebsite] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<SubmitError | null>(null)
  const [adminToken] = useState(() => readStorage(adminTokenStorageKey))
  const dateFormatter = new Intl.DateTimeFormat(htmlLang[locale], {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  useEffect(() => {
    const controller = new AbortController()

    fetch(commentsUrl(slug), { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Comments request failed with ${response.status}`)
        }

        const data = await response.json() as { comments: PostComment[] }
        setComments(data.comments)
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting || !body.trim()) {
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch(commentsUrl(slug), {
        body: JSON.stringify({ body, visitorId: getVisitorId(), website }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })

      if (response.status === 429) {
        setSubmitError('rateLimited')
        return
      }

      if (response.status === 409) {
        setSubmitError('closed')
        return
      }

      if (!response.ok) {
        throw new Error(`Comment request failed with ${response.status}`)
      }

      const data = await response.json() as { comment: PostComment }
      setComments((current) => [...current, data.comment])
      setBody('')
      setOwnPersona(data.comment.persona)
      writeStorage(personaStorageKey, String(data.comment.persona))
    } catch {
      setSubmitError('failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${commentsUrl(slug)}&id=${encodeURIComponent(id)}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
        method: 'DELETE',
      })

      if (response.ok || response.status === 404) {
        setComments((current) => current.filter((comment) => comment.id !== id))
      }
    } catch {
      // Leave the comment in place so the delete can be retried.
    }
  }

  return (
    <section
      aria-labelledby="post-comments-heading"
      className="post-comments"
      data-status={status}
    >
      <h3 id="post-comments-heading">{ui.comments.heading(comments.length)}</h3>

      {status === 'loading' ? (
        <p className="post-comments-note">{ui.comments.loading}</p>
      ) : null}
      {status === 'unavailable' ? (
        <p className="post-comments-note">{ui.comments.unavailable}</p>
      ) : null}
      {status === 'ready' && comments.length === 0 ? (
        <p className="post-comments-note">{ui.comments.empty}</p>
      ) : null}

      {comments.length > 0 ? (
        <ol className="post-comment-list">
          {comments.map((comment) => (
            <li className="post-comment" key={comment.id}>
              <p className="post-comment-meta">
                <PersonaBadge locale={locale} seed={comment.persona} />
                <time dateTime={comment.createdAt}>
                  {dateFormatter.format(new Date(comment.createdAt))}
                </time>
                {adminToken ? (
                  <button
                    className="post-comment-delete"
                    onClick={() => handleDelete(comment.id)}
                    type="button"
                  >
                    {ui.comments.delete}
                  </button>
                ) : null}
              </p>
              <p className="post-comment-body">{comment.body}</p>
            </li>
          ))}
        </ol>
      ) : null}

      {status === 'ready' ? (
        <form className="post-comment-form" onSubmit={handleSubmit}>
          <p className="post-comment-meta">
            {ownPersona === null ? (
              ui.comments.anonymousHint
            ) : (
              <>
                <span>{ui.comments.yourPersona}</span>
                <PersonaBadge locale={locale} seed={ownPersona} />
              </>
            )}
          </p>
          <label className="post-comment-field">
            <span>{ui.comments.bodyLabel}</span>
            <textarea
              maxLength={1000}
              onChange={(event) => setBody(event.target.value)}
              placeholder={ui.comments.bodyPlaceholder}
              required
              rows={4}
              value={body}
            />
          </label>
          <label aria-hidden="true" className="post-comment-honeypot">
            Website
            <input
              autoComplete="off"
              onChange={(event) => setWebsite(event.target.value)}
              tabIndex={-1}
              type="text"
              value={website}
            />
          </label>
          <div className="post-comment-actions">
            <button
              className="post-comment-submit"
              disabled={isSubmitting || !body.trim()}
              type="submit"
            >
              {isSubmitting ? ui.comments.submitting : ui.comments.submit}
            </button>
            {submitError ? (
              <p className="post-comment-error" role="alert">
                {ui.comments[submitError]}
              </p>
            ) : null}
          </div>
        </form>
      ) : null}
    </section>
  )
}
