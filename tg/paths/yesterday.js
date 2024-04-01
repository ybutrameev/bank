const moment = require('moment-timezone');

const { TELEGRAM_YESTERDAY_PATH, REPLY_MARKUP_BUTTON, DATE_FORMAT } = require('../config');
const { getRevenueByDate } = require('../../solana');
const { checkUserAllowed } = require('../util');

const today = (bot) => {
  bot.onText(TELEGRAM_YESTERDAY_PATH, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    checkUserAllowed(
      userId,
      async () => {
        const date = moment().subtract(1, 'days')

        if (!date.isValid()) {
          bot.sendMessage(chatId, "Invalid date provided!");
          return;
        }
      
        const { message_id } = await bot.sendMessage(chatId, `Calculating for ${date.format(DATE_FORMAT)}...`);
        const amount = await getRevenueByDate(date);
        bot.deleteMessage(chatId, message_id);
        bot.sendMessage(chatId, `Amount for ${date.format(DATE_FORMAT)}: ${amount.toFixed(2)}`, {
          reply_markup: REPLY_MARKUP_BUTTON,
        });
      },
      () => bot.sendMessage(chatId, "User ID is not allowed!")
    )
  });
};

module.exports = today;
