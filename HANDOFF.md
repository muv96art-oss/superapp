# Compact: Super App

## Goal
Web-прототип Super App (банк + маркет). Визуальный источник — Figma `BlCBDkgcEsVAj6n7r9vgyh`. Готово, когда принятые экраны совпадают с макетами: банк, маркет, корзина/оплата, флоу регистрации/входа, переход банк→маркет, Balance issue + связанное состояние Home, Premium-подписка с БШ, страница оформления карты. Публичный просмотр — Vercel + autodeploy с GitHub.

## Status
- Done: главная, каталог, листинги, поиск, корзина, PDP, оплата; банк (`BankScreen`); market `BottomNav` (sliding Selection + glass); Home Indicator на шелле; auth (BSH → SMS/NEO); переход банк→маркет (`MarketTransitionScreen` `645:6802`) с `marketIntroSeen`.
- Done: `LoginBottomSheet` без «или»/«По номеру»; HeroTop default h=`530`, без TAbs; Halva strip `654:8738` + карта `680:9932`; PromoBlock; PDP tip; Balance sheet tops `131`/`335` + тап по карте.
- Done: `BalanceScreen` — 4 фазы (`unissued` → `virtual` → `activation` | `premium`) по Figma `698:29960` / `687:6573` / `692:26673` / `692:26841`.
- Done: блоки sheet Balance как компоненты: `BalanceIssueBanner`, `BalancePremiumBanner`, `BalanceOperationsCard`, `BalanceTransferCard`, `BalanceStatusChip`; плюс (Observed): `BalanceIssueButton`, `BalanceMarketplaceCard`, `BalanceActionSection`, `BalanceRequisitesSection`; ассеты `public/assets/balance/components/*` + `src/assets.ts`; mesh ShaderFill где применимо.
- Done: выпуск карты → Home Variant4: `cardIssued` в `App.tsx` → `HomeScreen` → `HeroTop`; Figma `391:77341` (530 + Halva) → `698:30267` (420, Halva скрыта).
- Done (2026-11-20): Premium флоу — баннер → `BalancePremiumSheet` → тогл → «Подключить» → `phase: premium`.
- Done (2026-11-20, Observed): **`CardApplicationScreen` `716:12621`** — оверлей; входы: Halva `654:8738`, PDP tips `631:7110`, PDP Halva `585:8582`, Balance banner `698:29990`, issue CTA `672:9159`. Оба согласия → «Оформить» → `cardIssued` + Balance `virtual` + Home Variant4. BottomNav скрыт на оверлее.
- Done (Observed, 2026-11-24): публичный хостинг — GitHub `muv96art-oss/superapp`, Vercel autodeploy с `main`; прод URL вида `https://dist-six-lemon-fbc1p6aczo.vercel.app` (и preview на vercel.app из скрина). `vercel.json`, `.gitignore`/`.vercel` в репо.
- Done (Observed, 2026-11-24): Safari blank — `SafeShaderFill` + `AppErrorBoundary`; Vite target `safari14`; коммит `efc630b`.
- Done (Observed, 2026-11-24): мобильный full-bleed — рамка `max-w-[375px]` + серый фон `#e8eaed` **только от `md` (768px)**; на телефоне без gutters. Body bg white на mobile. Коммит `0f7850d`.
- Verified (2026-11-24): пользователь подтвердил на телефоне — серых полей нет, full-bleed ок после `0f7850d`.
- Reverted (2026-11-24): shell `transform: scale` убран — увеличивал шрифты визуально; токены/`text-[Npx]` снова 1:1 на устройстве.
- Verified (Observed ранее): Halva Home → страница; submit → Halva скрыта; Balance virtual (Premium banner + «Выпускаем карту…»).
- Not verified / Unverified: пропорции блоков на >375 без scale (нужен aspect-ratio по компонентам, не scale текста); Premium БШ / CardApplication / Balance / Halva / MarketTransition.

