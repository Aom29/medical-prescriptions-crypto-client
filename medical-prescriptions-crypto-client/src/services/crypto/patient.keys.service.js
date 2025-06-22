// Servicio para generar llaves.

import { generateDHKeyPairNoDownload } from "./x25519/x25519.service";
import Auth from "../auth/auth";
import { deriveAESKey } from "./crypto.utils";
import { fromBase64 } from "./file.utils";
import KeyStorage from "./cryptoKeyStorage";

export const generateAndSaveKeys = async (userId, password, nombre, token) => {
  
  const { privateBase64, publicBase64 } = await generateDHKeyPairNoDownload(nombre, password);
  const dhData = {
    usuario_id: userId,
    keyType: 'ECDH',
    publicKey: publicBase64,
  }

  // Guardar llave pública
  const dhResponse = await Auth.savePublicKey(dhData, token);
  if(dhResponse.status >= 400) {
    if(dhResponse.errors) {
      const errorValidation = Object.values(dhResponse.errors)[0];
    }
    return;
  }

  const dhPrivateData = {
    idUser: userId,
    encryptedKey: privateBase64
  }

  const dhPrivateResponse = await Auth.savePrivateKey(dhPrivateData, token);
  if(dhPrivateResponse.status >= 400) {
    if(dhPrivateResponse.errors) {
      const errorValidation = Object.values(dhPrivateResponse.errors)[0];
    }
    return;
  } 

  return privateBase64;
}

export const extractDerivedKey = async (privateKeyBase64, password) => {
  const privateKeyDecodedB64 = fromBase64(privateKeyBase64);
  const salt = privateKeyDecodedB64.slice(0, 16);
  const derivedKey = await deriveAESKey(password, salt);
  const keyBuffer = await crypto.subtle.exportKey("raw", derivedKey);
  const base64Key = btoa(String.fromCharCode(...new Uint8Array(keyBuffer)));
  KeyStorage.saveDerivedKey(base64Key);
  KeyStorage.savePrivateKey(privateKeyBase64);
}

export const getDerivedKeyFromStorage = async () => {
  const base64DerivedKey = await KeyStorage.getDerivedKey();
  const keyBuffer = new Uint8Array(atob(base64DerivedKey).split("").map(char => char.charCodeAt(0)));

  return await crypto.subtle.importKey(
    "raw",
    keyBuffer,
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"]
  );
}