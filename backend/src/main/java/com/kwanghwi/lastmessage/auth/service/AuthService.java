package com.kwanghwi.lastmessage.auth.service;

import com.kwanghwi.lastmessage.auth.dto.MeResponse;
import com.kwanghwi.lastmessage.auth.dto.TokenResponse;
import com.kwanghwi.lastmessage.auth.kakao.KakaoOAuthClient;
import com.kwanghwi.lastmessage.common.exception.KakaoAuthException;
import com.kwanghwi.lastmessage.common.security.JwtProvider;
import com.kwanghwi.lastmessage.user.service.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class AuthService {

    private final KakaoOAuthClient kakaoOAuthClient;
    private final UserService userService;
    private final JwtProvider jwtProvider;
    private final String kakaoRedirectUri;

    public AuthService(
            KakaoOAuthClient kakaoOAuthClient,
            UserService userService,
            JwtProvider jwtProvider,
            @Value("${app.kakao.redirect-uri}") String kakaoRedirectUri
    ) {
        this.kakaoOAuthClient = kakaoOAuthClient;
        this.userService = userService;
        this.jwtProvider = jwtProvider;
        this.kakaoRedirectUri = kakaoRedirectUri;
    }

    public Mono<TokenResponse> loginWithKakao(String code, String redirectUri) {
        if (!kakaoRedirectUri.equals(redirectUri)) {
            return Mono.error(new KakaoAuthException());
        }

        return kakaoOAuthClient.getKakaoId(code, redirectUri)
                .flatMap(userService::findOrCreateByKakaoId)
                .map(user -> new TokenResponse(jwtProvider.createToken(user.getId())));
    }

    public Mono<MeResponse> getMe(Long userId) {
        return userService.findById(userId).map(MeResponse::from);
    }

    public Mono<MeResponse> registerPhone(Long userId, String phone) {
        return userService.registerPhone(userId, phone).map(MeResponse::from);
    }
}
