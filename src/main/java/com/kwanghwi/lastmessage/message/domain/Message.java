package com.kwanghwi.lastmessage.message.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table("messages")
public class Message {

    @Id
    private Long id;

    private String senderPhone;

    private String receiverPhone;

    private String content;

    private MessageStatus status;

    private LocalDateTime createdAt;

    private LocalDateTime openedAt;
}
