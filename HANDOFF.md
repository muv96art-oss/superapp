# Compact: Super App

## Goal
Web-прототип Super App (банк + маркет). Визуальный источник — Figma `BlCBDkgcEsVAj6n7r9vgyh`. Готово, когда принятые экраны совпадают с макетами: банк, маркет, корзина/оплата, флоу регистрации/входа, переход банк→маркет, Balance issue + связанное состояние Home, Premium-подписка с БШ, страница оформления карты. Публичный просмотр — Vercel + autodeploy с GitHub.

## Status
- Done: главная, каталог, листинги, поиск, корзина, PDP, оплата; банк (`BankScreen`); market `BottomNav` (sliding Selection + glass); auth (BSH → SMS/NEO); переход банк→маркет (`MarketTransitionScreen` `645:6802`) с `marketIntroSeen`.
- Done: `LoginBottomSheet` без «или»/«По номеру»; HeroTop dual-state; Halva strip; PromoBlock; PDP tip; Balance 4 фазы + компоненты sheet; `CardApplicationScreen` `716:12621`.
- Done (Observed, 2026-11-24): GitHub `muv96art-oss/superapp` → Vercel Production на push в `main`; mobile full-bleed Verified; без shell scale; mock StatusBar/HI удалены (`28303d5`).
- Done / pushed (Observed, 2026-11-24):
  - `8b4297b` — Balance sheet `z-10` над картой; fluid overlap; Premium crown `right-[-7px]`.
  - `4ea4997` — expanded Balance: `mt-6` (24px под Tabs).
  - `dd30af8` — PDP баннеры по `cardIssued` / `isPremium`; Premium БШ в App; BottomNav inactive = `icon/primary` (mask).
  - `cbec286` — Cart checkout `525:34965` (карточки, табы, чипы оплаты, Summary fill).
  - `acdac5c` — HANDOFF SHA для `cbec286`.
- Not verified / Unverified: визуальный ok на устройстве после последних пушей; Premium БШ пиксель-ok; Halva hero; MarketTransition; Balance issue → Home Variant4 end-to-end на проде.

## Decisions
- Платформа Web. React, TypeScript, Tailwind CSS v4, Vite. — Approved — `package.json`.
- Визуальный источник — `BlCBDkgcEsVAj6n7r9vgyh`. Токены — `src/index.css` (в т.ч. `--color-icon-primary`, `--color-border-tertiary`, `--color-fill-accent-green-loud`). Skills: Figma design-to-code + TokenSafe. — Approved — пользователь.
- Банк → «Маркет»: первый раз `MarketTransitionScreen` (`645:6802`); CTA → `home` + BSH; дальше в сессии сразу `home`. — Approved.
- BSH: только Moby; без «или» / «По номеру телефона». Auth moby: BSH → SMS → NEO. — Approved.
- BottomNav «Баланс» → `BalanceScreen`. — Approved — 2026-11-18.
- Balance phases — Approved — 2026-11-19; Premium entry 2026-11-20; Issue entry 2026-11-20:
  - `unissued` (`698:29960`): тап карты **off**; issue CTA / баннеры / Halva / PDP → **`CardApplicationScreen`**.
  - Submit (оба согласия) → `virtual` + `cardIssued` / Home Variant4.
  - `virtual` / `activation`: баннер Премиум → БШ.
  - `premium` (`692:26841`): после «Подключить» в БШ; `isPremium` в App.
  - Collapsed: sheet над картой (`z-10` / `z-0`), `pt-8`, fluid `-mt` → −84 @375. Expanded: `mt-6` (24px под Tabs). — Observed / visual ok @local.
- Card application — Approved intent / Observed: Figma `716:12621`.
- Mock StatusBar + Home Indicator — **не показывать**. — Approved 2026-11-24.
- Premium БШ — Approved intent / Observed: Figma `716:11902` / `716:12084`; sheet монтируется в `App` (доступен с Balance и PDP).
- PDP promo — Approved intent / Observed 2026-11-24: нет карты → Halva `585:8582`; карта есть, Premium нет → `BalancePremiumBanner` `698:30143` → БШ; Premium куплен → баннер скрыт.
- BottomNav inactive icons — `icon/primary` `#0d0e0f` via CSS mask (Figma `605:8782`). — Observed 2026-11-24.
- Cart checkout block — Figma `525:34965` / Summary `525:35003` (`surface/secondary` + `border/tertiary`). — Observed 2026-11-24.
- Safari Tabs Mode на Balance **не** портить. — Approved.
- Home после issue — Approved: `cardIssued=false` → h=`530` + Halva; `cardIssued=true` → Variant4 h=`420`, без Halva.
- Десктоп: `md:max-w-[375px]` + серый canvas; mobile full-bleed; **без** shell `transform: scale`. — Approved / Verified full-bleed.

