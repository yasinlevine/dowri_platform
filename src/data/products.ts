/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, CommunityEvent } from '../types/index.ts';

export const DOWRI_PRODUCTS: Product[] = [
  {
    id: 'dowri-ceramic-vase-01',
    title: 'Dowri Sculptural Ceramic Vase',
    titleFa: 'گلدان حجمی دست‌ساز دوری',
    subtitleFa: 'لعاب شره‌ای آبی الکتریک بر بستر گل سنگ‌نمای طبیعی',
    category: 'ceramics',
    categoryFa: 'سرامیک و سفال',
    price: 1450000,
    originalPrice: 1650000,
    descriptionFa: 'گلدان دست‌ساز با فرم آزاد و ساختار مجسمه‌وار که در کارگاه سرامیک دوری به صورت تک‌نسخه ساخته شده است. جلوه لعاب آبی الکتریک نمادین بر روی بدنه مشکی متالیک و بافت‌دار، ترکیبی از هنر معاصر و گرماست.',
    storyFa: 'این قطعه بازتابی از هویت بصری دوری است؛ لعاب آبی غلیظ همانند جریان خلاقیت در حیاط جاری شده و هر بار در کوره طرحی منحصربه‌فرد می‌آفریند.',
    materialsFa: 'گل استون‌ور دمابالا، لعاب اکسیدی آبی کبالت، پخت در دمای ۱۲۲۰ درجه سانتی‌گراد',
    dimensionsFa: 'ارتفاع: ۲۲ سانتی‌متر | قطر دهانه: ۱۱ سانتی‌متر',
    images: [
      '/src/assets/images/dowri_ceramic_studio_1793451781336.jpg',
      '/src/assets/images/dowri_courtyard_cafe_1793451781553.jpg'
    ],
    stock: 4,
    isFeatured: true,
    isLimitedRun: true,
    artisan: {
      name: 'Nima Rad',
      nameFa: 'نیما راد',
      role: 'Resident Ceramist',
      roleFa: 'طراح و سرامیست مقیم دوری',
      bioFa: 'فارغ‌التحصیل طراحی صنعتی، متمرکز بر فرم‌های ارگانیک و تعامل خطوط لعاب با دست‌سازه‌های سنگی.'
    },
    tagsFa: ['سرامیک معاصر', 'لعاب آبی', 'تک نسخه', 'دست‌ساز']
  },
  {
    id: 'dowri-ceramic-cup-02',
    title: 'Dowri Drip Glaze Espresso Mug',
    titleFa: 'ماگ اسپرسو دست‌ساز با چکه لعاب آبی',
    subtitleFa: 'فرم ارگانیک خوش‌دست با لمس بافت خام رسی',
    category: 'ceramics',
    categoryFa: 'سرامیک و سفال',
    price: 420000,
    descriptionFa: 'ماگ خوش‌دست و ارگونومیک طراحی شده مخصوص قهوه‌نوشی در حیاط دوری. بدنه بیرونی بدون لعاب و ماسه‌ای بوده و لبه داخلی با لعاب آبی شفاف و بهداشتی پوشانده شده است.',
    storyFa: 'طراحی شده بر اساس فنجان‌های پرطرفدار کافه دوری؛ برای کسانی که می‌خواهند حس لمس صبح‌های آفتابی حیاط را در خانه تکرار کنند.',
    materialsFa: 'سرامیک نسوز دست‌چرخ، لعاب بدون سرب بهداشتی',
    dimensionsFa: 'حجم: ۱۸۰ میلی‌لیتر | ارتفاع: ۸ سانتی‌متر',
    images: [
      '/src/assets/images/dowri_ceramic_studio_1793451781336.jpg'
    ],
    stock: 12,
    isFeatured: true,
    artisan: {
      name: 'Tara Saberi',
      nameFa: 'تارا صابری',
      role: 'Potter & Instructor',
      roleFa: 'استاد چرخ‌کاری آتلیه دوری',
      bioFa: 'برگزارکننده کارگاه‌های آخر هفته سفالگری و خالق دست‌سازه‌های کاربردی روزمره.'
    },
    tagsFa: ['ماگ قهوه', 'کاربردی', 'خوش‌دست', 'لعاب کبالت']
  },
  {
    id: 'dowri-silver-pendant-01',
    title: 'Dowri Hand-Hammered Silver Pendant',
    titleFa: 'گردنبند نقره دست‌ساز و مینای لاجورد دوری',
    subtitleFa: 'نقره عیار ۹۲۵ چکشی با نقاشی مینای شیشه‌ای آبی و سبز',
    category: 'jewelry',
    categoryFa: 'زیورآلات معاصر',
    price: 1850000,
    descriptionFa: 'مدال نقره دست‌ساز با سطح چکشی مات که تداعی‌کننده امواج و بافت سنگ است. خطوط میناکاری شیشه‌ای آبی الکتریک و فیروزه‌ای در کوره با طلای ۲۴ عیار به ثبات رسیده‌اند.',
    storyFa: 'الهام‌گرفته از همنشینی آجرهای قرمز حیاط و سایه‌روشن برگ‌های چنار که در قالبی مینیاتوری و مدرن خلاصه شده است.',
    materialsFa: 'نقره استرلینگ ۹۲۵، مینای گرم شیشه‌ای، ورق طلای مات',
    dimensionsFa: 'ابعاد مدال: ۳.۲ × ۲ سانتی‌متر | طول زنجیر: ۵۵ سانتی‌متر',
    images: [
      '/src/assets/images/dowri_jewelry_artisan_1793451781849.jpg'
    ],
    stock: 3,
    isFeatured: true,
    isLimitedRun: true,
    artisan: {
      name: 'Kaveh Aria',
      nameFa: 'کاوه آریا',
      role: 'Metalsmith & Jeweler',
      roleFa: 'طراح جواهر و فلزکار مستقل',
      bioFa: 'هنرمند مستقل با ۱۰ سال سابقه در طراحی اکسسوری‌های مینیمال مفهومی.'
    },
    tagsFa: ['نقره ۹۲۵', 'میناکاری', 'دست‌ساز', 'زیور معاصر']
  },
  {
    id: 'dowri-silver-ring-02',
    title: 'Textured Signet Ring with Blue Enamel',
    titleFa: 'انگشتر آرتیزان نقره با نگین مینای لاجورد',
    subtitleFa: 'بافت چکشی عمیق با نگین تخت میناکاری حرارتی',
    category: 'jewelry',
    categoryFa: 'زیورآلات معاصر',
    price: 1280000,
    descriptionFa: 'انگشتر استیتمنت با حجم چشمگیر و پرداخت ارگانیک که حس یک شی باستانی اما با روحیه به شدت مدرن شهری را منتقل می‌کند.',
    storyFa: 'هر حلقه به صورت مجزا با دست سوهان‌کاری و چکش‌کاری شده و هیچ دو انگشتری کاملاً همسان نیستند.',
    materialsFa: 'نقره استرلینگ ۹۲۵ توپر، مینای آبگینه‌ای',
    dimensionsFa: 'سایز متغیر ۵۴ تا ۶۲ (قابل سفارش طبق اندازه انگشت)',
    images: [
      '/src/assets/images/dowri_jewelry_artisan_1793451781849.jpg'
    ],
    stock: 5,
    isFeatured: false,
    artisan: {
      name: 'Kaveh Aria',
      nameFa: 'کاوه آریا',
      role: 'Metalsmith & Jeweler',
      roleFa: 'طراح جواهر و فلزکار مستقل',
      bioFa: 'هنرمند مستقل با ۱۰ سال سابقه در طراحی اکسسوری‌های مینیمال مفهومی.'
    },
    tagsFa: ['انگشتر نقره', 'مردانه زنانه', 'دست‌ساز', 'مینیمال']
  },
  {
    id: 'dowri-silkscreen-print-01',
    title: 'Dowri Courtyard Limited Edition Print',
    titleFa: 'پوستر سیلک‌اسکرین حیاط دوری (نسخه محدود)',
    subtitleFa: 'چاپ دستی سه رنگ بر روی مقوای بدون اسید ۳۰۰ گرم کتان',
    category: 'art',
    categoryFa: 'آرت پرینت و پوستر',
    price: 680000,
    originalPrice: 850000,
    descriptionFa: 'پوستر هنری چاپ سیلک با تصویرسازی اختصاصی از میزهای نارنجی حیاط، درختان سرسبز و فضای سرزنده کافه دوری. هر نسخه دارای امضای دست‌نویس و شماره‌گذاری است (تیراژ کل: ۵۰ نسخه).',
    storyFa: 'خلق‌شده توسط تصویرساز مقیم دوری در جریان رزیدنسی بهار ۱۴۰۳؛ اثری که روح و پویایی حیاط را به دیوار اتاق شما می‌برد.',
    materialsFa: 'رنگ پایه آب ژاپنی، مقوای فابریانو کتان ۳۰۰ گرمی',
    dimensionsFa: '۵۰ × ۷۰ سانتی‌متر (ارسال در لوله محافظ ضدضربه)',
    images: [
      '/src/assets/images/dowri_art_prints_lifestyle_1793451782166.jpg'
    ],
    stock: 9,
    isFeatured: true,
    isLimitedRun: true,
    artisan: {
      name: 'Saba Mehregan',
      nameFa: 'صبا مهرگان',
      role: 'Printmaker & Illustrator',
      roleFa: 'تصویرساز و پرینت‌میکر',
      bioFa: 'طراح گرافیک و تصویرساز کتاب که شیفته رنگ‌های تند و پرینت‌های دستی سیلک است.'
    },
    tagsFa: ['چاپ دستی', 'نسخه محدود', 'سیلک‌اسکرین', 'آرت دیواری']
  },
  {
    id: 'dowri-sticker-pack-02',
    title: 'Dowri Urban Vinyl Sticker Pack (12 Pcs)',
    titleFa: 'پک استیکر وینیل تصویرسازی دوری (۱۲ عددی)',
    subtitleFa: 'ضدآب، ضدخش با روکش مات مخملی و چسبندگی بادوام',
    category: 'lifestyle',
    categoryFa: 'اکسسوری و استیکر',
    price: 195000,
    descriptionFa: 'مجموعه ۱۲ استیکر خلاقانه با الهام از نشانه‌های دوری: لوگوی کالیگرافی آبی و قرمز، میزهای نارنجی، گیاهان سرسبز حیاط، گلدان سرامیکی و فنجان قهوه اسپرسو.',
    storyFa: 'مناسب برای لپ‌تاپ، قاب موبایل، فلاسک قهوه و دفترچه‌های طراحی.',
    materialsFa: 'وینیل ضدآب UV با برش نیم‌تیغ (Kiss-cut)',
    dimensionsFa: 'هر استیکر بین ۵ تا ۸ سانتی‌متر',
    images: [
      '/src/assets/images/dowri_art_prints_lifestyle_1793451782166.jpg'
    ],
    stock: 45,
    isFeatured: false,
    artisan: {
      name: 'Dowri Design Lab',
      nameFa: 'استودیو طراحی دوری',
      role: 'In-house Collective',
      roleFa: 'تیم خلاق پلتفرم دوری',
      bioFa: 'گروهی از طراحان و تصویرسازان جوان فعال در هاب فرهنگی دوری.'
    },
    tagsFa: ['استیکر', 'ضدآب', 'وینیل', 'طراحی شهری']
  },
  {
    id: 'dowri-canvas-tote-03',
    title: 'Dowri Heavyweight Organic Canvas Tote',
    titleFa: 'توت‌بگ کتان ضخیم دوری (Organic Canvas)',
    subtitleFa: 'پارچه پنبه ارگانیک ۴۰۰ گرم با چاپ سیلک مقاوم و جیب داخلی',
    category: 'lifestyle',
    categoryFa: 'اکسسوری و استیکر',
    price: 480000,
    descriptionFa: 'کیف دوشی کتان سنگین با دوخت تقویت‌شده دوبل، بند پهن نرم برای راحتی شانه و جیب زیپ‌دار داخلی مناسب کلید و کارت.',
    storyFa: 'همراه همیشگی رفت‌وآمدهای روزمره به حیاط دوری، نمایشگاه‌ها و ورکشاپ‌ها.',
    materialsFa: 'کتان پنبه طبیعی ۱۰۰٪ ارگانیک، چاپ سیلک دستی مقاوم در برابر شستشو',
    dimensionsFa: '۴۲ × ۳۸ سانتی‌متر | بلندی دسته: ۶۰ سانتی‌متر',
    images: [
      '/src/assets/images/dowri_art_prints_lifestyle_1793451782166.jpg'
    ],
    stock: 18,
    isFeatured: true,
    artisan: {
      name: 'Dowri Collective',
      nameFa: 'کالکتیو دوری',
      role: 'Lifestyle Goods',
      roleFa: 'بخش تولید اکسسوری دوری',
      bioFa: 'طراحی محصولات روزمره با دوام بالا و کمترین اثر زیست‌محیطی.'
    },
    tagsFa: ['توت‌بگ', 'کتان ارگانیک', 'کیف پارچه‌ای', 'طراحی مینیمال']
  },
  {
    id: 'dowri-specialty-coffee-04',
    title: 'Dowri Courtyard Blend Specialty Coffee (250g)',
    titleFa: 'قهوه دانه تخصصی بلند حیاط دوری (۲۵۰ گرم)',
    subtitleFa: 'رست تازه هفتگی در کارگاه برشته‌کاری اختصاصی',
    category: 'cafe',
    categoryFa: 'کافه دوری',
    price: 360000,
    descriptionFa: 'بلند محبوب باریستاهای کافه دوری؛ ترکیب ۱۰۰٪ عربیکا از مزارع اتیوپی و کلمبیا با فرآوری شسته و طبیعی. نت‌های طعمی انجیر خشک، شکلات تلخ و شکوفه پرتقال با اسیدیته درخشان.',
    storyFa: 'همان طعم معروفی که هر روز از بار قهوه حیاط دوری در فضا پخش می‌شود و میزهای نارنجی را گرم می‌کند.',
    materialsFa: '۱۰۰٪ عربیکا تخصصی (Single Origin Blend)',
    dimensionsFa: 'بسته ۲۵۰ گرمی زیپ‌کیپ‌دار با سوپاپ هوای یک‌طرفه',
    images: [
      '/src/assets/images/dowri_courtyard_cafe_1793451781553.jpg'
    ],
    stock: 25,
    isFeatured: false,
    artisan: {
      name: 'Dowri Coffee Bar',
      nameFa: 'تیم قهوه کافه دوری',
      role: 'Roasters & Baristas',
      roleFa: 'برشته‌کاران و باریستاهای دوری',
      bioFa: 'متعهد به انتخاب دانه‌های پایدار و سرو قهوه تخصصی در حیاط سرسبز.'
    },
    tagsFa: ['قهوه تخصصی', 'عربیکا', 'رست تازه', 'کافه دوری']
  }
];

