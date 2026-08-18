package com.kwanghwi.lastmessage.auth.redis;

import org.springframework.data.redis.core.ReactiveRedisTemplate;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

import java.time.Duration;

@Repository
public class OtpRedisRepository {

    private static final String KEY_PREFIX = "otp:";
    private static final Duration TTL = Duration.ofMinutes(3);

    private final ReactiveRedisTemplate<String, String> reactiveRedisTemplate;

    public OtpRedisRepository(ReactiveRedisTemplate<String, String> reactiveRedisTemplate) {
        this.reactiveRedisTemplate = reactiveRedisTemplate;
    }

    public Mono<Boolean> save(String phone, String code) {
        return reactiveRedisTemplate.opsForValue()
                .set(key(phone), code, TTL);
    }

    public Mono<String> find(String phone) {
        return reactiveRedisTemplate.opsForValue().get(key(phone));
    }

    public Mono<Boolean> delete(String phone) {
        return reactiveRedisTemplate.delete(key(phone)).map(count -> count > 0);
    }

    private String key(String phone) {
        return KEY_PREFIX + phone;
    }
}
