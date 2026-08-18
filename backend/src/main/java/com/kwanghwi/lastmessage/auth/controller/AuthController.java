package com.kwanghwi.lastmessage.auth.controller;

import com.kwanghwi.lastmessage.auth.dto.KakaoLoginRequest;
import com.kwanghwi.lastmessage.auth.dto.MeResponse;
import com.kwanghwi.lastmessage.auth.dto.RegisterPhoneRequest;
import com.kwanghwi.lastmessage.auth.dto.TokenResponse;
import com.kwanghwi.lastmessage.auth.service.AuthService;
import com.kwanghwi.lastmessage.common.security.AuthContext;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/kakao")
    public Mono<TokenResponse> loginWithKakao(@Valid @RequestBody KakaoLoginRequest request) {
        return authService.loginWithKakao(request.getCode(), request.getRedirectUri());
    }

    @GetMapping("/me")
    public Mono<MeResponse> me() {
        return AuthContext.currentUserId().flatMap(authService::getMe);
    }

    @PostMapping("/phone")
    public Mono<MeResponse> registerPhone(@Valid @RequestBody RegisterPhoneRequest request) {
        return AuthContext.currentUserId()
                .flatMap(userId -> authService.registerPhone(userId, request.getPhone()));
    }
}
