import React, { useState } from 'react';
import { INGREDIENT_CATEGORIES, TRUST_POINTS } from '../data/saengsikData';
import { IMAGES } from '../assets/images';
import { ShieldCheck, Check, Sparkles } from 'lucide-react';

interface IngredientsSectionProps {
  isLargeFont: boolean;
}

export const IngredientsSection: React.FC<IngredientsSectionProps> = ({ isLargeFont }) => {
  const [activeTab, setActiveTab] = useState<string>('grains');

  const currentCategory = INGREDIENT_CATEGORIES.find((cat) => cat.id === activeTab) || INGREDIENT_CATEGORIES[0];
  const totalCount = INGREDIENT_CATEGORIES.reduce((acc, cat) => acc + cat.items.length, 0);

  return (
    <section id="ingredients" className="py-14 sm:py-20 bg-[#FAF7F2] border-b border-[#E6DEC9]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
          <div className="text-xs sm:text-sm font-bold text-[#346E3A] tracking-wider uppercase">
            100% DOMESTIC NATURAL INGREDIENTS
          </div>
          <h2
            className={`font-black text-[#1A381C] tracking-tight leading-tight ${
              isLargeFont ? 'text-3xl sm:text-4xl lg:text-5xl' : 'text-2xl sm:text-3xl lg:text-4xl'
            }`}
          >
            국내산 50가지 곡물과 채소로
            <br />
            정직하게 만든 순수 생식
          </h2>
          <p
            className={`text-[#4B5949] leading-relaxed ${
              isLargeFont ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
            }`}
          >
            우리 땅 비옥한 토양에서 수확한 통곡물과 잎채소, 뿌리채소를 껍질째 담았습니다.
            <br className="hidden sm:inline" />
            수입산 원료와 인공 착향료를 전혀 섞지 않고 원물 그대로의 담백한 고소함을 전합니다.
          </p>
        </div>

        {/* 4 Trust Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 sm:mb-16">
          {TRUST_POINTS.map((item, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E3D9C3] shadow-xs flex flex-col justify-between hover:border-[#346E3A] transition-colors"
            >
              <div>
                <span className="text-xs font-bold text-[#346E3A] bg-[#EEF5EC] px-2 py-0.5 rounded">
                  {item.subtitle}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#1E3F20] mt-2 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#4C5B4A] leading-relaxed">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Ingredients Showcase Block */}
        <div className="bg-[#F4EFE6] rounded-3xl p-6 sm:p-10 border border-[#DFD5BE]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Visual & Summary */}
            <div className="lg:col-span-5 space-y-5">
              <div className="rounded-2xl overflow-hidden border border-[#D5CBB3] shadow-md bg-white aspect-[4/3]">
                <img
                  src={IMAGES.ingredients}
                  alt="국내산 현미, 서리태, 케일, 당근 등 50가지 자연 원료"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="bg-white/80 rounded-2xl p-4 sm:p-5 border border-[#D5CBB3] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#203D22]">원물 구성 총계</span>
                  <span className="text-lg font-black text-[#1E3F20] tabular-nums">
                    총 {totalCount}종 전량 국내산
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#5B6858] leading-relaxed">
                  영하 40도 급속 동결건조 공법을 적용하여 열에 의한 원물 영양과 향미 손실을 최소화했습니다.
                </p>
              </div>
            </div>

            {/* Category Tabs & 50 Ingredients Grid */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Tabs */}
              <div className="flex flex-wrap gap-2 pb-2 border-b border-[#D5CBB3]">
                {INGREDIENT_CATEGORIES.map((cat) => {
                  const isActive = activeTab === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveTab(cat.id)}
                      type="button"
                      className={`px-3.5 py-2 text-sm sm:text-base font-bold rounded-xl transition-all ${
                        isActive
                          ? 'bg-[#1E3F20] text-white shadow-sm'
                          : 'bg-white/70 text-[#364434] hover:bg-white hover:text-[#1E3F20] border border-[#D8CEB7]'
                      }`}
                    >
                      {cat.name}
                    </button>
                  );
                })}
              </div>

              {/* Category Explanation */}
              <div className="bg-white/90 p-4 rounded-xl border border-[#D8CEB7]">
                <p className="text-sm sm:text-base font-semibold text-[#1E3F20]">
                  {currentCategory.description}
                </p>
              </div>

              {/* Items List */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 max-h-[380px] overflow-y-auto pr-1">
                {currentCategory.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white border border-[#DDD3BC] shadow-xs flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-bold text-sm sm:text-base text-[#19331A]">
                        {item.name}
                      </span>
                      <span className="text-[11px] font-semibold text-[#346E3A] bg-[#EEF5EC] px-1.5 py-0.5 rounded shrink-0">
                        {item.origin}
                      </span>
                    </div>
                    <p className="text-xs text-[#5E6D5C] line-clamp-1">
                      {item.feature}
                    </p>
                  </div>
                ))}
              </div>

              {/* No False Claims Compliance Notice */}
              <div className="text-xs text-[#637261] bg-[#ECE5D7] p-3 rounded-xl flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#346E3A] shrink-0" />
                <span>
                  온하루 생식은 자연 원물을 그대로 분쇄한 일반 가공식품으로, 합성 감미료나 화학 첨가물을 넣지 않았습니다.
                </span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
