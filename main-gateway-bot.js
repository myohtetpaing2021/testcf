export default {
  async fetch(request, env, ctx) {
    if (request.method === "POST") {
      try {
        const update = await request.json();

        // ---------------------------------------------------------
        // 1. Text Command Logic
        // ---------------------------------------------------------
        if (update.message && update.message.text) {
          const text = update.message.text;
          const chatId = update.message.chat.id;

          // /start နှိပ်ရင် Menu ပြမယ်
          if (text === "/start") {
            return await sendMenu(env.BOT_TOKEN, chatId, update.message.from.first_name);
          }

          // 👇👇 BOT အသစ်တိုးချင်ရင် ဒီနေရာမှာ Block တွေ ထပ်ပွားသွားရုံပါပဲ 👇👇

          // Bot 1: 2D
          if (text.toLowerCase().startsWith("/2d")) {
             const cleanUpdate = stripCommand(update, "/2d");
             return await safeForward(env, 'BOT_2D', cleanUpdate, "/", env.BOT_TOKEN);
          }

          // Bot 2: 3D
          if (text.toLowerCase().startsWith("/3d")) {
             const cleanUpdate = stripCommand(update, "/3d");
             return await safeForward(env, 'BOT_3D', cleanUpdate, "/webhook", env.BOT_TOKEN); // 3D က path လိုလို့ /webhook ထည့်တာပါ
          }

          // Bot 3: Report
          if (text.toLowerCase().startsWith("/r")) {
             const cmd = text.toLowerCase().startsWith("/report") ? "/report" : "/r";
             const cleanUpdate = stripCommand(update, cmd);
             return await safeForward(env, 'BOT_REPORT', cleanUpdate, "/", env.BOT_TOKEN);
          }

          // 🌟 Bot 4: (ဥပမာ - Game Bot)
          if (text.toLowerCase().startsWith("/game")) {
             // Game bot က command မဖြတ်ချင်ရင် stripCommand မသုံးဘဲ update အတိုင်းပို့ပါ
             return await safeForward(env, 'BOT_4', update, "/", env.BOT_TOKEN);
          }

          // 🌟 Bot 5: (ဥပမာ - Music Bot)
          if (text.toLowerCase().startsWith("/music")) {
             const cleanUpdate = stripCommand(update, "/music");
             return await safeForward(env, 'BOT_5', cleanUpdate, "/", env.BOT_TOKEN);
          }

          // 👆👆 Bot 6, 7, 8... ကြိုက်သလောက် ဒီလိုပုံစံ ထပ်ထည့်သွားလို့ရပါတယ် 👆👆
        }

        return new Response("OK");
      } catch (e) {
        return new Response("Global Error: " + e.message, { status: 200 });
      }
    }
    return new Response("Main Gateway Running with Multiple Bots");
  }
};

// --- Helper Functions (အောက်မှာ ပုံမှန်အတိုင်းထားပါ) ---
// safeForward, stripCommand, sendMessage, sendMenu စသည်တို့...

async function safeForward(env, bindingName, updateData, path, token) {
  // (Helper function code အတူတူပဲ သုံးပါ)
  if (!env[bindingName]) {
     // Binding မလုပ်ရသေးရင် Error မတက်အောင် ကာကွယ်ထားပြီးသားပါ
     return new Response("OK"); 
  }
  const newRequest = new Request(`https://internal${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData)
  });
  return await env[bindingName].fetch(newRequest);
}

function stripCommand(originalUpdate, commandPrefix) {
  const newUpdate = JSON.parse(JSON.stringify(originalUpdate));
  if (newUpdate.message && newUpdate.message.text) {
    const regex = new RegExp(`^${commandPrefix}\\s*`, 'i');
    newUpdate.message.text = newUpdate.message.text.replace(regex, "");
  }
  return newUpdate;
}

async function sendMenu(token, chatId, name) {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  
  // Menu မှာလည်း Command အသစ်တွေ ထပ်ဖြည့်ပြပေးလိုက်ပါ
  const text = `👋 <b>Mingalabar ${name}!</b>

ဝန်ဆောင်မှုကို ရွေးချယ်ပါ သို့မဟုတ် Command ရိုက်ထည့်ပါ:
• /2d [စာရင်း]
• /3d [စာရင်း]
• /r [စာရင်း]
• /game - ဂိမ်းဆော့ရန် (New)
• /music - သီချင်းနားထောင်ရန် (New)`;

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: text, parse_mode: "HTML" })
  });
  return new Response("OK");
}
