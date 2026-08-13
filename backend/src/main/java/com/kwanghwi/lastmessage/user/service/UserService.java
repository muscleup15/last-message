package com.kwanghwi.lastmessage.user.service;

import com.kwanghwi.lastmessage.common.exception.NoRemainingMessageException;
import com.kwanghwi.lastmessage.common.exception.PhoneAlreadyInUseException;
import com.kwanghwi.lastmessage.common.exception.PhoneAlreadyRegisteredException;
import com.kwanghwi.lastmessage.common.exception.PhoneNotRegisteredException;
import com.kwanghwi.lastmessage.user.domain.User;
import com.kwanghwi.lastmessage.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Mono<User> findById(Long userId) {
        return userRepository.findById(userId)
                .switchIfEmpty(Mono.error(new IllegalStateException("User not found: " + userId)));
    }

    public Mono<User> findOrCreateByKakaoId(Long kakaoId) {
        return userRepository.findByKakaoId(kakaoId)
                .switchIfEmpty(Mono.defer(() -> userRepository.save(User.createFromKakao(kakaoId))));
    }

    public Mono<User> requireRegisteredPhone(Long userId) {
        return findById(userId)
                .flatMap(user -> {
                    if (!user.hasPhone()) {
                        return Mono.error(new PhoneNotRegisteredException());
                    }
                    return Mono.just(user);
                });
    }

    public Mono<User> registerPhone(Long userId, String phone) {
        return findById(userId)
                .flatMap(user -> {
                    if (user.hasPhone()) {
                        if (phone.equals(user.getPhone())) {
                            return Mono.just(user);
                        }
                        return Mono.error(new PhoneAlreadyRegisteredException());
                    }
                    return userRepository.findByPhone(phone)
                            .flatMap(existing -> Mono.<User>error(new PhoneAlreadyInUseException()))
                            .switchIfEmpty(Mono.defer(() -> {
                                user.registerPhone(phone);
                                return userRepository.save(user);
                            }));
                });
    }

    public Mono<User> decreaseRemainingCount(Long userId) {
        return requireRegisteredPhone(userId)
                .flatMap(user -> {
                    if (user.getRemainingMessageCount() == null || user.getRemainingMessageCount() <= 0) {
                        return Mono.error(new NoRemainingMessageException());
                    }
                    user.decreaseRemainingCount();
                    return userRepository.save(user);
                });
    }

    public Mono<User> addRemainingCount(Long userId, int amount) {
        return findById(userId)
                .flatMap(user -> {
                    user.addRemainingCount(amount);
                    return userRepository.save(user);
                });
    }
}
