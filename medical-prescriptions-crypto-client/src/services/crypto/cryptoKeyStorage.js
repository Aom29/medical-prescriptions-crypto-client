import { set, get, del } from 'idb-keyval';

class KeyStorage {
  static async saveDerivedKey(key) {
    await set('DerivatedKey', key);
  }

  static async getDerivedKey() {
    return await get('DerivatedKey');
  }

  static async removeDerivedKey() {
    await del('DerivatedKey');
  }

  static async savePrivateKey(encryptedPrivateKey) {
    await set('PrivateKeyEncrypted', encryptedPrivateKey);
  }

  static async getPrivateKey() {
    return await get('PrivateKeyEncrypted');
  }

  static async removePrivateKey() {
    await del('PrivateKeyEncrypted');
  }
}

export default KeyStorage;