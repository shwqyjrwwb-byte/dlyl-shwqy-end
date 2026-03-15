const fs = require('fs');
const path = require('path');

// قراءة ملف contacts-table.tsx
const contactsFile = fs.readFileSync('./components/contacts-table.tsx', 'utf8');

// استخراج جميع مسارات الصور
const imageMatches = contactsFile.match(/image:\s*"([^"]+)"/g);
const imagePaths = imageMatches ? imageMatches.map(m => m.match(/"([^"]+)"/)[1]) : [];

console.log(`\n✅ عدد الصور المستخدمة: ${imagePaths.length}\n`);

// فحص كل صورة
const missingImages = [];
const existingImages = [];

imagePaths.forEach(imgPath => {
  const fullPath = path.join('./public', imgPath);
  if (fs.existsSync(fullPath)) {
    existingImages.push(imgPath);
  } else {
    missingImages.push(imgPath);
  }
});

console.log(`✅ الصور الموجودة: ${existingImages.length}`);
console.log(`❌ الصور المفقودة: ${missingImages.length}\n`);

if (missingImages.length > 0) {
  console.log('الصور المفقودة:');
  missingImages.forEach(img => console.log(`  - ${img}`));
}
