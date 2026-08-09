package com.kwanghwi.lastmessage.common.security;

import reactor.core.publisher.Mono;

public final class AuthContext {

    public static final String PHONE_KEY = "auth.phone";

    private AuthContext() {
    }

    public static Mono<String> currentPhone() {
        return Mono.deferContextual(ctx -> {
            if (!ctx.hasKey(PHONE_KEY)) {
                return Mono.error(new UnauthorizedException("인증이 필요합니다."));
            }
            return Mono.just(ctx.get(PHONE_KEY));
        });
    }
}
