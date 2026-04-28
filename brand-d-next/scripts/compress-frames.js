const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputDir = path.join(__dirname, '..', 'public', 'scrolldown');
const outputDir = path.join(__dirname, '..', 'public', 'scrolldown-compressed');

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.webp'));
console.log(`Found ${files.length} WebP frames. Compressing to new folder...`);

let totalBefore = 0;
let totalAfter = 0;

async function compressAll() {
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);

    totalBefore += fs.statSync(inputPath).size;

    await sharp(inputPath)
      .resize(960, 540, { fit: 'cover', withoutEnlargement: true })
      .webp({ quality: 55, effort: 6, smartSubsample: true })
      .toFile(outputPath);

    totalAfter += fs.statSync(outputPath).size;
    process.stdout.write(`\r  Processed ${files.indexOf(file) + 1}/${files.length}`);
  }

  console.log(`\n\nBefore: ${(totalBefore / 1024 / 1024).toFixed(2)} MB`);
  console.log(`After:  ${(totalAfter  / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Saved:  ${((totalBefore - totalAfter) / 1024 / 1024).toFixed(2)} MB`);
  console.log(`\nOutput is at: public/scrolldown-compressed/`);
  console.log(`Now rename it: scrolldown-old -> keep as backup, scrolldown-compressed -> scrolldown`);
}

compressAll().catch(console.error);
