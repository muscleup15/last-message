package com.kwanghwi.lastmessage.message.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CreateMessageRequest {

    @NotBlank(message = "받는 사람 전화번호를 입력해주세요.")
    @Pattern(
            regexp = "^\\d{11}$",
            message = "전화번호는 숫자 11자리여야 합니다."
    )
    private String receiverPhone;

    @NotBlank(message = "메시지를 입력해주세요.")
    @Size(max = 1000, message = "메시지는 1000자 이하로 입력해주세요.")
    private String content;
}
