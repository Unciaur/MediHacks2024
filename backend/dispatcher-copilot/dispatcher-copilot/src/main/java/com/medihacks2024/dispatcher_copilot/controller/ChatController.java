package com.medihacks2024.dispatcher_copilot.controller;

import com.medihacks2024.dispatcher_copilot.service.MessageService;
import com.medihacks2024.dispatcher_copilot.templates.*;
import org.springframework.ai.openai.api.OpenAiApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.async.DeferredResult;

import java.util.concurrent.CompletableFuture;

@RestController
public class ChatController {

    @Qualifier("openaiRestTemplate")
    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private MessageService messageService;

    @Value("${openai.model}")
    private String model;

    @Value("${openai.api.url}")
    private String apiUrl;

    @GetMapping("/chat")
    public DeferredResult<ResponseEntity<?>> chat(@RequestParam String prompt) {
        DeferredResult<ResponseEntity<?>> output = new DeferredResult<>();

        // create a request
        ChatRequest request = new ChatRequest(model, prompt);

        // call the API in a separate thread
        CompletableFuture.supplyAsync(() -> {
            return restTemplate.postForObject(apiUrl, request, ChatResponse.class);
        }).whenComplete((result, throwable) -> {
            if (throwable != null) {
                output.setErrorResult(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(throwable.getMessage()));
            } else if (result == null || result.getChoices() == null || result.getChoices().isEmpty()) {
                output.setResult(ResponseEntity.ok("No response"));
            } else {
                // get the first Choice
                OpenAiApi.ChatCompletionMessage choice = result.getChoices().get(0);
                System.out.println(result.getChoices());
                System.out.println(choice.content());
                // check if the Choice's message is null
                if (choice.content() == null) {
                    output.setResult(ResponseEntity.ok("No message"));
                } else {
                    // convert the ChatCompletionMessage to a Message
                    Message message = messageService.convertToMessage(choice);

                    // check if the Message's content is null
                    if (message.getContent() == null) {
                        output.setResult(ResponseEntity.ok("No content"));
                    } else {
                        // return the content of the Message
                        output.setResult(ResponseEntity.ok(message.getContent()));
                    }
                }
            }
        });

        return output;
    }
}