package com.kwanghwi.lastmessage.message.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CreateMessageRequest {

    private String senderPhone;
    private String receiverPhone;
    private String content;

}
