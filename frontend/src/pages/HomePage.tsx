import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { sendOtp, verifyOtp } from '../api/auth'
import { toApiError } from '../api/errors'
import { HomeStage } from '../components/home/HomeStage'
import { InlineError } from '../components/feedback/InlineError'
import { Button } from '../components/ui/Button'
import { TextField } from '../components/ui/TextField'
import { clearAccessToken, hasAccessToken, setAccessToken } from '../utils/authToken'
import { digitsOnly, isPhone11 } from '../utils/phone'

type AuthPhase = 'phone' | 'code' | 'sending' | 'verifying'

export function HomePage() {
  const navigate = useNavigate()
  const [authenticated, setAuthenticated] = useState(() => hasAccessToken())
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [phase, setPhase] = useState<AuthPhase>('phone')
  const [error, setError] = useState<string | null>(null)

  const codeVisible = phase === 'code' || phase === 'verifying'
  const busy = phase === 'sending' || phase === 'verifying'

  async function handleSendOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (busy) return

    if (!isPhone11(phone)) {
      setError('전화번호는 숫자 11자리여야 합니다.')
      return
    }

    setError(null)
    setPhase('sending')

    try {
      await sendOtp(phone)
      setCode('')
      setPhase('code')
    } catch (err) {
      setError(toApiError(err).message)
      setPhase('phone')
    }
  }

  async function handleVerifyOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (busy) return

    if (!/^\d{6}$/.test(code)) {
      setError('인증번호는 숫자 6자리여야 합니다.')
      return
    }

    setError(null)
    setPhase('verifying')

    try {
      const accessToken = await verifyOtp(phone, code)
      setAccessToken(accessToken)
      setAuthenticated(true)
    } catch (err) {
      setError(toApiError(err).message)
      setPhase('code')
    }
  }

  function handleLogout() {
    clearAccessToken()
    setAuthenticated(false)
    setPhone('')
    setCode('')
    setPhase('phone')
    setError(null)
  }

  if (authenticated) {
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
            <Button type="button" variant="ghost" onClick={handleLogout}>
              로그아웃
            </Button>
          </>
        }
      />
    )
  }

  return (
    <HomeStage
      actions={
        <div className="flex w-full flex-col gap-6 text-left">
          <form className="flex flex-col gap-4" onSubmit={handleSendOtp} noValidate>
            <TextField
              name="phone"
              label="전화번호"
              placeholder="01012345678"
              inputMode="numeric"
              autoComplete="tel-national"
              maxLength={11}
              value={phone}
              disabled={busy}
              onChange={(event) => {
                setPhone(digitsOnly(event.target.value, 11))
                setError(null)
              }}
              hint="숫자 11자리"
            />
            {!codeVisible ? (
              <Button type="submit" variant="primary" disabled={busy}>
                {phase === 'sending' ? '보내는 중…' : '전화번호 인증하기'}
              </Button>
            ) : (
              <Button
                type="submit"
                variant="ghost"
                disabled={busy}
              >
                {phase === 'sending' ? '재발송 중…' : '인증번호 다시 받기'}
              </Button>
            )}
          </form>

          {codeVisible ? (
            <form className="flex flex-col gap-4" onSubmit={handleVerifyOtp} noValidate>
              <TextField
                name="code"
                label="인증번호"
                placeholder="123456"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={code}
                disabled={busy}
                onChange={(event) => {
                  setCode(digitsOnly(event.target.value, 6))
                  setError(null)
                }}
                hint="숫자 6자리 · 3분 안에 입력"
              />
              <Button type="submit" variant="primary" disabled={busy}>
                {phase === 'verifying' ? '확인 중…' : '인증하기'}
              </Button>
            </form>
          ) : null}

          {error ? <InlineError message={error} /> : null}
        </div>
      }
    />
  )
}
