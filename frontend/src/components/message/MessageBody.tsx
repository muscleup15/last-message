import type { MessageItem, MessageStatus } from '../../types/message'

type MessageBodyProps = {
  message: MessageItem
}

function statusLabel(status: MessageStatus): string {
  if (status === 'CREATED') return '미열람'
  if (status === 'OPENED') return '열람함'
  return '삭제됨'
}

function formatDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function MessageBody({ message }: MessageBodyProps) {
  return (
    <article className="pt-6 text-left" aria-label="메시지 내용">
      <div
        className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[var(--text-muted)]"
        style={{ fontSize: '0.8125rem' }}
      >
        <time dateTime={message.createdAt}>{formatDate(message.createdAt)}</time>
        <span aria-hidden>·</span>
        <span
          className={
            message.status === 'CREATED' ? 'text-[var(--unread)]' : undefined
          }
        >
          {statusLabel(message.status)}
        </span>
      </div>

      <p className="message-body mt-4 mb-0 whitespace-pre-wrap">{message.content}</p>
    </article>
  )
}
