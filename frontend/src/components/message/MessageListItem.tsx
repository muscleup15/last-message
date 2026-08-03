import type { MessageItem, MessageStatus } from '../../types/message'

type MessageListItemProps = {
  message: MessageItem
  selected?: boolean
  onSelect: (messageId: number) => void
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
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

function preview(content: string): string {
  const normalized = content.replace(/\s+/g, ' ').trim()
  if (normalized.length <= 48) return normalized
  return `${normalized.slice(0, 48)}…`
}

export function MessageListItem({ message, selected = false, onSelect }: MessageListItemProps) {
  const unread = message.status === 'CREATED'

  return (
    <li className="list-none">
      <button
        type="button"
        onClick={() => onSelect(message.messageId)}
        className={[
          'touch-target flex w-full items-start gap-3 border-0 bg-transparent px-0 py-4 text-left',
          'border-b border-[var(--border)]',
          'transition-colors duration-200',
          selected ? 'bg-[var(--accent-soft)]' : 'hover:bg-[var(--accent-soft)]/60',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]',
        ].join(' ')}
      >
        <span
          className="mt-2 inline-flex h-2 w-2 shrink-0 items-center justify-center"
          aria-hidden={!unread}
        >
          {unread ? (
            <span
              className="block h-1.5 w-1.5 rounded-full bg-[var(--unread)]"
              style={{ boxShadow: '0 0 6px rgba(201, 184, 150, 0.45)' }}
              title="미열람"
            />
          ) : null}
        </span>

        <span className="min-w-0 flex-1">
          <span
            className="block text-[var(--text-primary)]"
            style={{
              fontSize: 'var(--font-size-body)',
              lineHeight: 'var(--line-height-body)',
              wordBreak: 'keep-all',
            }}
          >
            {preview(message.content)}
          </span>
          <span
            className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[var(--text-muted)]"
            style={{ fontSize: '0.8125rem' }}
          >
            <span>{formatDate(message.createdAt)}</span>
            <span aria-hidden>·</span>
            <span className={unread ? 'text-[var(--unread)]' : undefined}>
              {statusLabel(message.status)}
            </span>
          </span>
        </span>
      </button>
    </li>
  )
}
