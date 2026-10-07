import React, { useState } from 'react';
import { X, Search, Package, Clock, Truck, CheckCircle2, Phone } from 'lucide-react';
import { getOrder, getAllOrders } from '../services/orderService';
import { OrderRecord } from '../types';

interface OrderLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLargeFont: boolean;
}

export const OrderLookupModal: React.FC<OrderLookupModalProps> = ({
  isOpen,
  onClose,
  isLargeFont,
}) => {
  const [queryInput, setQueryInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [foundOrders, setFoundOrders] = useState<OrderRecord[] | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = queryInput.trim();
    if (!q) return;

    setIsLoading(true);
    setHasSearched(true);

    try {
      if (q.startsWith('CRD-') || q.startsWith('OH-')) {
        const order = await getOrder(q);
        setFoundOrders(order ? [order] : []);
      } else {
        // Search by phone or name
        const all = await getAllOrders();
        const matches = all.filter(
          (o) =>
            o.phone.replace(/[^0-9]/g, '').includes(q.replace(/[^0-9]/g, '')) ||
            o.customerName.includes(q) ||
            o.orderId.toLowerCase().includes(q.toLowerCase())
        );
        setFoundOrders(matches);
      }
    } catch (err) {
      console.error(err);
      setFoundOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#D5CBB3] overflow-hidden my-6">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#FAF7F2] border-b border-[#E6DEC9]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2C6233]" />
            <h3 className="font-extrabold text-[#19351A] text-lg sm:text-xl">
              주문 및 배송 조회
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="p-1.5 text-[#677765] hover:text-[#19351A] hover:bg-[#EFE8D9] rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <p className="text-xs sm:text-sm text-[#4F5E4E]">
            주문 시 입력하신 <strong>휴대폰 번호</strong> 또는 <strong>주문번호(CRD-...)</strong>를 입력하시면 실시간 주문 진행 상태를 확인하실 수 있습니다.
          </p>

          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#7A8A79] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="예: 010-1234-5678 또는 CRD-20261007-3843"
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#D5CAB1] focus:outline-none focus:ring-2 focus:ring-[#2C6233] text-sm text-[#19351A]"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !queryInput.trim()}
              className="px-5 py-3 bg-[#1E3F20] hover:bg-[#152E17] text-white font-bold rounded-xl text-sm transition-all disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? '조회 중...' : '조회'}
            </button>
          </form>

          {/* Results */}
          {hasSearched && (
            <div className="space-y-4 pt-2">
              {foundOrders && foundOrders.length > 0 ? (
                foundOrders.map((order) => (
                  <div
                    key={order.orderId}
                    className="p-5 rounded-2xl bg-[#FBF9F4] border border-[#DDD3BC] space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-[#EBE3D2] pb-2.5">
                      <span className="font-mono font-bold text-xs sm:text-sm text-[#19351A]">
                        {order.orderId}
                      </span>
                      <span
                        className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${
                          order.status === '접수완료'
                            ? 'bg-amber-100 text-amber-900'
                            : order.status === '배송준비'
                            ? 'bg-blue-100 text-blue-900'
                            : order.status === '발송완료'
                            ? 'bg-emerald-100 text-emerald-900'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="text-xs sm:text-sm space-y-1 text-[#4F5E4E]">
                      <p>
                        <strong className="text-[#19351A]">주문 상품:</strong> {order.productName} ({order.quantity}박스)
                      </p>
                      <p>
                        <strong className="text-[#19351A]">받는 분:</strong> {order.customerName}
                      </p>
                      <p>
                        <strong className="text-[#19351A]">배송지:</strong> {order.address} {order.detailAddress}
                      </p>
                      <p>
                        <strong className="text-[#19351A]">결제 금액:</strong> {order.totalPrice.toLocaleString()}원
                      </p>
                      {order.trackingNumber && (
                        <p className="pt-1 text-[#2C6233] font-bold flex items-center gap-1">
                          <Truck className="w-4 h-4" />
                          <span>우체국 택배 송장: {order.trackingNumber}</span>
                        </p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 rounded-2xl bg-[#FBF9F4] border border-dashed border-[#DDD3BC] space-y-2">
                  <Package className="w-8 h-8 text-[#A0AEA0] mx-auto" />
                  <p className="text-sm font-bold text-[#405040]">조회된 주문 내역이 없습니다.</p>
                  <p className="text-xs text-[#7B8C7A]">
                    휴대폰 번호 또는 주문번호를 다시 확인해 주세요.
                  </p>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
