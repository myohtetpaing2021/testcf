# 🤖 Cloudflare Worker Telegram Bot Gateway (Microservices Architecture)

![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)

A scalable, high-performance Telegram Bot Gateway hosted on **Cloudflare Workers**. This project serves as a central "Traffic Controller" that routes user commands to different backend logic workers (Microservices) using **Cloudflare Service Bindings**.

## 🚀 Architecture Design

Instead of putting all calculation logic (2D, 3D, Reports) into one massive file, this architecture splits features into separate workers. This ensures high stability and easier updates.

```mermaid
graph TD
    User[📱 Telegram User] -->|Sends Command| TG[Telegram API]
    TG -->|Webhook| Gateway[🤖 Main Gateway Worker]
    
    subgraph Cloudflare Internal Network (Service Bindings)
    Gateway -->|/2d| W1[🎰 2D Pro Worker]
    Gateway -->|/3d| W2[🎲 3D Pro Worker]
    Gateway -->|/report| W3[📊 Lottery Report Worker]
    Gateway -->|/game| W4[🎮 Expansion Workers...]
    end
    
    W1 -->|Result| TG
    W2 -->|Result| TG
    W3 -->|Result| TG

