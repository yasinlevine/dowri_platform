/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Browser-side WebP conversion utility
 * Converts any image format (PNG, JPG, BMP, SVG, GIF) to WebP format
 */

export interface WebpConversionResult {
  blob: Blob;
  dataUrl: string;
  originalName: string;
  webpName: string;
  originalSize: number;
  newSize: number;
  savingsPercent: number;
  width: number;
  height: number;
}

/**
 * Converts any image File or Blob to WebP in browser using HTML5 Canvas
 * @param file The input image file
 * @param quality Quality factor between 0.1 and 1.0 (default 0.85)
 */
export async function convertImageToWebp(
  file: File | Blob,
  quality = 0.85,
  customName?: string
): Promise<WebpConversionResult> {
  return new Promise((resolve, reject) => {
    const originalName = file instanceof File ? file.name : (customName || 'image.png');
    const baseName = originalName.substring(0, originalName.lastIndexOf('.')) || originalName;
    const webpName = `${baseName}.webp`;
    const originalSize = file.size;

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas 2D context is not available'));
        return;
      }

      // Draw image to canvas preserving transparency
      ctx.drawImage(img, 0, 0);

      // Convert to WebP
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to encode image to WebP format'));
            return;
          }

          const reader = new FileReader();
          reader.onloadend = () => {
            const dataUrl = reader.result as string;
            const newSize = blob.size;
            const savingsPercent = originalSize > 0 
              ? Math.round((1 - (newSize / originalSize)) * 100) 
              : 0;

            resolve({
              blob,
              dataUrl,
              originalName,
              webpName,
              originalSize,
              newSize,
              savingsPercent,
              width: canvas.width,
              height: canvas.height
            });
          };
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(blob);
        },
        'image/webp',
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to load image for conversion'));
    };

    img.src = objectUrl;
  });
}

/**
 * Helper to download a WebP Blob to the user's computer
 */
export function downloadWebp(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.webp') ? filename : `${filename}.webp`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

/**
 * Format bytes to readable string (KB, MB)
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}
