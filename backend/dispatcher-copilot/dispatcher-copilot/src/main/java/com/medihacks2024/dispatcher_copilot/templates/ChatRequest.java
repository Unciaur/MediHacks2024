package com.medihacks2024.dispatcher_copilot.templates;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class ChatRequest {

    private String model;
    private String prompt;
    private int n;
    private double temperature;
    private int max_tokens;
    private int min_tokens;

    @JsonCreator
    public ChatRequest(@JsonProperty("model") String model, @JsonProperty("prompt") String prompt) {
        this.model = model;
        this.prompt = prompt;
        n = 1;
        min_tokens = 10;
        max_tokens = 100;
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

    @JsonProperty("prompt")
    public String getPrompt() {
        return prompt;
    }

    @JsonProperty("prompt")
    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }

    @JsonProperty("n")
    public int getN() {
        return n;
    }

    @JsonProperty("n")
    public void setN(int n) {
        this.n = n;
    }

    @JsonProperty("temperature")
    public double getTemperature() {
        return temperature;
    }

    @JsonProperty("temperature")
    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }

    @JsonProperty("max_tokens")
    public int getMaxTokens() {
        return max_tokens;
    }

    @JsonProperty("max_tokens")
    public void setMaxTokens(int max_tokens) {
        this.max_tokens = max_tokens;
    }

    @JsonProperty("min_tokens")
    public int getMinTokens() {
        return min_tokens;
    }

    @JsonProperty("min_tokens")
    public void setMinTokens(int min_tokens) {
        this.min_tokens = min_tokens;
    }
}