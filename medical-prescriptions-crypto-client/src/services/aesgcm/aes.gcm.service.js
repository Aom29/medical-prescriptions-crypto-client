import { decryptAESGCM } from "../crypto/crypto.utils";

export async function decryptWithPasswordAndWrappedKey({
  wrappedAESKeyBase64,     // clave AES cifrada con AES-GCM (formato: IV + ciphertext)
  cipherTextBase64,        // contenido cifrado con esa clave AES
  privateKeyEncrypted,     // clave privada cifrada con AES-GCM (formato: salt + IV + ciphertext)
  password                 // contraseña del usuario
}) {
  try {
    // === Paso 1: descifrar la clave privada con AES-GCM (salt + iv + ciphertext) ===
    const encryptedKeyBytes = Uint8Array.from(atob(privateKeyEncrypted), c => c.charCodeAt(0));
    const salt = encryptedKeyBytes.slice(0, 16);
    const ivKey = encryptedKeyBytes.slice(16, 28);
    const ciphertextKey = encryptedKeyBytes.slice(28);

    const decryptedPrivateKeyBytes = await decryptAESGCM(ciphertextKey, password, salt, ivKey);

    // === Paso 2: descifrar la clave AES que está envuelta con AES-GCM ===
    const wrappedKeyBytes = Uint8Array.from(atob(wrappedAESKeyBase64), c => c.charCodeAt(0));
    const ivWrapped = wrappedKeyBytes.slice(0, 12);
    const wrappedCipher = wrappedKeyBytes.slice(12);

    const wrappingKey = await crypto.subtle.importKey(
      "raw",
      decryptedPrivateKeyBytes,
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

    // === Paso 3: descifrar el contenido final con esa AES key ===
    const encryptedContent = Uint8Array.from(atob(cipherTextBase64), c => c.charCodeAt(0));
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
