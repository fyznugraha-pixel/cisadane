const sharp = require('sharp');

async function processIcon() {
  try {
    const input = 'public/logo/icon.png';
    const metadata = await sharp(input).metadata();
    
    console.log(`Original size: ${metadata.width}x${metadata.height}`);
    
    // Crop the leftmost part (assume square mark)
    // Adjust width to be equal to height
    const size = metadata.height;
    
    await sharp(input)
      .extract({ left: 0, top: 0, width: size, height: size })
      .toFile('src/app/icon.png');
      
    console.log('Cropped successfully to a square favicon!');
  } catch (error) {
    console.error('Error processing image:', error);
  }
}

processIcon();
