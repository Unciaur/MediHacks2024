package com.medihacks2024.dispatcher_copilot.limiter;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.concurrent.Semaphore;

@Component
public class RateLimiter {

    private final Semaphore semaphore = new Semaphore(1);

    public boolean tryAcquire() {
        return semaphore.tryAcquire();
    }

    @Scheduled(fixedRate = 500)
    public void releasePermit() {
        semaphore.release();
    }
}