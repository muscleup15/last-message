import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { sendOtp, verifyOtp } from '../api/auth'
import { toApiError } from '../api/errors'
import { HomeStage } from '../components/home/HomeStage'
import { InlineError } from '../components/feedback/InlineError'
import { Button } from '../components/ui/Button'
import { TextField } from '../components/ui/TextField'
import { hasAccessToken, setAccessToken } from '../utils/authToken'
import { digitsOnly, isPhone11 } from '../utils/phone'

type AuthPhase = 'phone' | 'code' | 'sending' | 'verifying'

const OTP_TTL_MS = 3 * 60 * 1000

function formatCountdown(remainingMs: number): string {
  const totalSeconds = Math.max(0, Math.ceil(remainingMs / 1000))
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export function HomePage() {
  const navigate = useNavigate()
  const [authenticated, setAuthenticated] = useState(() => hasAccessToken())
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [phase, setPhase] = useState<AuthPhase>('phone')
  const [error, setError] = useState<string | null>(null)
  const [expiresAt, setExpiresAt] = useState<number | null>(null)
  const [remainingMs, setRemainingMs] = useState(0)

  const codeVisible = phase === 'code' || phase === 'verifying'
  const busy = phase === 'sending' || phase === 'verifying'
  const expired = codeVisible && expiresAt !== null && remainingMs <= 0

  useEffect(() => {
    if (expiresAt === null) {
      setRemainingMs(0)
      return
    }

    const tick = () => {
      setRemainingMs(Math.max(0, expiresAt - Date.now()))
    }

    tick()
    const id = window.setInterval(tick, 250)
    return () => window.clearInterval(id)
  }, [expiresAt])

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
      setExpiresAt(Date.now() + OTP_TTL_MS)
      setPhase('code')
    } catch (err) {
      setError(toApiError(err).message)
      setExpiresAt(null)
      setPhase('phone')
    }
  }

  async function handleVerifyOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (busy || expired) return

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
            />
            {!codeVisible ? (
              <Button type="submit" variant="primary" disabled={busy}>
                {phase === 'sending' ? '보내는 중…' : '전화번호 인증하기'}
              </Button>
            ) : (
              <Button type="submit" variant="ghost" disabled={busy}>
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
                disabled={busy || expired}
                onChange={(event) => {
                  setCode(digitsOnly(event.target.value, 6))
                  setError(null)
                }}
                hint={formatCountdown(remainingMs)}
              />
              <Button type="submit" variant="primary" disabled={busy || expired}>
                {phase === 'verifying' ? '확인 중…' : '인증하기'}
              </Button>
            </form>
          ) : null}

          {error ? <InlineError message={error} /> : null}
          {expired && !error ? (
            <InlineError message="인증 시간이 만료되었습니다. 다시 받아 주세요." />
          ) : null}
        </div>
      }
    />
  )
}
