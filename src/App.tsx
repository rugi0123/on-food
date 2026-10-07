import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { IngredientsSection } from './components/IngredientsSection';
import { TargetAudienceSection } from './components/TargetAudienceSection';
import { HowToDrinkSection } from './components/HowToDrinkSection';
import { ProductOrderSection } from './components/ProductOrderSection';
import { FaqNoticeSection } from './components/FaqNoticeSection';
import { Footer } from './components/Footer';
import { OrderModal } from './components/OrderModal';
import { AdminOrdersModal } from './components/AdminOrdersModal';
import { OrderLookupModal } from './components/OrderLookupModal';
import { AuthModal } from './components/AuthModal';
import { MobileStickyBar } from './components/MobileStickyBar';
import { subscribeAuthState, signOutUser, AppUser } from './services/authService';
import { X } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [isLargeFont, setIsLargeFont] = useState<boolean>(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [isLookupModalOpen, setIsLookupModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMessage, setAuthModalMessage] = useState<string>('');
  const [orderQuantity, setOrderQuantity] = useState<number>(1);
  const [showTopBanner, setShowTopBanner] = useState<boolean>(true);

  // Subscribe to auth state
  useEffect(() => {
    const unsub = subscribeAuthState((user) => {
      setCurrentUser(user);
    });
    return () => unsub();
  }, []);

  // Load font preference if previously set
  useEffect(() => {
    const saved = localStorage.getItem('onharu_large_font');
    if (saved === 'true') {
      setIsLargeFont(true);
    }
  }, []);

  const handleToggleFontSize = () => {
    setIsLargeFont((prev) => {
      const next = !prev;
      localStorage.setItem('onharu_large_font', String(next));
      return next;
    });
  };

  /**
   * 주문하기 클릭 시 회원가입/로그인 여부 확인
   * 미로그인 시 로그인/회원가입 모달 먼저 오픈
   */
  const handleOpenOrder = (qty: number = 1) => {
    setOrderQuantity(qty);
    if (!currentUser) {
      setAuthModalMessage('주문하시려면 먼저 회원가입 또는 로그인을 해주세요.');
      setIsAuthModalOpen(true);
      return;
    }
    setIsOrderModalOpen(true);
  };

  const handleAuthSuccess = (user: AppUser) => {
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    // 로그인 성공 후 주문 모달을 바로 띄워 원활하게 주문 진행
    setIsOrderModalOpen(true);
  };

  const handleSignOut = async () => {
    await signOutUser();
    setCurrentUser(null);
  };

  const handleCloseOrder = () => {
    setIsOrderModalOpen(false);
  };

  return (
    <div className={`min-h-screen bg-[#FAF7F2] text-[#242A24] ${isLargeFont ? 'font-size-large' : ''}`}>
      {/* Top Notification Announcement Bar */}
      {showTopBanner && (
        <div className="bg-[#2C6233] text-white text-xs sm:text-sm py-2 px-4 text-center font-medium flex items-center justify-center gap-2 relative">
          <div className="flex items-center gap-1.5 truncate">
            <span className="font-bold bg-[#1C4521] px-2 py-0.5 rounded text-[11px]">혜택</span>
            <span>첫 구매 고객 친환경 보틀 &amp; 계량스푼 전원 증정 + 전국 무료배송</span>
          </div>
          <button
            type="button"
            onClick={() => setShowTopBanner(false)}
            aria-label="안내 배너 닫기"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header */}
      <Header
        onOrderClick={() => handleOpenOrder(1)}
        isLargeFont={isLargeFont}
        onToggleFontSize={handleToggleFontSize}
        onOpenLookup={() => setIsLookupModalOpen(true)}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        currentUser={currentUser}
        onOpenAuth={() => {
          setAuthModalMessage('');
          setIsAuthModalOpen(true);
        }}
        onSignOut={handleSignOut}
      />

      {/* Main Content */}
      <main>
        {/* 1. Hero Section with "하루 한 잔, 간편한 한 끼" & Big CTA */}
        <HeroSection
          onOrderClick={() => handleOpenOrder(1)}
          isLargeFont={isLargeFont}
        />

        {/* 2. 국내산 50가지 곡물, 채소로 만들었다는 소개 */}
        <IngredientsSection isLargeFont={isLargeFont} />

        {/* 3. 이런 분께 좋아요 (3가지) */}
        <TargetAudienceSection
          onOrderClick={() => handleOpenOrder(1)}
          isLargeFont={isLargeFont}
        />

        {/* 4. 물이나 우유에 타서 드세요 (1 -> 2 -> 3 순서 표시) */}
        <HowToDrinkSection isLargeFont={isLargeFont} />

        {/* 5. 상품 1개와 가격, "주문하기" 큰 버튼 */}
        <ProductOrderSection
          onDirectOrder={(qty) => handleOpenOrder(qty)}
          isLargeFont={isLargeFont}
        />

        {/* 6. FAQ & 정직한 식품 표시 안내 */}
        <FaqNoticeSection isLargeFont={isLargeFont} />
      </main>

      {/* Footer with lookup and admin links */}
      <Footer
        onOpenLookup={() => setIsLookupModalOpen(true)}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
      />

      {/* Mobile Sticky Order Bar (capped at <= 15% mobile viewport) */}
      <MobileStickyBar onOrderClick={() => handleOpenOrder(1)} />

      {/* Interactive Order & Checkout Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={handleCloseOrder}
        initialQuantity={orderQuantity}
        isLargeFont={isLargeFont}
        onOpenLookup={() => setIsLookupModalOpen(true)}
        currentUser={currentUser}
      />

      {/* Auth Modal (회원가입 & 로그인) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        isLargeFont={isLargeFont}
        message={authModalMessage}
      />

      {/* Store Admin Order Management Modal */}
      <AdminOrdersModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        isLargeFont={isLargeFont}
      />

      {/* Customer Order Lookup Modal */}
      <OrderLookupModal
        isOpen={isLookupModalOpen}
        onClose={() => setIsLookupModalOpen(false)}
        isLargeFont={isLargeFont}
      />
    </div>
  );
}
