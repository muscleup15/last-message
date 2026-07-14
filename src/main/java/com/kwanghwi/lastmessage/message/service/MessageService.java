package com.kwanghwi.lastmessage.message.service;


import com.kwanghwi.lastmessage.message.domain.Message;
import com.kwanghwi.lastmessage.message.repository.MessageRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class MessageService {

    private final MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository){
        this.messageRepository = messageRepository;
    }

    public Mono<Message> createMessage(String message){

        messageRepository.save(message);
    }

}
