// Exemplo usando uma API pública de imagens AI sem token (ex: HuggingFace demo ou outro endpoint público)
import fetch from 'node-fetch';

export async function fetchFrame(prompt) {
  // API pública que não exige autenticação
  const response = await fetch(`https://hf.space/embed/akhaliq/ai-image-generation-demo/+/api/predict/?prompt=${encodeURIComponent(prompt)}`);
  const data = await response.json();

  // Supondo que a API retorne a imagem em base64
  const base64 = data.data[0];
  const buffer = Buffer.from(base64, 'base64');
  return buffer;
}
