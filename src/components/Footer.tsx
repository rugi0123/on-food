import React from 'react';
import { Phone, Clock, Mail, MapPin, Search, Lock } from 'lucide-react';

interface FooterProps {
  onOpenLookup?: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLookup, onOpenAdmin }) => {
  return (
    <footer className="bg-[#FAF7F2] text-[#556453] pt-12 pb-24 md:pb-14 border-t border-[#E6DEC9] text-xs sm:text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Top Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand & Philosophy */}
          <div className="md:col-span-5 space-y-3">
            <h4 className="text-xl font-extrabold text-[#1E3F20] tracking-tight">
              온하루 생식 (Onharu)
            </h4>
            <p className="text-xs sm:text-sm leading-relaxed text-[#556453] max-w-sm">
              우리 땅에서 자란 50가지 자연 곡물과 채소를 온전히 담았습니다.
              화학 첨가물 없이 원물 그대로의 담백한 고소함으로 바쁜 일상의 든든한 한 끼를 전합니다.
            </p>

            <div className="flex items-center gap-3 pt-1">
              {onOpenLookup && (
                <button
                  type="button"
                  onClick={onOpenLookup}
                  className="inline-flex items-center gap-1.5 text-xs text-[#2C6233] font-bold hover:underline"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>주문 및 배송 조회</span>
                </button>
              )}
              {onOpenAdmin && (
                <>
                  <span className="text-[#C5BBA2]">·</span>
                  <button
                    type="button"
                    onClick={onOpenAdmin}
                    className="inline-flex items-center gap-1 text-xs text-[#6B7B6A] hover:text-[#1E3F20] font-semibold"
                  >
                    <Lock className="w-3 h-3" />
                    <span>스토어 관리자 (주문 관리)</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Customer Service */}
          <div className="md:col-span-4 space-y-2">
            <h5 className="font-bold text-[#1E3F20] text-sm">
              고객 상담 및 주문 문의
            </h5>
            <div className="flex items-center gap-2 text-base font-extrabold text-[#1E3F20]">
              <Phone className="w-4 h-4 text-[#2C6233]" />
              <span>1544-5082</span>
            </div>
            <p className="text-xs text-[#6F7E6D]">
              운영시간: 평일 09:30 ~ 17:30 (점심시간 12:30 ~ 13:30, 주말/공휴일 휴무)
            </p>
            <p className="text-xs text-[#6F7E6D]">
              이메일 문의: help@onharufood.co.kr
            </p>
          </div>

          {/* Safe Food & Shipping Guarantee */}
          <div className="md:col-span-3 space-y-2">
            <h5 className="font-bold text-[#1E3F20] text-sm">
              안심 배송 및 품질 보증
            </h5>
            <p className="text-xs leading-relaxed text-[#6F7E6D]">
              전국 우체국 택배 안전 배송<br />
              평일 오후 2시 이전 주문 건 당일 발송<br />
              파손 및 불량 시 100% 안심 교환/환불
            </p>
          </div>

        </div>

        {/* Business Legal Disclosures */}
        <div className="pt-6 border-t border-[#E6DEC9] text-[11px] sm:text-xs text-[#7B897A] space-y-1.5 leading-relaxed">
          <p>
            상호: 온하루 자연식품 | 대표자: 홍길동 | 사업자등록번호: 214-88-09182 | 통신판매업신고: 제2026-서울종로-0145호
          </p>
          <p>
            사업장 소재지: 서울특별시 종로구 삼청로 84 온하루 빌딩 2층 | 식품유형: 생식류 (곡류가공품)
          </p>
          <p className="pt-2">
            © 2026 Onharu Pure Saengsik. All rights reserved. 본 웹사이트의 모든 콘텐츠는 저작권법의 보호를 받습니다.
          </p>
        </div>

      </div>
    </footer>
  );
};
