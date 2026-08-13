package com.kwanghwi.lastmessage.message.service;

import com.kwanghwi.lastmessage.common.exception.MessageNotFoundException;
import com.kwanghwi.lastmessage.message.domain.Message;
import com.kwanghwi.lastmessage.message.dto.CreateMessageRequest;
import com.kwanghwi.lastmessage.message.dto.CreateMessageResponse;
import com.kwanghwi.lastmessage.message.dto.GetMessageResponse;
import com.kwanghwi.lastmessage.message.repository.MessageRepository;
import com.kwanghwi.lastmessage.user.service.UserService;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class MessageService {

    private final MessageRepository messageRepository;
    private final UserService userService;

    public MessageService(MessageRepository messageRepository, UserService userService) {
        this.messageRepository = messageRepository;
        this.userService = userService;
    }

    public Mono<CreateMessageResponse> createMessage(Long senderUserId, CreateMessageRequest request) {
        return userService.decreaseRemainingCount(senderUserId)
                .flatMap(sender -> {
                    Message message = Message.create(
                            sender.getPhone(),
                            request.getReceiverPhone(),
                            request.getContent()
                    );
                    return messageRepository.save(message);
                })
                .map(savedMessage -> new CreateMessageResponse(
                        savedMessage.getId(),
                        savedMessage.getContent(),
                        savedMessage.getCreatedAt()
                ));
    }

    public Flux<GetMessageResponse> getMyMessages(Long receiverUserId) {
        return userService.requireRegisteredPhone(receiverUserId)
                .flatMapMany(user -> messageRepository.findByReceiverPhoneOrderByCreatedAtDesc(user.getPhone()))
                .map(receivedMessage -> new GetMessageResponse(
                        receivedMessage.getId(),
                        receivedMessage.getContent(),
                        receivedMessage.getCreatedAt(),
                        receivedMessage.getStatus()
                ));
    }

    public Mono<GetMessageResponse> openMessage(Long messageId, Long receiverUserId) {
        return userService.requireRegisteredPhone(receiverUserId)
                .flatMap(user -> messageRepository.findById(messageId)
                        .switchIfEmpty(Mono.error(new MessageNotFoundException(messageId)))
                        .filter(message -> user.getPhone().equals(message.getReceiverPhone()))
                        .switchIfEmpty(Mono.error(new MessageNotFoundException(messageId)))
                        .flatMap(message -> {
                            message.open();
                            return messageRepository.save(message);
                        }))
                .map(savedMessage -> new GetMessageResponse(
                        savedMessage.getId(),
                        savedMessage.getContent(),
                        savedMessage.getCreatedAt(),
                        savedMessage.getStatus()
                ));
    }
}
