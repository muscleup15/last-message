package com.kwanghwi.lastmessage.auth.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class KakaoLoginRequest {

    @NotBlank(message = "인가 코드가 필요합니다.")
    private String code;

    @NotBlank(message = "redirectUri가 필요합니다.")
    private String redirectUri;
}
