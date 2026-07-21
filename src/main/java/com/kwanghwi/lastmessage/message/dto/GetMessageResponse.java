package com.kwanghwi.lastmessage.message.dto;


import com.kwanghwi.lastmessage.message.domain.MessageStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class GetMessageResponse {
    Long messageId;
    String content;
    LocalDateTime createdAt;
    MessageStatus status;
}
