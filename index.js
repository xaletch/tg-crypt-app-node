const express = require("express");
const dotenv = require("dotenv");

const TelegramBot = require("node-telegram-bot-api");

const app = express();
dotenv.config();

// replace the value below with the Telegram token you receive from @BotFather
const TOKEN = process.env.TOKEN;
const WEB_APP_URL = process.env.WEB_APP_URL;
const PORT = process.env.PORT;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(TOKEN, { polling: true });

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  const user = msg.chat.first_name;

  if (text === "/start") {
    await bot.sendMessage(chatId, `${user}, добро пожаловать!`, {
      reply_markup: {
        keyboard: [[{ text: "Открыть", web_app: { url: WEB_APP_URL } }]],
      },
    });
  }

  // send a message to the chat acknowledging receipt of their message
});

app.listen(PORT, () => {
  console.log("СЕРВЕР ЗАПУЩЕН");
});
