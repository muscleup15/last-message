import axios from 'axios'
import type { ApiErrorBody } from '../types/message'

export class ApiError extends Error {
  readonly status?: number
  readonly code?: string

  constructor(message: string, options?: { status?: number; code?: string }) {
    super(message)
    this.name = 'ApiError'
    this.status = options?.status
    this.code = options?.code
  }
}

export function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error
  }

  if (axios.isAxiosError(error)) {
    const status = error.response?.status
    const data = error.response?.data as ApiErrorBody | undefined

    if (data?.message) {
      return new ApiError(data.message, { status, code: data.code })
    }

    if (status === 401) {
      return new ApiError(data?.message ?? '인증에 실패했습니다.', {
        status,
        code: data?.code,
      })
    }

    if (status === 400) {
      return new ApiError('입력값을 다시 확인해 주세요.', { status })
    }

    if (status === 404) {
      return new ApiError('요청한 메시지를 찾을 수 없습니다.', { status, code: 'MESSAGE_NOT_FOUND' })
    }

    if (!error.response) {
      return new ApiError('서버에 연결할 수 없습니다. 잠시 후 다시 시도해 주세요.')
    }

    return new ApiError('요청 중 오류가 발생했습니다.', { status })
  }

  if (error instanceof Error) {
    return new ApiError(error.message)
  }

  return new ApiError('알 수 없는 오류가 발생했습니다.')
}
