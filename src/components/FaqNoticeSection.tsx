import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ShieldCheck, HelpCircle } from 'lucide-react';

interface FaqNoticeSectionProps {
  isLargeFont: boolean;
}

export const FaqNoticeSection: React.FC<FaqNoticeSectionProps> = ({ isLargeFont }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: '일반 미숫가루나 선식과는 어떻게 다른가요?',
      a: '선식이나 미숫가루는 주로 곡물을 볶거나 쪄서 분쇄하는 반면, 생식은 100% 국내산 통곡물과 채소를 씻어 영하 40도에서 급속 동결 건조한 후 곱게 갈아 만듭니다. 열을 가하지 않아 엽록소와 자연 채소 본연의 색과 신선한 풍미가 살아있으며 텁텁함이 적고 깔끔합니다.',
    },
    {
      q: '어떤 맛인가요? 많이 쓰거나 먹기 힘들지 않나요?',
      a: '50가지 원료 중 현미, 찰보리, 서리태, 단호박, 사과 등이 조화롭게 배합되어 은은하게 구수하고 담백한 곡물 맛입니다. 인위적인 설탕은 전혀 넣지 않았지만, 씹을수록 채소와 곡물 고유의 은은한 감미가 느껴져 남녀노소 편안하게 드실 수 있습니다.',
    },
    {
      q: '하루에 몇 번, 언제 마시는 것이 좋은가요?',
      a: '보통 아침 출근길이나 식사 준비가 번거로운 점심·저녁에 1일 1~2회 식사 대용으로 마시는 것을 권장합니다. 속이 더부룩하지 않고 든든하여 아침 첫 식사로 특히 인기가 높습니다.',
    },
    {
      q: '보관 방법과 소비기한은 어떻게 되나요?',
      a: '개별 알루미늄 스틱 포장으로 빛과 공기를 차단하여 상온(직사광선 없는 서늘한 곳) 보관이 가능합니다. 소비기한은 제조일로부터 12개월이며, 개봉 후에는 즉시 물이나 우유에 타서 드시는 것이 가장 신선합니다.',
    },
  ];

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-14 sm:py-20 bg-[#F4EFE6] border-b border-[#E6DEC9]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Title */}
        <div className="text-center space-y-3 mb-10 sm:mb-12">
          <span className="text-xs sm:text-sm font-bold text-[#346E3A] tracking-wider uppercase">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2
            className={`font-black text-[#1A381C] tracking-tight ${
              isLargeFont ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
            }`}
          >
            자주 묻는 질문
          </h2>
          <p className="text-sm sm:text-base text-[#4E5C4E]">
            고객님들께서 가장 궁금해하시는 점들을 투명하게 안내해 드립니다.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#DFD6C2] overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-[#19351A] hover:text-[#2C6233] transition-colors"
                >
                  <span className={`leading-snug ${isLargeFont ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}>
                    Q. {faq.q}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#F4EFE6] flex items-center justify-center shrink-0">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#1E3F20]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#1E3F20]" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-[#F2ECE0] text-[#4B594A] leading-relaxed">
                    <p className={`pt-3 ${isLargeFont ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}`}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Regulatory Labeling Compliance Box */}
        <div className="mt-10 p-5 rounded-2xl bg-[#EBE4D5] border border-[#D5CBB3] flex items-start gap-3.5">
          <ShieldCheck className="w-6 h-6 text-[#2C6233] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-[#4E5C4E] leading-relaxed space-y-1">
            <span className="font-bold text-[#19351A] block">
              식품안전 안내 및 준수 사항
            </span>
            <p>
              온하루 생식은 식품위생법상 곡류가공품(생식류)으로 분류되는 일반 식품입니다. 질병의 예방 및 치료를 표방하지 않으며, 체중 감량이나 면역력 개선 등의 의학적 효능 문구를 사용하지 않고 100% 국산 원재료의 정직함과 간편함에 집중하여 제조합니다.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
