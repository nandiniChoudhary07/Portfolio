import { social } from '../data/portfolio'
import { whatsappHref } from '../lib/content'
import { WhatsAppIcon } from './ui/Icons'

/**
 * Floating "chat" button shown on every page. The footer leaves extra space
 * at the bottom on phones so this never sits on top of its links.
 */
export function WhatsAppButton() {
  if (!social.whatsapp) return null

  return (
    <a
      href={whatsappHref(social.whatsapp, social.whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex size-14 items-center justify-center rounded-full bg-emerald-600 text-[1.75rem] text-white shadow-[0_12px_30px_-8px_rgb(5_150_105/0.7)] transition-[background-color,transform] duration-200 hover:scale-105 hover:bg-emerald-700 active:scale-95 sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon />
    </a>
  )
}