## Decisions
- Платформа Web. React, TypeScript, Tailwind CSS v4, Vite. — Approved — `package.json`.
- Визуальный источник — `BlCBDkgcEsVAj6n7r9vgyh`. Токены — `src/index.css`. Skills: Figma design-to-code + TokenSafe. — Approved — пользователь.
- Банк → «Маркет»: первый раз `MarketTransitionScreen` (`645:6802`); CTA → `home` + BSH; дальше в сессии сразу `home`. — Approved.
- BSH: только Moby; без «или» / «По номеру телефона». Auth moby: BSH → SMS → NEO. — Approved.
- BottomNav «Баланс» → `BalanceScreen`. — Approved — 2026-11-18.
- Balance phases — Approved — 2026-11-19; **Premium entry уточнён 2026-11-20**; **Issue entry уточнён 2026-11-20**:
  - `unissued` (`698:29960`): тап карты **off**; «Оформить» / баннер «Оформи карту…» / Halva / PDP tips / PDP Halva → **открывают `CardApplicationScreen` `716:12621`** (не сразу `virtual`).
  - Submit на странице (оба тогла согласия) → `virtual` + `cardIssued` / Home Variant4.
  - `virtual` (`687:6573`): карта issued `00.00`; тап карты **on**; баннер Премиум → **открывает БШ**; статус «Выпускаем карту…» → `activation`.
  - `activation` (`692:26673`): Премиум + категории + «Активируйте…»; бонус `0`; тап on. Баннер Премиум тоже → БШ.
  - `premium` (`692:26841`): после согласия + «Подключить» в БШ; статус «максимальный уровень» + категории; бонус `25`; тап on.
  - Sheet: ранее collapsed `top:131` / expanded `top:335`. **2026-11-24:** страница Balance скроллится целиком под фиксированным хедером (имя/аватар); оверлейный top sheet убран по запросу пользователя — Observed.
- Card application — Approved intent (пользователь 2026-11-20) / Observed реализация: Figma `716:12621`; reuse `BalanceMarketplaceCard` (287×173), `StatusBar`, тоглы как Premium; «Оформить» disabled до обоих согласий.
- Premium БШ — Approved intent / Observed: Figma `716:11902` / `716:12084`.
- Safari Tabs Mode на Balance **не** портить. — Approved.
- Home после выпуска карты — Approved — 2026-11-19:
  - `cardIssued=false` → HeroTop `391:77341` / h=`530` + Halva `654:8738` + карта `680:9932`.
  - `cardIssued=true` → HeroTop Variant4 `698:30267` / h=`420`, Halva **скрыта**.
- Промо NEO / Home Indicator `z-[90]` — Approved + Locked (см. Locked UI).
- Десктоп: phone-frame `md:max-w-[375px]` + серый canvas; мобильный: full-bleed без gutters. — Observed (fix 2026-11-24). Шрифты — как в токенах / Figma px, **без** shell `transform: scale` (откатили 2026-11-24 по запросу пользователя).

## Constraints
- Контент и стили из Figma; конфликт с утверждённым UI — спросить. — Approved.
- `DESIGN.md` нет — не создавать без запроса. — Approved.
- Экраны маркета через `hidden`; PDP/auth/card-application — overlay. — Observed — `App.tsx`.
- Локально: `http://127.0.0.1:5174/` (также `:5173`). Телефон LAN: `0.0.0.0:5175`; VPN Faygo Connect мешает. — Observed.
- Прод: GitHub `muv96art-oss/superapp` → Vercel Production на push в `main`. — Observed.
- Не менять Locked UI без явного разрешения. — Approved.
- Variant4 Home — только через `cardIssued` из card application submit; не хардкодить 420 как единственное состояние. — Approved.

## Locked and approved UI
- NeoOnboardingScreen — `src/components/NeoOnboardingScreen.tsx` + `public/assets/auth/neo-*` — **не менять** без разрешения.
- CartStepper — `src/components/CartStepper.tsx`.
- PriceDetails / Badges — шрифты по запросу.
- BottomNav glass, Home Indicator, cart sticky — не переделывать молча.
- HeroTop **default** (без карты): Halva strip (`654:8738` / карта `680:9932`) и h=`530` — не менять без разрешения (кроме явной замены ассета / wiring клика на application).
- HeroTop **после issue** (`cardIssued`): h=`420`, без Halva — Figma `698:30267` — Approved; не откатывать на постоянные 530+Halva.
- Ассет карты Halva: `halva-card-figma-source.png` (MD5 `a2e33d20…`) — Locked для default strip.
- Balance sheet tops `131`/`335` и фазы issue — не ломать без разрешения.
- Premium entry через БШ (не прямой jump в `premium` с баннера) — Approved intent; не откатывать на прямой `goPremium` без разрешения.
- Card issue entry через `CardApplicationScreen` (не прямой jump в `virtual` с баннера/кнопки) — Approved intent 2026-11-20; не откатывать без разрешения.

## Open work
- [x] Mobile full-bleed после `0f7850d` — ok пользователя (2026-11-24).
- [ ] **Следующий шаг:** визуальный ok пользователя по fluid-width правкам (BSH, Neo CTA, promo, Balance cards/scroll, CardApplication, badges fixed).
- [x] Shell scale откатили — шрифты снова как в токенах (2026-11-24).
- [x] Fluid width (2026-11-24, Observed): Login BSH, Neo buttons, Balance `w-[327]`→`w-full`, Transfer/Actions/Requisites, MarketplaceCard aspect-ratio, Promo `aspect-[140/178]`, Hero Halva card, CardApplication info+consent left, Balance page scroll + fixed header.
- [ ] Визуальный ok / правки по `CardApplicationScreen` (`716:12621`) и входам (Halva / PDP / Balance).
- [ ] Визуальный ok / правки по Premium БШ (`716:12084`).
- [ ] Визуальный ok пользователя по связке Balance issue → Home Variant4 (`698:30267`) и по 4 состояниям Balance.
- [ ] Halva hero (default, до issue): финальный ok пользователя.
- [ ] Опционально по запросу: пиксель-сверка `MarketTransitionScreen` `645:6802`.
- [ ] Unverified: обновить `docs/approved-components.md` только по явному запросу.

