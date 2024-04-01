const moment = require('moment');
const { DATE_FORMAT } = require('../tg/config');

const TRANSFER_TRANSACTION_TYPE = 'transfer';

const isBlockTimeInDate = (timestamp, date) => {
  return moment.unix(timestamp).tz('Europe/Riga').format(DATE_FORMAT) === date.format(DATE_FORMAT);
};

const isReceiveTransaction = (transaction, monitorAddress) => {
  return transaction.parsed && transaction.parsed.type === TRANSFER_TRANSACTION_TYPE && transaction.parsed.info.destination === monitorAddress
};

const isSendTransaction = (transaction, monitorAddress) => {
  return transaction.parsed && transaction.parsed.type === TRANSFER_TRANSACTION_TYPE && transaction.parsed.info.destination !== monitorAddress
};

const sleep = m => new Promise(r => setTimeout(r, m));

module.exports = {
  TRANSFER_TRANSACTION_TYPE,
  isReceiveTransaction,
  isSendTransaction,
  isBlockTimeInDate,
  sleep
};
