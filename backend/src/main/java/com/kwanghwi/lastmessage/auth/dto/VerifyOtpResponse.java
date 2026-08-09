package com.kwanghwi.lastmessage.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class VerifyOtpResponse {

    private final boolean verified;
    private final String phone;
}
