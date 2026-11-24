# Compact: Super App

## Goal
Web-прототип Super App (банк + маркет). Визуальный источник — Figma `BlCBDkgcEsVAj6n7r9vgyh`. Готово, когда принятые экраны совпадают с макетами: банк, маркет, корзина/оплата, флоу регистрации/входа, переход банк→маркет, Balance issue + связанное состояние Home, Premium-подписка с БШ, страница оформления карты. Публичный просмотр — Vercel + autodeploy с GitHub.

## Status
- Done: главная, каталог, листинги, поиск, корзина, PDP, оплата; банк (`BankScreen`); market `BottomNav` (sliding Selection + glass); auth (BSH → SMS/NEO); переход банк→маркет (`MarketTransitionScreen` `645:6802`) с `marketIntroSeen`.
- Done: `LoginBottomSheet` без «или»/«По номеру»; HeroTop default h=`530`, без TAbs; Halva strip `654:8738` + карта `680:9932`; PromoBlock; PDP tip; Balance phases + тап по карте.
- Done: `BalanceScreen` — 4 фазы (`unissued` → `virtual` → `activation` | `premium`) по Figma `698:29960` / `687:6573` / `692:26673` / `692:26841`.
- Done: блоки sheet Balance как компоненты (`BalanceIssueBanner`, `BalancePremiumBanner`, `BalanceOperationsCard`, `BalanceTransferCard`, `BalanceStatusChip`, `BalanceIssueButton`, `BalanceMarketplaceCard`, `BalanceActionSection`, `BalanceRequisitesSection`); ассеты `public/assets/balance/components/*`.
- Done: выпуск карты → Home Variant4 через `cardIssued`; Premium БШ; `CardApplicationScreen` `716:12621` (входы Halva / PDP / Balance).
- Done (Observed, 2026-11-24): GitHub `muv96art-oss/superapp` → Vercel autodeploy с `main`; Safari fix `efc630b`; mobile full-bleed `0f7850d` (Verified на телефоне).
- Done (Observed, 2026-11-24): fluid width без shell scale — коммит `711e8e2` (BSH, Neo CTA, promo, Balance cards, CardApplication, badges fixed h-7, Balance page scroll + fixed header). Shell scale откатили (`f56057f`) — шрифты = токены.
- Done / pushed `28303d5` (Observed, 2026-11-24): StatusBar + HI удалены; CardApplication fluid card + ConsentRow left-align; BankTop/auth top insets; Belkart/Halva phone icon у бейджей (без `ml-auto`). Vercel autodeploy с `main`.
- Not verified / Unverified: визуальный ok на устройстве после `28303d5`; Premium БШ / Balance states / Halva / MarketTransition пиксель-ok.

## Decisions
- Платформа Web. React, TypeScript, Tailwind CSS v4, Vite. — Approved — `package.json`.
- Визуальный источник — `BlCBDkgcEsVAj6n7r9vgyh`. Токены — `src/index.css`. Skills: Figma design-to-code + TokenSafe. — Approved — пользователь.
- Банк → «Маркет»: первый раз `MarketTransitionScreen` (`645:6802`); CTA → `home` + BSH; дальше в сессии сразу `home`. — Approved.
- BSH: только Moby; без «или» / «По номеру телефона». Auth moby: BSH → SMS → NEO. — Approved.
- BottomNav «Баланс» → `BalanceScreen`. — Approved — 2026-11-18.
- Balance phases — Approved — 2026-11-19; Premium entry 2026-11-20; Issue entry 2026-11-20:
  - `unissued` (`698:29960`): тап карты **off**; issue CTA / баннеры / Halva / PDP → **`CardApplicationScreen`** (не сразу `virtual`).
  - Submit (оба согласия) → `virtual` + `cardIssued` / Home Variant4.
  - `virtual` (`687:6573`): баннер Премиум → БШ; статус → `activation`.
  - `activation` (`692:26673`): Премиум + категории; баннер → БШ.
  - `premium` (`692:26841`): после «Подключить» в БШ.
  - Balance scroll: страница целиком под фиксированным хедером (имя/аватар); оверлейный top sheet убран — Observed 2026-11-24.
- Card application — Approved intent / Observed: Figma `716:12621`; fluid `BalanceMarketplaceCard`; тоглы как Premium.
- Mock StatusBar + Home Indicator — **не показывать** (Approved 2026-11-24).
- Premium БШ — Approved intent / Observed: Figma `716:11902` / `716:12084`.
- Safari Tabs Mode на Balance **не** портить. — Approved.
- Home после issue — Approved: `cardIssued=false` → h=`530` + Halva; `cardIssued=true` → Variant4 h=`420`, без Halva.
- Десктоп: `md:max-w-[375px]` + серый canvas; mobile full-bleed; **без** shell `transform: scale`. — Approved / Verified full-bleed.

