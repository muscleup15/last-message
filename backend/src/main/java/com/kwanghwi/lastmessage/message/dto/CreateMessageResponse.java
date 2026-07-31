package com.kwanghwi.lastmessage.message.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateMessageResponse {

    private Long messageId;
    private String content;
    private LocalDateTime createdAt;
}
