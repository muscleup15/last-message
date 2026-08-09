package com.kwanghwi.lastmessage.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SendOtpRequest {

    @NotBlank(message = "전화번호를 입력해주세요.")
    @Pattern(regexp = "^\\d{11}$", message = "전화번호는 숫자 11자리여야 합니다.")
    private String phone;
}
