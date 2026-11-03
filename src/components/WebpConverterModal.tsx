/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { convertImageToWebp, downloadWebp, formatFileSize, WebpConversionResult } from '../utils/imageToWebp.ts';
import { X, UploadCloud, Download, Image as ImageIcon, Sparkles, CheckCircle2, Terminal, RefreshCw, FileArchive } from 'lucide-react';

interface WebpConverterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WebpConverterModal: React.FC<WebpConverterModalProps> = ({ isOpen, onClose }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [quality, setQuality] = useState(85);
  const [converting, setConverting] = useState(false);
  const [results, setResults] = useState<WebpConversionResult[]>([]);
  const [activeTab, setActiveTab] = useState<'upload' | 'cli'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setConverting(true);

    const convertedList: WebpConversionResult[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (!file.type.startsWith('image/')) continue;

      try {
        const res = await convertImageToWebp(file, quality / 100);
        convertedList.push(res);
      } catch (err) {
        console.error('Error converting file:', file.name, err);
      }
    }

    setResults(prev => [...convertedList, ...prev]);
    setConverting(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDownloadAll = () => {
    results.forEach(res => {
      downloadWebp(res.blob, res.webpName);
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-black/10 my-8 transition-all text-right flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-black/[0.06] bg-[#FAF8F5] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0055FF]/10 text-[#0055FF] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                مبدل هوشمند تصاویر به فرمت WebP
              </h3>
              <p className="text-xs text-slate-500">
                تبدیل سریع هر فرمت عکس (PNG, JPG, BMP, SVG) به WebP پرسرعت و سبک
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-200/50 transition-colors cursor-pointer"
            aria-label="بستن"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Tabs */}
        <div className="px-6 pt-4 border-b border-slate-100 flex items-center gap-3">
          <button
            onClick={() => setActiveTab('upload')}
            className={`pb-3 text-xs font-bold transition-colors cursor-pointer border-b-2 flex items-center gap-2 ${
              activeTab === 'upload'
                ? 'border-[#0055FF] text-[#0055FF]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>تبدیل مستقیم در مرورگر</span>
          </button>

          <button
            onClick={() => setActiveTab('cli')}
            className={`pb-3 text-xs font-bold transition-colors cursor-pointer border-b-2 flex items-center gap-2 ${
              activeTab === 'cli'
                ? 'border-[#0055FF] text-[#0055FF]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>اسکریپت خودکار ترمینال (Watch Mode)</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'upload' ? (
            <>
              {/* Quality Slider Bar */}
              <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-black/[0.04] flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800">کیفیت خروجی فشرده‌سازی WebP:</span>
                  <p className="text-[11px] text-slate-500">کیفیت پیشنهادی برای عکاسی و وب: ۸۵٪ الی ۹۰٪</p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="60"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="accent-[#0055FF] cursor-pointer"
                  />
                  <span className="text-xs font-bold text-[#0055FF] tabular-nums w-10 text-center">
                    {quality}٪
                  </span>
                </div>
              </div>

              {/* Drag and Drop Area */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-3xl p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-3 ${
                  isDragging
                    ? 'border-[#0055FF] bg-[#0055FF]/5 scale-[0.99]'
                    : 'border-slate-200 hover:border-[#0055FF]/50 bg-slate-50/50 hover:bg-slate-50'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
                <div className="w-14 h-14 rounded-2xl bg-white shadow-xs border border-slate-200 flex items-center justify-center text-[#0055FF]">
                  {converting ? <RefreshCw className="w-6 h-6 animate-spin" /> : <UploadCloud className="w-7 h-7" />}
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900">
                    عکس‌های خود را اینجا رها کنید، یا کلیک کنید
                  </h4>
                  <p className="text-xs text-slate-500">
                    پشتیبانی از هر فرمتی: JPG, PNG, WEBP, GIF, SVG, BMP (تبدیل فوری و رایگان)
                  </p>
                </div>
              </div>

              {/* Results List */}
              {results.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">
                      عکس‌های تبدیل‌شده به WebP ({results.length} تصویر):
                    </span>

                    {results.length > 1 && (
                      <button
                        onClick={handleDownloadAll}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0055FF] hover:bg-[#0033CC] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                      >
                        <FileArchive className="w-3.5 h-3.5" />
                        <span>دانلود همه فایل‌ها</span>
                      </button>
                    )}
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {results.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.dataUrl}
                            alt={item.webpName}
                            className="w-12 h-12 rounded-xl object-cover bg-slate-100 border border-slate-100 shrink-0"
                          />
                          <div className="space-y-0.5">
                            <h5 className="text-xs font-bold text-slate-900 line-clamp-1" dir="ltr">
                              {item.webpName}
                            </h5>
                            <div className="flex items-center gap-2 text-[11px] text-slate-500 tabular-nums">
                              <span>ابعاد: {item.width} × {item.height}</span>
                              <span aria-hidden="true">·</span>
                              <span className="line-through text-slate-400">{formatFileSize(item.originalSize)}</span>
                              <span aria-hidden="true">➔</span>
                              <span className="font-bold text-[#0055FF]">{formatFileSize(item.newSize)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg tabular-nums">
                            -{item.savingsPercent}٪ کاهش حجم
                          </span>

                          <button
                            onClick={() => downloadWebp(item.blob, item.webpName)}
                            className="p-2 bg-slate-100 hover:bg-[#0055FF] text-slate-700 hover:text-white rounded-xl transition-colors cursor-pointer"
                            title="دانلود فایل WebP"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* CLI Script Documentation & Usage */
            <div className="space-y-5">
              <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-black/[0.04] space-y-2">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#0055FF]" />
                  <span>اسکریپت اتوماتیک تبدیل تصاویر پروژه</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  اسکریپت <code className="px-1.5 py-0.5 bg-slate-200 rounded text-[11px] font-mono text-slate-800">scripts/convert-to-webp.mjs</code> با بهره‌گیری از موتور ImageMagick، هر تصویری که در پروژه قرار بگیرد را با حداکثر کیفیت و کمترین حجم به WebP تبدیل می‌کند.
                </p>
              </div>

              {/* Command 1: Batch Convert */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-800 block">۱. تبدیل دسته‌جمعی همه عکس‌های سایت:</span>
                <div className="p-3 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs flex items-center justify-between" dir="ltr">
                  <code>npm run convert:webp</code>
                </div>
                <p className="text-[11px] text-slate-500">
                  تمام تصاویر موجود در <code className="font-mono">src/assets/images</code> و <code className="font-mono">public/assets</code> بررسی و فایل‌های WebP در کنار آن‌ها ساخته می‌شوند.
                </p>
              </div>

              {/* Command 2: Watch Mode */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-800 block">۲. حالت نظارت خودکار و زنده (Watch Mode):</span>
                <div className="p-3 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs flex items-center justify-between" dir="ltr">
                  <code>npm run convert:watch</code>
                </div>
                <p className="text-[11px] text-slate-500">
                  به محض اینکه هر عکسی با هر پسوندی (PNG, JPG, TIFF, ...) در پوشه عکس‌ها کپی شود، خودکار به WebP تبدیل شده و ذخیره می‌شود.
                </p>
              </div>

              {/* Command 3: Single File */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-800 block">۳. تبدیل یک عکس خاص با تنظیم کیفیت:</span>
                <div className="p-3 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs flex items-center justify-between" dir="ltr">
                  <code>node scripts/convert-to-webp.mjs path/to/image.png --quality=90</code>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 px-6 bg-[#FAF8F5] border-t border-black/[0.06] flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5 text-emerald-700">
            <CheckCircle2 className="w-4 h-4" />
            <span>فرمت WebP سرعت لود صفحات را تا ۷۰٪ افزایش می‌دهد.</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};
