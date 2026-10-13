import type { FormEvent } from 'react'
import { social } from '../../data/portfolio'
import { isSet, whatsappHref } from '../../lib/content'
import { MailIcon, WhatsAppIcon } from './Icons'

/** Shared look for text inputs, selects and textareas. */
export const fieldClass =
  'mt-1.5 w-full rounded-xl border border-border bg-bg px-3.5 py-2.5 text-[0.95rem] text-fg placeholder:text-fg-subtle transition-colors hover:border-fg/25'

/** True when the site has a WhatsApp number or email to send a form to. */
export const canSend = !!social.whatsapp || isSet(social.email)

/**
 * The site has no backend, so forms don't post anywhere. This opens WhatsApp or the
 * visitor's email app with `text` already written, depending on which button was pressed.
 */
export function sendMessage(event: FormEvent<HTMLFormElement>, subject: string, text: string) {
  event.preventDefault()
  const via = (event.nativeEvent as SubmitEvent).submitter?.getAttribute('value')

  if (via === 'email') {
    window.location.href = `mailto:${social.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`
  } else {
    window.open(whatsappHref(social.whatsapp, text), '_blank', 'noopener')
  }
}

/** "Send on WhatsApp" and "Send by email" submit buttons, with a line explaining what happens. */
export function SendButtons({ note }: { note: string }) {
  return (
    <>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        {social.whatsapp && (
          <button
            type="submit"
            value="whatsapp"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-accent-fg shadow-sm transition-colors hover:bg-accent/90 active:scale-[0.98]"
          >
            <WhatsAppIcon />
            Send on WhatsApp
          </button>
        )}
        {isSet(social.email) && (
          <button
            type="submit"
            value="email"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-surface px-5 text-sm font-medium transition-colors hover:border-fg/25 hover:bg-muted active:scale-[0.98]"
          >
            <MailIcon />
            Send by email
          </button>
        )}
      </div>
      <p className="mt-3 text-xs leading-relaxed text-fg-subtle">{note}</p>
    </>
  )
}
