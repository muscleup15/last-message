package com.kwanghwi.lastmessage.common.security;

import reactor.core.publisher.Mono;

public final class AuthContext {

    public static final String USER_ID_KEY = "auth.userId";

    private AuthContext() {
    }

    public static Mono<Long> currentUserId() {
        return Mono.deferContextual(ctx -> {
            if (!ctx.hasKey(USER_ID_KEY)) {
                return Mono.error(new UnauthorizedException("인증이 필요합니다."));
            }
            return Mono.just(ctx.get(USER_ID_KEY));
        });
    }
}
