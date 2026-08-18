package com.kwanghwi.lastmessage.message.controller;

import org.springframework.data.redis.core.ReactiveRedisTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.time.Duration;

@RestController
public class hello {

    private final ReactiveRedisTemplate<String, String> reactiveRedisTemplate;

    public hello(ReactiveRedisTemplate<String, String> reactiveRedisTemplate) {
        this.reactiveRedisTemplate = reactiveRedisTemplate;
    }

    @GetMapping("/hello")
    public Mono<String> hello() {
        String key = "health:redis";
        return reactiveRedisTemplate.opsForValue()
                .set(key, "ok", Duration.ofSeconds(10))
                .then(reactiveRedisTemplate.opsForValue().get(key))
                .map(value -> "hello webflux, redis=" + value)
                .onErrorReturn("hello webflux, redis=fail");
    }
}
