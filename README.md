# MediHacks2024

## Project Details

Division: 18-
Track: Laerdal Option 2, Emergency Dispatch Conversation/Copilot AI

## Inspiration

After discussing the difficulty of being a dispatcher while on a voice call, we were inspired. With all the multitasking and pressure put on dispatchers, we sought to alleviate some of that pressure.

## What it does

SynerGuard transcribes an emergency call and then uses an LLM to extrapolate critical caller data, such as their name, location, emergency type, emergency status, and the recommended branch of emergency services to be alerted.

## How we built it

We built the backend using _Springboot's Initializr_. We ran our LLM on a high-throughput engine called vLLM to support serving as many calls as possible. We built the frontend with _Next.js_.

## Challenges we ran into

We struggled with implementing many of our AI features, as most of us have not worked with AI on development projects before. We also had trouble integrating the frontend and backend, especially after migrating from standard HTML/CSS/JS to a framework.

## Accomplishments that we're proud of

- Implementation of AI to transcribe speech to text.
- Implementation of LLM to extrapolate critical information.

## What we learned

- Learned frontend and backend skills.
- Learned how to integrate various forms of AI.
- Learned how to plan out a full project given a short timeframe.

## What's next for SynerGuard

- Automatically send the extrapolated data and transcript to the correct branch of emergency services, so the dispatcher has all the time necessary to assist the caller.
- Provide medical recommendations for the dispatcher to inform the caller of.
