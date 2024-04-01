const { TELEGRAM_WEEK_PATH } = require('../config');
const { checkUserAllowed } = require('../util');
const { weekBeforeInstruction } = require('../instructions');

const week = (bot) => {
  bot.onText(TELEGRAM_WEEK_PATH, async (msg) => {
    const userId = msg.from.id;

    checkUserAllowed(
      userId,
      async () => {
        weekBeforeInstruction(bot, msg);
      },
      () => bot.sendMessage(chatId, "User ID is not allowed!")
    )
  });
};

module.exports = week;
