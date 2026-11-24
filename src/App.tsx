import { useCallback, useMemo, useRef, useState } from 'react'
import { BalanceScreen } from './components/BalanceScreen'
import { BankScreen } from './components/BankScreen'
import { BottomNav } from './components/BottomNav'
import { CardApplicationScreen } from './components/CardApplicationScreen'
import { CartScreen } from './components/CartScreen'
import { CatalogScreen, type CatalogScreenHandle } from './components/CatalogScreen'
import { CategoryListingScreen } from './components/CategoryListingScreen'
import { HomeIndicator } from './components/HomeIndicator'
import { HomeScreen, type HomeScreenHandle } from './components/HomeScreen'
import { LoginBottomSheet } from './components/LoginBottomSheet'
import { MarketTransitionScreen } from './components/MarketTransitionScreen'
import { MsiAuthScreen } from './components/MsiAuthScreen'
import { NeoOnboardingScreen } from './components/NeoOnboardingScreen'
import { PhoneLoginScreen } from './components/PhoneLoginScreen'
import { ProductDetailScreen } from './components/ProductDetailScreen'
import { SearchScreen } from './components/SearchScreen'
import { SmsAuthScreen } from './components/SmsAuthScreen'
import {
  crumbTarget,
  getProductPdp,
  isListingCategoryId,
  type ListingCategoryId,
} from './data'

type Screen =
  | 'bank'
  | 'market-intro'
  | 'home'
  | 'balance'
  | 'catalog'
  | 'category-listing'
  | 'search'
  | 'cart'
  | 'pdp'
type ScreenBeforePdp = 'home' | 'catalog' | 'category-listing' | 'search'
type AuthView = null | 'sheet' | 'phone' | 'sms' | 'msi' | 'onboarding'
/** Moby card → SMS → NEO; phone → number → SMS → MSI → NEO */
type AuthPath = 'moby' | 'phone'

const MOBY_ACCOUNT_PHONE = '+375298889980'

