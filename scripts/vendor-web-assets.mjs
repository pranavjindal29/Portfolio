import fs from 'node:fs/promises';
import path from 'node:path';

const projectRoot = new URL('..', import.meta.url);
const fontsDir = new URL('../public/fonts/', import.meta.url);
const iconifyDir = new URL('../src/data/iconify/', import.meta.url);

const googleFontsCssUrl =
  'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600&family=Manrope:wght@400;500;600;700;800&family=Sora:wght@500;600;700;800&display=swap';

const iconCollections = {
  logos: [
    'python',
    'java',
    'postgresql',
    'nodejs-icon',
    'flask',
    'docker-icon',
    'tensorflow',
    'aws',
    'microsoft-azure',
    'google-cloud',
    'vercel-icon',
    'netlify',
    'cloudflare-icon',
    'react',
    'android-icon',
    'tailwindcss-icon',
    'git-icon',
    'visual-studio-code',
    'intellij-idea',
    'raspberry-pi',
  ],
  'skill-icons': ['javascript', 'cpp', 'linux-light', 'html', 'css'],
  carbon: ['sql', 'chart-scatter', 'matrix', 'chart-bubble'],
  mdi: [
    'cube-outline',
    'database-cog-outline',
    'api',
    'graph-outline',
    'file-chart-outline',
    'sigma',
    'tune-vertical',
    'check-decagram-outline',
    'tune-variant',
    'transit-connection-variant',
    'database-sync-outline',
    'chart-line-variant',
    'camera-outline',
    'brain',
    'text-search-variant',
    'compare-horizontal',
    'star-box-multiple-outline',
    'chart-scatter-plot-hexbin',
    'chart-bell-curve-cumulative',
    'camera-wireless-outline',
    'image-filter-center-focus',
    'target',
    'history',
    'percent-circle-outline',
    'source-branch-sync',
    'signal-5g',
    'radio-tower',
    'antenna',
    'access-point-network',
    'cellphone-wireless',
    'lan-connect',
    'router-network',
    'swap-horizontal-bold',
    'shield-lock-outline',
    'server-network-outline',
    'account-network-outline',
    'connection',
    'lan-pending',
    'github',
    'chip',
    'vector-polygon',
    'image-outline',
    'map-outline',
  ],
  'simple-icons': ['pydantic', 'apachespark', 'oracle', 'nvidia'],
  devicon: ['scikitlearn'],
  ph: ['eye-bold'],
  fluent: ['arrow-trending-lines-24-filled'],
};

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

async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  return response.json();
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

  await fs.writeFile(new URL('google-fonts.css', fontsDir), rewrittenCss);
}

async function vendorIconCollections() {
  await ensureDir(iconifyDir);

  await Promise.all(
    Object.entries(iconCollections).map(async ([prefix, icons]) => {
      const url = `https://api.iconify.design/${prefix}.json?icons=${icons.join(',')}`;
      const data = await fetchJson(url);
      await fs.writeFile(
        new URL(`${prefix}.json`, iconifyDir),
        `${JSON.stringify(data, null, 2)}\n`
      );
    })
  );
}

async function main() {
  await vendorFonts();
  await vendorIconCollections();
  console.log('Vendored fonts and Iconify collections.');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
