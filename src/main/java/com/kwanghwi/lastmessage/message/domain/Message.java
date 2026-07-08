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
    Long id;

    String senderPhone;

    String receiverPhone;

    String content;

    MessageStatus status;

    LocalDateTime createdAt;

    LocalDateTime openedAt;
}
