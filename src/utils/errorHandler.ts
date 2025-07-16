import type { APIError } from '@/types'

export function createAPIError(
  message: string,
  status: number,
  code: string,
): APIError {
  const error = new Error(message) as APIError
  ;(error as any).status = status
  ;(error as any).code = code
  return error
}

export function isNetworkError(error: unknown): boolean {
  return error instanceof TypeError && error.message.includes('fetch')
}

export function logError(error: APIError, context?: string): void {
  const logMessage = context ? `[${context}] ${error.message}` : error.message
  console.error(logMessage, {
    status: error.status,
    code: error.code,
  })
}
