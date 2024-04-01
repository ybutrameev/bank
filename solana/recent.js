let mostRecentSigner = null;

const getMostRecentTransaction = async (address) => {
  const transactions = await CONNECTION.getSignaturesForAddress(new PublicKey(address));
  const recentTransaction = transactions[0];
  const { signature: lastTransactionId } = recentTransaction;

  return await CONNECTION.getParsedTransaction(lastTransactionId, {
    maxSupportedTransactionVersion: 0,
  });
}

const entry = async () => {
  let i = 0;
  setInterval(async () => {
    const transaction = await getMostRecentTransaction(ADDRESS_TO_MONITOR);
    const signer = transaction.transaction.message.accountKeys.find(account => account.signer);
    const signerPublicKey = signer.pubkey.toString();

    if (mostRecentSigner !== signerPublicKey) {
      mostRecentSigner = signerPublicKey;
      console.log('Most recent signer change to: ', mostRecentSigner)
    }

    i++;
    console.log('iteration: ', i)
  }, 3000);
};