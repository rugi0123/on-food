import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { MAIN_PRODUCT } from '../data/saengsikData';

interface MobileStickyBarProps {
  onOrderClick: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOrderClick }) => {
  const product = MAIN_PRODUCT;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#DDD3BC] px-4 py-3 shadow-lg">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div>
          <span className="text-[11px] text-[#697768] block">30포 1개월분 / 무료배송</span>
          <div className="flex items-baseline gap-1">
            <span className="font-black text-xl text-[#1E3F20] tabular-nums">
              {product.salePrice.toLocaleString()}
            </span>
            <span className="text-sm font-bold text-[#1E3F20]">원</span>
          </div>
        </div>

        <button
          onClick={onOrderClick}
          type="button"
          className="flex-1 max-w-[200px] flex items-center justify-center gap-2 py-3 px-4 bg-[#1E3F20] hover:bg-[#152E17] active:scale-[0.98] text-white font-black text-base rounded-xl shadow-md transition-all whitespace-nowrap cursor-pointer"
        >
          <ShoppingBag className="w-5 h-5 shrink-0" />
          <span>주문하기</span>
        </button>
      </div>
    </div>
  );
};
