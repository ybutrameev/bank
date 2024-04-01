const { TELEGRAM_START_PATH } = require('../config');
const { checkUserAllowed } = require('../util');

const start = (bot) => {
  bot.onText(TELEGRAM_START_PATH, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    checkUserAllowed(
      userId,
      () => {
        bot.sendMessage(chatId, "[ /today ]: get SOL amount for today \n[ /date 31/03/2024 ]: get SOL amount for given date");
      },
      () => {
        bot.sendMessage(chatId, "User ID is not allowed!");
      }
    )
  });
};

module.exports = start;