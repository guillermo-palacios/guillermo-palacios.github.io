// Turns the raw images in ContenidoMedia/ (not versioned) into the masters in src/assets/, from
// which Astro builds the AVIF/WebP srcset (PLAN §5). Run by hand when a source image changes:
//   node scripts/optimize-images.mjs
// Not part of CI, since ContenidoMedia/ is not in the repository. Paths are relative to the repo
// and the output only depends on the inputs and the sharp version, so re-running is safe.
// sharp drops EXIF (and with it GPS), XMP, IPTC and ICC unless asked to keep them; every output
// is read back from disk and checked, and the script fails if any of them is still there.
import { access, mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const SOURCE_DIR = 'ContenidoMedia/';
const TARGET_DIR = 'src/assets/';
const root = new URL('../', import.meta.url);
const toPath = (relative) => fileURLToPath(new URL(relative, root));

const jobs = [
  {
    from: 'RetratoProfesional.png',
    to: 'portrait/portrait.webp',
    // Lossy WebP keeps the alpha channel (lossless alpha by default).
    encode: (image) =>
      image
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 90, effort: 6 }),
    alpha: true,
  },
  ...[1, 2, 3, 4, 5].map((n) => ({
    from: `CapturaMoodnest${n}.jpeg`,
    to: `moodnest/moodnest-${n}.jpg`,
    // Light recompression at their own size (never resized, so never upscaled): the sources
    // are already ~q80, and q85 keeps the extra generation loss small.
    encode: (image) => image.jpeg({ quality: 85, mozjpeg: true }),
    alpha: false,
  })),
];

// Metadata carriers by container: WebP RIFF chunks and JPEG APPn segments (APP1 = EXIF or XMP,
// APP2 = ICC, APP13 = IPTC). GPS only exists inside EXIF.
const FORBIDDEN = {
  webp: ['EXIF', 'XMP', 'ICCP'],
  jpeg: ['APP1', 'APP2', 'APP13'],
};

function listSegments(buffer, format) {
  const segments = [];
  if (format === 'webp') {
    for (let i = 12; i + 8 <= buffer.length;) {
      const size = buffer.readUInt32LE(i + 4);
      segments.push(buffer.toString('latin1', i, i + 4).trim());
      i += 8 + size + (size % 2);
    }
    return segments;
  }
  // JPEG marker segments up to the start of scan (SOS); entropy-coded data follows it.
  for (let i = 2; i + 4 <= buffer.length && buffer[i] === 0xff;) {
    const marker = buffer[i + 1];
    segments.push(
      marker >= 0xe0 && marker <= 0xef
        ? `APP${marker - 0xe0}`
        : `0x${marker.toString(16).toUpperCase()}`,
    );
    if (marker === 0xda) break;
    i += 2 + buffer.readUInt16BE(i + 2);
  }
  return segments;
}

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

try {
  await access(toPath(SOURCE_DIR));
} catch {
  console.error(
    `${SOURCE_DIR} not found: this script needs the raw media folder.`,
  );
  process.exit(1);
}

for (const job of jobs) {
  const input = `${SOURCE_DIR}${job.from}`;
  const output = `${TARGET_DIR}${job.to}`;
  await mkdir(dirname(toPath(output)), { recursive: true });
  await writeFile(
    toPath(output),
    await job.encode(sharp(toPath(input))).toBuffer(),
  );

  const buffer = await readFile(toPath(output));
  const meta = await sharp(buffer).metadata();
  const segments = listSegments(buffer, meta.format);
  const carriers = ['exif', 'xmp', 'iptc', 'icc'].filter((key) => meta[key]);
  const forbidden = segments.filter((id) =>
    FORBIDDEN[meta.format].includes(id),
  );
  if (carriers.length > 0 || forbidden.length > 0) {
    throw new Error(
      `${output} still carries metadata: ${[...carriers, ...forbidden]}`,
    );
  }
  if (meta.hasAlpha !== job.alpha) {
    throw new Error(
      `${output}: expected alpha ${job.alpha}, got ${meta.hasAlpha}`,
    );
  }

  const before = (await stat(toPath(input))).size;
  console.log(
    `${output}: ${kb(before)} -> ${kb(buffer.length)}, ${meta.width}x${meta.height}, ` +
      `alpha ${meta.hasAlpha}, segments [${segments.join(' ')}], metadata none`,
  );
}
