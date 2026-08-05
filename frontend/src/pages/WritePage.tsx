import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { createMessage } from '../api/messages'
import { toApiError } from '../api/errors'
import { InlineError } from '../components/feedback/InlineError'
import { Button } from '../components/ui/Button'
import { Sheet } from '../components/ui/Sheet'
import { TextArea } from '../components/ui/TextArea'
import { TextField } from '../components/ui/TextField'
import { digitsOnly, isPhone11 } from '../utils/phone'

const CONTENT_MAX = 500

type WritePhase = 'form' | 'submitting' | 'sent'

export function WritePage() {
  const navigate = useNavigate()
  const [receiverPhone, setReceiverPhone] = useState('')
  const [senderPhone, setSenderPhone] = useState('')
  const [content, setContent] = useState('')
  const [phase, setPhase] = useState<WritePhase>('form')
  const [error, setError] = useState<string | null>(null)

  const busy = phase === 'submitting'

  function handleClose() {
    navigate('/')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (phase !== 'form') return

    if (!isPhone11(receiverPhone) || !isPhone11(senderPhone)) {
      setError('전화번호는 숫자 11자리여야 합니다.')
      return
    }

    const trimmed = content.trim()
    if (!trimmed) {
      setError('메시지를 입력해주세요.')
      return
    }

    setError(null)
    setPhase('submitting')

    try {
      await createMessage({
        senderPhone,
        receiverPhone,
        content: trimmed,
      })
      setPhase('sent')
    } catch (err) {
      setError(toApiError(err).message)
      setPhase('form')
    }
  }

  return (
    <Sheet ariaLabel="별 보내기" onClose={handleClose}>
      {phase === 'sent' ? (
        <div className="flex min-h-[18rem] flex-col items-center justify-center py-10 text-center">
          <p
            className="m-0 text-[var(--star)]"
            style={{
              fontSize: 'clamp(1.125rem, 2cqi + 0.9rem, 1.375rem)',
              lineHeight: 1.6,
              animation: 'brand-rise var(--duration-enter) var(--ease-out-soft) both',
            }}
          >
            당신의 메시지가
            <br />
            밤하늘을 향해 떠났습니다
          </p>
          <div
            className="mt-10 flex w-full max-w-[18rem] flex-col gap-3"
            style={{
              animation: 'brand-rise var(--duration-enter) var(--ease-out-soft) 120ms both',
            }}
          >
            <Button type="button" variant="primary" onClick={handleClose}>
              처음으로
            </Button>
            <Button to="/inbox" variant="ghost">
              별 받기
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative mx-auto flex w-full flex-col pb-2">
          <header className="pb-6 text-left">
            <h1
              className="m-0 font-medium text-[var(--star)]"
              style={{
                fontSize: 'clamp(1.25rem, 2cqi + 1rem, 1.5rem)',
                letterSpacing: 'var(--tracking-brand)',
              }}
            >
              별 보내기
            </h1>
            <p
              className="mt-2 m-0 text-[var(--text-muted)]"
              style={{
                fontSize: 'var(--font-size-caption)',
                lineHeight: 'var(--line-height-body)',
              }}
            >
              언젠가 닿을 말을 남겨 주세요.
            </p>
          </header>

          <form
            className="flex flex-col gap-8"
            onSubmit={handleSubmit}
            noValidate
            style={{
              pointerEvents: busy ? 'none' : undefined,
              opacity: busy ? 0.7 : 1,
            }}
          >
            <TextField
              name="receiverPhone"
              label="받는 사람 전화번호"
              placeholder="01012345678"
              inputMode="numeric"
              autoComplete="tel-national"
              maxLength={11}
              value={receiverPhone}
              onChange={(event) => {
                setReceiverPhone(digitsOnly(event.target.value, 11))
                setError(null)
              }}
              hint="숫자 11자리"
            />

            <TextField
              name="senderPhone"
              label="보내는 사람 전화번호"
              placeholder="01012345678"
              inputMode="numeric"
              autoComplete="tel-national"
              maxLength={11}
              value={senderPhone}
              onChange={(event) => {
                setSenderPhone(digitsOnly(event.target.value, 11))
                setError(null)
              }}
              hint="숫자 11자리"
            />

            <TextArea
              name="content"
              label="메시지"
              placeholder="전하고 싶은 말을 적어 주세요."
              maxLength={CONTENT_MAX}
              rows={5}
              value={content}
              onChange={(event) => {
                setContent(event.target.value.slice(0, CONTENT_MAX))
                setError(null)
              }}
              hint={`${content.length} / ${CONTENT_MAX}`}
            />

            {error ? <InlineError message={error} /> : null}

            <div className="pt-2">
              <Button type="submit" variant="primary" disabled={busy}>
                {phase === 'submitting' ? '보내는 중…' : '보내기'}
              </Button>
            </div>
          </form>
        </div>
      )}
    </Sheet>
  )
}
