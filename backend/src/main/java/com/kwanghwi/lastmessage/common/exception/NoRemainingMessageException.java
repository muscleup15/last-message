package com.kwanghwi.lastmessage.common.exception;

public class NoRemainingMessageException extends RuntimeException {

    public NoRemainingMessageException() {
        super("남은 메시지 전송 횟수가 없습니다.");
    }
}