## Constraints
- Контент и стили из Figma; конфликт с утверждённым UI — спросить. — Approved.
- `DESIGN.md` нет — не создавать без запроса. — Approved.
- Экраны маркета через `hidden`; PDP/auth/card-application — overlay. — Observed — `App.tsx`.
- Локально: `http://127.0.0.1:5174/` (также `:5173`). Телефон LAN: `0.0.0.0:5175`; VPN Faygo Connect мешает. — Observed.
- Прод: GitHub `muv96art-oss/superapp` → Vercel Production на push в `main`. — Observed.
- Не менять Locked UI без явного разрешения. — Approved.
- Variant4 Home — только через `cardIssued` из card application submit. — Approved.
- Commit/push chrome removal — только по явному запросу пользователя. — Approved (git protocol).

## Locked and approved UI
- NeoOnboardingScreen — `src/components/NeoOnboardingScreen.tsx` + `public/assets/auth/neo-*` — **не менять** без разрешения (кроме уже Approved снятия HI/status).
- CartStepper — `src/components/CartStepper.tsx`.
- PriceDetails / Badges — шрифты по запросу; badges fixed `h-7` (Observed fluid pass).
- BottomNav glass, cart sticky — не переделывать молча. Mock StatusBar / Home Indicator **не возвращать**.
- HeroTop **default**: Halva strip + h=`530` — Locked (кроме wiring клика / ассета по запросу).
- HeroTop **после issue**: h=`420`, без Halva — `698:30267` — Approved.
- Ассет карты Halva: `halva-card-figma-source.png` (MD5 `a2e33d20…`) — Locked для default strip.
- Balance фазы issue / тап карты (off только в `unissued`) — не ломать без разрешения.
- Premium entry через БШ; Card issue entry через `CardApplicationScreen` — не откатывать на прямые jumps.

## Open work
- [x] Три бага CardApplication/chrome + bank badge icons — pushed `28303d5` / HANDOFF `c74656d`.
- [x] Cart Method_Tabs gap-2 (8px) + section gap-4 (16px) — pushed (Observed 2026-11-24).
- [x] Balance card overlap + open animation + CardApplication 44px inset — pushed `bb48397` (Observed 2026-11-24).
- [x] Fluid Balance overlap + Premium crown pin + sheet stacking — pushed `8b4297b` (Observed 2026-11-24):
  - `BalancePremiumBanner`: crown `right-[-7px]` — Figma `698:30148`.
  - `BalanceScreen` collapsed: sheet `z-10` над картой `z-0`; `pt-8` (Halva y=32 в `687:6573`); fluid `mt-[calc(103px-(100%-64px)*187/311)]`.
  - Visual ok Observed vs Figma `716:11024` / `687:6573`.
- [x] Expanded Balance sheet gap 24px under Tabs (`mt-6`, без `-mt-6`) — pushed `4ea4997` (Observed 2026-11-24).
- [ ] **Следующий шаг:** визуальный ok / правки Premium БШ (`716:12084`).
- [ ] Визуальный ok Balance issue → Home Variant4 и 4 состояний Balance.
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
- ShaderFill → WebGPU; иначе `SafeShaderFill`. — Observed.
- Ширина >375: высоты тянут блоки; нужен per-component aspect-ratio, не shell scale. — Observed.
- HANDOFF может быть чуть впереди tip после post-push update — Observed.
- PhoneLogin `pt-[82px]` / SmsAuth content `pt-[40px]` / PDP recommended `pt-[72px]` — design spacing (не status leftover); не трогать без запроса. — Observed.
- ShaderFill всё ещё пишет inline `width/height` design px; fluid cards должны форсить `!w-full !h-full` (как в `BalanceMarketplaceCard`). — Observed.
- Balance overlap/animation + CardApplication 44px — pushed `bb48397`; визуальный ok Unverified. — Observed.
- Cart gap Method_Tabs/section — pushed `bb48397`; визуальный ok Unverified. — Observed.
- Fluid overlap + crown pin + sheet `z-10` over card — pushed; prod visual ok Unverified. — Observed.

## Do not redo
- Не возвращать mock StatusBar / Home Indicator без явного разрешения.
- Не возвращать «или» / «По номеру» на BSH; Moby только SMS → NEO.
- Не возвращать TAbs в HeroTop; не ломать dual-state 530+Halva / 420 без Halva.
- Не подменять карту Halva «на глаз» в default strip.
- Не портить Safari Tabs Mode на Balance; не откатывать Balance компоненты в монолитные PNG.
- Не возвращать прямой `goPremium` / прямой `issueCard`→`virtual` в обход БШ / CardApplication.
- Не возвращать постоянный `max-w-[375px]` на mobile; не вводить shell `transform: scale`.
- Не пересматривать Decisions / Locked UI без явного разрешения.

## Key files
- Shell: `src/App.tsx`, `src/index.css`
- Chrome removal (local): deleted `StatusBar.tsx` / `HomeIndicator.tsx`; top/bottom paddings на Balance, Bank, Catalog, Cart, PDP, Search, auth, sheets, HeroTop, Neo
- Card application / Balance / Home: `CardApplicationScreen.tsx`, `BalanceScreen.tsx`, `HeroTop.tsx`, `App.tsx` (`cardIssued`)
- Deploy: `vercel.json`, GitHub `muv96art-oss/superapp`, branch `main`
- Last pushed commit: `4ea4997` (expanded Balance sheet 24px gap under tabs)
