const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Google Play için 512x512 logo oluştur
function createLogo() {
  const size = 512;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Beyaz arka plan
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, size, size);

  // Turuncu border (2px solid #FF6000)
  const borderWidth = 8;
  const radius = (size / 2) - borderWidth / 2;
  ctx.strokeStyle = '#FF6000';
  ctx.lineWidth = borderWidth;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, radius, 0, Math.PI * 2);
  ctx.stroke();

  // Turuncu H harfi
  ctx.fillStyle = '#FF6000';
  ctx.font = 'bold 320px Inter, Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('H', size / 2, size / 2);

  // public klasörü yoksa oluştur
  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // JPEG olarak kaydet
  const jpegBuffer = canvas.toBuffer('image/jpeg', { quality: 0.95 });
  const jpegPath = path.join(__dirname, '..', 'public', 'logo.jpg');
  fs.writeFileSync(jpegPath, jpegBuffer);
  console.log(`✅ Logo oluşturuldu: ${jpegPath}`);
  console.log(`   Boyut: ${size}x${size}px`);
  console.log(`   Format: JPEG`);

  // PNG olarak kaydet
  const pngBuffer = canvas.toBuffer('image/png');
  const pngPath = path.join(__dirname, '..', 'public', 'logo.png');
  fs.writeFileSync(pngPath, pngBuffer);
  console.log(`✅ Logo oluşturuldu: ${pngPath}`);
  console.log(`   Boyut: ${size}x${size}px`);
  console.log(`   Format: PNG`);
}

createLogo();

