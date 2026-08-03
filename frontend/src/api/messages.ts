import type {
  CreateMessageRequest,
  CreateMessageResponse,
  MessageItem,
} from '../types/message'
import { apiClient } from './client'
import { toApiError } from './errors'

export async function createMessage(
  request: CreateMessageRequest,
): Promise<CreateMessageResponse> {
  try {
    const { data } = await apiClient.post<CreateMessageResponse>('/messages', request)
    return data
  } catch (error) {
    throw toApiError(error)
  }
}

export async function getMessagesByReceiverPhone(
  receiverPhone: string,
): Promise<MessageItem[]> {
  try {
    const { data } = await apiClient.get<MessageItem[]>('/messages', {
      params: { receiverPhone },
    })
    return data
  } catch (error) {
    throw toApiError(error)
  }
}

export async function openMessage(messageId: number): Promise<MessageItem> {
  try {
    const { data } = await apiClient.patch<MessageItem>(`/messages/${messageId}/open`)
    return data
  } catch (error) {
    throw toApiError(error)
  }
}
