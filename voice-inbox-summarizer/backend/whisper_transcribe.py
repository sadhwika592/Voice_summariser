
import sys
import whisper

model = whisper.load_model("base")
audio_path = sys.argv[1]
result = model.transcribe(audio_path)

with open("transcripts/output.txt", "w") as f:
    f.write(result["text"])
