import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Centralized WhatsApp configuration
export const WHATSAPP_NUMBER = "5511925332215"
export const WHATSAPP_DISPLAY = "(11) 92533-2215"

/**
 * Generates a WhatsApp link with optional pre-filled message
 * @param message - Optional message to pre-fill in the chat
 * @returns WhatsApp URL with wa.me format
 */
export function getWhatsAppUrl(message?: string): string {
  const baseUrl = `https://wa.me/${WHATSAPP_NUMBER}`
  if (message) {
    return `${baseUrl}?text=${encodeURIComponent(message)}`
  }
  return baseUrl
}

/**
 * Generates a tel: link for phone calls
 * @returns Phone link with tel: protocol
 */
export function getPhoneUrl(): string {
  return `tel:+${WHATSAPP_NUMBER}`
}
