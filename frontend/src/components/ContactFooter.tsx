import { useSiteContent } from '../content/useSiteContent'

export function ContactFooter() {
  const { contactItems, ui } = useSiteContent()
  return (
    <footer className="site-footer" aria-label={ui.contact.aria}>
      <div className="site-footer-heading">
        <p className="section-kicker">{ui.contact.kicker}</p>
        <h2>{ui.contact.title}</h2>
      </div>
      <dl className="footer-contact-list">
        {contactItems.map((item) => (
          <div key={item.id}>
            <dt>{item.label}</dt>
            <dd>
              {item.href ? (
                <a
                  href={item.href}
                  rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                >
                  {item.value}
                </a>
              ) : (
                item.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </footer>
  )
}
