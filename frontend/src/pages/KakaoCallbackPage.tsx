import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { loginWithKakao } from '../api/auth'
import { toApiError } from '../api/errors'
import { InlineError } from '../components/feedback/InlineError'
import { Button } from '../components/ui/Button'
import { setAccessToken } from '../utils/authToken'

export function KakaoCallbackPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const kakaoError = searchParams.get('error')
    const code = searchParams.get('code')

    if (kakaoError || !code) {
      setError('카카오 로그인이 취소되었거나 실패했습니다.')
      return
    }

    let cancelled = false

    async function completeLogin() {
      try {
        const accessToken = await loginWithKakao(code as string)
        if (cancelled) return
        setAccessToken(accessToken)
        navigate('/', { replace: true })
      } catch (err) {
        if (cancelled) return
        setError(toApiError(err).message)
      }
    }

    void completeLogin()
    return () => {
      cancelled = true
    }
  }, [navigate, searchParams])

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center px-[var(--space-page)]">
      <div className="flex w-full max-w-[18rem] flex-col items-center text-center">
        {error ? (
          <>
            <InlineError message={error} />
            <div className="mt-6 w-full">
              <Button type="button" variant="primary" onClick={() => navigate('/', { replace: true })}>
                처음으로
              </Button>
            </div>
          </>
        ) : (
          <p
            className="m-0 text-[var(--text-muted)]"
            style={{ fontSize: 'var(--font-size-caption)' }}
          >
            카카오 로그인 중…
          </p>
        )}
      </div>
    </div>
  )
}
