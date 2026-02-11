# 🤖 Cloudflare Worker Telegram Bot Gateway

A scalable, high-performance Telegram Bot Gateway hosted on **Cloudflare Workers**. This project serves as a central "Traffic Controller" that routes user commands to different backend logic workers (Microservices) using **Cloudflare Service Bindings**.

![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-orange?style=for-the-badge&logo=cloudflare)
![Telegram](https://img.shields.io/badge/Telegram-Bot-blue?style=for-the-badge&logo=telegram)

## 🚀 Architecture

Instead of putting all logic into one massive file, this architecture splits features into separate workers.

```mermaid
graph TD
    User[📱 Telegram User] -->|Sends Command| TG[Telegram API]
    TG -->|Webhook| Gateway[🤖 Main Gateway Worker]
    
    subgraph Cloudflare Internal Network
    Gateway -->|Service Binding| W1[🎰 2D Worker]
    Gateway -->|Service Binding| W2[🎲 3D Worker]
    Gateway -->|Service Binding| W3[📊 Report Worker]
    Gateway -->|Service Binding| W4[🎮 Game/Other Workers]
    end
    
    W1 -->|Reply Message| TG
    W2 -->|Reply Message| TG
    W3 -->|Reply Message| TG
