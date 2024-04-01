const moment = require('moment-timezone');

const { getRevenueByDate } = require('../solana');
const { REPLY_MARKUP_BUTTON, DATE_FORMAT } = require("./config");

const weekBeforeInstruction = async (bot, msg) => {
  const chatId = msg.chat.id;
  const array = Array.from({ length: 7 }, (_, i) => i + 1);
  const yesterdayDate = moment().subtract(array[0], 'days');
  const dateWeekBefore = moment().subtract(array[array.length - 1], 'days');

  let totalAmount = 0;

  const { message_id } = await bot.sendMessage(chatId, `Calculating from ${dateWeekBefore.format(DATE_FORMAT)} to ${yesterdayDate.format(DATE_FORMAT)}...`);
  for (const item of array) {
    const amount = await getRevenueByDate(moment().subtract(item, 'days'));
    totalAmount = totalAmount + amount;
  }
  
  bot.deleteMessage(chatId, message_id);
  bot.sendMessage(chatId, `Amount from ${dateWeekBefore.format(DATE_FORMAT)} to ${yesterdayDate.format(DATE_FORMAT)}: ${totalAmount.toFixed(2)}`, {
    reply_markup: REPLY_MARKUP_BUTTON,
  });
};

module.exports = {
  weekBeforeInstruction
}
