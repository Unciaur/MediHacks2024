package com.medihacks2024.dispatcher_copilot.templates;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class ChatRequest {

    private String model;
    private List<Message> messages;
    private int temperature;

    @JsonCreator
    public ChatRequest(@JsonProperty("model") String model, @JsonProperty("messages") List<Message> messages) {
        this.model = model;
        this.messages = messages;
        this.temperature = 0;
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

    @JsonProperty("temperature")
    public int getTemperature() {
        return temperature;
    }

    @JsonProperty("temperature")
    public void setTemperature(int temperature) {
        this.temperature = temperature;
    }
}