import { assets } from './assets'

export type DeliveryBadgeType = 'express' | 'relative' | 'absolute'
export type ProductBadgeType = 'sale' | 'new' | 'popular'
export type MarketingBadgeType = 'discount' | '1+1'
export type StatusBadgeType = 'outOfStock' | 'deliveryOnly'

export const HERO_SLIDES = [
  {
    id: 'default',
    image: assets.hero,
    title: 'Товары по доступным ценам вместе с МТбанк',
    overlay: 0.2,
    showLogo: true,
  },
  {
    id: 'variant2',
    image: assets.hero2,
    title: 'Охота на шопинг\nЗабирай до 10% МТбаллами',
    overlay: 0.3,
    showLogo: true,
  },
] as const

/** Home filter chips — Figma 391:77750 */
export const CATEGORIES = [
  'Все товары',
  'Женское',
  'Мужское',
  'Для детей',
  'Техника',
  'Товары для животных',
] as const

/** Category ids that have a dedicated listing screen */
export type ListingCategoryId = 'food' | 'electronics' | 'appliances' | 'beauty' | 'pets'

/**
 * Hero chips → catalog root or category listing id.
 * «Все товары» / fashion chips open the full catalog; техника → electronics; зоо → pets.
 */
export type HomeChipDestination = 'catalog' | ListingCategoryId

export const HOME_CHIP_DESTINATION: Record<(typeof CATEGORIES)[number], HomeChipDestination> = {
  'Все товары': 'catalog',
  Женское: 'catalog',
  Мужское: 'catalog',
  'Для детей': 'catalog',
  Техника: 'electronics',
  'Товары для животных': 'pets',
}

/** Home 2×2 — eDostavka grocery/beauty/pets + Onliner electronics */
export const HOME_CATEGORIES = [
  { title: 'Продукты питания', image: assets.catFood, listingId: 'food' as const },
  { title: 'Красота и уход', image: assets.catBeauty, listingId: 'beauty' as const },
  { title: 'Электроника', image: assets.catElectronics, listingId: 'electronics' as const },
  { title: 'Зоотовары', image: assets.catPets, listingId: 'pets' as const },
] as const

export const PROMO_CATEGORIES = [
  {
    /** Figma 654:8702 — purple Halva cashback promo */
    title: 'Кэшбэк 10%\nна любимые\nтовары',
    image: assets.promoHalvaBg,
    overlayImage: assets.promoHalvaPerson,
    fadeTo: null,
    backgroundSize: '450px 233.5px' as const,
  },
  { title: 'Лопаты, грабли, шланги', image: assets.promo2, fadeTo: '76.961%' },
  { title: 'Товары для самых маленьких', image: assets.promo3, fadeTo: '45%' },
  { title: 'Всё для домашнего уюта', image: assets.promo4, fadeTo: '45%' },
  { title: 'Тут всё для школы', image: assets.promo5, fadeTo: '45%' },
  { title: 'Самое-самое! Хиты продаж', image: assets.promo6, fadeTo: '45%' },
] as const

export type ProductBadges = {
  marketing?: { type: MarketingBadgeType; label?: string }
  product?: ProductBadgeType
  status?: StatusBadgeType
  delivery?: { type: DeliveryBadgeType; label?: string }
  order?: { label: string }
}

export type Product = {
  id: string
  title: string
  price: string
  /** Strikethrough price — used when product badge is sale */
  oldPrice?: string
  unit: string
  rating: string
  reviews: string
  image: string
  badges?: ProductBadges
}

export const PRODUCTS: Product[] = [
  {
    /** Emall / Евроопт · eDostavka assortment — id 9458512 */
    id: 'lavazza-oro-beans',
    title: 'Кофе Lavazza Qualità Oro в зернах 1000 г',
    price: '85,99 р',
    oldPrice: '150,00 р',
    unit: '1000 г',
    rating: '4.5',
    reviews: '(10)',
    image: assets.productLavazzaOro,
    badges: {
      marketing: { type: 'discount', label: '– 43%' },
      product: 'sale',
      delivery: { type: 'express' },
    },
  },
  {
    id: 'lavazza',
    title: 'Кофе молотый Lavazza Qualità Oro 100% Арабика средней обжарки 250 г',
    price: '24,90 р',
    oldPrice: '29,90 р',
    unit: '250 г',
    rating: '4.9',
    reviews: '(2 318)',
    image: assets.productLavazza,
    badges: {
      marketing: { type: '1+1' },
      product: 'sale',
      delivery: { type: 'express' },
    },
  },
  {
    id: 'premium-fir',
    title: 'Искусственная новогодняя елка «Премиум Фир» высотой 210 см, 1200 ветвей',
    price: '249,00 р',
    unit: '1 шт',
    rating: '4.9',
    reviews: '(128)',
    image: assets.productPremiumFir,
    badges: {
      product: 'new',
      status: 'deliveryOnly',
      delivery: { type: 'absolute', label: '18 СЕНТЯБРЯ' },
    },
  },
  {
    id: 'jardin',
    title: 'Кофе растворимый Jardin Colombia Medellin 190 г',
    price: '11,90 р',
    oldPrice: '14,34 р',
    unit: '190 г',
    rating: '4.5',
    reviews: '(1 893)',
    image: assets.productJardin,
    badges: {
      marketing: { type: 'discount', label: '– 17%' },
      product: 'sale',
      delivery: { type: 'express' },
    },
  },
  {
    id: 'nespresso',
    title: 'Кофе в капсулах Nespresso Assorted набор из 5 вкусов по 10 шт',
    price: '38,90 р',
    unit: '50 шт',
    rating: '4.9',
    reviews: '(1 542)',
    image: assets.productNespresso,
    badges: {
      product: 'popular',
      delivery: { type: 'absolute', label: '27 СЕНТЯБРЯ' },
      order: { label: 'ПО 5 ШТ' },
    },
  },
  {
    id: 'greenfield',
    title: 'Чай чёрный Greenfield Premium Assorted 120 пак',
    price: '12,90 р',
    oldPrice: '15,54 р',
    unit: '120 пак',
    rating: '4.9',
    reviews: '(1 204)',
    image: assets.productGreenfield,
    badges: {
      marketing: { type: 'discount', label: '– 17%' },
      product: 'sale',
      delivery: { type: 'express' },
    },
  },
  {
    id: 'lipton',
    title: 'Чай Lipton Discovery Collection 25 пак',
    price: '7,90 р',
    unit: '25 пак',
    rating: '4.5',
    reviews: '(1 057)',
    image: assets.productLipton,
    badges: {
      status: 'deliveryOnly',
      delivery: { type: 'relative' },
      order: { label: 'ПО 5 ШТ' },
    },
  },
]