## Known issues
- Карта Halva: Figma-исходник на чёрном фоне; при crop поверх hero поля могут быть заметнее. — Observed — `halva-card-figma-source.png` / `HeroTop.tsx`.
- Старый `home/halva-banner-card.png` (`homeHalvaCard`) в HeroTop strip **не** используется. — Observed.
- На Balance в DOM может оставаться узел `data-name="Halva"` (баннер/другие) — не путать с Home Halva strip. — Observed.
- `docs/approved-components.md` отстаёт от шрифтов цены/бейджей. — Observed.
- «Подробнее о безопасности» на intro — toast-stub. — Observed / Approved stub.
- «Правила Premium подписки» в БШ — toast-stub. — Observed — `BalancePremiumSheet` / `onRulesClick`.
- Ссылки договора / памятки на CardApplication — toast-stub. — Observed.
- Guest на Home («Войдите в профиль») не блокирует issue на Balance — Observed / Unverified product intent.
- Close-анимация БШ при `open=false` (как у `LoginBottomSheet`): unmount через rAF без гарантированного slide-down — Observed / Unverified polish.
- ShaderFill (mesh) на карте требует WebGPU; без него / при ошибке — `SafeShaderFill` fallback (не blank). — Observed — `SafeShaderFill` / Safari fix `efc630b`.
- Серые gutters на телефонах >430 CSS px — исправлено в `0f7850d`; визуальный ok на устройстве подтверждён (2026-11-24).
- На ширине >375 фиксированные высоты тянут блоки по ширине (банеры/категории). Shell scale откатили (ломал размер шрифтов vs токены). Нужен per-component aspect-ratio. — Observed.

## Do not redo
- Не трогать NEO / Tabs Mode / `pb-[44px]` CTA без запроса.
- Не возвращать «или» / «По номеру» на BSH; Moby только SMS → NEO.
- Не опускать HI ниже auth (`z-[90]`).
- Не возвращать TAbs в HeroTop.
- Не ломать dual-state HeroTop: default 530+Halva / issued 420 без Halva; не хардкодить только одно.
- Не подменять карту Halva «на глаз» в default strip.
- Не ломать Balance sheet tops `131`/`335` и тап карты (off только в `unissued`).
- Не портить Safari Tabs Mode на Balance.
- Не откатывать компонентные блоки Balance sheet обратно в монолитные PNG без запроса.
- Не возвращать прямой `goPremium` с `BalancePremiumBanner` в обход БШ без явного разрешения.
- Не возвращать прямой `issueCard` → `virtual` с баннера/кнопки в обход `CardApplicationScreen` без явного разрешения.
- Не возвращать постоянный `max-w-[375px]` на мобильных (серые gutters) без явного разрешения — mobile full-bleed от `0f7850d`.
- Не вводить shell `transform: scale` снова — увеличивает шрифты относительно токенов. — Approved intent 2026-11-24.
- Не пересматривать Decisions / Locked UI без явного разрешения пользователя.

## Key files
- Shell layout: `src/App.tsx` (md phone-frame / mobile full-bleed), `src/index.css` (body bg)
- Safari safety: `SafeShaderFill` (если есть), `AppErrorBoundary`
- Card application: `CardApplicationScreen.tsx`, `App.tsx` (`cardApplicationOpen`, `openCardApplication`, `submitCardApplication`), `public/assets/card-application/back.svg`
- Entry wiring: `HeroTop.tsx` (Halva), `PdpCreditTipsBanner.tsx`, `ProductDetailScreen.tsx` (Halva `585:8582`), `BalanceScreen.tsx` (`onRequestIssue`, `cardIssued`)
- Home↔Balance: `src/App.tsx` (`cardIssued`), `HomeScreen.tsx`, `HeroTop.tsx`, `BalanceScreen.tsx`
- Balance components: `BalanceIssueBanner.tsx`, `BalanceIssueButton.tsx`, `BalanceMarketplaceCard.tsx`, `BalancePremiumBanner.tsx`, `BalancePremiumSheet.tsx`, …
- Ассеты: `src/assets.ts` (`balance*`, `cardApplicationBack`), `public/assets/balance/`, `public/assets/balance/components/`
- Hero: `HeroTop.tsx`, `public/assets/home/halva-card-figma-source.png`
- Deploy: `vercel.json`, GitHub `muv96art-oss/superapp`, branch `main`
