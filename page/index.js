import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const gerarVideo = async () => {
    setLoading(true);
    const res = await fetch('/api/gerar-video', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const blob = await res.blob();
    setVideoUrl(URL.createObjectURL(blob));
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Gerador de Vídeo AI (Vercel)</h1>
      <input
        type="text"
        placeholder="Digite o prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={gerarVideo}>{loading ? 'Gerando...' : 'Gerar Vídeo'}</button>

      {videoUrl && (
        <div>
          <video src={videoUrl} controls width={400} />
        </div>
      )}
    </div>
  );
}
