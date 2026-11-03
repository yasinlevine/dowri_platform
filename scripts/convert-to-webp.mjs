#!/usr/bin/env node
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Dowri Platform - Automated WebP Image Converter
 * Converts images of any format (.png, .jpg, .jpeg, .tiff, .bmp, .gif, .heic) to .webp
 * 
 * Usage:
 *   node scripts/convert-to-webp.mjs                 # Batch converts images in assets directories
 *   node scripts/convert-to-webp.mjs --watch         # Watches directories and converts new images in real time
 *   node scripts/convert-to-webp.mjs path/to/img.png # Converts a specific image
 *   node scripts/convert-to-webp.mjs --quality=90    # Custom quality (1-100)
 */

import fs from 'fs';
import path from 'path';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

// Configuration & Defaults
const SUPPORTED_EXTS = new Set(['.png', '.jpg', '.jpeg', '.tiff', '.tif', '.bmp', '.gif', '.heic']);
const DEFAULT_DIRECTORIES = [
  path.resolve(process.cwd(), 'src/assets/images'),
  path.resolve(process.cwd(), 'public/assets')
];

// Parse CLI Arguments
const args = process.argv.slice(2);
const isWatchMode = args.includes('--watch') || args.includes('-w');
const isForceMode = args.includes('--force') || args.includes('-f');
const isDeleteOriginal = args.includes('--delete-original');

let quality = 85;
const qualityArg = args.find(a => a.startsWith('--quality='));
if (qualityArg) {
  const parsed = parseInt(qualityArg.split('=')[1], 10);
  if (!isNaN(parsed) && parsed >= 1 && parsed <= 100) quality = parsed;
}

let outDirArg = null;
const outDirFlag = args.find(a => a.startsWith('--outDir='));
if (outDirFlag) {
  outDirArg = path.resolve(process.cwd(), outDirFlag.split('=')[1]);
}

const customPaths = args.filter(a => !a.startsWith('--') && !a.startsWith('-'));

// Terminal Color Helpers
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  dim: '\x1b[2m',
  bold: '\x1b[1m'
};

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

/**
 * Converts an image file to WebP using ImageMagick 'convert'
 */
