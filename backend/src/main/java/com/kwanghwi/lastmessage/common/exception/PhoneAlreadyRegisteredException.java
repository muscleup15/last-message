package com.kwanghwi.lastmessage.common.exception;

public class PhoneAlreadyRegisteredException extends RuntimeException {

    public PhoneAlreadyRegisteredException() {
        super("이미 등록된 전화번호가 있습니다.");
    }
}
