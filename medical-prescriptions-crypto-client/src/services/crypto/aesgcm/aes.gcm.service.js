import { decryptAESGCM, decryptAESGCMwithDerivedKey } from "../crypto.utils";
import { fromBase64 } from "../file.utils";
import { x25519 } from "@noble/curves/ed25519";

/**
 * @param {Object} params
 * @param {string} params.wrappedAESKeyBase64 - Clave AES cifrada con AES-GCM (base64)
 * @param {string} params.cipherTextBase64 - Contenido cifrado con esa AES key (base64)
 * @param {string} params.privateKeyEncrypted - Clave privada cifrada con AES-GCM (salt + IV + ciphertext, en base64)
 * @param {string} params.password - Contraseña para descifrar la clave privada
 * @param {string} params.serverPublicKeyBase64 - Clave pública del servidor (base64)
 * @returns {Promise<string>} contenido descifrado en texto
 */
export async function decryptWithPasswordAndWrappedKey({
  wrappedAESKeyBase64,
  cipherTextBase64,
  privateKeyEncrypted,
  derivedKey,
  serverPublicKeyBase64,
}) {
  try {
    console.log("derivedKey:", derivedKey);
    const encryptedKeyBytes = fromBase64(privateKeyEncrypted);
    const ivKey = encryptedKeyBytes.slice(16, 28);
    const ciphertextKey = encryptedKeyBytes.slice(28);
    const decryptedPrivateKeyBytes = await decryptAESGCMwithDerivedKey(
      ciphertextKey,
      ivKey,
      derivedKey
    );
    const privateKeyDecrypted = new Uint8Array(decryptedPrivateKeyBytes);
    
    const serverPublicKeyBytes = fromBase64(serverPublicKeyBase64);
    const sharedSecret = x25519.getSharedSecret(privateKeyDecrypted, serverPublicKeyBytes);
    // === Descifrar AES key envuelta con AES-GCM ===
    const wrappedKeyBytes = fromBase64(wrappedAESKeyBase64);
    const ivWrapped = wrappedKeyBytes.slice(0, 12);
    const wrappedCipher = wrappedKeyBytes.slice(12);
    
    const wrappingKey = await crypto.subtle.importKey(
      "raw",
      sharedSecret,
      { name: "AES-GCM" },
      false,
      ["decrypt"]
    );
    
      console.log("→ Shared secret (raw):", sharedSecret);
      console.log("→ Wrapped key bytes length:", wrappedKeyBytes.length);
      // console.log("→ AES Key Bytes (exported):", new Uint8Array(aesKeyBytes));
      // console.log("→ Final content IV:", ivContent);
      // console.log("→ Final ciphertext length:", cipherContent.length);

    const aesKeyBytes = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: ivWrapped,
        tagLength: 128
      },
      wrappingKey,
      wrappedCipher
    );
    console.log('hola');
    
    // === Paso 4: descifrar el contenido final con esa AES key ===
    const encryptedContent = fromBase64(cipherTextBase64);
    const ivContent = encryptedContent.slice(0, 12);
    const cipherContent = encryptedContent.slice(12);

    const aesContentKey = await crypto.subtle.importKey(
      "raw",
      aesKeyBytes,
      { name: "AES-GCM" },
      false,
      ["decrypt"]
    );

    const decryptedFinal = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: ivContent,
        tagLength: 128
      },
      aesContentKey,
      cipherContent
    );

    return new TextDecoder().decode(decryptedFinal);
  } catch (error) {
    console.error("Error en el flujo completo de descifrado:", error);
    throw error;
  }
}
