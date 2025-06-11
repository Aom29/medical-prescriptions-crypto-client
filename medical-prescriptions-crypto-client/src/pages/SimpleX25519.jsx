import { useState } from 'react';
import {
  generateDHKeyPair,
  computeSharedSecret
} from '../services/x25519/x25519.service';

export default function SimpleX25519Page() {
  const [identifier, setIdentifier] = useState('');
  const [privateKeyFile, setPrivateKeyFile] = useState(null);
  const [publicKeyFile, setPublicKeyFile] = useState(null);
  const [sharedSecret, setSharedSecret] = useState('');

  const handleGenerar = async () => {
    if (!identifier) return alert('Debes ingresar un identificador');
    const password = prompt('Contraseña para cifrar la clave privada:');
    if (!password) return;
    await generateDHKeyPair(identifier, password);
    alert('Llaves generadas');
  };

  const handleDerivar = async () => {
    if (!privateKeyFile || !publicKeyFile) return alert('Faltan archivos');
    const password = prompt('Contraseña de la clave privada:');
    if (!password) return;
    const secret = await computeSharedSecret(privateKeyFile, password, publicKeyFile);
    setSharedSecret(secret);
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h2>Key Agreement con X25519</h2>

      <section style={{ marginBottom: 20 }}>
        <h4>Generar claves</h4>
        <input
          type="text"
          placeholder="Identificador (ej. usuario1)"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
        <button onClick={handleGenerar}>Generar y descargar llaves</button>
      </section>

      <section style={{ marginBottom: 20 }}>
        <h4>Derivar secreto compartido</h4>
        <p>Tu clave privada (.key):</p>
        <input type="file" accept=".key" onChange={(e) => setPrivateKeyFile(e.target.files[0])} />
        <p>Clave pública del otro usuario (.pub):</p>
        <input type="file" accept=".pub" onChange={(e) => setPublicKeyFile(e.target.files[0])} />
        <button onClick={handleDerivar}>Derivar secreto</button>
        {sharedSecret && (
          <div>
            <p><strong>Secreto compartido:</strong></p>
            <textarea readOnly rows={3} style={{ width: '100%' }} value={sharedSecret}></textarea>
          </div>
        )}
      </section>
    </div>
  );
}
