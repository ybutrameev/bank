const TRANSFER_TRANSACTION_TYPE = 'transfer';

const isBlockTimeInDate = (timestamp, date) => {
  return date.setHours(0, 0, 0, 0) === new Date(timestamp * 1000).setHours(0, 0, 0, 0);
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
