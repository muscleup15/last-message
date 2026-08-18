package com.kwanghwi.lastmessage.common.exception;


import com.kwanghwi.lastmessage.common.security.UnauthorizedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MessageNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleMessageNotFound(MessageNotFoundException e){
        ErrorResponse response = new ErrorResponse(
                "MESSAGE_NOT_FOUND",
                e.getMessage());

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    @ExceptionHandler(InvalidOtpException.class)
    public ResponseEntity<ErrorResponse> handleInvalidOtp(InvalidOtpException e) {
        ErrorResponse response = new ErrorResponse(
                "INVALID_OTP",
                e.getMessage());

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ErrorResponse> handleUnauthorized(UnauthorizedException e) {
        ErrorResponse response = new ErrorResponse(
                "UNAUTHORIZED",
                e.getMessage());

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    @ExceptionHandler(NoRemainingMessageException.class)
    public ResponseEntity<ErrorResponse> handleNoRemainingMessage(NoRemainingMessageException e) {
        ErrorResponse response = new ErrorResponse(
                "NO_REMAINING_MESSAGE",
                e.getMessage());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(KakaoAuthException.class)
    public ResponseEntity<ErrorResponse> handleKakaoAuth(KakaoAuthException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ErrorResponse("KAKAO_AUTH_FAILED", e.getMessage()));
    }

    @ExceptionHandler(PhoneNotRegisteredException.class)
    public ResponseEntity<ErrorResponse> handlePhoneNotRegistered(PhoneNotRegisteredException e) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(new ErrorResponse("PHONE_NOT_REGISTERED", e.getMessage()));
    }

    @ExceptionHandler(PhoneAlreadyRegisteredException.class)
    public ResponseEntity<ErrorResponse> handlePhoneAlreadyRegistered(PhoneAlreadyRegisteredException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(new ErrorResponse("PHONE_ALREADY_REGISTERED", e.getMessage()));
    }

    @ExceptionHandler(PhoneAlreadyInUseException.class)
    public ResponseEntity<ErrorResponse> handlePhoneAlreadyInUse(PhoneAlreadyInUseException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(new ErrorResponse("PHONE_ALREADY_IN_USE", e.getMessage()));
    }
}
