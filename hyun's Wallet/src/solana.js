import {
  Keypair,
  PublicKey,
  clusterApiUrl,
  Connection,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import * as bip39 from "bip39";

import log from "./utils.js";

// let publicKeyString;
// let secretKeyString;

// export function setPublicKeyString(key) {
//   publicKeyString = key;
// }
// export function getPublicKeyString() {
//   return publicKeyString;
// }
export function Encodeuint8arr(myString) {
  return new TextEncoder("utf-8").encode(myString);
}

export function generateMnemonic() {
  return bip39.generateMnemonic();
}
export function validateMnemonic(mnemonic) {
  return bip39.validateMnemonic(mnemonic);
}

export function generateAccount(mnemonic) {
  const seed = bip39.mnemonicToSeedSync(mnemonic).slice(0, 32);
  // log(`seed = ${seed.toString("hex")}`);
  return Keypair.fromSeed(new Uint8Array(seed));
}

// Create connection
export function createConnection(url = clusterApiUrl("devnet")) {
  return new Connection(url);
}

// Get balance
export function getBalance(connection, publicKey) {
  return connection.getBalance(publicKey);
}

export function getPublicKey(publicKeyString) {
  return new PublicKey(publicKeyString);
}
export function getKeyPair(secretKey) {
  return new Keypair.fromSecretKey(secretKey);
}

export function isOnCurve(publicKey) {
  return PublicKey.isOnCurve(publicKey);
}

export async function sendTransaction(
  connection,
  recipientPublicKey,
  recipientAmount,
  payer
) {
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: payer.publicKey,
      toPubkey: new PublicKey(recipientPublicKey),
      lamports: recipientAmount,
    })
  );
  const signature = await sendAndConfirmTransaction(connection, transaction, [
    payer,
  ]);

  return signature;
}

// log(sol.isOnCurve(account.publicKey));
