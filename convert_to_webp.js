const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, 'public');
const srcDir = path.join(__dirname, 'src');

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else {
      const ext = path.extname(fullPath).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        const newPath = fullPath.substring(0, fullPath.lastIndexOf('.')) + '.webp';
        console.log(`Converting ${fullPath} to webp...`);
        try {
          await sharp(fullPath).webp({ quality: 80 }).toFile(newPath);
          fs.unlinkSync(fullPath); // Delete old file
        } catch (e) {
          console.error(`Failed to convert ${fullPath}:`, e);
        }
      }
    }
  }
}

function updateReferences(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      updateReferences(fullPath);
    } else {
      const ext = path.extname(fullPath).toLowerCase();
      if (['.ts', '.tsx', '.js', '.jsx', '.json', '.css'].includes(ext)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        // Simple replace for common image extensions
        const updated = content
          .replace(/\.png/gi, '.webp')
          .replace(/\.jpg/gi, '.webp')
          .replace(/\.jpeg/gi, '.webp');
        if (content !== updated) {
          console.log(`Updating references in ${fullPath}`);
          fs.writeFileSync(fullPath, updated, 'utf8');
        }
      }
    }
  }
}

async function run() {
  console.log('Starting conversion of public/ assets...');
  await processDirectory(publicDir);
  console.log('Conversion complete.');
  
  console.log('Updating references in src/ ...');
  updateReferences(srcDir);
  console.log('All done.');
}

run();
