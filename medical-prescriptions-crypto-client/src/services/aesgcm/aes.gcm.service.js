import { decryptAESGCM } from "../crypto/crypto.utils";
import { fromBase64 } from "../crypto/file.utils";
import { x25519 } from "@noble/curves/ed25519";

/**
 * Flujo completo: descifra el contenido final usando una clave privada cifrada, una contraseña y una clave pública del servidor.
 *
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
  password,
  serverPublicKeyBase64
}) {
  try {
    const encryptedKeyBytes = fromBase64(privateKeyEncrypted);
    const salt = encryptedKeyBytes.slice(0, 16);
    const ivKey = encryptedKeyBytes.slice(16, 28);
    const ciphertextKey = encryptedKeyBytes.slice(28);

    const decryptedPrivateKeyBytes = await decryptAESGCM(
      ciphertextKey,
      password,
      salt,
      ivKey
    );

    // === Paso 2: derivar secreto compartido con la pública del servidor ===
    const serverPublicKeyBytes = fromBase64(serverPublicKeyBase64);
    const sharedSecret = x25519.getSharedSecret(decryptedPrivateKeyBytes, serverPublicKeyBytes);

    // === Paso 3: descifrar AES key envuelta con AES-GCM ===
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

    const aesKeyBytes = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: ivWrapped,
        tagLength: 128
      },
      wrappingKey,
      wrappedCipher
    );

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
