package com.kwanghwi.lastmessage.message.controller;

import com.kwanghwi.lastmessage.common.security.AuthContext;
import com.kwanghwi.lastmessage.message.dto.CreateMessageRequest;
import com.kwanghwi.lastmessage.message.dto.CreateMessageResponse;
import com.kwanghwi.lastmessage.message.dto.GetMessageResponse;
import com.kwanghwi.lastmessage.message.service.MessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RequiredArgsConstructor
@RestController
@RequestMapping("/messages")
public class MessageController {

    private final MessageService messageService;

    @PostMapping
    public Mono<CreateMessageResponse> createMessage(@Valid @RequestBody CreateMessageRequest request) {
        return AuthContext.currentUserId()
                .flatMap(userId -> messageService.createMessage(userId, request));
    }

    @GetMapping
    public Flux<GetMessageResponse> getMyMessages() {
        return AuthContext.currentUserId()
                .flatMapMany(messageService::getMyMessages);
    }

    @PatchMapping("/{messageId}/open")
    public Mono<GetMessageResponse> openMessage(@PathVariable Long messageId) {
        return AuthContext.currentUserId()
                .flatMap(userId -> messageService.openMessage(messageId, userId));
    }
}