/** Market tab bar items — Figma 605:8782 (bank is a separate chip in BottomNav) */
export const NAV_ITEMS = [
  { id: 'home', label: 'Главная', icon: assets.navHomeActive, iconSize: 24 },
  { id: 'balance', label: 'Баланс', icon: assets.navBalance, iconSize: 24 },
  { id: 'catalog', label: 'Каталог', icon: assets.navCatalog, iconSize: 18 },
  { id: 'cart', label: 'Корзина', icon: assets.navCart, iconSize: 24 },
] as const

/** Catalog screen categories — Figma 391:111649 / 391:111654 */
export const CATALOG_CATEGORIES = [
  { id: 'school', title: 'Школа, офис и творчество', image: assets.catalogSchool },
  { id: 'food', title: 'Продукты питания', image: assets.catalogFood },
  { id: 'chem', title: 'Бытовая химия', image: assets.catalogChem },
  { id: 'beauty', title: 'Красота и уход', image: assets.catalogBeauty },
  { id: 'baby', title: 'Мама и малыш', image: assets.catalogBaby },
  { id: 'pets', title: 'Зоотовары', image: assets.catalogPets },
  { id: 'garden', title: 'Дача, сад', image: assets.catalogGarden },
  { id: 'sport', title: 'Туризм и спорт', image: assets.catalogSport },
  { id: 'electronics', title: 'Электроника', image: assets.catalogElectronics },
  { id: 'computers', title: 'Компьютеры, сети и оргтехника', image: assets.catalogComputers },
  { id: 'home', title: 'Товары для дома', image: assets.catalogHome },
  { id: 'appliances', title: 'Бытовая техника', image: assets.catalogAppliances },
  { id: 'adult', title: 'Товары для взрослых', image: assets.catalogAdult },
  { id: 'hobby', title: 'Развлечения и хобби', image: assets.catalogHobby },
  { id: 'auto', title: 'Автотовары', image: assets.catalogAuto },
  { id: 'build', title: 'Строительство и ремонт', image: assets.catalogBuild },
  { id: 'newyear', title: 'Новогодние товары', image: assets.catalogNewyear },
] as const

export type ListingSubcategory = {
  id: string
  title: string
  image: string
}

export type CategoryListing = {
  id: ListingCategoryId
  title: string
  breadcrumb: string
  subcategories: readonly ListingSubcategory[]
  products: Product[]
}

/** Food category listing — Figma 458:113474 */
export const FOOD_SUBCATEGORIES = [
  { id: 'pasta', title: 'Макароны, крупы и мука', image: assets.foodSubPasta },
  { id: 'tea', title: 'Чай, кофе и какао', image: assets.foodSubTea },
  { id: 'drinks', title: 'Вода и напитки', image: assets.foodSubDrinks },
  { id: 'canned', title: 'Консервация', image: assets.foodSubCanned },
  { id: 'sauce', title: 'Масло, соусы и специи', image: assets.foodSubSauce },
  { id: 'snacks', title: 'Чипсы, орехи и снеки', image: assets.foodSubSnacks },
] as const

export const FOOD_LISTING_PRODUCTS: Product[] = [
  {
    id: 'food-pasta',
    title: 'Макароны рожки из твёрдых сортов пшеницы 400 г',
    price: '3.49 р',
    unit: '400 г',
    rating: '4.8',
    reviews: '(1 204)',
    image: assets.foodProdPasta,
    badges: {
      marketing: { type: '1+1' },
      delivery: { type: 'relative', label: 'ЗАВТРА' },
    },
  },
  {
    id: 'food-rice',
    title: 'Рис коричневый длиннозерный 2 кг',
    price: '12.90 р',
    unit: '2 кг',
    rating: '4.7',
    reviews: '(1 057)',
    image: assets.foodProdRice,
    badges: {
      delivery: { type: 'absolute', label: '11 ОКТЯБРЯ' },
    },
  },
  {
    id: 'food-flour',
    title: 'Мука пшеничная универсальная 2 кг',
    price: '4.79 р',
    unit: '2 кг',
    rating: '4.9',
    reviews: '(1 893)',
    image: assets.foodProdFlour,
    badges: {
      delivery: { type: 'express', label: 'СЕГОДНЯ' },
    },
  },
  {
    id: 'food-tea',
    title: 'Чай чёрный классический 100 пакетиков',
    price: '9.49 р',
    oldPrice: '9.99 р',
    unit: '100 пак',
    rating: '4.9',
    reviews: '(1 542)',
    image: assets.foodProdTea,
    badges: {
      marketing: { type: 'discount', label: '– 5%' },
      product: 'sale',
      delivery: { type: 'express', label: 'СЕГОДНЯ' },
    },
  },
  {
    id: 'food-coffee',
    title: 'Кофе натуральный средней обжарки 200 г',
    price: '21.51 р',
    oldPrice: '23.90 р',
    unit: '200 г',
    rating: '4.8',
    reviews: '(1 204)',
    image: assets.foodProdCoffee,
    badges: {
      marketing: { type: 'discount', label: '– 10%' },
      product: 'sale',
      delivery: { type: 'express', label: 'СЕГОДНЯ' },
    },
  },
  {
    id: 'food-cocoa',
    title: 'Какао-порошок натуральный 250 г',
    price: '12.49 р',
    unit: '250 г',
    rating: '4.5',
    reviews: '(1 057)',
    image: assets.foodProdCocoa,
    badges: {
      delivery: { type: 'express', label: 'СЕГОДНЯ' },
    },
  },
  {
    id: 'food-juice',
    title: 'Напиток яблочный 1 л',
    price: '4.29 р',
    unit: '1 л',
    rating: '4.6',
    reviews: '(876)',
    image: assets.foodProdJuice,
    badges: {
      delivery: { type: 'absolute', label: '10 ОКТЯБРЯ' },
    },
  },
  {
    id: 'food-tuna',
    title: 'Тунец консервированный в собственном соку 120 г',
    price: '8.49 р',
    unit: '120 г',
    rating: '4.8',
    reviews: '(763)',
    image: assets.foodProdTuna,
    badges: {
      delivery: { type: 'express', label: 'СЕГОДНЯ' },
    },
  },
  {
    id: 'food-ketchup',
    title: 'Кетчуп томатный классический 400 г',
    price: '5.59 р',
    unit: '400 г',
    rating: '4.7',
    reviews: '(689)',
    image: assets.foodProdKetchup,
    badges: {
      marketing: { type: 'discount', label: '– 20%' },
      delivery: { type: 'express', label: 'СЕГОДНЯ' },
    },
  },
  {
    id: 'food-butter',
    title: 'Масло сливочное несолёное 82% 200 г',
    price: '6.99 р',
    unit: '200 г',
    rating: '4.6',
    reviews: '(621)',
    image: assets.foodProdButter,
    badges: {
      delivery: { type: 'absolute', label: '10 ОКТЯБРЯ' },
    },
  },
  {
    id: 'food-chips',
    title: 'Чипсы картофельные оригинальные 190 г',
    price: '8.49 р',
    unit: '190 г',
    rating: '4.7',
    reviews: '(543)',
    image: assets.foodProdChips,
    badges: {
      marketing: { type: 'discount', label: '– 15%' },
      delivery: { type: 'express', label: 'СЕГОДНЯ' },
    },
  },
  {
    id: 'food-hazelnut',
    title: 'Фундук очищенный 200 г',
    price: '10.99 р',
    unit: '200 г',
    rating: '4.7',
    reviews: '(445)',
    image: assets.foodProdHazelnut,
    badges: {
      marketing: { type: 'discount', label: '– 8%' },
      delivery: { type: 'express', label: 'СЕГОДНЯ' },
    },
  },
]

