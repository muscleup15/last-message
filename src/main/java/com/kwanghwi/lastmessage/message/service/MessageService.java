package com.kwanghwi.lastmessage.message.service;

import com.kwanghwi.lastmessage.message.domain.Message;
import com.kwanghwi.lastmessage.message.domain.MessageStatus;
import com.kwanghwi.lastmessage.message.dto.CreateMessageRequest;
import com.kwanghwi.lastmessage.message.dto.CreateMessageResponse;
import com.kwanghwi.lastmessage.message.dto.GetMessageResponse;
import com.kwanghwi.lastmessage.message.repository.MessageRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

@Service
public class MessageService {

    private final MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository){
        this.messageRepository = messageRepository;
    }

    public Mono<CreateMessageResponse> createMessage(CreateMessageRequest request){
        Message message = Message.create(
                request.getSenderPhone(),
                request.getReceiverPhone(),
                request.getContent()
        );

        return messageRepository.save(message)
                .map(savedMessage -> new CreateMessageResponse(
                        savedMessage.getId(),
                        savedMessage.getContent(),
                        savedMessage.getCreatedAt()
                ));
    }

    public Flux<GetMessageResponse> getMessageByReceiverPhone(String receiverPhone){
        return messageRepository.findByReceiverPhoneOrderByCreatedAtDesc(receiverPhone)
                .map(receivedMessage -> new GetMessageResponse(
                        receivedMessage.getId(),
                        receivedMessage.getContent(),
                        receivedMessage.getCreatedAt(),
                        receivedMessage.getStatus()
                ));
    }

    public Mono<GetMessageResponse> openMessage(Long messageId){
        return messageRepository.findById(messageId)
                .flatMap(message -> {
                    message.open();;
                    return messageRepository.save(message);
                })
                .map(savedMessage -> new GetMessageResponse(
                        savedMessage.getId(),
                        savedMessage.getContent(),
                        savedMessage.getCreatedAt(),
                        savedMessage.getStatus()
                ));
    }

}
