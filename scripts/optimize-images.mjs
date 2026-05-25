import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const ROOT = 'src/assets/images';
const DIRS = ['tobc', 'cafelog', 'one-pagers'];

async function optimizeFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) return;

  const buf = await fs.readFile(filePath);
  const pipeline = sharp(buf).rotate();

  if (ext === '.png') {
    await pipeline.png({ quality: 80, compressionLevel: 9 }).toFile(filePath);
    const webpPath = filePath.replace(/\.png$/i, '.webp');
    await sharp(buf).rotate().webp({ quality: 82 }).toFile(webpPath);
    console.log('optimized', filePath, '+', webpPath);
  } else {
    await pipeline.jpeg({ quality: 82, mozjpeg: true }).toFile(filePath);
    console.log('optimized', filePath);
  }
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else await optimizeFile(full);
  }
}

for (const sub of DIRS) {
  await walk(path.join(ROOT, sub));
}