const ELECTRONICS_SUBCATEGORIES: ListingSubcategory[] = [
  { id: 'phones', title: 'Смартфоны', image: assets.subSmartphones },
  { id: 'headphones', title: 'Наушники и гарнитуры', image: assets.searchCatHeadphones },
  { id: 'computers', title: 'Компьютеры и ноутбуки', image: assets.searchCatPc },
  { id: 'audio', title: 'Аудио и микрофоны', image: assets.searchCatMic },
  { id: 'peripherals', title: 'Клавиатуры и мыши', image: assets.searchCatKeyboard },
  { id: 'accessories', title: 'Аксессуары', image: assets.searchCatMouse },
]

const ELECTRONICS_LISTING_PRODUCTS: Product[] = [
  {
    id: 'el-headphones',
    title: 'Беспроводные наушники с шумоподавлением',
    price: '189,00 р',
    oldPrice: '249,00 р',
    unit: '1 шт',
    rating: '4.8',
    reviews: '(3 412)',
    image: assets.searchCatHeadphones,
    badges: {
      marketing: { type: 'discount', label: '– 24%' },
      product: 'sale',
      delivery: { type: 'express', label: 'СЕГОДНЯ' },
    },
  },
  {
    id: 'el-iphone',
    title: 'Смартфон Apple iPhone 17 256 ГБ',
    price: '3 299,00 р',
    unit: '1 шт',
    rating: '4.9',
    reviews: '(892)',
    image: assets.subSmartphones,
    badges: {
      product: 'new',
      delivery: { type: 'relative', label: 'ЗАВТРА' },
    },
  },
  {
    id: 'el-pc',
    title: 'Игровой ноутбук 15.6″ RTX 4060 16 ГБ',
    price: '2 149,00 р',
    oldPrice: '2 399,00 р',
    unit: '1 шт',
    rating: '4.7',
    reviews: '(1 056)',
    image: assets.searchCatPc,
    badges: {
      marketing: { type: 'discount', label: '– 10%' },
      product: 'sale',
      delivery: { type: 'absolute', label: '12 ОКТЯБРЯ' },
    },
  },
  {
    id: 'el-mic',
    title: 'USB-микрофон студийный конденсаторный',
    price: '129,00 р',
    unit: '1 шт',
    rating: '4.6',
    reviews: '(641)',
    image: assets.searchCatMic,
    badges: {
      delivery: { type: 'express', label: 'СЕГОДНЯ' },
    },
  },
  {
    id: 'el-keyboard',
    title: 'Механическая клавиатура RGB беспроводная',
    price: '99,00 р',
    oldPrice: '129,00 р',
    unit: '1 шт',
    rating: '4.8',
    reviews: '(2 108)',
    image: assets.searchCatKeyboard,
    badges: {
      marketing: { type: 'discount', label: '– 23%' },
      product: 'sale',
      delivery: { type: 'express', label: 'СЕГОДНЯ' },
    },
  },
  {
    id: 'el-mouse',
    title: 'Беспроводная мышь эргономичная',
    price: '49,90 р',
    unit: '1 шт',
    rating: '4.5',
    reviews: '(1 774)',
    image: assets.searchCatMouse,
    badges: {
      product: 'popular',
      delivery: { type: 'relative', label: 'ЗАВТРА' },
    },
  },
]

const APPLIANCES_SUBCATEGORIES: ListingSubcategory[] = [
  { id: 'kitchen', title: 'Кухонная техника', image: assets.catalogAppliances },
  { id: 'cleaning', title: 'Уборка и климат', image: assets.catalogHome },
  { id: 'coffee-machines', title: 'Кофемашины', image: assets.productNespresso },
  { id: 'laundry', title: 'Стирка и сушка', image: assets.catalogChem },
  { id: 'small', title: 'Мелкая техника', image: assets.sink },
  { id: 'built-in', title: 'Встраиваемая техника', image: assets.catalogBuild },
]

const APPLIANCES_LISTING_PRODUCTS: Product[] = [
  {
    id: 'ap-nespresso',
    title: 'Кофемашина капсульная Nespresso Essenza Mini',
    price: '249,00 р',
    oldPrice: '299,00 р',
    unit: '1 шт',
    rating: '4.9',
    reviews: '(2 341)',
    image: assets.productNespresso,
    badges: {
      marketing: { type: 'discount', label: '– 17%' },
      product: 'sale',
      delivery: { type: 'express', label: 'СЕГОДНЯ' },
    },
  },
  {
    id: 'ap-sink',
    title: 'Измельчитель пищевых отходов встраиваемый',
    price: '189,00 р',
    unit: '1 шт',
    rating: '4.6',
    reviews: '(412)',
    image: assets.sink,
    badges: {
      delivery: { type: 'absolute', label: '15 ОКТЯБРЯ' },
    },
  },
  {
    id: 'ap-vacuum',
    title: 'Пылесос вертикальный беспроводной',
    price: '399,00 р',
    oldPrice: '459,00 р',
    unit: '1 шт',
    rating: '4.7',
    reviews: '(1 289)',
    image: assets.catalogAppliances,
    badges: {
      marketing: { type: 'discount', label: '– 13%' },
      product: 'sale',
      delivery: { type: 'relative', label: 'ЗАВТРА' },
    },
  },
  {
    id: 'ap-washer',
    title: 'Стиральная машина узкая 6 кг',
    price: '899,00 р',
    unit: '1 шт',
    rating: '4.8',
    reviews: '(967)',
    image: assets.catalogHome,
    badges: {
      product: 'popular',
      delivery: { type: 'absolute', label: '18 ОКТЯБРЯ' },
    },
  },
  {
    id: 'ap-kettle',
    title: 'Электрочайник стеклянный 1.7 л',
    price: '59,90 р',
    oldPrice: '74,90 р',
    unit: '1 шт',
    rating: '4.5',
    reviews: '(2 056)',
    image: assets.catalogChem,
    badges: {
      marketing: { type: 'discount', label: '– 20%' },
      product: 'sale',
      delivery: { type: 'express', label: 'СЕГОДНЯ' },
    },
  },
  {
    id: 'ap-oven',
    title: 'Духовой шкаф электрический встраиваемый',
    price: '749,00 р',
    unit: '1 шт',
    rating: '4.7',
    reviews: '(534)',
    image: assets.catalogBuild,
    badges: {
      product: 'new',
      delivery: { type: 'relative', label: 'ЗАВТРА' },
    },
  },
]

