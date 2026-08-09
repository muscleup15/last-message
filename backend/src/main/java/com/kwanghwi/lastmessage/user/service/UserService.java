package com.kwanghwi.lastmessage.user.service;

import com.kwanghwi.lastmessage.common.exception.NoRemainingMessageException;
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

    public Mono<User> findOrCreate(String phone) {
        return userRepository.findByPhone(phone)
                .switchIfEmpty(Mono.defer(() -> userRepository.save(User.create(phone))));
    }

    public Mono<User> decreaseRemainingCount(String phone) {
        return userRepository.findByPhone(phone)
                .switchIfEmpty(Mono.error(new IllegalStateException("User not found: " + phone)))
                .flatMap(user -> {
                    if (user.getRemainingMessageCount() == null || user.getRemainingMessageCount() <= 0) {
                        return Mono.error(new NoRemainingMessageException());
                    }
                    user.decreaseRemainingCount();
                    return userRepository.save(user);
                });
    }

    public Mono<User> addRemainingCount(String phone, int amount) {
        return userRepository.findByPhone(phone)
                .switchIfEmpty(Mono.error(new IllegalStateException("User not found: " + phone)))
                .flatMap(user -> {
                    user.addRemainingCount(amount);
                    return userRepository.save(user);
                });
    }
}
