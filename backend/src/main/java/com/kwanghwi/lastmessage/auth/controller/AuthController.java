package com.kwanghwi.lastmessage.auth.controller;

import com.kwanghwi.lastmessage.auth.dto.MeResponse;
import com.kwanghwi.lastmessage.auth.dto.SendOtpRequest;
import com.kwanghwi.lastmessage.auth.dto.TokenResponse;
import com.kwanghwi.lastmessage.auth.dto.VerifyOtpRequest;
import com.kwanghwi.lastmessage.auth.service.AuthService;
import com.kwanghwi.lastmessage.common.security.AuthContext;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/otp")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Mono<Void> sendOtp(@Valid @RequestBody SendOtpRequest request) {
        return authService.sendOtp(request.getPhone());
    }

    @PostMapping("/otp/verify")
    public Mono<TokenResponse> verifyOtp(@Valid @RequestBody VerifyOtpRequest request) {
        return authService.verifyOtp(request.getPhone(), request.getCode());
    }

    @GetMapping("/me")
    public Mono<MeResponse> me() {
        return AuthContext.currentPhone().map(MeResponse::new);
    }
}
