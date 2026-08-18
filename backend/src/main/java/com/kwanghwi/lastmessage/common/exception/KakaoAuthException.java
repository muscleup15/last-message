package com.kwanghwi.lastmessage.common.exception;

public class KakaoAuthException extends RuntimeException {

    public KakaoAuthException() {
        super("카카오 로그인에 실패했습니다.");
    }
}
