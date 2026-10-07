import React from 'react';
import { ShoppingBag, ZoomIn, ZoomOut, Search, User, LogOut, LogIn, Package } from 'lucide-react';
import { AppUser } from '../services/authService';

interface HeaderProps {
  onOrderClick: () => void;
  isLargeFont: boolean;
  onToggleFontSize: () => void;
  onOpenLookup?: () => void;
  onOpenAdmin?: () => void;
  currentUser: AppUser | null;
  onOpenAuth: () => void;
  onSignOut: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOrderClick,
  isLargeFont,
  onToggleFontSize,
  onOpenLookup,
  onOpenAdmin,
  currentUser,
  onOpenAuth,
  onSignOut,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E6DEC9] transition-all">
      {/* User Status Bar when Logged In */}
      {currentUser && (
        <div className="bg-[#EEF5EC] border-b border-[#DDE8DA] py-1.5 px-4 text-center text-xs sm:text-sm font-bold text-[#1E3F20] flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-1.5 mx-auto sm:mx-0">
            <span className="w-2 h-2 rounded-full bg-[#2C6233] animate-pulse" />
            <span className="font-extrabold text-[#19351A]">
              {currentUser.displayName} 님 환영입니다
            </span>
            <span className="text-xs text-[#526451] font-normal hidden xs:inline">
              (간편 주문 준비 완료)
            </span>
          </div>

          <button
            type="button"
            onClick={onSignOut}
            className="hidden sm:flex items-center gap-1 text-xs text-[#5E705D] hover:text-[#19351A] hover:underline cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>로그아웃</span>
          </button>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 sm:h-20 flex items-center justify-between">
        {/* Zone 1: Brand wordmark (single text element) */}
        <a
          href="#"
          className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1E3F20] flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <span className="w-3 h-3 rounded-full bg-[#346E3A] inline-block" />
          <span>온하루 생식</span>
        </a>

        {/* Zone 2: Navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-[#384337] font-medium text-base">
          <a href="#ingredients" className="hover:text-[#1E3F20] transition-colors py-1">
            국내산 50가지 원료
          </a>
          <a href="#recommend" className="hover:text-[#1E3F20] transition-colors py-1">
            이런 분께 추천
          </a>
          <a href="#how-to-drink" className="hover:text-[#1E3F20] transition-colors py-1">
            음용 방법 (1·2·3)
          </a>
          <a href="#product" className="hover:text-[#1E3F20] transition-colors py-1">
            상품 안내 및 가격
          </a>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Seller Order Management Button */}
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              type="button"
              className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-bold rounded-xl border border-[#C5DAC3] bg-[#E8F3E6] text-[#1E3F20] hover:bg-[#DCEEE8] transition-colors cursor-pointer"
              title="판매자 주문관리 화면 열기"
            >
              <Package className="w-3.5 h-3.5 text-[#2C6233]" />
              <span>주문관리</span>
            </button>
          )}

          {/* User Sign In / Welcome button */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              <span className="hidden md:inline text-xs sm:text-sm font-bold text-[#1E3F20] bg-[#EEF5EC] px-3 py-1.5 rounded-xl border border-[#D5E4D2]">
                {currentUser.displayName} 님
              </span>
              <button
                type="button"
                onClick={onSignOut}
                className="flex md:hidden p-2 text-[#5E705D] hover:text-[#19351A] hover:bg-[#F2ECE0] rounded-lg transition-colors cursor-pointer"
                title="로그아웃"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              type="button"
              className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-bold rounded-xl border border-[#D5CAAF] bg-white text-[#1E3F20] hover:bg-[#F2ECE0] transition-colors cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>로그인</span>
            </button>
          )}

          {/* Order Lookup for Customers */}
          {onOpenLookup && (
            <button
              onClick={onOpenLookup}
              type="button"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg border border-[#D5CAAF] bg-white/80 text-[#2B382A] hover:bg-[#F2ECE0] transition-colors cursor-pointer"
              title="주문 및 배송 조회"
            >
              <Search className="w-3.5 h-3.5 text-[#346E3A]" />
              <span>주문조회</span>
            </button>
          )}

          {/* Font Size Toggle for Accessibility */}
          <button
            onClick={onToggleFontSize}
            type="button"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg border border-[#D5CAAF] bg-white/80 text-[#2B382A] hover:bg-[#F2ECE0] transition-colors cursor-pointer"
            title="글자 크기 조절"
          >
            {isLargeFont ? (
              <>
                <ZoomOut className="w-4 h-4 text-[#346E3A]" />
                <span className="hidden sm:inline">보통 글씨</span>
              </>
            ) : (
              <>
                <ZoomIn className="w-4 h-4 text-[#346E3A]" />
                <span className="hidden sm:inline">큰 글씨</span>
              </>
            )}
          </button>

          {/* Big Order Button */}
          <button
            onClick={onOrderClick}
            type="button"
            className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-bold text-white bg-[#1E3F20] hover:bg-[#162F18] active:scale-[0.98] rounded-xl shadow-sm transition-all whitespace-nowrap cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>주문하기</span>
          </button>
        </div>
      </div>
    </header>
  );
};
