import React from 'react';
import { ShoppingBag, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { IMAGES } from '../assets/images';

interface HeroSectionProps {
  onOrderClick: () => void;
  isLargeFont: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOrderClick,
  isLargeFont,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 sm:pt-12 sm:pb-20 bg-gradient-to-b from-[#FAF7F2] via-[#F5EFE4] to-[#FAF7F2] border-b border-[#E6DEC9]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Quiet metadata kicker */}
            <div className="inline-flex items-center gap-2 text-[#3D6B42] text-sm sm:text-base font-semibold tracking-wide">
              <span>100% 국내산 50가지 곡물과 채소</span>
              <span aria-hidden="true">·</span>
              <span>동결건조 생채식 분말</span>
            </div>

            {/* Main Headline requested by user: 하루한잔, 간편한 한끼 */}
            <div className="space-y-2">
              <h1
                className={`font-black text-[#19351A] tracking-tight leading-[1.18] ${
                  isLargeFont
                    ? 'text-4xl sm:text-5xl lg:text-6xl'
                    : 'text-3xl sm:text-4xl lg:text-5xl'
                }`}
                style={{ textWrap: 'balance' }}
              >
                하루 한 잔,
                <br className="hidden xs:inline" />
                <span className="text-[#2C6233]"> 간편한 한 끼</span>
              </h1>
              <p
                className={`text-[#455043] leading-relaxed font-normal pt-2 ${
                  isLargeFont ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
                }`}
              >
                바쁜 아침 1분, 물이나 우유에 가볍게 흔들어 마시는 순수 생식.
                <br className="hidden sm:inline" />
                우리 땅에서 자란 50가지 자연 곡물과 채소를 온전히 담았습니다.
              </p>
            </div>

            {/* Key feature check bullets - Clear and transparent, no health claims */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 pb-2 text-left">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/70 border border-[#E3D9C3]">
                <CheckCircle2 className="w-5 h-5 text-[#2C6233] shrink-0" />
                <span className="text-sm sm:text-base font-semibold text-[#253323]">
                  국내산 원료 50종
                </span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/70 border border-[#E3D9C3]">
                <CheckCircle2 className="w-5 h-5 text-[#2C6233] shrink-0" />
                <span className="text-sm sm:text-base font-semibold text-[#253323]">
                  합성첨가물 0%
                </span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/70 border border-[#E3D9C3]">
                <CheckCircle2 className="w-5 h-5 text-[#2C6233] shrink-0" />
                <span className="text-sm sm:text-base font-semibold text-[#253323]">
                  1분 간편 섭취
                </span>
              </div>
            </div>

            {/* Big Order CTA requested */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 justify-center lg:justify-start">
              <button
                onClick={onOrderClick}
                type="button"
                className={`w-full sm:w-auto flex items-center justify-center gap-3 bg-[#1E3F20] hover:bg-[#162F18] active:scale-[0.99] text-white font-extrabold rounded-2xl shadow-lg shadow-[#1E3F20]/20 transition-all ${
                  isLargeFont
                    ? 'py-4 sm:py-5 px-8 sm:px-10 text-xl sm:text-2xl'
                    : 'py-4 sm:py-4.5 px-8 sm:px-9 text-lg sm:text-xl'
                }`}
              >
                <ShoppingBag className="w-6 h-6 shrink-0" />
                <span>주문하기</span>
                <ArrowRight className="w-5 h-5 shrink-0 opacity-80" />
              </button>

              <a
                href="#ingredients"
                className="w-full sm:w-auto inline-flex items-center justify-center py-4 px-6 text-base sm:text-lg font-bold text-[#2A4328] bg-white border border-[#D5CBB3] hover:bg-[#F2ECE0] rounded-2xl transition-colors"
              >
                50가지 재료 보기
              </a>
            </div>

            {/* Delivery & Special Offer Note */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-[#5B6758] font-medium pt-1">
              <span>✓ 전 지역 무료배송</span>
              <span>·</span>
              <span>✓ 전용 보틀 증정 이벤트 중</span>
              <span>·</span>
              <span>✓ 평일 14시 전 당일 발송</span>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-[#EFE9DC] aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
                <img
                  src={IMAGES.hero}
                  alt="신선한 국내산 곡물과 채소로 완성한 온하루 순수 생식 한 잔"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="eager"
                />
                
                {/* Floating quiet tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-[#D8CEB7] shadow-sm flex items-center justify-between text-xs sm:text-sm">
                  <div>
                    <p className="font-bold text-[#1E3F20]">자연 원물 그대로의 고소함</p>
                    <p className="text-[#596657]">설탕·색소·보존료 무첨가 순수 식품</p>
                  </div>
                  <span className="font-bold text-[#2D5A27] bg-[#E7F0E5] px-2.5 py-1 rounded-lg">
                    100% 국산
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
