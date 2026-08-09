import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMyMessages, openMessage } from '../api/messages'
import { toApiError } from '../api/errors'
import { EmptyState } from '../components/feedback/EmptyState'
import { InlineError } from '../components/feedback/InlineError'
import { MessageBody } from '../components/message/MessageBody'
import { MessageList } from '../components/message/MessageList'
import { Sheet } from '../components/ui/Sheet'
import type { MessageItem } from '../types/message'
import { hasAccessToken } from '../utils/authToken'

type ViewState = 'loading' | 'empty' | 'list' | 'error' | 'unauthenticated'

export function InboxPage() {
  const navigate = useNavigate()
  const [viewState, setViewState] = useState<ViewState>('loading')
  const [messages, setMessages] = useState<MessageItem[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [openingId, setOpeningId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [openError, setOpenError] = useState<string | null>(null)

  const selectedMessage = useMemo(
    () => messages.find((message) => message.messageId === selectedId) ?? null,
    [messages, selectedId],
  )

  useEffect(() => {
    let cancelled = false

    async function load() {
      if (!hasAccessToken()) {
        setViewState('unauthenticated')
        setError('전화번호 인증 후 이용할 수 있습니다.')
        return
      }

      setViewState('loading')
      setError(null)
      setOpenError(null)
      setSelectedId(null)

      try {
        const nextMessages = await getMyMessages()
        if (cancelled) return
        setMessages(nextMessages)
        setViewState(nextMessages.length > 0 ? 'list' : 'empty')
      } catch (err) {
        if (cancelled) return
        setMessages([])
        setError(toApiError(err).message)
        setViewState('error')
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [])

  function handleClose() {
    navigate('/')
  }

  async function handleSelect(messageId: number) {
    if (openingId !== null) return

    const target = messages.find((message) => message.messageId === messageId)
    if (!target) return

    setOpenError(null)
    setSelectedId(messageId)

    if (target.status !== 'CREATED') {
      return
    }

    setOpeningId(messageId)

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
      setOpeningId(null)
    }
  }

  const showBody =
    selectedMessage !== null &&
    openingId === null &&
    selectedMessage.status === 'OPENED'

  return (
    <Sheet ariaLabel="별 받기" onClose={handleClose}>
      <div className="relative mx-auto flex w-full flex-col pb-2">
        <header className="pb-6 text-left">
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

        {error ? <InlineError message={error} /> : null}

        <section className="mt-8 flex flex-col" aria-live="polite">
          {viewState === 'unauthenticated' ? (
            <EmptyState
              className="py-8"
              message="전화번호 인증 후 받은 별을 확인할 수 있습니다"
            />
          ) : null}

          {viewState === 'loading' ? (
            <EmptyState className="py-8" message="별을 찾는 중…" />
          ) : null}

          {viewState === 'empty' ? (
            <EmptyState className="py-8" message="아직 도착한 메시지가 없습니다" />
          ) : null}

          {viewState === 'error' ? (
            <EmptyState className="py-8" message="메시지를 불러오지 못했습니다" />
          ) : null}

          {viewState === 'list' ? (
            <>
              <MessageList
                messages={messages}
                selectedId={selectedId}
                onSelect={handleSelect}
              />
              {openingId !== null ? (
                <EmptyState className="py-6" message="메시지를 여는 중…" />
              ) : null}
              {openError ? (
                <InlineError className="py-4 text-center" message={openError} />
              ) : null}
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
              {openingId === null && !selectedMessage && !openError ? (
                <EmptyState
                  className="py-6"
                  message="메시지를 선택하면 내용을 볼 수 있습니다"
                />
              ) : null}
            </>
          ) : null}
        </section>
      </div>
    </Sheet>
  )
}
