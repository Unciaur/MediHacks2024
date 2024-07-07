package com.medihacks2024.dispatcher_copilot.templates;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.ai.openai.api.OpenAiApi;

import java.util.List;

public class ChatResponse {

    private final List<OpenAiApi.ChatCompletionMessage> choices;

    @JsonCreator
    public ChatResponse(@JsonProperty("choices") List<OpenAiApi.ChatCompletionMessage> choices) {
        this.choices = choices;
    }

    public List<OpenAiApi.ChatCompletionMessage> getChoices() {
        return choices;
    }

    public static class Choice {

        private int index;
        private OpenAiApi.ChatCompletionMessage message;

        @JsonCreator
        public Choice(@JsonProperty("index") int index, @JsonProperty("message") OpenAiApi.ChatCompletionMessage message) {
            this.index = index;
            this.message = message;
        }

        public int getIndex() {
            return index;
        }

        public OpenAiApi.ChatCompletionMessage getMessage() {
            return message;
        }


    }
}