const BEAUTY_SUBCATEGORIES: ListingSubcategory[] = [
  { id: 'face', title: 'Уход за лицом', image: assets.catalogBeauty },
  { id: 'hair', title: 'Уход за волосами', image: assets.catBeauty },
  { id: 'makeup', title: 'Декоративная косметика', image: assets.promo3 },
  { id: 'body', title: 'Уход за телом', image: assets.promo1 },
  { id: 'perfume', title: 'Парфюмерия', image: assets.promo4 },
  { id: 'hygiene', title: 'Гигиена', image: assets.catalogChem },
]

const BEAUTY_LISTING_PRODUCTS: Product[] = [
  {
    id: 'be-serum',
    title: 'Сыворотка для лица с витамином C 30 мл',
    price: '34,90 р',
    oldPrice: '44,90 р',
    unit: '30 мл',
    rating: '4.8',
    reviews: '(1 562)',
    image: assets.catalogBeauty,
    badges: {
      marketing: { type: 'discount', label: '– 22%' },
      product: 'sale',
      delivery: { type: 'express', label: 'СЕГОДНЯ' },
    },
  },
  {
    id: 'be-shampoo',
    title: 'Шампунь восстанавливающий 400 мл',
    price: '12,90 р',
    unit: '400 мл',
    rating: '4.6',
    reviews: '(987)',
    image: assets.catBeauty,
    badges: {
      delivery: { type: 'express', label: 'СЕГОДНЯ' },
    },
  },
  {
    id: 'be-lipstick',
    title: 'Помада матовая стойкая',
    price: '19,90 р',
    oldPrice: '24,90 р',
    unit: '1 шт',
    rating: '4.7',
    reviews: '(2 341)',
    image: assets.promo3,
    badges: {
      marketing: { type: 'discount', label: '– 20%' },
      product: 'sale',
      delivery: { type: 'relative', label: 'ЗАВТРА' },
    },
  },
  {
    id: 'be-cream',
    title: 'Крем для тела увлажняющий 250 мл',
    price: '15,49 р',
    unit: '250 мл',
    rating: '4.5',
    reviews: '(743)',
    image: assets.promo1,
    badges: {
      product: 'popular',
      delivery: { type: 'express', label: 'СЕГОДНЯ' },
    },
  },
  {
    id: 'be-perfume',
    title: 'Парфюмерная вода женская 50 мл',
    price: '89,00 р',
    oldPrice: '109,00 р',
    unit: '50 мл',
    rating: '4.9',
    reviews: '(1 128)',
    image: assets.promo4,
    badges: {
      marketing: { type: 'discount', label: '– 18%' },
      product: 'sale',
      delivery: { type: 'absolute', label: '14 ОКТЯБРЯ' },
    },
  },
  {
    id: 'be-hygiene',
    title: 'Гель для душа увлажняющий 500 мл',
    price: '8,90 р',
    unit: '500 мл',
    rating: '4.4',
    reviews: '(2 056)',
    image: assets.catalogChem,
    badges: {
      marketing: { type: '1+1' },
      delivery: { type: 'express', label: 'СЕГОДНЯ' },
    },
  },
]

const PETS_SUBCATEGORIES: ListingSubcategory[] = [
  { id: 'cat-food', title: 'Корм для кошек', image: assets.catalogPets },
  { id: 'dog-food', title: 'Корм для собак', image: assets.catPets },
  { id: 'treats', title: 'Лакомства', image: assets.foodProdHazelnut },
  { id: 'care', title: 'Уход и гигиена', image: assets.catalogChem },
  { id: 'toys', title: 'Игрушки', image: assets.promo5 },
  { id: 'accessories', title: 'Аксессуары', image: assets.promo6 },
]

const PETS_LISTING_PRODUCTS: Product[] = [
  {
    id: 'pe-cat-food',
    title: 'Корм сухой для кошек с курицей 2 кг',
    price: '29,90 р',
    oldPrice: '34,90 р',
    unit: '2 кг',
    rating: '4.8',
    reviews: '(3 012)',
    image: assets.catalogPets,
    badges: {
      marketing: { type: 'discount', label: '– 14%' },
      product: 'sale',
      delivery: { type: 'express', label: 'СЕГОДНЯ' },
    },
  },
  {
    id: 'pe-dog-food',
    title: 'Корм сухой для собак взрослых 3 кг',
    price: '39,90 р',
    unit: '3 кг',
    rating: '4.7',
    reviews: '(1 845)',
    image: assets.catPets,
    badges: {
      product: 'popular',
      delivery: { type: 'express', label: 'СЕГОДНЯ' },
    },
  },
  {
    id: 'pe-treats',
    title: 'Лакомство для кошек подушечки 80 г',
    price: '6,49 р',
    unit: '80 г',
    rating: '4.6',
    reviews: '(987)',
    image: assets.foodProdHazelnut,
    badges: {
      marketing: { type: '1+1' },
      delivery: { type: 'relative', label: 'ЗАВТРА' },
    },
  },
  {
    id: 'pe-shampoo',
    title: 'Шампунь для собак гипоаллергенный 250 мл',
    price: '14,90 р',
    oldPrice: '17,90 р',
    unit: '250 мл',
    rating: '4.5',
    reviews: '(612)',
    image: assets.catalogChem,
    badges: {
      marketing: { type: 'discount', label: '– 17%' },
      product: 'sale',
      delivery: { type: 'express', label: 'СЕГОДНЯ' },
    },
  },
  {
    id: 'pe-toy',
    title: 'Игрушка для кошек мышь с перьями',
    price: '5,90 р',
    unit: '1 шт',
    rating: '4.4',
    reviews: '(1 234)',
    image: assets.promo5,
    badges: {
      delivery: { type: 'express', label: 'СЕГОДНЯ' },
    },
  },
  {
    id: 'pe-bowl',
    title: 'Миска двойная для корма и воды',
    price: '12,90 р',
    unit: '1 шт',
    rating: '4.7',
    reviews: '(756)',
    image: assets.promo6,
    badges: {
      product: 'new',
      delivery: { type: 'absolute', label: '13 ОКТЯБРЯ' },
    },
  },
]

