package com.medihacks2024.dispatcher_copilot.templates;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class ChatRequest {

    private String model;
    private List<Message> messages;

    @JsonCreator
    public ChatRequest(@JsonProperty("model") String model, @JsonProperty("messages") List<Message> messages) {
        this.model = model;
        this.messages = messages;
    }

    public ChatRequest() {

    }

    @JsonProperty("model")
    public String getModel() {
        return model;
    }

    @JsonProperty("model")
    public void setModel(String model) {
        this.model = model;
    }

    @JsonProperty("messages")
    public List<Message> getMessages() {
        return messages;
    }

    @JsonProperty("messages")
    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }
}