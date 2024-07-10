package com.medihacks2024.dispatcher_copilot.templates;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.List;

public class ChatRequest {

    private String model;
    private List<Message> messages;
    private int temperature;
    private int minTokens;
    private int maxTokens;

    @JsonCreator
    public ChatRequest(@JsonProperty("model") String model, @JsonProperty("messages") List<Message> messages) {
        this.model = model;
        this.messages = new ArrayList<>(messages);
        this.temperature = 0;
        this.minTokens = 5;
        this.maxTokens = 100;
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
        this.messages = new ArrayList<>(messages);
    }

    @JsonProperty("temperature")
    public int getTemperature() {
        return temperature;
    }

    @JsonProperty("temperature")
    public void setTemperature(int temperature) {
        this.temperature = temperature;
    }

    @JsonProperty("min_tokens")
    public int getMinTokens() {
        return minTokens;
    }

    @JsonProperty("min_tokens")
    public void setMinTokens(int minTokens) {
        this.minTokens = minTokens;
    }

    @JsonProperty("max_tokens")
    public int getMaxTokens() {
        return maxTokens;
    }

    @JsonProperty("max_tokens")
    public void setMaxTokens(int maxTokens) {
        this.maxTokens = maxTokens;
    }
}