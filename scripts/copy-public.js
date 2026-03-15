#!/usr/bin/env node

/**
 * Copy public folder to standalone build
 * This ensures images and static files are available in Railway deployment
 */

const fs = require('fs');
const path = require('path');

function copyFolderSync(from, to) {
  if (!fs.existsSync(to)) {
    fs.mkdirSync(to, { recursive: true });
  }
  
  fs.readdirSync(from).forEach(element => {
    const fromPath = path.join(from, element);
    const toPath = path.join(to, element);
    
    if (fs.lstatSync(fromPath).isFile()) {
      fs.copyFileSync(fromPath, toPath);
    } else {
      copyFolderSync(fromPath, toPath);
    }
  });
}

const publicDir = path.join(process.cwd(), 'public');
const standalonePublicDir = path.join(process.cwd(), '.next', 'standalone', 'public');

if (fs.existsSync(publicDir)) {
  console.log('📁 Copying public folder to standalone build...');
  copyFolderSync(publicDir, standalonePublicDir);
  console.log('✅ Public folder copied successfully!');
  
  // Verify images were copied
  const imagesDir = path.join(standalonePublicDir, 'images');
  if (fs.existsSync(imagesDir)) {
    const imageCount = fs.readdirSync(imagesDir).length;
    console.log(`✅ ${imageCount} items found in images directory`);
  }
} else {
  console.error('❌ Public folder not found!');
  process.exit(1);
}
