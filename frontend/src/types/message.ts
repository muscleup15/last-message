export type MessageStatus = 'CREATED' | 'OPENED' | 'DELETED'

/** GET /messages, PATCH /messages/{id}/open */
export type MessageItem = {
  messageId: number
  content: string
  createdAt: string
  status: MessageStatus
}

/** POST /messages request */
export type CreateMessageRequest = {
  senderPhone: string
  receiverPhone: string
  content: string
}

/** POST /messages response */
export type CreateMessageResponse = {
  messageId: number
  content: string
  createdAt: string
}

/** Backend ErrorResponse (404 등) */
export type ApiErrorBody = {
  code: string
  message: string
}
