import { useState } from 'react';
import {
  generateKeyPair,
  signFile,
  verifyFile
} from '../services/eddsa/eddsa.service';

export default function SimpleEdDSA() {
  const [fileToSign, setFileToSign] = useState(null);
  const [fileToVerify, setFileToVerify] = useState(null);
  const [privateKeyFile, setPrivateKeyFile] = useState(null);
  const [publicKeyFile, setPublicKeyFile] = useState(null);
  const [signatureFile, setSignatureFile] = useState(null);
  const [firmaBase64, setFirmaBase64] = useState('');
  const [resultadoVerificacion, setResultadoVerificacion] = useState(null);

  const handleGenerarLlaves = async () => {
    const password = prompt('Contraseña para cifrar la clave privada:');
    if (!password) return;
    await generateKeyPair(password);
    alert('Llaves generadas y descargadas');
  };

  const handleFirmar = async () => {
    if (!fileToSign || !privateKeyFile) return alert('Selecciona el archivo y la clave privada');
    const password = prompt('Contraseña de la clave privada:');
    if (!password) return;
    const { base64 } = await signFile(fileToSign, privateKeyFile, password);
    setFirmaBase64(base64);
  };

  const handleVerificar = async () => {
    if (!fileToVerify || !signatureFile || !publicKeyFile) {
      return alert('Selecciona el archivo a verificar, la firma y la clave pública');
    }
    const ok = await verifyFile(fileToVerify, signatureFile, publicKeyFile);
    setResultadoVerificacion(ok);
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h2>Firma digital EdDSA (Ed25519)</h2>

      <section style={{ marginBottom: 30 }}>
        <button onClick={handleGenerarLlaves}>🗝️ Generar Llaves</button>
      </section>

      <section style={{ marginBottom: 30 }}>
        <h4>Seleccionar archivo para firmar</h4>
        <input type="file" onChange={(e) => setFileToSign(e.target.files[0])} />
      </section>

      <section style={{ marginBottom: 30 }}>
        <h4>Firma</h4>
        <input type="file" accept=".key" onChange={(e) => setPrivateKeyFile(e.target.files[0])} />
        <button onClick={handleFirmar}>Firmar archivo</button>
        {firmaBase64 && (
          <div style={{ marginTop: 10 }}>
            <small>Firma generada (Base64):</small>
            <textarea
              readOnly
              rows={4}
              style={{ width: '100%' }}
              value={firmaBase64}
            />
          </div>
        )}
      </section>

      <section style={{ marginBottom: 30 }}>
        <h4>Verificación</h4>
        <p><small>Selecciona nuevamente el archivo original</small></p>
        <input type="file" onChange={(e) => setFileToVerify(e.target.files[0])} />
        <input type="file" accept=".sig" onChange={(e) => setSignatureFile(e.target.files[0])} />
        <input type="file" accept=".pub" onChange={(e) => setPublicKeyFile(e.target.files[0])} />
        <button onClick={handleVerificar}>Verificar firma</button>
        {resultadoVerificacion !== null && (
          <p>
            Resultado:{" "}
            <strong style={{ color: resultadoVerificacion ? "green" : "red" }}>
              {resultadoVerificacion ? "Firma válida" : "Firma inválida"}
            </strong>
          </p>
        )}
      </section>
    </div>
  );
}
