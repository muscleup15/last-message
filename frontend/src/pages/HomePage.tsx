import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { getKakaoAuthorizeUrl, getMe, registerPhone } from '../api/auth'
import { toApiError } from '../api/errors'
import { HomeStage } from '../components/home/HomeStage'
import { InlineError } from '../components/feedback/InlineError'
import { Button } from '../components/ui/Button'
import { TextField } from '../components/ui/TextField'
import { clearAccessToken, hasAccessToken } from '../utils/authToken'
import { digitsOnly, isPhone11 } from '../utils/phone'

type Screen = 'loading' | 'guest' | 'register' | 'ready'

export function HomePage() {
  const navigate = useNavigate()
  const [screen, setScreen] = useState<Screen>('loading')
  const [phone, setPhone] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function resolveSession() {
      if (!hasAccessToken()) {
        setScreen('guest')
        return
      }

      try {
        const me = await getMe()
        if (cancelled) return
        setScreen(me.phoneRegistered ? 'ready' : 'register')
      } catch {
        if (cancelled) return
        clearAccessToken()
        setScreen('guest')
      }
    }

    void resolveSession()
    return () => {
      cancelled = true
    }
  }, [])

  function handleKakaoLogin() {
    try {
      window.location.href = getKakaoAuthorizeUrl()
    } catch (err) {
      setError(err instanceof Error ? err.message : '카카오 로그인에 실패했습니다.')
    }
  }

  async function handleRegisterPhone(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting) return

    if (!isPhone11(phone)) {
      setError('전화번호는 숫자 11자리여야 합니다.')
      return
    }

    setError(null)
    setSubmitting(true)

    try {
      const me = await registerPhone(phone)
      if (me.phoneRegistered) {
        setScreen('ready')
      }
    } catch (err) {
      setError(toApiError(err).message)
    } finally {
      setSubmitting(false)
    }
  }

  if (screen === 'loading') {
    return (
      <HomeStage
        actions={
          <p
            className="m-0 text-center text-[var(--text-muted)]"
            style={{ fontSize: 'var(--font-size-caption)' }}
          >
            잠시만요
          </p>
        }
      />
    )
  }

  if (screen === 'ready') {
    return (
      <HomeStage
        actions={
          <>
            <Button type="button" variant="primary" onClick={() => navigate('/write')}>
              별 보내기
            </Button>
            <Button type="button" variant="ghost" onClick={() => navigate('/inbox')}>
              별 받기
            </Button>
          </>
        }
      />
    )
  }

  if (screen === 'guest') {
    return (
      <HomeStage
        actions={
          <div className="flex w-full flex-col gap-4">
            <Button type="button" variant="primary" onClick={handleKakaoLogin}>
              카카오로 시작하기
            </Button>
            {error ? <InlineError message={error} /> : null}
          </div>
        }
      />
    )
  }

  return (
    <HomeStage
      actions={
        <div className="flex w-full flex-col gap-6 text-left">
          <form className="flex flex-col gap-4" onSubmit={handleRegisterPhone} noValidate>
            <TextField
              name="phone"
              label="내 전화번호"
              placeholder="01012345678"
              inputMode="numeric"
              autoComplete="tel-national"
              maxLength={11}
              value={phone}
              disabled={submitting}
              onChange={(event) => {
                setPhone(digitsOnly(event.target.value, 11))
                setError(null)
              }}
            />
            <p
              className="m-0 text-[var(--text-muted)]"
              style={{
                fontSize: 'var(--font-size-caption)',
                lineHeight: 1.7,
              }}
            >
              전화번호는 최초 입력 후 변경할 수 없습니다. 메시지 수신에 사용되는 번호이니 신중하게 입력해주세요.
            </p>
            {error ? <InlineError message={error} /> : null}
            <Button type="submit" variant="primary" disabled={submitting}>
              {submitting ? '등록 중…' : '전화번호 등록하기'}
            </Button>
          </form>
        </div>
      }
    />
  )
}
