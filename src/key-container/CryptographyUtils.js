import nacl from "tweetnacl";
nacl.util = require("tweetnacl-util");

/**
 * @param key - The key used to encrypt the message.
 * @param message - The message to be encrypted.
 * @returns The encrypted message (included nounce).
 */
export function encrypt(key, message) {
  const newNonce = () => nacl.randomBytes(nacl.secretbox.nonceLength);
  const keyUint8Array = nacl.util.decodeBase64(key);
  const nonce = newNonce();
  const messageUint8 = nacl.util.decodeUTF8(message);
  const box = nacl.secretbox(messageUint8, nonce, keyUint8Array);
  const fullMessage = new Uint8Array(nonce.length + box.length);
  fullMessage.set(nonce);
  fullMessage.set(box, nonce.length);
  // base64 full message;
  return nacl.util.encodeBase64(fullMessage);
}

/**
 * @param key - The key used to encrypt the message.
 * @param EnCryptedMessage - The encrypted message you want to decrypt.
 * @returns The decrypted message.
 */
export function decrypt(key, EnCryptedMessage) {
  const keyUint8Array = nacl.util.decodeBase64(key);
  const messageWithNonceAsUint8Array = nacl.util.decodeBase64(EnCryptedMessage);
  const nonce = messageWithNonceAsUint8Array.slice(
    0,
    nacl.secretbox.nonceLength
  );
  const message = messageWithNonceAsUint8Array.slice(
    nacl.secretbox.nonceLength,
    EnCryptedMessage.length
  );
  const decrypted = nacl.secretbox.open(message, nonce, keyUint8Array);

  if (!decrypted) {
    throw new Error("decryption failed");
  }
  // base64 decrypted message
  return nacl.util.encodeUTF8(decrypted);
}