export const DOWRI_EVENTS: CommunityEvent[] = [
  {
    id: 'event-ceramic-workshop',
    titleFa: 'کارگاه عملی ساخت حجم سرامیکی و لعاب کبالت',
    typeFa: 'کارگاه یک‌روزه',
    dateFa: 'جمعه ۱۶ آبان',
    timeFa: 'ساعت ۱۵:۰۰ الی ۱۸:۳۰',
    instructorFa: 'نیما راد (سرامیست مقیم)',
    capacity: 8,
    registeredCount: 6,
    price: 950000,
    image: '/src/assets/images/dowri_ceramic_studio_1793451781336.jpg',
    descriptionFa: 'آشنایی با تکنیک‌های فرم‌دهی دستی به گل استون‌ور، ساخت یک قطعه مجسمه‌وار و تجربه لعاب‌زنی با لعاب آبی دوری در کوره آتلیه.'
  },
  {
    id: 'event-acoustic-session',
    titleFa: 'شب موسیقی آلترناتیو و پرفورمنس در حیاط',
    typeFa: 'رویداد شبانه حیاط',
    dateFa: 'پنج‌شنبه ۲۲ آبان',
    timeFa: 'ساعت ۱۹:۰۰ الی ۲۱:۳۰',
    instructorFa: 'هنرمندان مستقل پلتفرم دوری',
    capacity: 45,
    registeredCount: 38,
    price: 180000,
    image: '/src/assets/images/dowri_courtyard_cafe_1793451781553.jpg',
    descriptionFa: 'دورهمی صمیمانه پاییزی دور میزهای نارنجی حیاط با اجرای زنده‌ی سازهای آکوستیک، نور ملایم نئون و پذیرایی با قهوه دوری.'
  },
  {
    id: 'event-indie-market',
    titleFa: 'بازارچه پاییزی دیزاینرها و آرت پرینت',
    typeFa: 'مارکت آخر هفته',
    dateFa: 'جمعه ۳۰ آبان',
    timeFa: 'ساعت ۱۱:۰۰ الی ۲۰:۰۰',
    instructorFa: 'با حضور ۱۲ طراح مستقل',
    capacity: 100,
    registeredCount: 74,
    price: 0, // رایگان با ثبت‌نام
    image: '/src/assets/images/dowri_art_prints_lifestyle_1793451782166.jpg',
    descriptionFa: 'نمایش و فروش بی‌واسطه آثار سرامیک، زیورآلات معاصر، پرینت‌های لیمیتد ادیشن و اکسسوری در حیاط و سالن گیاهی دوری.'
  }
];
