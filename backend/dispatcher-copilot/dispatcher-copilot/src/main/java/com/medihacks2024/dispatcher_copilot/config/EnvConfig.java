package com.medihacks2024.dispatcher_copilot.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EnvConfig {
    //Load the .env file

    @Bean
    public Dotenv dotenv() {
        //Load .env file from the root directory
        return Dotenv.configure()
                .directory("D:/CodingProjects/MediHacks2024/")
                .load();
    }
}