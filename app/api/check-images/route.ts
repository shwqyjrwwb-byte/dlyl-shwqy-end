import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  const results: any = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    checks: {}
  }

  try {
    // Check 1: Does public directory exist?
    const publicDir = path.join(process.cwd(), 'public')
    results.checks.publicDirExists = fs.existsSync(publicDir)
    results.checks.publicDirPath = publicDir

    if (results.checks.publicDirExists) {
      // Check 2: Does images directory exist?
      const imagesDir = path.join(publicDir, 'images')
      results.checks.imagesDirExists = fs.existsSync(imagesDir)
      results.checks.imagesDirPath = imagesDir

      if (results.checks.imagesDirExists) {
        // Check 3: List all files in images directory
        const allFiles = fs.readdirSync(imagesDir)
        results.checks.totalFiles = allFiles.length
        results.checks.sampleFiles = allFiles.slice(0, 30) // First 30 files

        // Check 4: Count by extension
        const extensions: Record<string, number> = {}
        allFiles.forEach(file => {
          const ext = path.extname(file).toLowerCase()
          extensions[ext] = (extensions[ext] || 0) + 1
        })
        results.checks.filesByExtension = extensions

        // Check 5: Check specific department images
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
          'executive-leadership.png',
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
        ]

        const departmentImagesStatus: Record<string, boolean> = {}
        departmentImages.forEach(img => {
          const imgPath = path.join(imagesDir, img)
          departmentImagesStatus[img] = fs.existsSync(imgPath)
        })
        results.checks.departmentImages = departmentImagesStatus

        // Check 6: Check subdirectories
        const subdirs = ['areas', 'finishing-stages', 'hero-slideshow', 'icons']
        const subdirStatus: Record<string, any> = {}
        subdirs.forEach(subdir => {
          const subdirPath = path.join(imagesDir, subdir)
          if (fs.existsSync(subdirPath)) {
            const files = fs.readdirSync(subdirPath)
            subdirStatus[subdir] = {
              exists: true,
              fileCount: files.length,
              sampleFiles: files.slice(0, 5)
            }
          } else {
            subdirStatus[subdir] = { exists: false }
          }
        })
        results.checks.subdirectories = subdirStatus
      }
    }

    results.success = true
    return NextResponse.json(results, { status: 200 })

  } catch (error: any) {
    results.success = false
    results.error = error.message
    results.stack = error.stack
    return NextResponse.json(results, { status: 500 })
  }
}