export const CATEGORY_LISTINGS: Record<ListingCategoryId, CategoryListing> = {
  food: {
    id: 'food',
    title: 'Продукты питания',
    breadcrumb: 'Продукты питания',
    subcategories: FOOD_SUBCATEGORIES,
    products: FOOD_LISTING_PRODUCTS,
  },
  electronics: {
    id: 'electronics',
    title: 'Электроника',
    breadcrumb: 'Электроника',
    subcategories: ELECTRONICS_SUBCATEGORIES,
    products: ELECTRONICS_LISTING_PRODUCTS,
  },
  appliances: {
    id: 'appliances',
    title: 'Бытовая техника',
    breadcrumb: 'Бытовая техника',
    subcategories: APPLIANCES_SUBCATEGORIES,
    products: APPLIANCES_LISTING_PRODUCTS,
  },
  beauty: {
    id: 'beauty',
    title: 'Красота и уход',
    breadcrumb: 'Красота и уход',
    subcategories: BEAUTY_SUBCATEGORIES,
    products: BEAUTY_LISTING_PRODUCTS,
  },
  pets: {
    id: 'pets',
    title: 'Зоотовары',
    breadcrumb: 'Зоотовары',
    subcategories: PETS_SUBCATEGORIES,
    products: PETS_LISTING_PRODUCTS,
  },
}

export function getCategoryListing(id: ListingCategoryId): CategoryListing {
  return CATEGORY_LISTINGS[id]
}

export function isListingCategoryId(id: string): id is ListingCategoryId {
  return id in CATEGORY_LISTINGS
}

/** Filled cart from Figma 525:34951. Prices are per unit; the card shows unit × quantity. */
export const CART_PRODUCTS: Product[] = [
  {
    id: 'cart-greenfield',
    title: 'Чай чёрный Greenfield Premium Assorted 120 пак',
    price: '12,90 р',
    unit: '120 пак',
    rating: '',
    reviews: '',
    image: assets.cartGreenfield,
    badges: {
      marketing: { type: 'discount', label: '– 10%' },
      delivery: { type: 'express', label: 'СЕГОДНЯ' },
    },
  },
  {
    id: 'cart-basilur',
    title: 'Чай зелёный Basilur Oriental Collection 100 пак',
    price: '21,50 р',
    unit: '100 пак',
    rating: '',
    reviews: '',
    image: assets.cartBasilur,
    badges: {
      marketing: { type: 'discount', label: '– 20%' },
      product: 'sale',
      delivery: { type: 'express', label: 'СЕГОДНЯ' },
    },
  },
  {
    id: 'cart-richard',
    title: 'Набор чая Richard Royal Tea Collection 40 пак',
    price: '15,90 р',
    unit: '40 пак',
    rating: '',
    reviews: '',
    image: assets.cartRichard,
    badges: {
      marketing: { type: 'discount', label: '– 8%' },
      product: 'sale',
      delivery: { type: 'express', label: 'СЕГОДНЯ' },
    },
  },
  {
    id: 'cart-befruit',
    title: 'Чай фруктовый BeFruit Ассорти 48 пак',
    price: '8,50 р',
    unit: '48 пак',
    rating: '',
    reviews: '',
    image: assets.cartBefruit,
    badges: {
      marketing: { type: '1+1' },
      delivery: { type: 'relative', label: 'ЗАВТРА' },
    },
  },
]

/** Plus is disabled on the first cart line at 2 — Figma 525:34961. */
export const CART_MAX: Record<string, number> = {
  'cart-greenfield': 2,
}

export function getProductById(id: string): Product | undefined {
  const listed = (Object.values(CATEGORY_LISTINGS) as CategoryListing[]).flatMap(
    (listing) => listing.products,
  )
  return (
    CART_PRODUCTS.find((product) => product.id === id) ??
    PRODUCTS.find((product) => product.id === id) ??
    listed.find((product) => product.id === id)
  )
}

export type CrumbTarget =
  | { screen: 'home' }
  | { screen: 'catalog' }
  | { screen: 'listing'; id: ListingCategoryId }
  | { screen: 'search'; query: string }

const FOOD_CRUMBS = new Set(['Кофе', 'Чай', 'Чай, кофе и какао'])

/** Where a product-page breadcrumb opens. The current product crumb is not a link. */
export function crumbTarget(label: string): CrumbTarget | null {
  if (label === 'Главная') return { screen: 'home' }
  if (label === 'Каталог') return { screen: 'catalog' }
  const listing = (Object.values(CATEGORY_LISTINGS) as CategoryListing[]).find(
    (item) => item.title === label || item.breadcrumb === label,
  )
  if (listing) return { screen: 'listing', id: listing.id }
  if (CATALOG_CATEGORIES.some((item) => item.title === label)) return { screen: 'catalog' }
  if (FOOD_CRUMBS.has(label)) return { screen: 'listing', id: 'food' }
  return { screen: 'search', query: label }
}

/**
 * Search catalog — product/category names sourced from:
 * - Onliner Catalog (catalog.onliner.by)
 * - eDostavka / Едоставка (edostavka.by) for grocery & FMCG
 * Figma shell: 462:3304
 */

/** Recent searches (idle badges) */
export const SEARCH_CHIPS = [
  'Кофе Lavazza',
  'iPhone 17',
  'Молоко',
  'Наушники',
  'Хурма',
  'Корм для кошек',
] as const

/**
 * Autocomplete queries — shown only when the typed text matches.
 * Includes viral category names + popular product titles from both shops.
 */
export const SEARCH_QUERIES = [
  // Onliner — electronics & appliances
  'наушники',
  'наушники беспроводные',
  'наушники apple airpods',
  'iphone 17',
  'iphone 17 pro',
  'смартфон honor',
  'ноутбук',
  'macbook pro',
  'телевизор samsung',
  'телевизор lg',
  'стиральная машина lg',
  'пылесос xiaomi',
  'кофеварка nespresso',
  // Onliner — coffee / tea (catalog)
  'кофе',
  'кофе lavazza',
  'кофе movenpick',
  'кофе dallmayr',
  'кофе в капсулах nespresso',
  'чай greenfield',
  'чай lipton',
  // eDostavka — grocery / FMCG
  'молоко',
  'молоко 3.2%',
  'сыр российский',
  'кефир',
  'йогурт',
  'творог',
  'хурма',
  'манго',
  'бананы',
  'хлеб',
  'nutella',
  'колбаса',
  'куриное филе',
  'яйца',
  // eDostavka — pets / beauty
  'корм для кошек',
  'корм для собак',
  'зоотовары',
  'уход за лицом',
  'декоративная косметика',
] as const

export type SearchCategory = {
  title: string
  path: string
  image?: string
  images?: readonly string[]
  source: 'onliner' | 'edostavka'
}

