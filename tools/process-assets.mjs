import { cp, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceIcon = path.join(root, "Logo-icone", "backuphub-icon.png");
const sourceIco = path.join(root, "Logo-icone", "BackupHub.ico");
const outputAssets = path.join(root, "public", "assets");
const outputScreenshots = path.join(outputAssets, "screenshots");

const screenshots = [
  {
    source: "Captura de tela 2026-07-30 134715.png",
    name: "visao-geral",
    masks: [
      { x: 85, y: 176, width: 162, height: 35, label: "Perfil principal" },
      { x: 87, y: 216, width: 520, height: 28, label: "Origem configurada" },
      { x: 784, y: 216, width: 545, height: 28, label: "Destino configurado" }
    ]
  },
  {
    source: "Captura de tela 2026-07-30 134823.png",
    name: "perfis",
    masks: [
      { x: 43, y: 202, width: 234, height: 29, label: "Perfil principal" },
      { x: 331, y: 261, width: 562, height: 45, label: "Destino configurado" },
      { x: 382, y: 388, width: 641, height: 43, label: "Origem configurada" }
    ]
  },
  {
    source: "Captura de tela 2026-07-30 134906.png",
    name: "bancos",
    masks: [
      { x: 44, y: 238, width: 252, height: 98, label: "Conexões configuradas" },
      { x: 338, y: 227, width: 576, height: 47, label: "Destino configurado" },
      { x: 338, y: 496, width: 685, height: 45, label: "Identificação local" }
    ]
  },
  {
    source: "Captura de tela 2026-07-30 134918.png",
    name: "agendamentos",
    masks: []
  }
];

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function maskSvg({ width, height, label }) {
  const textY = Math.round(height / 2) + 5;
  return Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="0.5"
        y="0.5"
        width="${width}"
        height="${height}"
        rx="3"
        fill="#f4f7fb"
        stroke="#d8e1ed"
        stroke-width="1"
      />
      <text
        x="12"
        y="${textY}"
        fill="#52627a"
        font-family="Segoe UI, Arial, sans-serif"
        font-size="13"
      >${escapeXml(label)}</text>
    </svg>
  `);
}

async function writeScreenshot({ source, name, masks }) {
  const sourcePath = path.join(root, "Screenshots", source);
  const image = sharp(sourcePath).composite(
    masks.map((mask) => ({
      input: maskSvg(mask),
      top: mask.y,
      left: mask.x
    }))
  );
  const sanitizedPng = await image.png({ compressionLevel: 9 }).toBuffer();

  await Promise.all([
    sharp(sanitizedPng)
      .png({ compressionLevel: 9 })
      .toFile(path.join(outputScreenshots, `${name}.png`)),
    sharp(sanitizedPng)
      .webp({ quality: 84, effort: 6 })
      .toFile(path.join(outputScreenshots, `${name}.webp`)),
    sharp(sanitizedPng)
      .avif({ quality: 56, effort: 6 })
      .toFile(path.join(outputScreenshots, `${name}.avif`))
  ]);
}

async function writeIcons() {
  const sizes = [32, 96, 180, 512];
  await Promise.all(
    sizes.map((size) =>
      sharp(sourceIcon)
        .resize(size, size, { fit: "contain" })
        .png({ compressionLevel: 9 })
        .toFile(path.join(outputAssets, `icon-${size}.png`))
    )
  );
  await sharp(sourceIcon)
    .resize(32, 32, { fit: "contain" })
    .png({ compressionLevel: 9 })
    .toFile(path.join(outputAssets, "favicon-32.png"));
  await cp(sourceIco, path.join(outputAssets, "backuphub.ico"));
}

await mkdir(outputScreenshots, { recursive: true });
await Promise.all([writeIcons(), ...screenshots.map(writeScreenshot)]);

console.log("Ativos públicos sanitizados e otimizados com sucesso.");
