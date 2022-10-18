import LocalStorageDB from "../db/localStorageDb";
import * as bip39 from "bip39";
import { encrypt, decrypt } from "./CryptographyUtils";
// import HDNode from "hdkey";
const hdkey = require("hdkey");
const pbkdf2 = require("pbkdf2");
const nacl = require("tweetnacl");
nacl.util = require("tweetnacl-util");

export default class KeyContainer {
  constructor(db) {
    this.name = "ziden";
    this.encryptionKey = "";
    if (db) {
      this.db = db;
    } else {
      this.db = new LocalStorageDB(this.name);
    }

    this.timer = {};
  }

  test() {
    console.log("test: ", this.db);
  }
  unlock(password) {
    const passwordHash = pbkdf2.pbkdf2Sync(password, "salt", 256, 32, "sha512"); // password hash in buffer
    const passwordHashBase64 = nacl.util.encodeBase64(passwordHash);
    this.encryptionKey = passwordHashBase64;
    clearTimeout(this.timer);
    const self = this;
    this.timer = setTimeout(() => {
      console.log("key expired");
      self.encryptionKey = "";
    }, 10000);
  }
  isUnlock() {
    if (this.encryptionKey) {
      return true;
    }
    return false;
  }
  lock() {
    if (!this.encryptionKey) {
      return;
    }
    clearTimeout(this.timer);
    // key container locked
    this.encryptionKey = "";
  }
  encrypt(message) {
    if (!this.isUnlock()) {
      console.log("need password");
      return;
    }
    return encrypt(this.encryptionKey, message);
  }

  decrypt(EncryptedMessage) {
    if (!this.isUnlock()) {
      console.log("need password");
      return;
    }
    return decrypt(this.encryptionKey, EncryptedMessage);
  }
  setMasterSeed(InputMnemonic) {
    if (!this.isUnlock()) {
      console.log("need password");
      return;
    }
    let mnemonic;
    if (InputMnemonic) {
      if (bip39.validateMnemonic(InputMnemonic)) {
        mnemonic = InputMnemonic;

        this.db.insert("ziden-user-masterseed", this.encrypt(mnemonic));
      } else {
        console.log("invalid mnemonic format, using random mnemonic");
        mnemonic = bip39.generateMnemonic();
        this.db.insert("ziden-user-masterseed", this.encrypt(mnemonic));
      }
    } else {
      mnemonic = bip39.generateMnemonic();
      this.db.insert("ziden-user-masterseed", this.encrypt(mnemonic));
    }
    console.log("user mnemonic: ", mnemonic);
  }
  getMasterSeedDecrypted() {
    if (!this.isUnlock()) {
      console.log("need password");
      return;
    }
    const masterSeedEncrypted = this.db.get("ziden-user-masterseed");
    if (masterSeedEncrypted === undefined) {
      console.log("Mnemonic not exist");
    } else {
      return this.decrypt(masterSeedEncrypted);
    }
  }

  generateKeyFromSeed(masterSeed) {
    if (!this.isUnlock()) {
      console.log("need password");
      return;
    }
    const masterSeedBuffer = Buffer.from(masterSeed, "utf-8");
    const keyRoot = hdkey.fromMasterSeed(masterSeedBuffer);
    const keyPathRoot = "m/44'/0'/0";
    const Id = keyRoot.derive(keyPathRoot);
    const publicKey = Id._publicKey.toString("hex");
    this.db.insert("ziden-publicKeyEncrypted", this.encrypt(publicKey));
    const privateKey = Id._privateKey.toString("hex");
    this.db.insert("ziden-privateKeyEncrypted", this.encrypt(privateKey));
    return { publicKey: publicKey, privateKey: privateKey };
  }
  getKeys() {
    const privateKeyEncrypted = this.db.get("ziden-privateKeyEncrypted");
    const publicKeyEncrypted = this.db.get("ziden-publicKeyEncrypted");
    return {
      publicKeyEncrypted,
      privateKeyEncrypted,
    };
  }
  getKeyDecrypted() {
    if (!this.isUnlock()) {
      console.log("need password");
      return;
    }
    const { publicKeyEncrypted, privateKeyEncrypted } = this.getKeys();
    return {
      publicKey: this.decrypt(publicKeyEncrypted),
      privateKey: this.decrypt(privateKeyEncrypted),
    };
  }
  recoverFromMasterSeed(masterSeed) {
    if (!this.isUnlock()) {
      console.log("need password");
      return;
    }
    const masterSeedBuffer = Buffer.from(masterSeed, "utf-8");
    this.setMasterSeed(masterSeed);
    const keyPairs = this.generateKeyFromSeed(masterSeedBuffer);
    return keyPairs;
  }
}