## Constraints
- Контент и стили из Figma; конфликт с утверждённым UI — спросить. — Approved.
- `DESIGN.md` нет — не создавать без запроса. — Approved.
- Экраны маркета через `hidden`; PDP/auth/card-application — overlay; Premium БШ — App-level. — Observed — `App.tsx`.
- Локально: `http://127.0.0.1:5174/` (также `:5173`). Телефон LAN: `0.0.0.0:5175`; VPN Faygo Connect мешает. — Observed.
- Прод: GitHub `muv96art-oss/superapp` → Vercel Production на push в `main`. — Observed.
- Не менять Locked UI без явного разрешения. — Approved.
- Variant4 Home — только через `cardIssued` из card application submit. — Approved.
- Commit/push — только по явному запросу пользователя. — Approved (git protocol).

## Locked and approved UI
- NeoOnboardingScreen — `src/components/NeoOnboardingScreen.tsx` + `public/assets/auth/neo-*` — **не менять** без разрешения (кроме Approved снятия HI/status).
- CartStepper — `src/components/CartStepper.tsx`.
- PriceDetails / Badges — шрифты по запросу; badges fixed `h-7`.
- BottomNav glass / Selection motion — не переделывать молча (цвет inactive icon/primary — Approved change 2026-11-24). Mock StatusBar / Home Indicator **не возвращать**.
- HeroTop **default**: Halva strip + h=`530` — Locked (кроме wiring клика / ассета по запросу).
- HeroTop **после issue**: h=`420`, без Halva — `698:30267` — Approved.
- Ассет карты Halva: `halva-card-figma-source.png` (MD5 `a2e33d20…`) — Locked для default strip.
- Balance фазы issue / тап карты (off только в `unissued`) — не ломать без разрешения.
- Premium entry через БШ; Card issue entry через `CardApplicationScreen` — не откатывать на прямые jumps.

## Open work
- [ ] **Следующий шаг:** визуальный ok / правки Premium БШ (`716:12084`).
- [ ] Визуальный ok Balance issue → Home Variant4 и 4 состояний Balance (на проде после `8b4297b` / `4ea4997`).
- [ ] Визуальный ok cart checkout `525:34965` на проде после `cbec286`.
- [ ] Визуальный ok PDP banner states + BottomNav inactive на проде после `dd30af8`.
- [ ] Halva hero (default): финальный ok.
- [ ] Опционально: пиксель-сверка `MarketTransitionScreen` `645:6802`.
- [ ] `docs/approved-components.md` — только по явному запросу.

## Known issues
- Halva карта: Figma-исходник на чёрном фоне; crop поверх hero может быть заметнее. — Observed.
- Старый `home/halva-banner-card.png` в HeroTop strip **не** используется. — Observed.
- DOM `data-name="Halva"` на Balance ≠ Home Halva strip. — Observed.
- `docs/approved-components.md` отстаёт. — Observed.
- Toast-stubs: intro security, Premium rules, CardApplication links. — Observed / Approved stubs.
- Guest Home не блокирует issue на Balance — Observed / Unverified product intent.
- Close-анимация БШ при `open=false` — Observed / Unverified polish.
- ShaderFill → WebGPU; иначе `SafeShaderFill`; inline design px — fluid cards форсят `!w-full !h-full`. — Observed.
- Ширина >375: высоты тянут блоки; per-component aspect-ratio, не shell scale. — Observed.
- PhoneLogin `pt-[82px]` / SmsAuth `pt-[40px]` / PDP recommended `pt-[72px]` — design spacing; не трогать без запроса. — Observed.
- Prod visual ok после `cbec286` / `dd30af8` / Balance overlap — Unverified на устройстве. — Observed.

## Do not redo
- Не возвращать mock StatusBar / Home Indicator без явного разрешения.
- Не возвращать «или» / «По номеру» на BSH; Moby только SMS → NEO.
- Не возвращать TAbs в HeroTop; не ломать dual-state 530+Halva / 420 без Halva.
- Не подменять карту Halva «на глаз» в default strip.
- Не портить Safari Tabs Mode на Balance; не откатывать Balance компоненты в монолитные PNG.
- Не возвращать прямой `goPremium` / прямой `issueCard`→`virtual` в обход БШ / CardApplication.
- Не возвращать постоянный `max-w-[375px]` на mobile; не вводить shell `transform: scale`.
- Не возвращать sheet **под** картой (`z-0` card / `z-10` sheet inverted) и `-mt-6` overlapping Tabs в expanded.
- Не пересматривать Decisions / Locked UI без явного разрешения.

## Key files
- Shell / state: `src/App.tsx` (`cardIssued`, `isPremium`, `premiumSheetOpen`, Premium БШ), `src/index.css`
- Balance: `BalanceScreen.tsx`, `BalancePremiumBanner.tsx`, `BalancePremiumSheet.tsx`
- PDP: `ProductDetailScreen.tsx` (Halva ↔ Premium ↔ none)
- Cart: `CartScreen.tsx`, `PaymentMethods.tsx`
- Nav: `BottomNav.tsx` + `public/assets/nav/*`
- Home / issue: `HeroTop.tsx`, `CardApplicationScreen.tsx`
- Deploy: `vercel.json`, GitHub `muv96art-oss/superapp`, branch `main`
- Last pushed commit: `acdac5c` (HANDOFF); feature tip: `cbec286` (cart checkout)
