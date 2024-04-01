require('dotenv').config()

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const TELEGRAM_TODAY_PATH = '/today';
const TELEGRAM_YESTERDAY_PATH = '/yesterday';
const TELEGRAM_WEEK_PATH = '/week';
const TELEGRAM_BY_DATE_PATH = /\/date (.+)/;
const TELEGRAM_START_PATH = '/start';
const ALLOWED_USER_IDS = [
  Number(process.env.TELEGRAM_AUTHORIZED_ACCOUNT_ID_1),
  Number(process.env.TELEGRAM_AUTHORIZED_ACCOUNT_ID_2)
];
const DATE_FORMAT = 'DD/MM/YYYY';
const REPLY_MARKUP_BUTTON = JSON.stringify({
  keyboard: [
    [
      {
        text: TELEGRAM_TODAY_PATH,
        callback_data: TELEGRAM_TODAY_PATH
      },
      {
        text: TELEGRAM_YESTERDAY_PATH,
        callback_data: TELEGRAM_YESTERDAY_PATH
      },
      {
        text: TELEGRAM_WEEK_PATH,
        callback_data: TELEGRAM_WEEK_PATH
      }
    ],
  ],
  resize_keyboard: true,
  is_persistent: true
});

module.exports = {
  TELEGRAM_TODAY_PATH,
  TELEGRAM_YESTERDAY_PATH,
  TELEGRAM_WEEK_PATH,
  TELEGRAM_BY_DATE_PATH,
  TELEGRAM_START_PATH,
  ALLOWED_USER_IDS,
  REPLY_MARKUP_BUTTON,
  DATE_FORMAT,
  TELEGRAM_TOKEN
};
