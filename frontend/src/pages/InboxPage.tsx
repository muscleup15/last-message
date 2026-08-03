import { useMemo, useState, type FormEvent } from 'react'
import { getMessagesByReceiverPhone, openMessage } from '../api/messages'
import { toApiError } from '../api/errors'
import { EmptyState } from '../components/feedback/EmptyState'
import { InlineError } from '../components/feedback/InlineError'
import { MessageBody } from '../components/message/MessageBody'
import { MessageList } from '../components/message/MessageList'
import { ArrivalReveal } from '../components/motion/ArrivalReveal'
import { Button } from '../components/ui/Button'
import { TextField } from '../components/ui/TextField'
import type { MessageItem } from '../types/message'
import { digitsOnly, isPhone11 } from '../utils/phone'

type ViewState = 'idle' | 'loading' | 'empty' | 'list' | 'error'

export function InboxPage() {
  const [receiverPhone, setReceiverPhone] = useState('')
  const [viewState, setViewState] = useState<ViewState>('idle')
  const [messages, setMessages] = useState<MessageItem[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [arrivingId, setArrivingId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [openError, setOpenError] = useState<string | null>(null)

  const selectedMessage = useMemo(
    () => messages.find((message) => message.messageId === selectedId) ?? null,
    [messages, selectedId],
  )

  async function handleLookup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (viewState === 'loading' || arrivingId !== null) return

    if (!isPhone11(receiverPhone)) {
      setError('전화번호는 숫자 11자리여야 합니다.')
      setViewState('idle')
      return
    }

    setError(null)
    setOpenError(null)
    setSelectedId(null)
    setArrivingId(null)
    setViewState('loading')

    try {
      const nextMessages = await getMessagesByReceiverPhone(receiverPhone)
      setMessages(nextMessages)
      setViewState(nextMessages.length > 0 ? 'list' : 'empty')
    } catch (err) {
      setMessages([])
      setError(toApiError(err).message)
      setViewState('error')
    }
  }

  function handleSelect(messageId: number) {
    if (arrivingId !== null) return

    const target = messages.find((message) => message.messageId === messageId)
    if (!target) return

    setOpenError(null)
    setSelectedId(messageId)

    if (target.status === 'CREATED') {
      setArrivingId(messageId)
      return
    }

    setArrivingId(null)
  }

  async function handleArrivalComplete() {
    if (arrivingId === null) return

    const messageId = arrivingId

    try {
      const opened = await openMessage(messageId)
      setMessages((prev) =>
        prev.map((message) =>
          message.messageId === messageId ? opened : message,
        ),
      )
    } catch (err) {
      setOpenError(toApiError(err).message)
    } finally {
      setArrivingId(null)
    }
  }

  const showBody =
    selectedMessage !== null &&
    arrivingId === null &&
    selectedMessage.status === 'OPENED'

  return (
    <div
      className="relative mx-auto flex w-full flex-1 flex-col"
      style={{ maxWidth: 'min(100%, 30rem)' }}
    >
      <header className="pt-2 pb-8 text-left">
        <h1
          className="m-0 font-medium text-[var(--star)]"
          style={{
            fontSize: 'clamp(1.25rem, 2cqi + 1rem, 1.5rem)',
            letterSpacing: 'var(--tracking-brand)',
          }}
        >
          별 받기
        </h1>
        <p
          className="mt-2 m-0 text-[var(--text-muted)]"
          style={{
            fontSize: 'var(--font-size-caption)',
            lineHeight: 'var(--line-height-body)',
          }}
        >
          내 번호로 도착한 메시지를 열어보세요.
        </p>
      </header>

      <form className="flex flex-col gap-6" onSubmit={handleLookup} noValidate>
        <TextField
          name="receiverPhone"
          label="내 전화번호"
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
        {error && viewState !== 'list' ? <InlineError message={error} /> : null}
        <Button type="submit" variant="primary" disabled={viewState === 'loading'}>
          {viewState === 'loading' ? '조회 중…' : '조회'}
        </Button>
      </form>

      <section className="mt-10 flex flex-1 flex-col" aria-live="polite">
        {viewState === 'idle' ? (
          <EmptyState
            className="py-10"
            message="받은 메시지를 확인하려면 번호를 입력하세요"
          />
        ) : null}

        {viewState === 'loading' ? (
          <EmptyState className="py-10" message="별을 찾는 중…" />
        ) : null}

        {viewState === 'empty' ? (
          <EmptyState className="py-10" message="아직 도착한 메시지가 없습니다" />
        ) : null}

        {viewState === 'error' ? (
          <EmptyState className="py-10" message="메시지를 불러오지 못했습니다" />
        ) : null}

        {viewState === 'list' ? (
          <>
            <MessageList
              messages={messages}
              selectedId={selectedId}
              onSelect={handleSelect}
            />
            {arrivingId !== null ? (
              <EmptyState className="py-8" message="별이 당신에게로 오고 있습니다" />
            ) : null}
            {openError ? <InlineError className="py-4 text-center" message={openError} /> : null}
            {showBody && selectedMessage ? (
              <>
                <div className="mt-2 border-t border-[var(--border)]" />
                <div
                  style={{
                    animation: 'brand-rise 500ms var(--ease-out-soft) both',
                  }}
                >
                  <MessageBody message={selectedMessage} />
                </div>
              </>
            ) : null}
            {arrivingId === null && !selectedMessage && !openError ? (
              <EmptyState
                className="py-8"
                message="메시지를 선택하면 내용을 볼 수 있습니다"
              />
            ) : null}
          </>
        ) : null}
      </section>

      {arrivingId !== null ? (
        <ArrivalReveal variant="full" onComplete={() => void handleArrivalComplete()} />
      ) : null}
    </div>
  )
}
