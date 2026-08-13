package com.kwanghwi.lastmessage.auth.kakao;

import com.kwanghwi.lastmessage.common.exception.KakaoAuthException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Component
public class KakaoOAuthClient {

    private final WebClient webClient;
    private final String clientId;
    private final String clientSecret;

    public KakaoOAuthClient(
            @Value("${app.kakao.client-id}") String clientId,
            @Value("${app.kakao.client-secret:}") String clientSecret
    ) {
        this.webClient = WebClient.create();
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }

    public Mono<Long> getKakaoId(String code, String redirectUri) {
        return fetchAccessToken(code, redirectUri)
                .flatMap(this::fetchKakaoId);
    }

    private Mono<String> fetchAccessToken(String code, String redirectUri) {
        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("grant_type", "authorization_code");
        form.add("client_id", clientId);
        form.add("redirect_uri", redirectUri);
        form.add("code", code);
        if (clientSecret != null && !clientSecret.isBlank()) {
            form.add("client_secret", clientSecret);
        }

        return webClient.post()
                .uri("https://kauth.kakao.com/oauth/token")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(BodyInserters.fromFormData(form))
                .retrieve()
                .bodyToMono(KakaoTokenResponse.class)
                .map(KakaoTokenResponse::getAccessToken)
                .filter(token -> token != null && !token.isBlank())
                .switchIfEmpty(Mono.error(new KakaoAuthException()))
                .onErrorMap(error -> error instanceof KakaoAuthException ? error : new KakaoAuthException());
    }

    private Mono<Long> fetchKakaoId(String accessToken) {
        return webClient.get()
                .uri("https://kapi.kakao.com/v2/user/me")
                .headers(headers -> headers.setBearerAuth(accessToken))
                .retrieve()
                .bodyToMono(KakaoUserResponse.class)
                .mapNotNull(KakaoUserResponse::getId)
                .switchIfEmpty(Mono.error(new KakaoAuthException()))
                .onErrorMap(error -> error instanceof KakaoAuthException ? error : new KakaoAuthException());
    }
}
