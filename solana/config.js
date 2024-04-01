require('dotenv').config()

const { Keypair, Connection } = require("@solana/web3.js");

// const OWNER_SECRET_KEY = process.env.OWNER_SECRET_KEY.split(',');
// const WALLET = Keypair.fromSecretKey(new Uint8Array(OWNER_SECRET_KEY));
const ADDRESS_TO_MONITOR = process.env.ADDRESS_TO_MONITOR;
const RPC_ENDPOINT = process.env.RPC_ENDPOINT;
const CONNECTION = new Connection(RPC_ENDPOINT, "confirmed");
const BATCH_SIZE = 40;

module.exports = {
  // WALLET,
  ADDRESS_TO_MONITOR,
  RPC_ENDPOINT,
  CONNECTION,
  BATCH_SIZE
};