async function convertFileToWebp(inputPath, destDir = null) {
  try {
    const ext = path.extname(inputPath).toLowerCase();
    if (!SUPPORTED_EXTS.has(ext)) {
      return null;
    }

    const dir = destDir || path.dirname(inputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const baseName = path.basename(inputPath, ext);
    const outputPath = path.join(dir, `${baseName}.webp`);

    // Skip if output exists and is newer than source, unless force flag is set
    if (!isForceMode && fs.existsSync(outputPath)) {
      const srcStat = fs.statSync(inputPath);
      const outStat = fs.statSync(outputPath);
      if (outStat.mtimeMs >= srcStat.mtimeMs) {
        return { skipped: true, inputPath, outputPath };
      }
    }

    const originalSize = fs.statSync(inputPath).size;

    // Use system ImageMagick `convert`
    await execFileAsync('convert', [
      inputPath,
      '-quality', quality.toString(),
      outputPath
    ]);

    const newSize = fs.statSync(outputPath).size;
    const savings = originalSize > 0 ? ((1 - (newSize / originalSize)) * 100).toFixed(1) : 0;

    if (isDeleteOriginal && inputPath !== outputPath) {
      try { fs.unlinkSync(inputPath); } catch {}
    }

    return {
      success: true,
      inputPath,
      outputPath,
      originalSize,
      newSize,
      savings
    };
  } catch (err) {
    return {
      success: false,
      inputPath,
      error: err.message
    };
  }
}

/**
 * Recursively scans directory for image files
 */
function scanDirectory(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...scanDirectory(fullPath));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (SUPPORTED_EXTS.has(ext)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

/**
 * Main batch runner
 */
async function runBatch() {
  console.log(`\n${colors.bold}${colors.blue}⚡ [Dowri Platform] شروع تبدیل تصاویر به فرمت WebP...${colors.reset}`);
  console.log(`${colors.dim}کیفیت خروجی: ${quality}% | فرمت‌های پشتیبانی شده: ${Array.from(SUPPORTED_EXTS).join(', ')}${colors.reset}\n`);

  const targetDirs = customPaths.length > 0
    ? customPaths.map(p => path.resolve(process.cwd(), p))
    : DEFAULT_DIRECTORIES;

  const filesToConvert = [];
  for (const target of targetDirs) {
    if (!fs.existsSync(target)) continue;
    const stat = fs.statSync(target);
    if (stat.isFile()) {
      filesToConvert.push(target);
    } else if (stat.isDirectory()) {
      filesToConvert.push(...scanDirectory(target));
    }
  }

  if (filesToConvert.length === 0) {
    console.log(`${colors.yellow}هیچ تصویری برای تبدیل یافت نشد.${colors.reset}`);
    return;
  }

  console.log(`${colors.cyan}تعداد ${filesToConvert.length} تصویر بررسی می‌شود...${colors.reset}\n`);

  let convertedCount = 0;
  let skippedCount = 0;
  let totalOriginal = 0;
  let totalNew = 0;

  for (const file of filesToConvert) {
    const res = await convertFileToWebp(file, outDirArg);
    if (!res) continue;

    const relIn = path.relative(process.cwd(), res.inputPath);
    const relOut = res.outputPath ? path.relative(process.cwd(), res.outputPath) : '';

    if (res.skipped) {
      skippedCount++;
      console.log(`  ${colors.dim}⤳ [به‌روز است] ${relOut}${colors.reset}`);
    } else if (res.success) {
      convertedCount++;
      totalOriginal += res.originalSize;
      totalNew += res.newSize;
      console.log(
        `  ${colors.green}✔ [تبدیل شد]${colors.reset} ${relIn} ${colors.dim}(${formatBytes(res.originalSize)})${colors.reset} ➔ ` +
        `${colors.bold}${relOut}${colors.reset} ${colors.cyan}(${formatBytes(res.newSize)})${colors.reset} ` +
        `${colors.green}[${res.savings >= 0 ? '-' : '+'}${Math.abs(res.savings)}%]${colors.reset}`
      );
    } else {
      console.error(`  ${colors.red}✖ [خطا در تبدیل] ${relIn}: ${res.error}${colors.reset}`);
    }
  }

  console.log(`\n${colors.bold}${colors.green}✔ عملیات تکمیل شد:${colors.reset}`);
  console.log(`  - تعداد تبدیل شده: ${convertedCount}`);
  console.log(`  - تعداد از قبل موجود: ${skippedCount}`);
  if (convertedCount > 0) {
    const totalSavings = ((1 - (totalNew / totalOriginal)) * 100).toFixed(1);
    console.log(`  - حجم قبلی: ${formatBytes(totalOriginal)} ➔ حجم جدید: ${formatBytes(totalNew)} (صرفه‌جویی کل: ${totalSavings}%)`);
  }
  console.log();
}

/**
 * Watch mode: continuously monitors directories and converts any new file
 */
function startWatcher() {
  const watchDirs = customPaths.length > 0
    ? customPaths.map(p => path.resolve(process.cwd(), p))
    : DEFAULT_DIRECTORIES;

  console.log(`\n${colors.bold}${colors.cyan}👀 [Dowri Platform] حالت مانیتورینگ زنده فعال شد (Watch Mode)${colors.reset}`);
  console.log(`${colors.dim}پوشه‌های تحت نظارت: ${watchDirs.map(d => path.relative(process.cwd(), d)).join(', ')}${colors.reset}`);
  console.log(`${colors.dim}به محض قرار گرفتن هر عکس، به صورت خودکار به WebP تبدیل می‌شود... (برای خروج Ctrl+C بزنید)${colors.reset}\n`);

  const pending = new Set();

  for (const dir of watchDirs) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.watch(dir, { recursive: true }, async (eventType, filename) => {
      if (!filename) return;
      const ext = path.extname(filename).toLowerCase();
      if (!SUPPORTED_EXTS.has(ext)) return;
      if (ext === '.webp') return; // Do not watch generated WebPs

      const fullPath = path.join(dir, filename);
      if (pending.has(fullPath)) return;
      pending.add(fullPath);

      // Debounce slightly to allow file write to finish
      setTimeout(async () => {
        pending.delete(fullPath);
        if (!fs.existsSync(fullPath)) return;

        console.log(`${colors.yellow}⚡ تصویر جدید شناسایی شد:${colors.reset} ${filename}`);
        const res = await convertFileToWebp(fullPath, outDirArg);
        if (res && res.success) {
          const relOut = path.relative(process.cwd(), res.outputPath);
          console.log(
            `  ${colors.green}✔ با موفقیت به WebP تبدیل و ذخیره شد:${colors.reset} ${relOut} ` +
            `${colors.cyan}(${formatBytes(res.originalSize)} ➔ ${formatBytes(res.newSize)}, -${res.savings}%)${colors.reset}`
          );
        }
      }, 500);
    });
  }
}

// Entry Point
if (isWatchMode) {
  runBatch().then(() => {
    startWatcher();
  });
} else {
  runBatch();
}
