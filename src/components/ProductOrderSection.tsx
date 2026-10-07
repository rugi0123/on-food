import React, { useState } from 'react';
import { MAIN_PRODUCT } from '../data/saengsikData';
import { IMAGES } from '../assets/images';
import { ShoppingBag, Truck, Gift, ShieldAlert, Check, Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react';

interface ProductOrderSectionProps {
  onDirectOrder: (quantity: number) => void;
  isLargeFont: boolean;
}

export const ProductOrderSection: React.FC<ProductOrderSectionProps> = ({
  onDirectOrder,
  isLargeFont,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const product = MAIN_PRODUCT;
  const totalPrice = product.salePrice * quantity;
  const discountPercent = Math.round(
    ((product.originalPrice - product.salePrice) / product.originalPrice) * 100
  );

  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleIncrease = () => {
    if (quantity < 20) setQuantity((prev) => prev + 1);
  };

  return (
    <section id="product" className="py-14 sm:py-20 bg-[#FAF7F2] border-b border-[#E6DEC9]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10 sm:mb-14">
          <span className="text-xs sm:text-sm font-bold text-[#346E3A] tracking-wider uppercase">
            TODAY'S SPECIAL OFFER
          </span>
          <h2
            className={`font-black text-[#1A381C] tracking-tight leading-tight ${
              isLargeFont ? 'text-3xl sm:text-4xl lg:text-5xl' : 'text-2xl sm:text-3xl lg:text-4xl'
            }`}
          >
            정성을 담은 순수 생식 1박스
          </h2>
          <p
            className={`text-[#4C5B4B] leading-relaxed ${
              isLargeFont ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
            }`}
          >
            아침마다 건강하고 간편하게 비우고 채우는 30일간의 자연 곡물 식사
          </p>
        </div>

        {/* Product Purchase Box */}
        <div className="bg-white rounded-3xl border-2 border-[#D8CEB7] shadow-lg overflow-hidden max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Left: Product Image & Badges */}
            <div className="lg:col-span-6 p-6 sm:p-10 bg-[#F9F6F0] flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#E6DEC9]">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="inline-block text-xs sm:text-sm font-extrabold text-[#1E3F20] bg-[#E5EFE4] px-3 py-1 rounded-full">
                    {product.badge}
                  </span>
                  <span className="text-xs text-[#5E6D5D] font-medium">
                    무료배송 혜택
                  </span>
                </div>

                <div className="rounded-2xl overflow-hidden border border-[#D5CBB3] shadow-md bg-white aspect-[4/3] sm:aspect-[1/1] max-h-[380px]">
                  <img
                    src={IMAGES.product}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>

              {/* Gift Callout */}
              <div className="mt-6 p-4 rounded-2xl bg-[#F0EAE0] border border-[#DDD3BC] flex items-center gap-3">
                <Gift className="w-6 h-6 text-[#2C6233] shrink-0" />
                <div className="text-xs sm:text-sm text-[#384637]">
                  <span className="font-bold text-[#1E3F20] block">구매 고객 전원 특별 사은품</span>
                  <span>{product.bonusGift}</span>
                </div>
              </div>
            </div>

            {/* Right: Pricing, Quantity & Big Order CTA */}
            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div>
                  <span className="text-xs sm:text-sm text-[#4E5C4E] font-medium block mb-1">
                    [온하루] 100% 국내산 원료
                  </span>
                  <h3
                    className={`font-black text-[#1A381C] leading-tight ${
                      isLargeFont ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
                    }`}
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5B6A5B] mt-1">
                    {product.capacity} · 1일 1포 기준 30일분
                  </p>
                </div>

                {/* Price Display */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#FBF9F4] border border-[#E7DECC] space-y-2">
                  <div className="flex items-center gap-2 text-sm text-[#7F8B7D]">
                    <span className="line-through tabular-nums">
                      {product.originalPrice.toLocaleString()}원
                    </span>
                    <span className="font-bold text-[#C84B31]">
                      {discountPercent}% 할인
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span
                      className={`font-black text-[#1E3F20] tabular-nums ${
                        isLargeFont ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
                      }`}
                    >
                      {product.salePrice.toLocaleString()}
                    </span>
                    <span className="text-lg font-bold text-[#1E3F20]">원</span>
                    <span className="text-xs text-[#5D6B5C] font-semibold ml-auto bg-[#E5EFE4] px-2 py-0.5 rounded">
                      1포당 1,500원 꼴
                    </span>
                  </div>
                </div>

                {/* Key Points Checklist */}
                <div className="space-y-2 text-xs sm:text-sm text-[#384637]">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2C6233] shrink-0" />
                    <span>국내산 50가지 원물 (곡물 15종, 채소 23종, 해조/과일 12종)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2C6233] shrink-0" />
                    <span>합성 착향료, 감미료, 보존제 일절 무첨가</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#2C6233] shrink-0" />
                    <span>전국 무료배송 · {product.deliveryTime}</span>
                  </div>
                </div>

                {/* Quantity Control (Big touch buttons) */}
                <div className="pt-2">
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-[#F6F1E7] border border-[#DED4BE]">
                    <span className="font-bold text-sm sm:text-base text-[#253624]">
                      주문 수량
                    </span>
                    
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleDecrease}
                        aria-label="수량 감소"
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white border border-[#D3C8AF] flex items-center justify-center font-bold text-[#1E3F20] hover:bg-[#FAF7F2] active:scale-95 transition-all"
                      >
                        <Minus className="w-4 h-4" />
                      </button>

                      <span className="w-10 text-center font-black text-lg sm:text-xl text-[#1E3F20] tabular-nums">
                        {quantity}
                      </span>

                      <button
                        type="button"
                        onClick={handleIncrease}
                        aria-label="수량 증가"
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white border border-[#D3C8AF] flex items-center justify-center font-bold text-[#1E3F20] hover:bg-[#FAF7F2] active:scale-95 transition-all"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Total Calculation */}
                <div className="flex items-center justify-between pt-1 px-1">
                  <span className="text-sm sm:text-base font-bold text-[#4E5C4E]">
                    총 결제 예정 금액
                  </span>
                  <div className="text-right">
                    <span
                      className={`font-black text-[#1E3F20] tabular-nums ${
                        isLargeFont ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
                      }`}
                    >
                      {totalPrice.toLocaleString()}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-[#1E3F20] ml-1">원</span>
                  </div>
                </div>
              </div>

              {/* BIG ORDER BUTTON requested by user */}
              <div className="space-y-3 pt-3">
                <button
                  onClick={() => onDirectOrder(quantity)}
                  type="button"
                  className={`w-full flex items-center justify-center gap-3 bg-[#1E3F20] hover:bg-[#152E17] active:scale-[0.99] text-white font-black rounded-2xl shadow-xl shadow-[#1E3F20]/25 transition-all cursor-pointer ${
                    isLargeFont
                      ? 'py-4.5 sm:py-5.5 text-xl sm:text-2xl'
                      : 'py-4 sm:py-5 text-lg sm:text-xl'
                  }`}
                >
                  <ShoppingBag className="w-6 h-6 sm:w-7 sm:h-7 shrink-0" />
                  <span>주문하기</span>
                </button>

                <p className="text-center text-xs text-[#6B7869]">
                  안전한 간편 결제 지원 · 비회원도 1분이면 간편 주문 가능
                </p>
              </div>

            </div>

          </div>

          {/* Accordion: Transparent Food Labeling & Ingredients Info */}
          <div className="border-t border-[#E6DEC9] bg-[#F7F3EB] px-6 sm:px-10 py-4">
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-bold text-[#344633] hover:text-[#1E3F20] transition-colors"
            >
              <span>식품위생법에 따른 상품 정보 고시 (원재료, 식품유형, 보관방법 확인)</span>
              {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showDetails && (
              <div className="pt-4 pb-2 space-y-2 text-xs text-[#526051] border-t border-[#DFD6C2] mt-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div><strong className="text-[#203120]">식품의 유형:</strong> 생식류 (곡류가공품)</div>
                  <div><strong className="text-[#203120]">내용량:</strong> 1,050g (35g × 30포)</div>
                  <div><strong className="text-[#203120]">제조원/판매원:</strong> 온하루 자연식품 (국내 제조)</div>
                  <div><strong className="text-[#203120]">원산지:</strong> 국내산 100% (50개 전 품목)</div>
                  <div><strong className="text-[#203120]">보관방법:</strong> 직사광선 및 고온다습한 곳을 피하여 서늘한 곳 보관</div>
                  <div><strong className="text-[#203120]">소비기한:</strong> 제조일로부터 12개월 (최신 제조분 발송)</div>
                </div>
                <p className="text-[11px] text-[#6E7B6C] pt-2">
                  * 본 제품은 질병의 예방 및 치료를 위한 의약품이나 건강기능식품이 아니며, 자연 원물로 만든 일반 식품입니다.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
