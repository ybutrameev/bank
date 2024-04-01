const moment = require('moment');

const { TELEGRAM_BY_DATE_PATH, REPLY_MARKUP_BUTTON, DATE_FORMAT } = require('../config');
const { getRevenueByDate } = require('../../solana');
const { checkUserAllowed } = require('../util');

const byDate = (bot) => {
  bot.onText(TELEGRAM_BY_DATE_PATH, async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
  
    checkUserAllowed(
      userId,
      async () => {
        const date = moment(match[1], DATE_FORMAT).utcOffset(3);

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

module.exports = byDate;
