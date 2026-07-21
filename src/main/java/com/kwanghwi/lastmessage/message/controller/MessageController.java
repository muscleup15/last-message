package com.kwanghwi.lastmessage.message.controller;


import com.kwanghwi.lastmessage.message.domain.Message;
import com.kwanghwi.lastmessage.message.dto.CreateMessageRequest;
import com.kwanghwi.lastmessage.message.dto.CreateMessageResponse;
import com.kwanghwi.lastmessage.message.dto.GetMessageResponse;
import com.kwanghwi.lastmessage.message.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RequiredArgsConstructor
@RestController
@RequestMapping("/messages")
public class MessageController {

    private final MessageService messageService;

    @PostMapping
    public Mono<CreateMessageResponse> createMessage(@RequestBody CreateMessageRequest request){
        return messageService.createMessage(request);
    }

    @GetMapping
    public Flux<GetMessageResponse> getMessage(@RequestParam String receiverPhone){
        return messageService.getMessageByReceiverPhone(receiverPhone);
    }

    @PatchMapping("/{messageId}/open")
    public Mono<GetMessageResponse> openMessage(@PathVariable Long messageId){
        return messageService.openMessage(messageId);
    }

}
