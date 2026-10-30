import fs from 'node:fs/promises';
import path from 'node:path';

const fontsDir = new URL('../public/fonts/', import.meta.url);

const googleFontsCssUrl =
  'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500&family=Manrope:wght@400;500;600;700;800&family=Sora:wght@500;600;700;800&display=swap';

async function ensureDir(url) {
  await fs.mkdir(url, { recursive: true });
}

async function fetchText(url, init = {}) {
  const response = await fetch(url, init);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  return response.text();
}

async function downloadFile(url, destination) {
  const response = await fetch(url, {
    headers: {
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status} ${response.statusText}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(destination, buffer);
}

async function vendorFonts() {
  await ensureDir(fontsDir);
  const licensesDir = new URL('licenses/', fontsDir);
  await ensureDir(licensesDir);
  await Promise.all(['manrope', 'sora', 'ibmplexmono'].map((family) =>
    downloadFile(`https://raw.githubusercontent.com/google/fonts/main/ofl/${family}/OFL.txt`, new URL(`${family}-OFL.txt`, licensesDir))
  ));

  const css = await fetchText(googleFontsCssUrl, {
    headers: {
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
    },
  });

  const seen = new Map();
  const rewrittenCss = css.replace(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g, (match, fontUrl) => {
    const filename = path.basename(new URL(fontUrl).pathname);
    seen.set(fontUrl, filename);
    return `url("/fonts/${filename}")`;
  });

  await Promise.all(
    [...seen.entries()].map(([fontUrl, filename]) =>
      downloadFile(fontUrl, new URL(filename, fontsDir))
    )
  );

  const faces = new Map();
  for (const match of rewrittenCss.matchAll(/@font-face\s*\{[^}]+\}/g)) {
    const block = match[0];
    const family = block.match(/font-family: '([^']+)'/)[1];
    const key = `${family}:${block.match(/src: ([^;]+)/)[1]}`;
    if (!faces.has(key)) {
      faces.set(key, block.replace(/font-weight: [^;]+;/, `font-weight: ${family === 'Manrope' ? '400 800' : family === 'Sora' ? '500 800' : '500'};`));
    }
  }
  await fs.writeFile(new URL('google-fonts.css', fontsDir), [...faces.values()].join('\n') + '\n');
}

async function main() {
  await vendorFonts();
  console.log('Vendored local fonts.');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
