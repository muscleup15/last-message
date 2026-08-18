import { apiClient } from './client'
import { toApiError } from './errors'

export type TokenResponse = {
  accessToken: string
}

export type MeResponse = {
  userId: number
  phone: string | null
  phoneRegistered: boolean
}

export function getKakaoRedirectUri(): string {
  return `${window.location.origin}/oauth/kakao`
}

export function getKakaoAuthorizeUrl(): string {
  const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID
  if (!clientId) {
    throw new Error('카카오 로그인 설정이 없습니다.')
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: getKakaoRedirectUri(),
    response_type: 'code',
  })
  return `https://kauth.kakao.com/oauth/authorize?${params.toString()}`
}

export async function loginWithKakao(code: string): Promise<string> {
  try {
    const { data } = await apiClient.post<TokenResponse>('/auth/kakao', {
      code,
      redirectUri: getKakaoRedirectUri(),
    })
    return data.accessToken
  } catch (error) {
    throw toApiError(error)
  }
}

export async function getMe(): Promise<MeResponse> {
  try {
    const { data } = await apiClient.get<MeResponse>('/auth/me')
    return data
  } catch (error) {
    throw toApiError(error)
  }
}

export async function registerPhone(phone: string): Promise<MeResponse> {
  try {
    const { data } = await apiClient.post<MeResponse>('/auth/phone', { phone })
    return data
  } catch (error) {
    throw toApiError(error)
  }
}