/** Recently visited categories (idle list) */
export const SEARCH_CATEGORIES: SearchCategory[] = [
  {
    title: 'Наушники и гарнитуры',
    path: 'в Электроника · Onliner',
    image: assets.searchCatHeadphones,
    source: 'onliner',
  },
  {
    title: 'Мобильные телефоны',
    path: 'в Электроника · Onliner',
    images: [
      assets.searchCatPc,
      assets.searchCatMic,
      assets.searchCatKeyboard,
      assets.searchCatMouse,
    ],
    source: 'onliner',
  },
  {
    title: 'Кофе',
    path: 'в Продукты питания · Onliner',
    image: assets.catFood,
    source: 'onliner',
  },
  {
    title: 'Фрукты и овощи',
    path: 'в Продукты · Едоставка',
    image: assets.catFood,
    source: 'edostavka',
  },
  {
    title: 'Молочные продукты',
    path: 'в Продукты · Едоставка',
    image: assets.catFood,
    source: 'edostavka',
  },
  {
    title: 'Зоотовары',
    path: 'в Едоставка',
    image: assets.catPets,
    source: 'edostavka',
  },
  {
    title: 'Косметика и гигиена',
    path: 'в Красота · Едоставка',
    image: assets.catBeauty,
    source: 'edostavka',
  },
  {
    title: 'Еда от Шефа',
    path: 'в Готовая еда · Едоставка',
    images: [assets.searchCatBooks1, assets.searchCatBooks2],
    source: 'edostavka',
  },
]

/**
 * Popular product titles for suggestion matching (Onliner + eDostavka / Emall).
 * Titles mapped in SEARCH_SUGGESTION_TO_PRODUCT open PDP on tap.
 */
export const SEARCH_PRODUCTS = [
  // Onliner Catalog
  'Наушники Apple AirPods 5 (с беспроводной зарядкой)',
  'Наушники OnePlus Buds Pro 4',
  'Телефон Apple iPhone 17 256GB (черный)',
  'Телефон Apple iPhone 17 Pro 256GB (космический оранжевый)',
  'Ноутбук Apple MacBook Pro 14"',
  'Телевизор Samsung Crystal UHD 4K',
  'Стиральная машина LG F2M5HS6W',
  'Пылесос Xiaomi Vacuum Cleaner G20 Lite',
  'Кофе Lavazza Qualità Oro в зернах 1000 г',
  'Кофе Movenpick Der Himmlische в зернах 1 кг',
  'Кофе Dallmayr Prodomo молотый 500 г',
  'Кофе в капсулах Nespresso Ispirazione Genova Livanto 10 шт',
  'Черный чай Greenfield Earl Grey Fantasy 25 шт',
  'Сухой корм для кошек Royal Canin Sterilised 37 4 кг',
  // eDostavka / Emall grocery
  'Сыр полутвердый Российский новый экстра 50%',
  'Хурма, 1 кг',
  'Манго Ready To Eat 1 кг',
  'Молоко питьевое пастеризованное 3,2%',
  'Паста ореховая Nutella 350 г',
  'Йогурт питьевой',
  'Кефир 3,2%',
  'Хлеб белый нарезка',
  'Корм для кошек',
  'Корм для собак',
] as const

/** Suggestion title → product id (tap opens PDP) */
export const SEARCH_SUGGESTION_TO_PRODUCT: Record<string, string> = {
  'Кофе Lavazza Qualità Oro в зернах 1000 г': 'lavazza-oro-beans',
}

/** Yellow parts-payment row on PDP 569:6874. Sample: 249,00 р. → 60,00 р. */
export type ProductInstallment = {
  amount: string
  months: string
  now: string
  halva: string
}

const INSTALLMENT_MONTHS = 3

export function installmentFromPrice(price: string): ProductInstallment {
  const value = Number(price.replace(/\s/g, '').replace(/[^\d,]/g, '').replace(',', '.'))
  // price / 3 months, 1 decimal truncated: 3299 → 1099,6
  const part =
    Number.isFinite(value) && value > 0
      ? Math.floor((value / INSTALLMENT_MONTHS) * 10) / 10
      : 0
  const formatted = part.toFixed(1).replace('.', ',')
  return {
    amount: `${formatted} р.`,
    months: '3 месяцев',
    now: '0 p. сейчас',
    halva: `От ${formatted} р в месяц`,
  }
}

/** Product detail — Figma 569:6849 */
export type ProductPdp = {
  id: string
  breadcrumbs: readonly string[]
  title: string
  rating: string
  reviews: string
  price: string
  unit: string
  deliveryLabel: string
  images: readonly string[]
  about: string
  specs: readonly { label: string; value: string }[]
  composition: string
  storage: string
  trade: readonly { label: string; value: string }[]
  reviewsList: readonly { author: string; date: string; text: string }[]
  badgeProduct?: ProductBadgeType
  badgeStatus?: StatusBadgeType
  deliveryType?: DeliveryBadgeType
  /** Filled for every product in getProductPdp. Yellow row only when showInstallment. */
  installment?: ProductInstallment
  showInstallment?: boolean
  /** Score under the price. Reviews header keeps rating/reviews. */
  ratingBlock?: { score: string; reviews: string }
  oldPrice?: string
  /** Red price with the previous amount, same as a sale card. */
  priceSale?: boolean
  /** Per 100 g. Shown in the details sheet for grocery products. */
  nutrition?: {
    basis: string
    calories: string
    protein: string
    fat: string
    carbs: string
  }
}

export const PDP_PREMIUM_FIR: ProductPdp = {
  id: 'premium-fir',
  breadcrumbs: [
    'Главная',
    'Новогодние товары',
    'Искусственные ёлки',
    'Искусственная новогодняя елка «Премиум Фир» высотой 210 см, 1200 ветвей',
  ],
  title: 'Искусственная новогодняя елка «Премиум Фир» высотой 210 см, 1200 ветвей',
  rating: '4.9',
  reviews: '(128)',
  price: '249,00 р.',
  unit: '1 шт',
  deliveryLabel: '18 СЕНТЯБРЯ',
  images: [assets.productPremiumFir, assets.productFirBranches, assets.productFirStand],
  about:
    'Искусственная новогодняя елка «Премиум Фир» - идеальное решение для создания уютной праздничной атмосферы в вашем доме. Благодаря 1200 реалистичных ветвям и стабильному металлическому основанию, она выглядит как настоящая ель, но без хлопот по уходу и уборке иголок.',
  specs: [
    { label: 'Бренд', value: 'MaxYPoland' },
    { label: 'Тип', value: 'Ель искусственная' },
    { label: 'Высота (м)', value: '2.1' },
    { label: 'Материал хвои', value: 'PE' },
    { label: 'Конструкция веток', value: 'отгибающиеся' },
  ],
  composition:
    'Корпус: металлический стальной каркас. Ветви: высококачественный ПВХ пластик, текстурированный под еловую хвою. Основание: стабилизированный металлический поддон с нескользящим покрытием.',
  storage:
    'После праздников елку необходимо аккуратно упаковать в оригинальную коробку. Хранить в сухом, прохладном месте, подальше от прямых солнечных лучей. Не подвергать воздействию открытого огня или высоких температур.',
  trade: [
    { label: 'Торговая марка', value: 'MaxYPoland' },
    { label: 'Страна производства', value: 'Польша' },
    {
      label: 'Производитель',
      value:
        'PPUH Limpol Grzegorz Lipa, 42-350 Kozieglowki, Lipova 45, Poland. Импортер в РБ: “МаксиПоланд”, Минский р-н, г.Заславль, ул.Дзержинская д.38, к.4',
    },
  ],
  reviewsList: [
    {
      author: 'Анна К.',
      date: '8 янв. 2026',
      text: 'Ёлка выглядит густой и почти как живая.\nСобрали вдвоём примерно за двадцать минут.\nПодставка устойчивая, ветки держат игрушки.\nПосле праздников легко убрали её в коробку.',
    },
    {
      author: 'Ольга С.',
      date: '15 дек. 2025',
      text: 'Красивая, пушистая ёлка. Основание устойчивое, гирлянда и тяжёлые игрушки держатся без проблем.',
    },
  ],
  badgeProduct: 'new',
  badgeStatus: 'deliveryOnly',
  deliveryType: 'absolute',
  ratingBlock: { score: '4.6', reviews: '45 отзывов' },
}

