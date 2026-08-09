import { apiClient } from './client'
import { toApiError } from './errors'

export type TokenResponse = {
  accessToken: string
}

export async function sendOtp(phone: string): Promise<void> {
  try {
    await apiClient.post('/auth/otp', { phone })
  } catch (error) {
    throw toApiError(error)
  }
}

export async function verifyOtp(phone: string, code: string): Promise<string> {
  try {
    const { data } = await apiClient.post<TokenResponse>('/auth/otp/verify', {
      phone,
      code,
    })
    return data.accessToken
  } catch (error) {
    throw toApiError(error)
  }
}
