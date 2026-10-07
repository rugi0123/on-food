import React, { useState } from 'react';
import { HOW_TO_DRINK_STEPS } from '../data/saengsikData';
import { IMAGES } from '../assets/images';
import { ArrowRight, Droplets, Milk, Sparkles, HelpCircle } from 'lucide-react';

interface HowToDrinkSectionProps {
  isLargeFont: boolean;
}

export const HowToDrinkSection: React.FC<HowToDrinkSectionProps> = ({ isLargeFont }) => {
  const [selectedMixOption, setSelectedMixOption] = useState<'water' | 'milk' | 'sweet'>('milk');

  return (
    <section id="how-to-drink" className="py-14 sm:py-20 bg-[#FAF7F2] border-b border-[#E6DEC9]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold text-[#346E3A] tracking-wider uppercase">
            EASY 3-STEP GUIDE
          </span>
          <h2
            className={`font-black text-[#1A381C] tracking-tight leading-tight ${
              isLargeFont ? 'text-3xl sm:text-4xl lg:text-5xl' : 'text-2xl sm:text-3xl lg:text-4xl'
            }`}
          >
            물이나 우유에 타서 드세요
          </h2>
          <p
            className={`text-[#4C5B4B] leading-relaxed ${
              isLargeFont ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
            }`}
          >
            가루 뭉침 없이 부드럽게! 누구나 1분이면 쉽게 완성하는 3단계 음용 순서입니다.
          </p>
        </div>

        {/* 1 -> 2 -> 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative mb-12 sm:mb-16">
          {HOW_TO_DRINK_STEPS.map((step, index) => (
            <div
              key={index}
              className="relative bg-white rounded-3xl p-6 sm:p-8 border border-[#DFD6C2] shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Step Indicator Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="w-12 h-12 rounded-2xl bg-[#1E3F20] text-white font-black text-xl flex items-center justify-center font-mono">
                    {step.stepNumber}
                  </span>
                  <span className="text-xs font-bold text-[#346E3A] bg-[#EEF5EC] px-3 py-1 rounded-full">
                    {step.label}
                  </span>
                </div>

                {/* Step Action Title */}
                <h3
                  className={`font-black text-[#19351A] mb-3 leading-snug ${
                    isLargeFont ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
                  }`}
                >
                  {step.action}
                </h3>

                {/* Step Description */}
                <p
                  className={`text-[#4B5A4A] leading-relaxed mb-4 ${
                    isLargeFont ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
                  }`}
                >
                  {step.description}
                </p>
              </div>

              {/* Helpful Tip Box */}
              <div className="p-3.5 bg-[#F6F2E9] rounded-2xl border border-[#E7DECC] text-xs sm:text-sm text-[#596656] leading-relaxed">
                <span className="font-bold text-[#1E3F20] block mb-0.5">💡 TIP:</span>
                {step.tip}
              </div>

              {/* Arrow Connector for Desktop (only between cards 1 and 2, 2 and 3) */}
              {index < 2 && (
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-[#1E3F20] text-white items-center justify-center shadow-md">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Visual + Drink Variations Box */}
        <div className="bg-[#F3EDE2] rounded-3xl p-6 sm:p-10 border border-[#DDD3BC]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Photo */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-md border-2 border-white aspect-[4/3]">
                <img
                  src={IMAGES.howToDrink}
                  alt="우유와 물에 간편하게 흔들어 마시는 온하루 생식"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Interactive Flavor & Mixing Guide */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <span className="text-xs font-bold text-[#346E3A] uppercase tracking-wider">
                  TASTE GUIDE
                </span>
                <h3
                  className={`font-black text-[#19351A] mt-1 mb-2 ${
                    isLargeFont ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
                  }`}
                >
                  취향에 따라 선택하는 3가지 음용법
                </h3>
                <p className="text-sm sm:text-base text-[#4F5D4E]">
                  물과 우유 외에도 두유, 아몬드 브리즈와 함께하시면 색다른 풍미를 즐길 수 있습니다.
                </p>
              </div>

              {/* Option Selector Buttons */}
              <div className="grid grid-cols-3 gap-2 p-1.5 bg-white/70 rounded-2xl border border-[#D8CEB7]">
                <button
                  type="button"
                  onClick={() => setSelectedMixOption('milk')}
                  className={`py-2.5 px-2 text-xs sm:text-sm font-bold rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                    selectedMixOption === 'milk'
                      ? 'bg-[#1E3F20] text-white shadow-sm'
                      : 'text-[#3E4C3C] hover:bg-white'
                  }`}
                >
                  <Milk className="w-4 h-4" />
                  <span>우유 / 두유</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMixOption('water')}
                  className={`py-2.5 px-2 text-xs sm:text-sm font-bold rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                    selectedMixOption === 'water'
                      ? 'bg-[#1E3F20] text-white shadow-sm'
                      : 'text-[#3E4C3C] hover:bg-white'
                  }`}
                >
                  <Droplets className="w-4 h-4" />
                  <span>생수 / 냉수</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMixOption('sweet')}
                  className={`py-2.5 px-2 text-xs sm:text-sm font-bold rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                    selectedMixOption === 'sweet'
                      ? 'bg-[#1E3F20] text-white shadow-sm'
                      : 'text-[#3E4C3C] hover:bg-white'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>꿀 / 조청 추가</span>
                </button>
              </div>

              {/* Dynamic Description Box */}
              <div className="p-5 rounded-2xl bg-white border border-[#D8CEB7] space-y-2">
                {selectedMixOption === 'milk' && (
                  <>
                    <h4 className="font-bold text-base sm:text-lg text-[#1E3F20]">
                      🥛 우유 또는 두유 200ml (가장 추천하는 조합)
                    </h4>
                    <p className="text-sm sm:text-base text-[#4A5749] leading-relaxed">
                      서리태와 찰보리의 고소함이 우유의 부드러움과 어우러져 깊고 진한 맛을 선사합니다. 포만감이 가장 오래 유지되어 아침 출근길 식사 대용으로 제격입니다.
                    </p>
                  </>
                )}

                {selectedMixOption === 'water' && (
                  <>
                    <h4 className="font-bold text-base sm:text-lg text-[#1E3F20]">
                      💧 시원한 생수 200ml (가장 깔끔하고 담백한 맛)
                    </h4>
                    <p className="text-sm sm:text-base text-[#4A5749] leading-relaxed">
                      50가지 국내산 자연 원물 본연의 순수한 흙내음과 싱그러운 채소 향을 그대로 음미할 수 있습니다. 텁텁함 없이 가볍고 상쾌한 목넘김을 원하시는 분께 추천합니다.
                    </p>
                  </>
                )}

                {selectedMixOption === 'sweet' && (
                  <>
                    <h4 className="font-bold text-base sm:text-lg text-[#1E3F20]">
                      🍯 기호에 따라 천연 꿀 반 스푼 추가
                    </h4>
                    <p className="text-sm sm:text-base text-[#4A5749] leading-relaxed">
                      온하루 생식에는 인공 설탕이나 감미료가 들어있지 않습니다. 달콤함을 원하실 땐 자연 꿀 반 스푼을 살짝 타주시면 온 가족이 맛있게 즐길 수 있는 영양 간식이 됩니다.
                    </p>
                  </>
                )}
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
