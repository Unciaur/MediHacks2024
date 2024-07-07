package com.medihacks2024.dispatcher_copilot.service;

import com.medihacks2024.dispatcher_copilot.templates.ChatResponse;
import com.medihacks2024.dispatcher_copilot.templates.Message;
import org.springframework.ai.openai.api.OpenAiApi;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

    public Message convertToMessage(OpenAiApi.ChatCompletionMessage chatCompletionMessage) {

        String role = String.valueOf(chatCompletionMessage.role());
        String content = chatCompletionMessage.content();

        if (content == null) {
            return null;
        }

        Message message = new Message(role, content);

        return message;
    }
}