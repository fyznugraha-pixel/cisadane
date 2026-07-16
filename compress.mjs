import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dir = 'public/images/highlights';
const backupDir = 'public/images/highlights_backup';

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

const files = fs.readdirSync(dir);

async function compressAll() {
  for (const file of files) {
    if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
      const inputPath = path.join(dir, file);
      const backupPath = path.join(backupDir, file);
      
      // Copy to backup
      fs.copyFileSync(inputPath, backupPath);
      
      console.log(`Compressing ${file}...`);
      const tempPath = path.join(dir, 'temp_' + file);
      
      await sharp(backupPath)
        .resize({ width: 1200, withoutEnlargement: true })
        .jpeg({ quality: 65, mozjpeg: true })
        .toFile(tempPath);
        
      fs.renameSync(tempPath, inputPath);
      console.log(`Finished ${file}`);
    }
  }
  console.log('Done!');
}

compressAll().catch(console.error);
