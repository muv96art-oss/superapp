# Approved / locked components

## cartStepper — `2150:57161`

Источник: [FIG-MarketPlace--Web-](https://www.figma.com/design/nffYpVDVicgNNUc0zUEY4A/FIG-MarketPlace--Web-?node-id=2150-57161)

Компонент: `src/components/CartStepper.tsx`  
Использование: кнопки на карточках товаров (`ProductCard`)

### Состояния (type)

| type | Когда | UI |
|------|--------|-----|
| `add` | quantity = 0 | фон `surface-brand` `#1B74FD` (Super-App), иконка plus `#FFFAF2` 20×20, высота **44** (`391:76801`), radius 16 |
| `stepper` | 0 < quantity < max | фон Secondary-Light `#F5F5F8`, − / количество / +, иконки Violet `#9B51E0` |
| `stepperMax` | quantity ≥ max | как stepper, но plus disabled `#D5D1D7`, плюс не кликабелен |

### Поведение

1. Тап по `add` → quantity = 1 → `stepper`
2. `+` увеличивает quantity до max
3. `−` уменьшает; при 0 возвращает `add`
4. На max — `stepperMax` (плюс недоступен)

Не менять визуал и стейт-машину без явного апрува.

## PriceDetails — `2144:2714`

Источник: [FIG-MarketPlace--Web-](https://www.figma.com/design/nffYpVDVicgNNUc0zUEY4A/FIG-MarketPlace--Web-?node-id=2144-2714)

Компонент: `src/components/PriceDetails.tsx`

| type | Когда | UI |
|------|--------|-----|
| `default` | `badges.product !== 'sale'` | цена `#242731` |
| `sale` | `badges.product === 'sale'` | цена `#F53B46` + oldPrice line-through |

## Badges — `2140:1745`

Источник: [FIG-MarketPlace--Web-](https://www.figma.com/design/nffYpVDVicgNNUc0zUEY4A/FIG-MarketPlace--Web-?node-id=2140-1745)

Компонент: `src/components/badges.tsx`  
Данные: `product.badges` в `src/data.ts`

### Семейства

| Family | types | Позиция на карточке |
|--------|--------|---------------------|
| Badge/Delivery | express / relative / absolute | под ценой |
| Badge/Product | sale / new / popular | на фото снизу слева |
| Badge/Marketing | discount / 1+1 | на фото сверху слева |
| Badge/Status | outOfStock / deliveryOnly | на фото сверху слева |
| Badge/Order | multiplicity | рядом с Delivery |

Набор бейджей индивидуален для каждой карточки. Не менять без апрува.
