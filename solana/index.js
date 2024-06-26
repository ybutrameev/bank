const {
  BATCH_SIZE,
  ADDRESS_TO_MONITOR,
  CONNECTION
} = require('./config');
const {
  isReceiveTransaction,
  isSendTransaction,
  isBlockTimeInDate,
  sleep
} = require('./util');

const {
  PublicKey, LAMPORTS_PER_SOL,
} = require("@solana/web3.js");

const getSignaturesWithInterval = async (publicKey) => {
  const signatures = [];
  let lastSignature = null;
  let done = false;

  do {
    const items = await CONNECTION.getSignaturesForAddress(publicKey, {
      before: lastSignature
    })

    if (!items.length) {
      done = true;
    } else {
      signatures.push(...items);
      lastSignature = items[items.length - 1].signature;
      console.log('Current signatures length:', signatures.length)

      if (signatures.length) {
        await sleep(1000);
      }
    }
  } while (!done);

  return signatures;
};

const getParsedTransactionsWithInterval = async (signatures) => {
  const parsedTransactions = [];
  const test = signatures.slice(0, signatures.length);

  do {
    const batch = test.slice(parsedTransactions.length, parsedTransactions.length + BATCH_SIZE);
    const items = await CONNECTION.getParsedTransactions(batch, {
      maxSupportedTransactionVersion: 0,
    });
    parsedTransactions.push(...items);

    console.log('Current parsed transactions length:', parsedTransactions.length)

    if (parsedTransactions.length) {
      await sleep(1000);
    }
  } while (parsedTransactions.length < test.length);

  return parsedTransactions;
};

const getRevenueByDate = async (date) => {
  const signatures = await getSignaturesWithInterval(new PublicKey(ADDRESS_TO_MONITOR));
  const todaySignatureIds = signatures.reduce((acc, curr) => {
    if (isBlockTimeInDate(curr.blockTime, date)) {
      acc.push(curr.signature);
    }

    return acc;
  }, []);
  const parsedTransactions = await getParsedTransactionsWithInterval(todaySignatureIds);
  let positiveAmount = 0;
  let negativeAmount = 0;
  let total = 0;
  
  for (const item of parsedTransactions) {
    item.transaction.message.instructions.reduce((acc, curr) => {
      if (isReceiveTransaction(curr, ADDRESS_TO_MONITOR)) {
        if (curr.parsed.info.lamports) {
          total = total + curr.parsed.info.lamports / LAMPORTS_PER_SOL;
          positiveAmount = positiveAmount + curr.parsed.info.lamports / LAMPORTS_PER_SOL;
        }
      } else if (isSendTransaction(curr, ADDRESS_TO_MONITOR)) {
        if (curr.parsed.info.lamports) {
          total = total - curr.parsed.info.lamports / LAMPORTS_PER_SOL;
          negativeAmount = negativeAmount - curr.parsed.info.lamports / LAMPORTS_PER_SOL;
        }
      }
      return acc;
    }, {});
  }
  
  return {
    positiveAmount,
    negativeAmount,
    total
  };
};

module.exports = {
  getRevenueByDate
};