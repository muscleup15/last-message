package com.kwanghwi.lastmessage.common.exception;

public class PhoneAlreadyInUseException extends RuntimeException {

    public PhoneAlreadyInUseException() {
        super("이미 다른 계정에 등록된 전화번호입니다.");
    }
}
