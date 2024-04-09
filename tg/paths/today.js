const moment = require('moment-timezone');

const { TELEGRAM_TODAY_PATH, REPLY_MARKUP_BUTTON, DATE_FORMAT } = require('../config');
const { getRevenueByDate } = require('../../solana');
const { checkUserAllowed } = require('../util');

const today = (bot) => {
  bot.onText(TELEGRAM_TODAY_PATH, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    checkUserAllowed(
      userId,
      async () => {
        const date = moment().tz('Europe/Riga');

        if (!date.isValid()) {
          bot.sendMessage(chatId, "Invalid date provided!");
          return;
        }
      
        const { message_id } = await bot.sendMessage(chatId, `Calculating for ${date.format(DATE_FORMAT)}...`);
        const {
          positiveAmount,
          negativeAmount,
          total
        } = await getRevenueByDate(date);
        bot.deleteMessage(chatId, message_id);
        bot.sendMessage(chatId, `
          Received amount for ${date.format(DATE_FORMAT)}: ${positiveAmount.toFixed(2)}\nSent amount for ${date.format(DATE_FORMAT)}: ${negativeAmount.toFixed(2)}\nTotal for ${date.format(DATE_FORMAT)}: ${total.toFixed(2)}
        `, {
          reply_markup: REPLY_MARKUP_BUTTON,
        });
      },
      () => bot.sendMessage(chatId, "User ID is not allowed!")
    )
  });
};

module.exports = today;
