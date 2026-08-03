import type { MessageItem } from '../../types/message'
import { MessageListItem } from './MessageListItem'

type MessageListProps = {
  messages: MessageItem[]
  selectedId?: number | null
  onSelect: (messageId: number) => void
}

export function MessageList({ messages, selectedId = null, onSelect }: MessageListProps) {
  return (
    <ul className="m-0 flex list-none flex-col p-0" aria-label="받은 메시지 목록">
      {messages.map((message) => (
        <MessageListItem
          key={message.messageId}
          message={message}
          selected={message.messageId === selectedId}
          onSelect={onSelect}
        />
      ))}
    </ul>
  )
}
