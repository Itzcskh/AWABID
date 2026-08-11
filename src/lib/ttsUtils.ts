/**
 * Utility for client-side audio streaming & chunked Google Translate TTS concatenation
 */

/**
 * Split text into chunks of <= 150 characters on sentence / punctuation boundaries
 */
export function splitTextIntoChunks(text: string, maxLen = 140): string[] {
  // Strip cite markers like [cite: 1] or [1] before TTS
  const cleanText = text.replace(/\[cite:\s*\d+\]|\[\d+\]/g, '').trim();
  if (cleanText.length <= maxLen) return [cleanText];

  const sentences = cleanText.split(/(?<=[.!?،؛\n])\s+/);
  const chunks: string[] = [];
  let currentChunk = '';

  for (const sentence of sentences) {
    if ((currentChunk + ' ' + sentence).trim().length <= maxLen) {
      currentChunk = (currentChunk + ' ' + sentence).trim();
    } else {
      if (currentChunk) chunks.push(currentChunk);
      if (sentence.length > maxLen) {
        // Fallback word split if a single sentence is too long
        const words = sentence.split(' ');
        let temp = '';
        for (const w of words) {
          if ((temp + ' ' + w).trim().length <= maxLen) {
            temp = (temp + ' ' + w).trim();
          } else {
            if (temp) chunks.push(temp);
            temp = w;
          }
        }
        if (temp) currentChunk = temp;
        else currentChunk = '';
      } else {
        currentChunk = sentence;
      }
    }
  }
  if (currentChunk) chunks.push(currentChunk);
  return chunks.filter((c) => c.length > 0);
}

/**
 * Play a sequence of audio URLs (chunks) sequentially in an HTML Audio element
 */
export class SequentialAudioPlayer {
  private urls: string[] = [];
  private currentIndex = 0;
  private audio: HTMLAudioElement | null = null;
  private onEndCallback?: () => void;
  private onProgressCallback?: (progressPercent: number) => void;
  private isPlaying = false;

  constructor(
    urls: string[],
    onEnd?: () => void,
    onProgress?: (percent: number) => void
  ) {
    this.urls = urls;
    this.onEndCallback = onEnd;
    this.onProgressCallback = onProgress;
  }

  public play() {
    if (this.urls.length === 0) return;
    this.isPlaying = true;
    this.playChunk(this.currentIndex);
  }

  private playChunk(index: number) {
    if (index >= this.urls.length) {
      this.isPlaying = false;
      this.currentIndex = 0;
      if (this.onProgressCallback) this.onProgressCallback(100);
      if (this.onEndCallback) this.onEndCallback();
      return;
    }

    this.currentIndex = index;
    const url = this.urls[index];
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
    }

    this.audio = new Audio(url);
    this.audio.addEventListener('ended', () => {
      this.playChunk(index + 1);
    });

    this.audio.addEventListener('timeupdate', () => {
      if (!this.audio) return;
      const chunkPercent = (this.audio.currentTime / (this.audio.duration || 1)) / this.urls.length;
      const totalPercent = (index / this.urls.length) * 100 + chunkPercent * 100;
      if (this.onProgressCallback) this.onProgressCallback(Math.min(99, Math.round(totalPercent)));
    });

    this.audio.play().catch((err) => {
      console.warn('Audio play chunk error, skipping to next:', err);
      this.playChunk(index + 1);
    });
  }

  public pause() {
    this.isPlaying = false;
    if (this.audio) {
      this.audio.pause();
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = null;
    }
    this.currentIndex = 0;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}
