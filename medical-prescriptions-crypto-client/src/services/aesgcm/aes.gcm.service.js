export async function decryptAESGCM(base64CipherText, rawKeyBytes) {
  try {
    // Decodificar Base64
    const encryptedBytes = Uint8Array.from(atob(base64CipherText), c => c.charCodeAt(0));

    // Separar IV (12 bytes) y datos cifrados
    const iv = encryptedBytes.slice(0, 12);
    const cipherText = encryptedBytes.slice(12);

    // Importar la clave AES desde bytes
    const cryptoKey = await crypto.subtle.importKey(
      "raw",                            // clave en crudo
      rawKeyBytes,                      // ArrayBuffer o Uint8Array
      { name: "AES-GCM" },
      false,
      ["decrypt"]
    );

    // Descifrar
    const decrypted = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv,
        tagLength: 128
      },
      cryptoKey,
      cipherText
    );

    // Convertir de ArrayBuffer a string UTF-8 (opcional)
    return new TextDecoder().decode(decrypted);
  } catch (err) {
    console.error("Error en descifrado AES-GCM:", err);
    throw err;
  }
}