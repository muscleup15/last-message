package com.kwanghwi.lastmessage.user.repository;

import com.kwanghwi.lastmessage.user.domain.User;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Mono;

public interface UserRepository extends ReactiveCrudRepository<User, Long> {

    Mono<User> findByPhone(String phone);
}
