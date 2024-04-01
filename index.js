const TelegramBot = require('node-telegram-bot-api');
const moment = require('moment');

const { DATE_FORMAT, TELEGRAM_TOKEN } = require('./tg/config');
const {
  today,
  byDate
} = require('./tg')
const { getRevenueByDate } = require('./solana');

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

today(bot);
byDate(bot);

const test = async () => {
  const a = await getRevenueByDate(moment('09/03/2024', DATE_FORMAT));
  console.log(a)
};
