import React from 'react';
import { TARGET_AUDIENCE } from '../data/saengsikData';
import { SunMedium, Utensils, Sprout, ArrowRight } from 'lucide-react';

interface TargetAudienceSectionProps {
  onOrderClick: () => void;
  isLargeFont: boolean;
}

export const TargetAudienceSection: React.FC<TargetAudienceSectionProps> = ({
  onOrderClick,
  isLargeFont,
}) => {
  const icons = [
    <SunMedium key="0" className="w-8 h-8 text-[#2C6233]" />,
    <Utensils key="1" className="w-8 h-8 text-[#2C6233]" />,
    <Sprout key="2" className="w-8 h-8 text-[#2C6233]" />,
  ];

  return (
    <section id="recommend" className="py-14 sm:py-20 bg-[#F4EFE6] border-b border-[#E6DEC9]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10 sm:mb-14">
          <span className="text-xs sm:text-sm font-bold text-[#346E3A] tracking-wider uppercase">
            RECOMMENDED FOR YOU
          </span>
          <h2
            className={`font-black text-[#1A381C] tracking-tight leading-tight ${
              isLargeFont ? 'text-3xl sm:text-4xl lg:text-5xl' : 'text-2xl sm:text-3xl lg:text-4xl'
            }`}
          >
            온하루 생식,
            <br />
            이런 분께 추천해 드립니다
          </h2>
          <p
            className={`text-[#4C5B4B] leading-relaxed ${
              isLargeFont ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
            }`}
          >
            복잡한 준비 없이도 든든하게 속을 채워주는 자연 친화적 식사 루틴
          </p>
        </div>

        {/* 3 Main Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TARGET_AUDIENCE.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-7 sm:p-8 border border-[#DFD6C2] shadow-sm flex flex-col justify-between hover:shadow-md hover:border-[#2C6233] transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#EEF5EC] flex items-center justify-center">
                    {icons[index]}
                  </div>
                  <span className="text-2xl font-black text-[#CBD5C0] font-mono tabular-nums">
                    {item.step}
                  </span>
                </div>

                <span className="inline-block text-xs font-bold text-[#2C6233] bg-[#E7F0E5] px-2.5 py-1 rounded-md mb-3">
                  {item.highlight}
                </span>

                <h3
                  className={`font-bold text-[#19351A] leading-snug mb-3 ${
                    isLargeFont ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
                  }`}
                >
                  {item.title}
                </h3>

                <p
                  className={`text-[#4B5A4A] leading-relaxed ${
                    isLargeFont ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
                  }`}
                >
                  {item.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#EFE8DA] flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#2C6233]">
                <span>하루 1포로 가볍게 시작</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Prompt */}
        <div className="mt-12 text-center">
          <button
            onClick={onOrderClick}
            type="button"
            className={`inline-flex items-center justify-center gap-2.5 bg-[#1E3F20] hover:bg-[#162F18] active:scale-[0.98] text-white font-bold rounded-2xl shadow-md transition-all ${
              isLargeFont
                ? 'py-4 sm:py-5 px-8 sm:px-10 text-lg sm:text-xl'
                : 'py-3.5 sm:py-4 px-7 sm:px-9 text-base sm:text-lg'
            }`}
          >
            <span>나를 위한 간편 한 끼 주문하기</span>
            <ArrowRight className="w-5 h-5 opacity-90" />
          </button>
        </div>

      </div>
    </section>
  );
};
