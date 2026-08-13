import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { loginWithKakao } from '../api/auth'
import { toApiError } from '../api/errors'
import { HomeStage } from '../components/home/HomeStage'
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

  if (error) {
    return (
      <HomeStage
        actions={
          <div className="flex w-full flex-col gap-4">
            <InlineError message={error} />
            <Button type="button" variant="primary" onClick={() => navigate('/', { replace: true })}>
              처음으로
            </Button>
          </div>
        }
      />
    )
  }

  return (
    <HomeStage
      actions={
        <p
          className="m-0 text-center text-[var(--text-muted)]"
          style={{ fontSize: 'var(--font-size-caption)' }}
        >
          카카오 로그인 중…
        </p>
      }
    />
  )
}
