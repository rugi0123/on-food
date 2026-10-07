import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle,
  ShoppingBag,
  CreditCard,
  ShieldCheck,
  ArrowRight,
  Truck,
  Copy,
  Check,
  AlertTriangle,
  ArrowLeft,
  Lock,
} from 'lucide-react';
import { MAIN_PRODUCT } from '../data/saengsikData';
import { OrderFormData, OrderConfirmation } from '../types';
import { createOrder } from '../services/orderService';
import { AppUser } from '../services/authService';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuantity?: number;
  isLargeFont: boolean;
  onOpenLookup?: () => void;
  currentUser?: AppUser | null;
}

type OrderStep = 'form' | 'payment' | 'completed';

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  initialQuantity = 1,
  isLargeFont,
  onOpenLookup,
  currentUser,
}) => {
  const [step, setStep] = useState<OrderStep>('form');
  const [quantity, setQuantity] = useState<number>(initialQuantity);
  const [formData, setFormData] = useState<OrderFormData>({
    quantity: initialQuantity,
    customerName: currentUser?.displayName || '스테판',
    phone: '',
    address: '',
    detailAddress: '',
    deliveryMemo: '부재 시 문 앞에 놓아주세요',
    paymentMethod: 'card',
  });

  // Mock Card fields requested by user: 1111222233334444 prefilled!
  const [cardNumber, setCardNumber] = useState<string>('1111222233334444');
  const [cardExpiry, setCardExpiry] = useState<string>('12/28');
  const [cardCvc, setCardCvc] = useState<string>('777');
  const [cardCompany, setCardCompany] = useState<string>('신한카드');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmation, setConfirmation] = useState<OrderConfirmation | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    if (currentUser?.displayName) {
      setFormData((prev) => ({
        ...prev,
        customerName: prev.customerName || currentUser.displayName,
      }));
    }
  }, [currentUser]);

  if (!isOpen) return null;

  const product = MAIN_PRODUCT;
  const totalPrice = product.salePrice * quantity;

  const handleChange = (field: keyof OrderFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Step 1 -> Step 2 (Proceed to Mock Payment)
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName.trim() || !formData.phone.trim() || !formData.address.trim()) {
      alert('성함, 연락처, 배송지 주소를 모두 입력해주세요.');
      return;
    }
    setStep('payment');
  };

  // Step 2 -> Step 3 (Execute Mock Payment and Create Order)
  const handleExecutePayment = async () => {
    setIsSubmitting(true);
    try {
      const now = new Date();
      const datePart = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(
        now.getDate()
      ).padStart(2, '0')}`;
      const randPart = Math.floor(1000 + Math.random() * 9000);
      // Requested format: CRD-20261007-3843
      const orderId = `CRD-${datePart}-${randPart}`;

      const dateString = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(
        now.getDate()
      ).padStart(2, '0')}`;

      // Payment method label for receipt
      const paymentMethodLabel =
        formData.paymentMethod === 'card'
          ? `신용/체크카드 (${cardCompany} 1111-****-****-4444 / 가짜결제)`
          : formData.paymentMethod === 'kakaopay'
          ? '카카오페이 (연습용 가짜결제)'
          : formData.paymentMethod === 'naverpay'
          ? '네이버페이 (연습용 가짜결제)'
          : formData.paymentMethod === 'tosspay'
          ? '토스페이 (연습용 가짜결제)'
          : '간편결제 (연습용)';

      // Save real persistent order to Firebase database
      await createOrder({
        orderId,
        customerName: formData.customerName.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        detailAddress: formData.detailAddress.trim(),
        deliveryMemo: formData.deliveryMemo,
        productName: product.name,
        quantity,
        totalPrice,
        paymentMethod: formData.paymentMethod,
      });

      setConfirmation({
        orderId,
        orderDate: dateString,
        productName: product.name,
        quantity,
        totalPrice,
        customerName: formData.customerName,
        phone: formData.phone,
        address: `${formData.address} ${formData.detailAddress}`.trim(),
        deliveryMemo: formData.deliveryMemo,
        paymentMethod: paymentMethodLabel,
      });

      setStep('completed');
    } catch (err) {
      console.error('Payment order creation error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyOrderId = () => {
    if (!confirmation) return;
    navigator.clipboard.writeText(confirmation.orderId);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  };

  const handleResetAndClose = () => {
    setStep('form');
    setConfirmation(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#D5CBB3] overflow-hidden my-6">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#FAF7F2] border-b border-[#E6DEC9]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2C6233]" />
            <h3 className="font-extrabold text-[#19351A] text-lg sm:text-xl">
              {step === 'completed'
                ? '주문 완료'
                : step === 'payment'
                ? '결제 화면 (연습용 가짜결제)'
                : '간편 주문서 작성'}
            </h3>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            aria-label="닫기"
            className="p-1.5 text-[#677765] hover:text-[#19351A] hover:bg-[#EFE8D9] rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* ================= STEP 1: ORDER INFO & SHIPPING ================= */}
        {step === 'form' && (
          <form onSubmit={handleProceedToPayment} className="p-6 sm:p-8 space-y-6">
            {/* Product Summary Box */}
            <div className="p-4 rounded-2xl bg-[#F6F1E7] border border-[#DDD3BC] flex items-center justify-between">
              <div>
                <p className="text-xs text-[#5D6B5C] font-semibold">[국내산 50곡] 온하루 순수 생식</p>
                <h4 className="font-bold text-sm sm:text-base text-[#19351A]">
                  1박스 (30포 / 1개월분)
                </h4>
                <p className="text-xs text-[#2C6233] font-bold mt-0.5">
                  ✓ 무료배송 + 친환경 보틀 증정
                </p>
              </div>

              {/* Quantity Picker */}
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-[#D5CAB1]">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="font-bold text-sm w-6 h-6 flex items-center justify-center text-[#1E3F20] hover:bg-[#F2ECE0] rounded cursor-pointer"
                >
                  -
                </button>
                <span className="font-extrabold text-[#1E3F20] tabular-nums px-1">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                  className="font-bold text-sm w-6 h-6 flex items-center justify-center text-[#1E3F20] hover:bg-[#F2ECE0] rounded cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Input fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#2A3928] mb-1.5">
                  받는 분 성함 *
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 스테판"
                  value={formData.customerName}
                  onChange={(e) => handleChange('customerName', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#D5CAB1] focus:outline-none focus:ring-2 focus:ring-[#2C6233] text-sm sm:text-base text-[#19351A]"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#2A3928] mb-1.5">
                  휴대폰 번호 *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="예: 010-1234-5678"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#D5CAB1] focus:outline-none focus:ring-2 focus:ring-[#2C6233] text-sm sm:text-base text-[#19351A]"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#2A3928] mb-1.5">
                  배송지 주소 *
                </label>
                <input
                  type="text"
                  required
                  placeholder="기본 주소 (예: 서울특별시 종로구 청와대로 1)"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#D5CAB1] focus:outline-none focus:ring-2 focus:ring-[#2C6233] text-sm sm:text-base text-[#19351A] mb-2"
                />
                <input
                  type="text"
                  placeholder="상세 주소 (예: 101동 202호)"
                  value={formData.detailAddress}
                  onChange={(e) => handleChange('detailAddress', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#D5CAB1] focus:outline-none focus:ring-2 focus:ring-[#2C6233] text-sm sm:text-base text-[#19351A]"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#2A3928] mb-1.5">
                  배송 요청사항
                </label>
                <select
                  value={formData.deliveryMemo}
                  onChange={(e) => handleChange('deliveryMemo', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#D5CAB1] focus:outline-none focus:ring-2 focus:ring-[#2C6233] text-sm sm:text-base text-[#19351A] bg-white cursor-pointer"
                >
                  <option value="부재 시 문 앞에 놓아주세요">부재 시 문 앞에 놓아주세요</option>
                  <option value="배송 전 미리 연락 부탁드립니다">배송 전 미리 연락 부탁드립니다</option>
                  <option value="경비실에 맡겨주세요">경비실에 맡겨주세요</option>
                  <option value="택배함에 넣어주세요">택배함에 넣어주세요</option>
                </select>
              </div>
            </div>

            {/* Total Price Bar */}
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#DDD3BC] flex items-center justify-between">
              <span className="font-bold text-sm sm:text-base text-[#2E3C2D]">
                결제 예정 금액
              </span>
              <div className="text-right">
                <span className="text-xl sm:text-2xl font-black text-[#1E3F20] tabular-nums">
                  {totalPrice.toLocaleString()}
                </span>
                <span className="font-bold text-[#1E3F20] ml-0.5">원</span>
              </div>
            </div>

            {/* Next Step Button */}
            <button
              type="submit"
              className="w-full py-4 text-lg sm:text-xl font-black text-white bg-[#1E3F20] hover:bg-[#152E17] active:scale-[0.99] rounded-2xl shadow-lg shadow-[#1E3F20]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>결제 화면으로 이동 (연습용 가짜결제)</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        )}

        {/* ================= STEP 2: MOCK PAYMENT GATEWAY ================= */}
        {step === 'payment' && (
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* BIG PROMINENT NOTICE: 실제로 결제되지 않는 연습용입니다 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border-2 border-amber-400 text-amber-950 space-y-1 shadow-sm">
              <div className="flex items-center gap-2 font-black text-base sm:text-lg text-amber-900">
                <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 animate-bounce" />
                <span>⚠️ 실제로 결제되지 않는 연습용입니다</span>
              </div>
              <p className="text-xs sm:text-sm text-amber-900 font-medium pl-8">
                본 화면은 연습용 가짜 결제 시스템입니다. 실제 돈이 빠져나가거나 신용카드 청구가 발생하지 않으니 안심하고 편하게 결제해 보세요!
              </p>
            </div>

            {/* Payment Method Selector (Card, KakaoPay, NaverPay, TossPay) */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-[#20321F] mb-2">
                결제 수단 선택
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'card', name: '신용/체크카드', color: 'border-slate-300' },
                  { id: 'kakaopay', name: '카카오페이', badge: 'Kakao', color: 'bg-[#FEE500]' },
                  { id: 'naverpay', name: '네이버페이', badge: 'Naver', color: 'bg-[#03C75A]' },
                  { id: 'tosspay', name: '토스페이', badge: 'Toss', color: 'bg-[#0064FF]' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleChange('paymentMethod', m.id)}
                    className={`py-3 px-2 rounded-xl text-xs sm:text-sm font-extrabold border-2 transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      formData.paymentMethod === m.id
                        ? 'border-[#1E3F20] bg-[#EEF5EC] text-[#1E3F20] shadow-sm ring-1 ring-[#1E3F20]'
                        : 'border-[#E0D7C3] bg-white text-[#566554] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <span>{m.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Method Details */}
            {formData.paymentMethod === 'card' && (
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F8F5EE] border border-[#DDD3BC] space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#E7DECC]">
                  <span className="text-xs font-bold text-[#1E3F20] flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4" />
                    <span>신용카드 가짜결제 정보 (자동 입력됨)</span>
                  </span>
                  <span className="text-[11px] font-semibold text-[#667765]">연습용 테스트 카드</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#344633] mb-1">
                      카드사
                    </label>
                    <select
                      value={cardCompany}
                      onChange={(e) => setCardCompany(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#D5CAB1] text-xs sm:text-sm font-semibold bg-white cursor-pointer"
                    >
                      <option value="신한카드">신한카드</option>
                      <option value="KB국민카드">KB국민카드</option>
                      <option value="현대카드">현대카드</option>
                      <option value="삼성카드">삼성카드</option>
                      <option value="비씨카드">비씨카드</option>
                      <option value="우리카드">우리카드</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#344633] mb-1">
                      할부 기간
                    </label>
                    <select className="w-full px-3 py-2.5 rounded-xl border border-[#D5CAB1] text-xs sm:text-sm font-semibold bg-white">
                      <option>일시불</option>
                      <option>2개월 (무이자)</option>
                      <option>3개월 (무이자)</option>
                    </select>
                  </div>
                </div>

                {/* Pre-filled Card Number 1111222233334444 requested by user */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-[#344633]">
                      카드번호 (미리 적혀 있음) *
                    </label>
                    <span className="text-[10px] text-[#2C6233] bg-[#E1EDE0] px-1.5 py-0.5 rounded font-bold">
                      연습용 번호
                    </span>
                  </div>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl border-2 border-[#1E3F20]/30 font-mono tracking-wider font-extrabold text-base bg-white text-[#19351A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#344633] mb-1">
                      유효기간 (MM/YY)
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#D5CAB1] font-mono text-center font-bold bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#344633] mb-1">
                      CVC (뒷면 3자리)
                    </label>
                    <input
                      type="password"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#D5CAB1] font-mono text-center font-bold bg-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {formData.paymentMethod === 'kakaopay' && (
              <div className="p-5 rounded-2xl bg-[#FFFDE8] border-2 border-[#FEE500] space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#FEE500] text-black font-black text-xs flex items-center justify-center">
                    K
                  </span>
                  <strong className="text-[#3C1E1E] text-sm">카카오페이 간편결제 (연습용)</strong>
                </div>
                <p className="text-xs text-[#523B3B] leading-relaxed">
                  카카오페이 머니 및 등록 카드로 모의 결제가 진행됩니다. [결제하기] 버튼 클릭 시 0원으로 즉시 가상 승인됩니다.
                </p>
              </div>
            )}

            {formData.paymentMethod === 'naverpay' && (
              <div className="p-5 rounded-2xl bg-[#F0FAF4] border-2 border-[#03C75A] space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#03C75A] text-white font-black text-xs flex items-center justify-center">
                    N
                  </span>
                  <strong className="text-[#084A24] text-sm">네이버페이 포인트/머니 (연습용)</strong>
                </div>
                <p className="text-xs text-[#205737] leading-relaxed">
                  네이버페이 간편결제로 모의 결제가 진행됩니다. [결제하기] 버튼 클릭 시 0원으로 즉시 가상 승인됩니다.
                </p>
              </div>
            )}

            {formData.paymentMethod === 'tosspay' && (
              <div className="p-5 rounded-2xl bg-[#F0F5FF] border-2 border-[#0064FF] space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#0064FF] text-white font-black text-xs flex items-center justify-center">
                    T
                  </span>
                  <strong className="text-[#093278] text-sm">토스페이 원클릭 간편결제 (연습용)</strong>
                </div>
                <p className="text-xs text-[#224483] leading-relaxed">
                  토스페이 원클릭 결제로 모의 결제가 진행됩니다. [결제하기] 버튼 클릭 시 0원으로 즉시 가상 승인됩니다.
                </p>
              </div>
            )}

            {/* Total Price Summary */}
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#DDD3BC] space-y-1.5 text-xs sm:text-sm">
              <div className="flex justify-between text-[#687867]">
                <span>상품 금액 ({quantity}박스)</span>
                <span>{totalPrice.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between text-[#687867]">
                <span>배송비</span>
                <span className="text-[#2C6233] font-bold">0원 (무료배송)</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E7DECC] text-base font-bold text-[#19351A]">
                <span>최종 결제 금액</span>
                <span className="text-xl font-black text-[#1E3F20] tabular-nums">
                  {totalPrice.toLocaleString()}원
                </span>
              </div>
            </div>

            {/* Buttons: 결제하기 & 이전 단계 */}
            <div className="space-y-2.5">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleExecutePayment}
                className={`w-full py-4 text-lg sm:text-xl font-black text-white bg-[#1E3F20] hover:bg-[#152E17] active:scale-[0.99] rounded-2xl shadow-xl shadow-[#1E3F20]/25 transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isSubmitting ? 'opacity-70 cursor-wait' : ''
                }`}
              >
                <Lock className="w-5 h-5" />
                <span>
                  {isSubmitting
                    ? '가상 결제 승인 중...'
                    : `${totalPrice.toLocaleString()}원 결제하기 (연습용)`}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setStep('form')}
                className="w-full py-2.5 text-xs sm:text-sm font-semibold text-[#5B6A5A] hover:text-[#19351A] flex items-center justify-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>이전 단계 (배송 정보 수정)</span>
              </button>
            </div>

          </div>
        )}

        {/* ================= STEP 3: ORDER COMPLETED RECEIPT ================= */}
        {step === 'completed' && confirmation && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2 py-2">
              <div className="w-16 h-16 bg-[#EEF5EC] text-[#2C6233] rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-black text-[#19351A]">
                주문이 성공적으로 완료되었습니다!
              </h4>
              <p className="text-sm text-[#4E5C4E]">
                연습용 가짜결제가 정상 승인되었으며 실제 금액은 청구되지 않았습니다.
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="p-5 rounded-2xl bg-[#FBF9F4] border border-[#DDD3BC] space-y-3 text-sm">
              {/* Requested order ID format: CRD-20261007-3843 */}
              <div className="flex items-center justify-between pb-2 border-b border-[#E7DECC]">
                <span className="text-[#647363]">주문 번호</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-black text-sm sm:text-base text-[#19351A] bg-[#EFE8D9] px-2.5 py-1 rounded-lg">
                    {confirmation.orderId}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyOrderId}
                    className="text-xs text-[#2C6233] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? '복사됨' : '복사'}</span>
                  </button>
                </div>
              </div>

              <div className="flex justify-between">
                <span className="text-[#647363]">상품명</span>
                <span className="font-bold text-[#19351A] text-right">
                  {confirmation.productName} ({confirmation.quantity}박스)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#647363]">받는 분</span>
                <span className="font-medium text-[#19351A]">
                  {confirmation.customerName} ({confirmation.phone})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#647363]">배송지</span>
                <span className="font-medium text-[#19351A] text-right max-w-[260px] truncate">
                  {confirmation.address}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#647363]">결제 방식</span>
                <span className="font-medium text-[#19351A] text-right max-w-[260px] truncate">
                  {confirmation.paymentMethod}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-[#E7DECC] text-base">
                <span className="font-bold text-[#19351A]">최종 결제 금액</span>
                <span className="font-black text-[#1E3F20] text-lg tabular-nums">
                  {confirmation.totalPrice.toLocaleString()}원 (무료배송)
                </span>
              </div>
            </div>

            <div className="p-3.5 bg-[#EEF5EC] rounded-xl text-xs sm:text-sm text-[#2C6233] flex items-center gap-2">
              <Truck className="w-4 h-4 shrink-0" />
              <span>
                친환경 트라이탄 전용 보틀과 계량스푼이 함께 동봉됩니다.
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              {onOpenLookup && (
                <button
                  type="button"
                  onClick={() => {
                    handleResetAndClose();
                    onOpenLookup();
                  }}
                  className="flex-1 py-3.5 text-sm sm:text-base font-bold text-[#1E3F20] bg-white border border-[#D5CAB1] hover:bg-[#FAF7F2] rounded-2xl transition-all cursor-pointer"
                >
                  주문 및 배송 조회
                </button>
              )}
              <button
                type="button"
                onClick={handleResetAndClose}
                className="flex-1 py-3.5 text-sm sm:text-base font-bold text-white bg-[#1E3F20] hover:bg-[#152E17] rounded-2xl shadow-md transition-all cursor-pointer"
              >
                확인 (창 닫기)
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
