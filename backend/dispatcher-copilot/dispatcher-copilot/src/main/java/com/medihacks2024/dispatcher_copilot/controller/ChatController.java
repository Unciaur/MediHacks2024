package com.medihacks2024.dispatcher_copilot.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.medihacks2024.dispatcher_copilot.service.MessageService;
import com.medihacks2024.dispatcher_copilot.templates.*;
import org.springframework.ai.openai.api.OpenAiApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.async.DeferredResult;

import java.util.ArrayList;
import java.util.List;
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

    @CrossOrigin(origins = "https://medi.letssign.xyz")
    @GetMapping("/chat")
    public DeferredResult<ResponseEntity<?>> chat(@RequestParam String prompt) {
        DeferredResult<ResponseEntity<?>> output = new DeferredResult<>();

        // create a request
        ChatRequest request = new ChatRequest();
        request.setModel("Qwen/Qwen2-7B-Instruct");
        List<Message> messages = new ArrayList<>();
        messages.add(new Message("system", "Extrapolate the name, address, and reason for call from the user's prompt."));
        messages.add(new Message("user", prompt));
        request.setMessages(messages);

        // call the API in a separate thread
        CompletableFuture.supplyAsync(() -> {
            HttpEntity<ChatRequest> requestEntity = new HttpEntity<>(request);
            ResponseEntity<String> responseEntity = restTemplate.exchange(apiUrl, HttpMethod.POST, requestEntity, String.class);
            return responseEntity.getBody();
        }).whenComplete((result, throwable) -> {
            if (throwable != null) {
                output.setErrorResult(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(throwable.getMessage()));
            } else {
                try {
                    // Parse the raw JSON response to a JsonNode
                    ObjectMapper objectMapper = new ObjectMapper();
                    JsonNode jsonNode = objectMapper.readTree(result);

                    // Extract the content field from the JsonNode
                    String content = jsonNode.path("choices").get(0).path("message").path("content").asText();

                    // Set the result to the content
                    output.setResult(ResponseEntity.ok(content));
                } catch (JsonProcessingException e) {
                    output.setErrorResult(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage()));
                }
            }
        });

        return output;
    }
}