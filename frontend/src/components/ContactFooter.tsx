import { contactItems } from '../content/siteContent'

export function ContactFooter() {
  return (
    <footer className="site-footer" aria-label="Contact">
      <div className="site-footer-heading">
        <p className="section-kicker">Contact</p>
        <h2>Say hello.</h2>
      </div>
      <dl className="footer-contact-list">
        {contactItems.map((item) => (
          <div key={item.label}>
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
