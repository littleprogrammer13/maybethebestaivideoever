import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { fetchFrame } from '../../utils/fetchFrame';

export default async function handler(req, res) {
  const { prompt } = req.body;
  const duration = 10; // segundos
  const fps = 12;
  const totalFrames = duration * fps;

  const frames = [];
  for (let i = 0; i < totalFrames; i++) {
    const frame = await fetchFrame(prompt);
    frames.push(frame);
  }

  const ffmpeg = createFFmpeg({ log: true });
  await ffmpeg.load();

  for (let i = 0; i < frames.length; i++) {
    ffmpeg.FS('writeFile', `frame${i}.png`, await fetchFile(frames[i]));
  }

  await ffmpeg.run(
    '-r', `${fps}`,
    '-i', 'frame%d.png',
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    'video.mp4'
  );

  const data = ffmpeg.FS('readFile', 'video.mp4');
  res.setHeader('Content-Type', 'video/mp4');
  res.send(Buffer.from(data));
}
