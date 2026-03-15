const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'public', 'images');

// قائمة صور الأقسام التي تحتاج ضغط
const departmentImages = [
  'accounting.png',
  'buffet.png',
  'ceramics.png',
  'chairman-office.png',
  'commerce.png',
  'company-engineers.png',
  'contracts.png',
  'customer-service.png',
  'department-managers.png',
  'electricity-showroom.png',
  'furniture.png',
  'general-manager.png',
  'hr.png',
  'inspections.png',
  'it.png',
  'legal.png',
  'marble-showroom.png',
  'operations.png',
  'paint-showroom.png',
  'social-media.png',
  'technical-office.png',
  'telesales.png',
  'Car.png',
  'executive-leadership.png',
  'warehouse_workers_design.png',
  'storage_workers_design.png',
  'bot-avatar.png',
  'تصريح اعمال.png',
  'دليل شوقي.png'
];

async function compressImage(imageName) {
  const inputPath = path.join(imagesDir, imageName);
  const outputPath = path.join(imagesDir, imageName);
  
  if (!fs.existsSync(inputPath)) {
    console.log(`❌ الملف غير موجود: ${imageName}`);
    return;
  }

  try {
    const stats = fs.statSync(inputPath);
    const originalSize = (stats.size / 1024).toFixed(2);
    
    // ضغط الصورة بجودة 70% وتقليل الأبعاد إلى 800px كحد أقصى
    await sharp(inputPath)
      .resize(800, 800, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .png({ quality: 70, compressionLevel: 9 })
      .toFile(outputPath + '.tmp');
    
    // استبدال الملف الأصلي
    fs.renameSync(outputPath + '.tmp', outputPath);
    
    const newStats = fs.statSync(outputPath);
    const newSize = (newStats.size / 1024).toFixed(2);
    const reduction = ((1 - newStats.size / stats.size) * 100).toFixed(1);
    
    console.log(`✅ ${imageName}: ${originalSize}KB → ${newSize}KB (تقليل ${reduction}%)`);
  } catch (error) {
    console.error(`❌ خطأ في ضغط ${imageName}:`, error.message);
  }
}

async function compressAll() {
  console.log('🚀 بدء ضغط الصور...\n');
  
  for (const image of departmentImages) {
    await compressImage(image);
  }
  
  console.log('\n✅ تم الانتهاء من ضغط جميع الصور!');
}

compressAll();
