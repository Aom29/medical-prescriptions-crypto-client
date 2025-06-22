import { x25519 } from '@noble/curves/ed25519';
import { encryptAESGCM, decryptAESGCM } from '../crypto.utils';
import { downloadBase64File } from '../file.utils';

function toBase64(bytes) {
  return btoa(String.fromCharCode(...bytes));
}

function fromBase64(base64) {
  return Uint8Array.from(atob(base64), c => c.charCodeAt(0));
}

export async function generateDHKeyPair(identifier, password) {
  const privateKey = x25519.utils.randomPrivateKey(); // Uint8Array(32)
  const publicKey = x25519.getPublicKey(privateKey);  // Uint8Array(32)

  const { ciphertext, salt, iv } = await encryptAESGCM(privateKey, password);
  const combined = new Uint8Array([...salt, ...iv, ...new Uint8Array(ciphertext)]);
  const privateBase64 = toBase64(combined);
  const publicBase64 = toBase64(publicKey);

  downloadBase64File(privateBase64, `privateKeyX25519_${identifier}.key`);
  downloadBase64File(publicBase64, `publicKeyX25519_${identifier}.key`);

  return { privateBase64, publicBase64 };
}

export async function generateDHKeyPairNoDownload(identifier, password) {
  const privateKey = x25519.utils.randomPrivateKey();
  const publicKey = x25519.getPublicKey(privateKey);

  const { ciphertext, salt, iv } = await encryptAESGCM(privateKey, password);
  const combined = new Uint8Array([...salt, ...iv, ...new Uint8Array(ciphertext)]);
  const privateBase64 = toBase64(combined);
  const publicBase64 = toBase64(publicKey);

  return { privateBase64, publicBase64 };
}

export async function computeSharedSecret(
  myPrivateKeyEncryptedBase64,
  password,
  otherPublicKeyBase64
) {
  const myCombined = fromBase64(myPrivateKeyEncryptedBase64);
  const salt = myCombined.slice(0, 16);
  const iv = myCombined.slice(16, 28);
  const ciphertext = myCombined.slice(28);

  const decrypted = await decryptAESGCM(ciphertext, password, salt, iv);
  const myPrivateKey = new Uint8Array(decrypted);

  const otherPublicKey = fromBase64(otherPublicKeyBase64);
  const sharedSecret = x25519.getSharedSecret(myPrivateKey, otherPublicKey);

  const sharedHex = [...sharedSecret].map(b => b.toString(16).padStart(2, '0')).join('');
  return sharedHex;
}
