package com.kwanghwi.lastmessage.auth.service;

import com.kwanghwi.lastmessage.auth.dto.TokenResponse;
import com.kwanghwi.lastmessage.auth.redis.OtpRedisRepository;
import com.kwanghwi.lastmessage.common.exception.InvalidOtpException;
import com.kwanghwi.lastmessage.common.security.JwtProvider;
import com.kwanghwi.lastmessage.user.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.security.SecureRandom;

@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);
    private static final SecureRandom RANDOM = new SecureRandom();

    private final OtpRedisRepository otpRedisRepository;
    private final UserService userService;
    private final JwtProvider jwtProvider;

    public AuthService(
            OtpRedisRepository otpRedisRepository,
            UserService userService,
            JwtProvider jwtProvider
    ) {
        this.otpRedisRepository = otpRedisRepository;
        this.userService = userService;
        this.jwtProvider = jwtProvider;
    }

    public Mono<Void> sendOtp(String phone) {
        String code = generateCode();
        return otpRedisRepository.save(phone, code)
                .doOnSuccess(ignored -> log.info("[SMS stub] OTP for {}: {}", phone, code))
                .then();
    }

    public Mono<TokenResponse> verifyOtp(String phone, String code) {
        return otpRedisRepository.find(phone)
                .filter(savedCode -> savedCode.equals(code))
                .switchIfEmpty(Mono.error(new InvalidOtpException()))
                .flatMap(savedCode -> otpRedisRepository.delete(phone)
                        .then(userService.findOrCreate(phone)))
                .map(user -> new TokenResponse(jwtProvider.createToken(user.getPhone())));
    }

    private String generateCode() {
        return String.format("%06d", RANDOM.nextInt(1_000_000));
    }
}
