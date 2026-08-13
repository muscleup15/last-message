package com.kwanghwi.lastmessage.common.exception;

public class PhoneNotRegisteredException extends RuntimeException {

    public PhoneNotRegisteredException() {
        super("전화번호 등록 후 이용할 수 있습니다.");
    }
}
