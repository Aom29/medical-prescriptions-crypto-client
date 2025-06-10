const encoder = new TextEncoder();

export async function deriveAESKey(password, salt) {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100_000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

export async function encryptAESGCM(data, password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const aesKey = await deriveAESKey(password, salt);
  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, aesKey, data);
  return { ciphertext, salt, iv };
}

export async function decryptAESGCM(ciphertext, password, salt, iv) {
  const aesKey = await deriveAESKey(password, salt);
  return await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, aesKey, ciphertext);
}
