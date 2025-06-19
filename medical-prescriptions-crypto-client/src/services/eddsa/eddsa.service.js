import * as ed from '@noble/ed25519';
import { encryptAESGCM, decryptAESGCM } from '../crypto/crypto.utils';
import { downloadBase64File } from '../crypto/file.utils';
import { toBase64 } from '../crypto/file.utils';

ed.utils.randomBytes = (len) => crypto.getRandomValues(new Uint8Array(len));

export async function generateKeyPair(identifier, password) {
  
  const privateKey = ed.utils.randomPrivateKey();
  const publicKey = await ed.getPublicKeyAsync(privateKey);

  const { ciphertext, salt, iv } = await encryptAESGCM(privateKey, password);
  const combined = new Uint8Array([...salt, ...iv, ...new Uint8Array(ciphertext)]);
  const privateBase64 = btoa(String.fromCharCode(...combined));
  const publicBase64 = btoa(String.fromCharCode(...publicKey));

  console.log('Private Key:', privateBase64);
  console.log('Public Key:', publicBase64);
  downloadBase64File(privateBase64, `privateKeyEdDSA_${identifier}.key`);
  downloadBase64File(publicBase64, `publicKeyEdDSA_${identifier}.key`);

  return {
    privateKey: privateBase64,
    publicKey: publicBase64
  };
}

export async function signFile(buffer, privateKeyFile, password) {
  const combined = Uint8Array.from(atob(privateKeyFile), c => c.charCodeAt(0));

  const salt = combined.slice(0, 16);
  const iv = combined.slice(16, 28);
  const ciphertext = combined.slice(28);
  const decrypted = await decryptAESGCM(ciphertext, password, salt, iv);
  const privateKey = new Uint8Array(decrypted);

  const signature = await ed.signAsync(buffer, privateKey);

  const signatureBase64 = toBase64(signature);
  return {
    base64: signatureBase64
  };
}

export async function verifyFile(fileBuffer, signatureBase64, publicKeyBase64) {
  if (typeof signatureBase64 !== 'string' || typeof publicKeyBase64 !== 'string') {
    throw new Error('Firma y clave pública deben ser cadenas en Base64');
  }

  const signature = Uint8Array.from(atob(signatureBase64.trim()), c => c.charCodeAt(0));
  const publicKey = Uint8Array.from(atob(publicKeyBase64.trim()), c => c.charCodeAt(0));

  return await ed.verifyAsync(signature, new Uint8Array(fileBuffer), publicKey);
}

