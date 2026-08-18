package com.kwanghwi.lastmessage.common.exception;

public class InvalidOtpException extends RuntimeException {

    public InvalidOtpException() {
        super("인증번호가 올바르지 않거나 만료되었습니다.");
    }
}
