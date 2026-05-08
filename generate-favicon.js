const sharp = require('sharp');
const fs = require('fs');

async function generate() {
  const input = 'public/images/logo.png';
  const sizes = [16, 32];
  const buffers = [];

  for (const size of sizes) {
    const buf = await sharp(input)
      .resize(size, size)
      .png()
      .toBuffer();
    buffers.push(buf);
  }

  // Simple .ico generation: concatenate PNGs with ICONDIR header (basic)
  const ico = Buffer.alloc(6 + buffers.length * 16);
  ico.writeUInt16LE(0, 0); // Reserved
  ico.writeUInt16LE(1, 2); // Type = 1 (ICO)
  ico.writeUInt16LE(buffers.length, 4); // Count
  let offset = 6 + buffers.length * 16;
  for (let i = 0; i < buffers.length; i++) {
    const buf = buffers[i];
    const size = buf.length;
    ico.writeUInt8(sizes[i], 6 + i * 16); // Width
    ico.writeUInt8(sizes[i], 6 + i * 16 + 1); // Height
    ico.writeUInt8(0, 6 + i * 16 + 2); // Color count
    ico.writeUInt8(0, 6 + i * 16 + 3); // Reserved
    ico.writeUInt16LE(0, 6 + i * 16 + 4); // Planes
    ico.writeUInt16LE(32, 6 + i * 16 + 6); // Bit count
    ico.writeUInt32LE(size, 6 + i * 16 + 8); // Image size
    ico.writeUInt32LE(offset, 6 + i * 16 + 12); // Image offset
    offset += size;
  }
  const final = Buffer.concat([ico, ...buffers]);
  fs.writeFileSync('public/favicon.ico', final);
  console.log('favicon.ico generated with sizes:', sizes);
}

generate().catch(console.error);