export default function App() {
  const [screen, setScreen] = useState<Screen>('bank')
  const [pdpId, setPdpId] = useState<string | null>(null)
  const [pdpFrom, setPdpFrom] = useState<ScreenBeforePdp>('home')
  const [searchVisited, setSearchVisited] = useState(false)
  const [searchFrom, setSearchFrom] = useState<'home' | 'catalog' | 'category-listing'>('home')
  const [searchQuery, setSearchQuery] = useState('')
  const [listingVisited, setListingVisited] = useState(false)
  const [listingCategoryId, setListingCategoryId] = useState<ListingCategoryId>('food')
  const [cart, setCart] = useState<Record<string, number>>({})
  const [toast, setToast] = useState<string | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  /** Partner marketplace disclaimer from bank — Figma 645:6802, shown once per session */
  const [marketIntroSeen, setMarketIntroSeen] = useState(false)
  /** Marketplace card issued on Balance → Home hero Variant4 (698:30267), Halva strip hidden */
  const [cardIssued, setCardIssued] = useState(false)
  /** Card application overlay — Figma 716:12621 */
  const [cardApplicationOpen, setCardApplicationOpen] = useState(false)
  const [authView, setAuthView] = useState<AuthView>(null)
  const [authPath, setAuthPath] = useState<AuthPath>('phone')
  const [authPhone, setAuthPhone] = useState('+375298889900')
  const homeRef = useRef<HomeScreenHandle>(null)
  const catalogRef = useRef<CatalogScreenHandle>(null)

  const cartCount = useMemo(
    () => Object.values(cart).reduce((sum, value) => sum + value, 0),
    [cart],
  )

  const showToast = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(null), 1800)
  }

  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: Math.min(99, (prev[id] ?? 0) + 1) }))
  }

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const current = prev[id] ?? 0
      if (current <= 1) {
        const { [id]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [id]: current - 1 }
    })
  }

  const deleteFromCart = (id: string) => {
    setCart((prev) => {
      const { [id]: _, ...rest } = prev
      return rest
    })
  }

  const clearCart = () => setCart({})

  const openCart = () => setScreen('cart')

  const openCardApplication = useCallback(() => {
    if (cardIssued) {
      showToast('Карта уже оформлена')
      return
    }
    setCardApplicationOpen(true)
  }, [cardIssued])

  const closeCardApplication = useCallback(() => {
    setCardApplicationOpen(false)
  }, [])

  const submitCardApplication = useCallback(() => {
    setCardIssued(true)
    setCardApplicationOpen(false)
  }, [])

  const openProduct = (id: string, from: ScreenBeforePdp) => {
    if (!getProductPdp(id)) {
      showToast('Карточка товара скоро будет')
      return
    }
    setPdpFrom(from)
    setPdpId(id)
    setScreen('pdp')
  }

  const closePdp = () => {
    setScreen(pdpFrom)
    setPdpId(null)
  }

  const openSearch = (from: 'home' | 'catalog' | 'category-listing', query = '') => {
    setSearchFrom(from)
    setSearchQuery(query)
    setSearchVisited(true)
    setScreen('search')
  }

  const openMarket = () => {
    if (!marketIntroSeen) {
      setScreen('market-intro')
      return
    }
    setScreen('home')
    if (!isLoggedIn) setAuthView('sheet')
  }

  const continueFromMarketIntro = () => {
    setMarketIntroSeen(true)
    setScreen('home')
    if (!isLoggedIn) setAuthView('sheet')
  }

  const openBank = () => setScreen('bank')

  const openLoginSheet = () => {
    if (!isLoggedIn) setAuthView('sheet')
  }

  const closeAuthToGuest = () => setAuthView(null)

  /** Moby account row 625:6839 → SMS 613:14514 → NEO 613:14856 */
  const openMobySmsLogin = () => {
    setAuthPath('moby')
    setAuthPhone(MOBY_ACCOUNT_PHONE)
    setAuthView('sms')
  }

  const onSmsComplete = useCallback(() => {
    if (authPath === 'moby') setAuthView('onboarding')
    else setAuthView('msi')
  }, [authPath])

  const completeRegistration = useCallback(() => {
    setAuthView('onboarding')
  }, [])

  const finishOnboarding = () => {
    setIsLoggedIn(true)
    setAuthView(null)
  }

  const showMarketNav =
    screen === 'home' ||
    screen === 'balance' ||
    screen === 'catalog' ||
    screen === 'category-listing' ||
    screen === 'cart'

  const marketNavActive =
    screen === 'home'
      ? 'home'
      : screen === 'balance'
        ? 'balance'
        : screen === 'cart'
          ? 'cart'
          : 'catalog'

  const onMarketNav = (id: 'bank' | 'home' | 'balance' | 'catalog' | 'cart') => {
    if (id === 'bank') {
      openBank()
      return
    }
    if (id === 'home') {
      if (screen === 'home') homeRef.current?.scrollToTop()
      else setScreen('home')
      return
    }
    if (id === 'balance') {
      setScreen('balance')
      return
    }
    if (id === 'catalog') {
      if (screen === 'catalog') catalogRef.current?.scrollToTop()
      else setScreen('catalog')
      return
    }
    if (id === 'cart') openCart()
  }

  const openCrumb = (label: string) => {
    const target = crumbTarget(label)
    if (!target) return
    if (target.screen === 'home') setScreen('home')
    else if (target.screen === 'catalog') setScreen('catalog')
    else if (target.screen === 'listing') openCategoryListing(target.id)
    else openSearch(pdpFrom === 'catalog' ? 'catalog' : pdpFrom === 'category-listing' ? 'category-listing' : 'home', target.query)
    setPdpId(null)
  }

  const openCategoryListing = (id: ListingCategoryId) => {
    setListingCategoryId(id)
    setListingVisited(true)
    setScreen('category-listing')
  }

  const layer = (active: boolean) => (active ? 'relative h-full w-full' : 'hidden')
  const authBlocksNav =
    authView === 'phone' ||
    authView === 'sms' ||
    authView === 'msi' ||
    authView === 'onboarding' ||
    cardApplicationOpen

  return (
    <div className="flex h-dvh justify-center overflow-hidden bg-[#e8eaed]">
      {/* Single phone shell — screens fill it edge-to-edge (no per-screen gutters) */}
      <div className="relative h-dvh w-full max-w-[375px] overflow-hidden bg-bg-base shadow-[0_0_40px_rgba(0,0,0,0.12)] max-[430px]:max-w-none">
        {/* Keep prior screens mounted (hidden) so scroll position survives back */}
        <div className={layer(screen === 'bank')} aria-hidden={screen !== 'bank'}>
          <BankScreen
            onOpenMarket={openMarket}
            onToast={showToast}
            toast={screen === 'bank' ? toast : null}
          />
        </div>

        <div className={layer(screen === 'market-intro')} aria-hidden={screen !== 'market-intro'}>
          <MarketTransitionScreen
            onBack={openBank}
            onContinue={continueFromMarketIntro}
            onSecurityInfo={() => showToast('Раздел в разработке')}
          />
        </div>

        <div className={layer(screen === 'home')} aria-hidden={screen !== 'home'}>
          <HomeScreen
            ref={homeRef}
            cart={cart}
            cartCount={cartCount}
            onAddToCart={addToCart}
            onRemoveFromCart={removeFromCart}
            onOpenProduct={(id) => openProduct(id, 'home')}
            onOpenSearch={() => openSearch('home')}
            onOpenCatalog={() => setScreen('catalog')}
            onOpenCategoryListing={openCategoryListing}
            active={screen === 'home'}
            toast={screen === 'home' ? toast : null}
            onToast={showToast}
            isLoggedIn={isLoggedIn}
            onOpenProfile={openLoginSheet}
            cardIssued={cardIssued}
            onOpenCardApplication={openCardApplication}
          />
        </div>

        <div className={layer(screen === 'balance')} aria-hidden={screen !== 'balance'}>
          <BalanceScreen
            isLoggedIn={isLoggedIn}
            onOpenProfile={openLoginSheet}
            onToast={showToast}
            toast={screen === 'balance' ? toast : null}
            active={screen === 'balance'}
            cardIssued={cardIssued}
            onRequestIssue={openCardApplication}
          />
        </div>

        <div className={layer(screen === 'catalog')} aria-hidden={screen !== 'catalog'}>
          <CatalogScreen
            ref={catalogRef}
            cartCount={cartCount}
            onOpenSearch={() => openSearch('catalog')}
            onCategorySelect={(id, title) => {
              if (isListingCategoryId(id)) {
                openCategoryListing(id)
                return
              }
              showToast(title)
            }}
            toast={screen === 'catalog' ? toast : null}
          />
        </div>

        {listingVisited ? (
          <div
            className={layer(screen === 'category-listing')}
            aria-hidden={screen !== 'category-listing'}
          >
            <CategoryListingScreen
              key={listingCategoryId}
              categoryId={listingCategoryId}
              cart={cart}
              cartCount={cartCount}
              onOpenHome={() => setScreen('home')}
              onOpenCatalog={() => setScreen('catalog')}
              onOpenSearch={() => openSearch('category-listing')}
              onAddToCart={addToCart}
              onRemoveFromCart={removeFromCart}
              onOpenProduct={(id) => openProduct(id, 'category-listing')}
              onToast={showToast}
              toast={screen === 'category-listing' ? toast : null}
            />
          </div>
        ) : null}

        {searchVisited ? (
          <div className={layer(screen === 'search')} aria-hidden={screen !== 'search'}>
            <SearchScreen
              cart={cart}
              initialQuery={searchQuery}
              onCancel={() => setScreen(searchFrom)}
              onOpenProduct={(id) => openProduct(id, 'search')}
              onAddToCart={addToCart}
              onRemoveFromCart={removeFromCart}
              onOpenCatalog={() => setScreen('catalog')}
            />
          </div>
        ) : null}

        <div className={layer(screen === 'cart')} aria-hidden={screen !== 'cart'}>
          <CartScreen
            cart={cart}
            cartCount={cartCount}
            onAdd={(id) => addToCart(id)}
            onRemove={removeFromCart}
            onDelete={deleteFromCart}
            onClear={clearCart}
            onOpenCatalog={() => setScreen('catalog')}
            onOpenProduct={(id) => openProduct(id, 'home')}
            onToast={showToast}
            toast={screen === 'cart' ? toast : null}
          />
        </div>

        {showMarketNav && !authBlocksNav ? (
          <BottomNav
            active={marketNavActive}
            cartCount={cartCount}
            onChange={onMarketNav}
          />
        ) : null}

        {screen === 'pdp' && pdpId ? (
          <div className="absolute inset-0 z-30">
            <ProductDetailScreen
              key={pdpId}
              productId={pdpId}
              cart={cart}
              onBack={closePdp}
              onAddToCart={() => {
                const pdp = getProductPdp(pdpId)
                if (pdp) addToCart(pdp.id)
              }}
              onRemoveFromCart={() => {
                const pdp = getProductPdp(pdpId)
                if (pdp) removeFromCart(pdp.id)
              }}
              onBuyNow={() => {
                setPdpId(null)
                setScreen('cart')
              }}
              onAddRecommended={addToCart}
              onRemoveRecommended={removeFromCart}
              onCrumb={openCrumb}
              onOpenCatalog={() => {
                setPdpId(null)
                setScreen('catalog')
              }}
              onOpenCardApplication={openCardApplication}
            />
          </div>
        ) : null}

        {cardApplicationOpen ? (
          <div className="absolute inset-0 z-50 bg-bg-base">
            <CardApplicationScreen
              onBack={closeCardApplication}
              onSubmit={submitCardApplication}
              onToast={showToast}
            />
          </div>
        ) : null}

        {toast && (screen === 'pdp' || cardApplicationOpen) ? (
          <div
            role="status"
            aria-live="polite"
            className="pointer-events-none absolute bottom-[110px] left-1/2 z-[60] max-w-[85%] -translate-x-1/2 rounded-xl bg-text-primary px-3 py-2 text-center text-[12px] font-medium text-white shadow-lg"
          >
            {toast}
          </div>
        ) : null}

        <LoginBottomSheet
          open={authView === 'sheet'}
          onClose={closeAuthToGuest}
          onLoginMoby={openMobySmsLogin}
        />

        {authView === 'phone' ? (
          <PhoneLoginScreen
            onClose={closeAuthToGuest}
            onContinue={(phone) => {
              setAuthPath('phone')
              setAuthPhone(phone)
              setAuthView('sms')
            }}
          />
        ) : null}

        {authView === 'sms' ? (
          <SmsAuthScreen
            phone={authPhone}
            onBack={() => setAuthView(authPath === 'moby' ? 'sheet' : 'phone')}
            onComplete={onSmsComplete}
          />
        ) : null}

        {authView === 'msi' ? (
          <MsiAuthScreen
            onBack={() => setAuthView('sms')}
            onComplete={completeRegistration}
          />
        ) : null}

        {authView === 'onboarding' ? (
          <NeoOnboardingScreen onDismiss={finishOnboarding} />
        ) : null}

        {/* Above auth overlays (z-70/80) — Figma 613:13747 on login/registration */}
        <HomeIndicator className="absolute inset-x-0 bottom-0 z-[90]" />
      </div>
    </div>
  )
}