/** PDP overrides for listing products opened from search / home */
const PDP_BY_ID: Record<string, ProductPdp> = {
  'premium-fir': PDP_PREMIUM_FIR,
  /** Source: Emall/Euroopt product 9458512 (eDostavka assortment) */
  'lavazza-oro-beans': {
    id: 'lavazza-oro-beans',
    breadcrumbs: [
      'Главная',
      'Продукты питания',
      'Кофе',
      'Кофе Lavazza Qualità Oro в зернах 1000 г',
    ],
    title: 'Кофе Lavazza Qualità Oro в зернах 1000 г',
    rating: '4.5',
    reviews: '(10)',
    price: '85,99 р.',
    unit: '1000 г',
    deliveryLabel: 'СЕГОДНЯ',
    images: [assets.productLavazzaOro, assets.productLavazzaOro, assets.productLavazzaOro],
    about:
      'Кофе Lavazza Qualita Oro — бленд 1958 года, один из первых в мире. Знаменит своим непревзойдённым, узнаваемым, изысканным ароматом. Характерная черта смеси — лёгкая сладость в сочетании с цветочной кислинкой, что создаёт полный, благородный, гармоничный вкус.',
    specs: [
      { label: 'Бренд', value: 'Lavazza' },
      { label: 'Тип', value: 'Кофе в зернах' },
      { label: 'Сорт', value: '100% арабика' },
      { label: 'Степень обжарки', value: 'средняя' },
      { label: 'Место сбора зерна', value: 'Центральная и Южная Америка' },
      { label: 'Вес, г', value: '1000' },
      { label: 'Белки (на 100 г)', value: '13.9 г' },
      { label: 'Жиры (на 100 г)', value: '14.4 г' },
      { label: 'Углеводы (на 100 г)', value: '4.1 г' },
    ],
    composition: '100% Арабика',
    storage:
      'Хранить в сухом прохладном месте при температуре не выше +25 °C и относительной влажности не более 75%. После вскрытия плотно закрывать упаковку.',
    trade: [
      { label: 'Торговая марка', value: 'Lavazza' },
      { label: 'Страна производства', value: 'Италия' },
      {
        label: 'Продавец',
        value: 'Караван · ассортимент Emall / Евроопт (eDostavka.by)',
      },
      {
        label: 'Производитель',
        value: 'Luigi Lavazza S.p.A., Torino, Italy',
      },
    ],
    reviewsList: [
      {
        author: 'Дмитрий',
        date: '3 июл. 2026',
        text: 'Отличный кофе!',
      },
      {
        author: 'Дмитрий',
        date: '11 июн. 2026',
        text: 'Кофе оригинальный. Постоянно заказываю у Каравана.',
      },
    ],
    badgeProduct: 'sale',
  },
  lavazza: {
    id: 'lavazza',
    breadcrumbs: [
      'Главная',
      'Продукты питания',
      'Кофе',
      'Кофе молотый Lavazza Qualità Oro 100% Арабика средней обжарки 250 г',
    ],
    title: 'Кофе молотый Lavazza Qualità Oro 100% Арабика средней обжарки 250 г',
    rating: '4.9',
    reviews: '(2 318)',
    price: '24,90 р.',
    unit: '250 г',
    deliveryLabel: 'СЕГОДНЯ',
    images: [assets.productLavazza],
    about:
      'Классический итальянский кофе Lavazza Qualità Oro — 100% арабика средней обжарки с мягким ароматом и сбалансированным вкусом. Подходит для турки, френч-пресса и рожковой кофеварки.',
    specs: [
      { label: 'Бренд', value: 'Lavazza' },
      { label: 'Тип', value: 'Кофе молотый' },
      { label: 'Состав', value: 'Арабика 100%' },
      { label: 'Обжарка', value: 'Средняя' },
      { label: 'Вес', value: '250 г' },
    ],
    composition: '100% арабика. Молотый кофе средней обжарки.',
    storage: 'Хранить в сухом прохладном месте при температуре до +25 °C, в плотно закрытой упаковке.',
    trade: [
      { label: 'Торговая марка', value: 'Lavazza' },
      { label: 'Страна производства', value: 'Италия' },
      {
        label: 'Производитель',
        value: 'Luigi Lavazza S.p.A., Torino, Italy. Импортёр в РБ указан на упаковке.',
      },
    ],
    reviewsList: [
      {
        author: 'Мария П.',
        date: '2 нояб. 2026',
        text: 'Аромат насыщенный, вкус мягкий без горечи. Берём постоянно — удобная пачка на две недели.',
      },
      {
        author: 'Игорь В.',
        date: '18 окт. 2026',
        text: 'Хороший повседневный кофе. В турке получается плотная пенка, как в кафе.',
      },
    ],
    badgeProduct: 'sale',
  },
  jardin: {
    id: 'jardin',
    breadcrumbs: [
      'Главная',
      'Продукты питания',
      'Кофе',
      'Кофе растворимый Jardin Colombia Medellin 190 г',
    ],
    title: 'Кофе растворимый Jardin Colombia Medellin 190 г',
    rating: '4.5',
    reviews: '(1 893)',
    price: '11,90 р.',
    unit: '190 г',
    deliveryLabel: 'СЕГОДНЯ',
    images: [assets.productJardin],
    about:
      'Растворимый кофе Jardin Colombia Medellin с ярким вкусом и лёгкой кислинкой. Быстро растворяется, удобен для дома и офиса.',
    specs: [
      { label: 'Бренд', value: 'Jardin' },
      { label: 'Тип', value: 'Кофе растворимый' },
      { label: 'Линейка', value: 'Colombia Medellin' },
      { label: 'Вес', value: '190 г' },
    ],
    composition: 'Кофе растворимый сублимированный.',
    storage: 'Хранить в сухом месте при температуре до +25 °C.',
    trade: [
      { label: 'Торговая марка', value: 'Jardin' },
      { label: 'Страна производства', value: 'Германия' },
    ],
    reviewsList: [
      {
        author: 'Елена С.',
        date: '5 нояб. 2026',
        text: 'Удобно на работе. Вкус приятный, не горький.',
      },
    ],
    badgeProduct: 'sale',
  },
  nespresso: {
    id: 'nespresso',
    breadcrumbs: [
      'Главная',
      'Продукты питания',
      'Кофе',
      'Кофе в капсулах Nespresso Assorted набор из 5 вкусов по 10 шт',
    ],
    title: 'Кофе в капсулах Nespresso Assorted набор из 5 вкусов по 10 шт',
    rating: '4.9',
    reviews: '(1 542)',
    price: '38,90 р.',
    unit: '50 шт',
    deliveryLabel: '27 СЕНТЯБРЯ',
    images: [assets.productNespresso],
    about:
      'Набор капсул Nespresso Assorted — пять популярных вкусов по 10 штук. Для капсульных кофемашин стандарта Nespresso.',
    specs: [
      { label: 'Бренд', value: 'Nespresso' },
      { label: 'Тип', value: 'Кофе в капсулах' },
      { label: 'Количество', value: '50 шт' },
      { label: 'Вкусы', value: 'Assorted (5 видов)' },
    ],
    composition: 'Молотый обжаренный кофе в капсулах.',
    storage: 'Хранить в сухом месте, беречь от прямых солнечных лучей.',
    trade: [
      { label: 'Торговая марка', value: 'Nespresso' },
      { label: 'Страна производства', value: 'Швейцария' },
    ],
    reviewsList: [
      {
        author: 'Дмитрий К.',
        date: '28 окт. 2026',
        text: 'Удобный микс, чтобы выбрать любимый вкус. Качество стабильное.',
      },
    ],
    badgeProduct: 'popular',
  },
}

