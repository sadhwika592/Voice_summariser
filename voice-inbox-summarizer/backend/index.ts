
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { exec } from 'child_process';
import fs from 'fs';
import { Configuration, OpenAIApi } from 'openai';

const app = express();
const port = 5000;

app.use(cors());
const upload = multer({ dest: 'uploads/' });

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

app.post('/upload', upload.single('audio'), async (req, res) => {
  const audioPath = req.file.path;

  exec(`python3 whisper_transcribe.py ${audioPath}`, async (error, stdout, stderr) => {
    if (error) {
      console.error(`Whisper error: ${error}`);
      return res.status(500).send('Transcription failed');
    }

    const transcript = fs.readFileSync('transcripts/output.txt', 'utf-8');

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Summarize this voice message in 2-3 bullet points.' },
        { role: 'user', content: transcript }
      ]
    });

    res.json({ summary: completion.data.choices[0].message?.content });
  });
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
