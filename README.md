# 🤖 Cloudflare Worker Telegram Bot Gateway (Microservices Architecture)

A scalable, high-performance Telegram Bot Gateway hosted on **Cloudflare Workers**. This project serves as a central "Traffic Controller" that routes user commands to different backend logic workers (Microservices) using **Cloudflare Service Bindings**.

## ✨ Key Features

- **Microservices Architecture:** Add, remove, or update specific features without restarting the Main Gateway.
- **Ultra-Low Latency:** Uses **Service Bindings (RPC)** to communicate between workers, avoiding public internet latency.
- **Smart Routing:** Automatically strips commands (e.g., converts `/2d 12-500` -> `12-500`) before forwarding data.
- **Scalable:** Easily expandable to 5, 10, or 50+ backend bots under a single Telegram Bot Token.
- **Cost Effective:** Fully compatible with Cloudflare Workers Free Tier.

## 🛠️ Installation & Setup Guide

### Prerequisites
- A Cloudflare Account.
- A Telegram Bot Token (obtained from @BotFather).

---

### Step 1: Deploy Backend Workers
Create separate Cloudflare Workers for your logic files.

1. **2D Worker:** Create `backend-2d-pro` and paste code from `2DCalcPro.js`.
2. **3D Worker:** Create `backend-3d-pro` and paste code from `3DCalcPro.js`.
3. **Report Worker:** Create `backend-report` and paste code from `ThaiLotteryCalc.js`.

**⚠️ Important:** Add the Bot Token to Environment Variables for **each** backend worker:
* `backend-2d-pro` -> Variable: `TELEGRAM_BOT_TOKEN`
* `backend-3d-pro` -> Variable: `BOT_TOKEN`
* `backend-report` -> Variable: `ENV_BOT_TOKEN`

*Note: Do NOT set a webhook for these workers.*

### Step 2: Deploy Main Gateway
1. Create a new Worker (e.g., `main-gateway-bot`).
2. Copy the code from `a.js` (Gateway Code) in this repository.
3. Deploy the worker.

### Step 3: Configure Bindings (Crucial)
Go to your **Main Gateway Worker** > **Settings** > **Bindings**.
Add the following **Service Bindings**:

| Variable Name | Service (Worker Name) | Description |
| :--- | :--- | :--- |
| `BOT_2D` | `backend-2d-pro` | Connects to 2D Logic |
| `BOT_3D` | `backend-3d-pro` | Connects to 3D Logic |
| `BOT_REPORT` | `backend-report` | Connects to Report Logic |

*(Variable names must match exactly with the code).*

### Step 4: Environment Variables
Go to **Main Gateway Worker** > **Settings** > **Variables**.

| Variable Name | Value |
| :--- | :--- |
| `BOT_TOKEN` | `YOUR_TELEGRAM_BOT_TOKEN_HERE` |

### Step 5: Set Webhook
Connect your Telegram Bot to the Main Gateway:

```

[https://api.telegram.org/bot](https://api.telegram.org/bot)<YOUR_TOKEN>/setWebhook?url=https://<YOUR_GATEWAY_URL>.workers.dev

```

---

## 🎮 Usage Guide

Users can interact with the bot using the following commands:

- **/start** : Displays the main menu.
- **/2d [list]** : Calculates 2D inputs.
- **/3d [list]** : Calculates 3D inputs.
- **/r [list]** : Generates lottery reports.

### Example Input
```text
/2d
12 - 500
34 - 1000

```

## 📂 Project Structure

```
├── a.js              # 🧠 Main Gateway Logic (Router)
├── workers/
│   ├── 2DCalcPro.js  # 🔢 Backend Logic for 2D
│   ├── 3DCalcPro.js  # 🔢 Backend Logic for 3D
│   └── Report.js     # 📉 Backend Logic for Reporting
└── README.md         # 📄 Documentation

```

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch
3. Commit your Changes
4. Push to the Branch
5. Open a Pull Request

## ⚠️ Disclaimer

This project is for educational purposes only. The developer is not responsible for any misuse of this source code for gambling or illegal activities.

---

**Developed with ❤️ using Cloudflare Workers**

