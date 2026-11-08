import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** "/products/" → "/products" (static export uses trailing slashes); "/" stays "/". */
export function normalizePath(path: string) {
  return path.length > 1 ? path.replace(/\/+$/, '') : path
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
