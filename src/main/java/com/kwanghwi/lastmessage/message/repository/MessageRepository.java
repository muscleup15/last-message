package com.kwanghwi.lastmessage.message.repository;

import com.kwanghwi.lastmessage.message.domain.Message;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface MessageRepository  extends ReactiveCrudRepository<Message, Long> {

    Flux<Message> findByReceiverPhoneOrderByCreatedAtDesc(String receiverPhone);

}
