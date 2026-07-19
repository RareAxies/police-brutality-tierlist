import ffmpeg from 'fluent-ffmpeg';
import { promises as fs } from 'fs';
import path from 'path';

const THUMBNAILS_DIR = path.join(process.cwd(), 'public', 'thumbnails');

export async function generateThumbnail(videoUrl: string, tweetId: string): Promise<string> {
  const thumbnailPath = path.join(THUMBNAILS_DIR, `${tweetId}.jpg`);
  const publicUrl = `/thumbnails/${tweetId}.jpg`;

  try {
    await fs.mkdir(THUMBNAILS_DIR, { recursive: true });

    return new Promise((resolve, reject) => {
      ffmpeg(videoUrl)
        .screenshots({
          count: 1,
          folder: THUMBNAILS_DIR,
          filename: `${tweetId}.jpg`,
          size: '640x360'
        })
        .on('end', () => resolve(publicUrl))
        .on('error', reject);
    });
  } catch (error) {
    console.error('Thumbnail generation failed', error);
    return '';
  }
}