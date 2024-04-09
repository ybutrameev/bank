const TelegramBot = require('node-telegram-bot-api');
const moment = require('moment-timezone');

const { DATE_FORMAT, TELEGRAM_TOKEN } = require('./tg/config');
const {
  today,
  byDate,
  yesterday,
  week
} = require('./tg')
const { getRevenueByDate } = require('./solana');

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

today(bot);
byDate(bot);
yesterday(bot);
week(bot);

// const test = async () => {
//   const {
//     positiveAmount,
//     negativeAmount,
//     total
//   } = await getRevenueByDate(moment('09/04/2024', DATE_FORMAT));
//   console.log(positiveAmount, negativeAmount, total)
// };

// test();
