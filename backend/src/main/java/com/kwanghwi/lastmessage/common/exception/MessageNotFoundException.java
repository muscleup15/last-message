package com.kwanghwi.lastmessage.common.exception;

public class MessageNotFoundException extends RuntimeException{
    public MessageNotFoundException(Long messageId) {
        super("Message not found: " + messageId);
    }
}
