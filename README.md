GitHub Repository တွင် တင်ရန်အတွက် အပြည့်စုံဆုံးနှင့် Professional အကျဆုံး **README.md** Source Code ဖြစ်ပါသည်။

ဒီ Code ကို Copy ကူးပြီး `README.md` ဖိုင်ထဲတွင် Paste လုပ်လိုက်ပါက GitHub တွင် Diagram များ၊ Table များနှင့်တကွ လှပစွာ ပေါ်နေပါလိမ့်မည်။

```markdown
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

```

## ✨ Key Features

* **Microservices Architecture:** Add, remove, or update specific features without restarting the Main Gateway.
* **Ultra-Low Latency:** Uses **Service Bindings (RPC)** to communicate between workers, avoiding public internet latency and HTTP overhead.
* **Smart Routing:** Automatically strips commands (e.g., converts `/2d 12-500` -> `12-500`) before forwarding data, allowing backend workers to process raw data cleanly.
* **Scalable:** Easily expandable to 5, 10, or 50+ backend bots under a single Telegram Bot Token.
* **Text-Based Menu:** Simple and fast text-based interface for low-bandwidth users.
* **Cost Effective:** Fully compatible with Cloudflare Workers Free Tier (100k requests/day).

## 🛠️ Installation & Setup Guide

### Prerequisites

* A Cloudflare Account.
* A Telegram Bot Token (obtained from @BotFather).

---

### Step 1: Deploy Backend Workers

Create separate Cloudflare Workers for your logic files based on the code provided in the `workers/` directory.

1. **2D Worker:** Create `backend-2d-pro` and paste code from `2DCalcPro.js`.
2. **3D Worker:** Create `backend-3d-pro` and paste code from `3DCalcPro.js`.
3. **Report Worker:** Create `backend-report` and paste code from `ThaiLotteryCalc.js`.

**⚠️ Important:** Add the Bot Token to Environment Variables for **each** backend worker so they can reply to users.

* `backend-2d-pro` -> Variable: `TELEGRAM_BOT_TOKEN`
* `backend-3d-pro` -> Variable: `BOT_TOKEN`
* `backend-report` -> Variable: `ENV_BOT_TOKEN`

*Note: Do NOT set a webhook for these workers.*

### Step 2: Deploy Main Gateway

1. Create a new Worker (e.g., `main-gateway-bot`).
2. Copy the code from `gateway.js` (or `a.js`) in this repository.
3. Deploy the worker.

### Step 3: Configure Bindings (Crucial)

Go to your **Main Gateway Worker** > **Settings** > **Bindings**.
Add the following **Service Bindings** to link the gateway to your backends.

| Variable Name (In Code) | Service (Worker Name) | Description |
| --- | --- | --- |
| `BOT_2D` | `backend-2d-pro` | Connects to 2D Logic |
| `BOT_3D` | `backend-3d-pro` | Connects to 3D Logic |
| `BOT_REPORT` | `backend-report` | Connects to Report Logic |

> **Warning:** Variable names (`BOT_2D`, etc.) must match exactly with the code in the gateway file.

### Step 4: Environment Variables

Go to **Main Gateway Worker** > **Settings** > **Variables**.

| Variable Name | Value |
| --- | --- |
| `BOT_TOKEN` | `YOUR_TELEGRAM_BOT_TOKEN_HERE` |

### Step 5: Set Webhook

Finally, connect your Telegram Bot to the Main Gateway. Open your browser and run:

```
[https://api.telegram.org/bot](https://api.telegram.org/bot)<YOUR_TOKEN>/setWebhook?url=https://<YOUR_GATEWAY_URL>.workers.dev

```

---

## 🎮 Usage Guide

Users can interact with the bot using the following commands:

* **/start** : Displays the main menu with instructions.
* **/2d [list]** : Calculates 2D inputs.
* **/3d [list]** : Calculates 3D inputs.
* **/r [list]** : Generates lottery reports.

### Example Input (2D)

```text
/2d
12 - 500
34 - 1000
56 - 200

```

### Example Input (3D)

```text
/3d
123 - 500
456 R 100

```

---

## 📂 Project Structure

```
├── gateway.js        # 🧠 Main Gateway Logic (Router)
├── workers/
│   ├── 2DCalcPro.js  # 🔢 Backend Logic for 2D
│   ├── 3DCalcPro.js  # 🔢 Backend Logic for 3D
│   └── Report.js     # 📉 Backend Logic for Reporting
└── README.md         # 📄 Documentation

```

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/NewGameBot`)
3. Commit your Changes (`git commit -m 'Add new game worker'`)
4. Push to the Branch (`git push origin feature/NewGameBot`)
5. Open a Pull Request

## ⚠️ Disclaimer

This project is for educational purposes only. The developer is not responsible for any misuse of this source code for gambling or illegal activities.

---

**Developed with ❤️ using Cloudflare Workers**

```

```