function buildPdpFromProduct(product: Product): ProductPdp {
  return {
    id: product.id,
    breadcrumbs: ['Главная', 'Каталог', product.title],
    title: product.title,
    rating: product.rating,
    reviews: product.reviews,
    price: product.price.endsWith('.') ? product.price : `${product.price}.`,
    unit: product.unit,
    deliveryLabel: product.badges?.delivery?.label ?? 'СЕГОДНЯ',
    images: [product.image],
    about: `${product.title} — доступен к заказу в Super App. Характеристики и условия доставки уточняйте в карточке и при оформлении.`,
    specs: [
      { label: 'Артикул', value: product.id },
      { label: 'Фасовка', value: product.unit },
      { label: 'Рейтинг', value: product.rating },
    ],
    composition: 'Состав указан на упаковке товара.',
    storage: 'Соблюдайте условия хранения, указанные производителем.',
    trade: [{ label: 'Продавец', value: 'Super App Marketplace' }],
    reviewsList: [
      {
        author: 'Покупатель',
        date: '1 нояб. 2026',
        text: 'Товар соответствует описанию, доставка без сюрпризов.',
      },
    ],
    badgeProduct: product.badges?.product,
    badgeStatus: product.badges?.status,
  }
}

/** Design sample from the food details sheet, node 511:34515. */
const FOOD_NUTRITION: NonNullable<ProductPdp['nutrition']> = {
  basis: '100 г',
  calories: '140',
  protein: '16',
  fat: '5',
  carbs: '30',
}

const FOOD_PRODUCT_IDS = new Set<string>([
  ...FOOD_LISTING_PRODUCTS.map((product) => product.id),
  'lavazza-oro-beans',
  'lavazza',
  'jardin',
  'nespresso',
  'greenfield',
  'lipton',
])

export function isFoodProduct(id: string): boolean {
  return FOOD_PRODUCT_IDS.has(id)
}

/** Parts-payment calculation is only for appliances and electronics. */
const INSTALLMENT_LISTINGS = new Set<ListingCategoryId>(['appliances', 'electronics'])

export function showsInstallment(id: string): boolean {
  return (Object.values(CATEGORY_LISTINGS) as CategoryListing[]).some(
    (listing) => INSTALLMENT_LISTINGS.has(listing.id) && listing.products.some((product) => product.id === id),
  )
}

function findCatalogProduct(id: string): Product | undefined {
  return (
    PRODUCTS.find((item) => item.id === id) ??
    FOOD_LISTING_PRODUCTS.find((item) => item.id === id) ??
    ELECTRONICS_LISTING_PRODUCTS.find((item) => item.id === id) ??
    APPLIANCES_LISTING_PRODUCTS.find((item) => item.id === id) ??
    BEAUTY_LISTING_PRODUCTS.find((item) => item.id === id) ??
    PETS_LISTING_PRODUCTS.find((item) => item.id === id)
  )
}

export function getProductPdp(id: string): ProductPdp | null {
  const catalog = findCatalogProduct(id)
  const listed = PDP_BY_ID[id]
  const pdp = listed ?? (catalog ? buildPdpFromProduct(catalog) : null)
  if (!pdp) return null
  const priceSale = Boolean(
    catalog?.oldPrice || catalog?.badges?.product === 'sale' || catalog?.badges?.marketing,
  )
  const reviewCount = pdp.reviews.replace(/[()]/g, '').trim()
  return {
    ...pdp,
    deliveryType: pdp.deliveryType ?? catalog?.badges?.delivery?.type ?? 'absolute',
    installment: pdp.installment ?? installmentFromPrice(pdp.price),
    showInstallment: showsInstallment(id),
    ratingBlock: pdp.ratingBlock ?? {
      score: pdp.rating,
      reviews: `${reviewCount} отзывов`,
    },
    ...(isFoodProduct(id) ? { nutrition: pdp.nutrition ?? FOOD_NUTRITION } : {}),
    ...(catalog?.oldPrice ? { oldPrice: catalog.oldPrice } : {}),
    ...(priceSale ? { priceSale: true } : {}),
  }
}

export const PDP_RECOMMENDED: Product[] = [
  {
    id: 'ornaments',
    title: 'Набор новогодних шаров 12 штук',
    price: '25,49 р',
    oldPrice: '29,99 р',
    unit: '1 шт',
    rating: '4.8',
    reviews: '(124)',
    image: assets.productOrnaments,
    badges: {
      marketing: { type: 'discount', label: '– 15%' },
      product: 'popular',
      delivery: { type: 'express' },
    },
  },
  {
    id: 'garland',
    title: 'Гирлянда светодиодная 5м',
    price: '18,99 р',
    unit: '1 шт',
    rating: '4.7',
    reviews: '(89)',
    image: assets.productGarland,
    badges: {
      marketing: { type: '1+1' },
      product: 'new',
      delivery: { type: 'relative' },
    },
  },
]
