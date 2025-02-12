const sharp = require("sharp");
const fs = require("fs").promises;

async function generateFavicons() {
  const svgBuffer = await fs.readFile("./src/app/favicon.svg");

  // Generate PNG favicons in various sizes
  const sizes = [16, 32, 48, 64, 128, 180, 192, 512];

  for (const size of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(`./public/favicon-${size}x${size}.png`);
  }

  // Create standard favicons
  await fs.copyFile("./public/favicon-16x16.png", "./public/favicon-16x16.png");
  await fs.copyFile("./public/favicon-32x32.png", "./public/favicon-32x32.png");
  await fs.copyFile(
    "./public/favicon-180x180.png",
    "./public/apple-touch-icon.png"
  );
  await fs.copyFile(
    "./public/favicon-150x150.png",
    "./public/mstile-150x150.png"
  );

  // Copy SVG favicon
  await fs.copyFile("./src/app/favicon.svg", "./public/favicon.svg");

  // Generate ICO file
  await sharp(svgBuffer)
    .resize(32, 32)
    .toFormat("ico")
    .toFile("./public/favicon.ico");

  // Generate OG Image (1200x630 for social media)
  await sharp(svgBuffer)
    .resize(1200, 630, {
      fit: "contain",
      background: { r: 31, g: 41, b: 55, alpha: 1 }, // bg-gray-900
    })
    .png()
    .toFile("./public/og-image.png");

  console.log("✅ All favicons generated successfully!");
}

generateFavicons().catch(console.error);
