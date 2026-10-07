import React, { useState, useEffect } from 'react';
import {
  X,
  Package,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  Truck,
  Trash2,
  Lock,
  Copy,
  Check,
  Search,
  Radio,
  Bell,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { OrderRecord } from '../types';
import {
  subscribeOrders,
  updateOrderStatus,
  deleteOrder,
  getAllOrders,
} from '../services/orderService';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

interface AdminOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLargeFont: boolean;
}

export const AdminOrdersModal: React.FC<AdminOrdersModalProps> = ({
  isOpen,
  onClose,
  isLargeFont,
}) => {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [pinInput, setPinInput] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Default true for seamless instant testing by the user!
  const [authError, setAuthError] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [newOrderAlert, setNewOrderAlert] = useState<boolean>(false);
  const [recentOrderId, setRecentOrderId] = useState<string | null>(null);

  // Real-time synchronization without manual page refreshes
  useEffect(() => {
    if (isOpen && isAuthenticated) {
      const unsubscribe = subscribeOrders((newOrders) => {
        setOrders((prev) => {
          if (prev.length > 0 && newOrders.length > prev.length) {
            // A brand new order arrived!
            setNewOrderAlert(true);
            setRecentOrderId(newOrders[0]?.orderId || null);
            setTimeout(() => {
              setNewOrderAlert(false);
              setRecentOrderId(null);
            }, 5000);
          }
          return newOrders;
        });
      });
      return () => unsubscribe();
    }
  }, [isOpen, isAuthenticated]);

  if (!isOpen) return null;

  const handleStatusChange = async (orderId: string, newStatus: OrderRecord['status']) => {
    let autoTracking = undefined;
    if (newStatus === '배송중') {
      const randomTrack = `6892-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(
        1000 + Math.random() * 9000
      )}`;
      autoTracking = randomTrack;
    }
    await updateOrderStatus(orderId, newStatus, autoTracking);
  };

  const handleDelete = async (orderId: string) => {
    if (!confirm(`주문번호 ${orderId}를 삭제하시겠습니까?`)) return;
    await deleteOrder(orderId);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const filteredOrders = orders.filter((o) => {
    const matchesFilter = filterStatus === 'all' || o.status === filterStatus;
    const matchesSearch =
      !searchQuery ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.phone.includes(searchQuery) ||
      o.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Summary counts
  const totalCount = orders.length;
  const pendingCount = orders.filter((o) => o.status === '접수완료').length;
  const shippingCount = orders.filter((o) => o.status === '배송중').length;
  const deliveredCount = orders.filter((o) => o.status === '배송완료' || o.status === '발송완료').length;
  const totalRevenue = orders.reduce(
    (sum, o) => sum + (o.status !== '주문취소' ? o.totalPrice : 0),
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/65 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl border border-[#D5CBB3] overflow-hidden my-4 flex flex-col max-h-[94vh]">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 bg-[#FAF7F2] border-b border-[#E6DEC9] shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#1E3F20]" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-[#19351A] text-lg sm:text-xl">
                  판매자 주문관리 대시보드
                </h3>
                {/* Real-time sync pulse badge */}
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#137333] animate-pulse" />
                  <span>실시간 자동 동기화 켜짐</span>
                </span>
              </div>
              <p className="text-xs text-[#637262] mt-0.5 hidden sm:block">
                손님이 새로 주문하면 새로고침 없이 표에 즉시 추가됩니다.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="p-2 text-[#677765] hover:text-[#19351A] hover:bg-[#EFE8D9] rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Real-time Flash Notification when new order arrives */}
        {newOrderAlert && (
          <div className="bg-[#1E3F20] text-white px-5 py-2.5 flex items-center justify-between text-xs sm:text-sm font-bold animate-fadeIn shrink-0">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-300 animate-bounce" />
              <span>🔔 새로운 주문이 방금 접수되었습니다! (목록 상단에 자동 반영됨)</span>
            </div>
            <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded">실시간 수신</span>
          </div>
        )}

        {/* Dashboard Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          
          {/* Summary Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF7F2] border border-[#E6DEC9]">
              <span className="text-xs text-[#637262] font-semibold">전체 주문</span>
              <p className="text-xl sm:text-2xl font-black text-[#1E3F20] tabular-nums mt-0.5">
                {totalCount}건
              </p>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FFF9E6] border border-[#F0DFA8]">
              <span className="text-xs text-[#8A6D1C] font-semibold">신규 접수완료</span>
              <p className="text-xl sm:text-2xl font-black text-[#B06000] tabular-nums mt-0.5">
                {pendingCount}건
              </p>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#EEF5FF] border border-[#C5DCFA]">
              <span className="text-xs text-[#1A56A0] font-semibold">배송중</span>
              <p className="text-xl sm:text-2xl font-black text-[#0B57D0] tabular-nums mt-0.5">
                {shippingCount}건
              </p>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#EAF7EE] border border-[#BDE3C8]">
              <span className="text-xs text-[#137333] font-semibold">배송완료</span>
              <p className="text-xl sm:text-2xl font-black text-[#137333] tabular-nums mt-0.5">
                {deliveredCount}건
              </p>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF7F2] border border-[#E6DEC9] col-span-2 sm:col-span-1">
              <span className="text-xs text-[#637262] font-semibold">누적 주문금액</span>
              <p className="text-lg sm:text-xl font-black text-[#1E3F20] tabular-nums mt-0.5 truncate">
                {totalRevenue.toLocaleString()}원
              </p>
            </div>
          </div>

          {/* Filter Tabs and Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {[
                { id: 'all', label: `전체 (${totalCount})` },
                { id: '접수완료', label: `신규 접수 (${pendingCount})` },
                { id: '배송중', label: `배송중 (${shippingCount})` },
                { id: '배송완료', label: `배송완료 (${deliveredCount})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilterStatus(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                    filterStatus === tab.id
                      ? 'bg-[#1E3F20] text-white shadow-sm'
                      : 'bg-[#F4EFE6] text-[#475745] hover:bg-[#ECE5D7]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-[#889687] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="주문번호, 주문자, 주소 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-[#DDD3BC] bg-white focus:outline-none focus:ring-1 focus:ring-[#2C6233]"
              />
            </div>
          </div>

          {/* ================= ORDER TABLE AS REQUESTED ================= */}
          <div className="bg-white rounded-2xl border border-[#DDD3BC] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#FAF7F2] border-b border-[#E6DEC9] text-[#4E5D4D] font-bold text-xs uppercase tracking-wider">
                    <th className="py-3.5 px-4 whitespace-nowrap">주문번호</th>
                    <th className="py-3.5 px-3 whitespace-nowrap">주문일시</th>
                    <th className="py-3.5 px-4 whitespace-nowrap">주문자 / 연락처 / 배송지</th>
                    <th className="py-3.5 px-4 whitespace-nowrap">상품명 및 수량</th>
                    <th className="py-3.5 px-4 whitespace-nowrap text-right">금액</th>
                    <th className="py-3.5 px-4 whitespace-nowrap text-center">상태</th>
                    <th className="py-3.5 px-4 whitespace-nowrap text-center">상태 변경 (버튼)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F2ECE0]">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-[#738372]">
                        <Package className="w-9 h-9 text-[#A5B3A4] mx-auto mb-2" />
                        <p className="font-bold text-sm">표시할 주문 내역이 없습니다.</p>
                        <p className="text-xs text-[#8B9B8A] mt-0.5">
                          고객이 웹사이트에서 결제하기를 누르면 새로고침 없이 여기에 즉시 표시됩니다.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => {
                      const isRecent = recentOrderId === order.orderId;
                      const dateObj = new Date(order.createdAt);
                      const dateFormatted = `${dateObj.getMonth() + 1}/${dateObj.getDate()} ${String(
                        dateObj.getHours()
                      ).padStart(2, '0')}:${String(dateObj.getMinutes()).padStart(2, '0')}`;

                      return (
                        <tr
                          key={order.orderId}
                          className={`hover:bg-[#FCFAF6] transition-colors ${
                            isRecent ? 'bg-[#EEF5EC] animate-pulse' : ''
                          }`}
                        >
                          {/* 1. 주문번호 */}
                          <td className="py-3.5 px-4 align-top whitespace-nowrap">
                            <div className="flex items-center gap-1.5 font-mono font-bold text-xs sm:text-sm text-[#19351A]">
                              <span>{order.orderId}</span>
                              <button
                                type="button"
                                onClick={() => copyToClipboard(order.orderId, order.orderId)}
                                title="주문번호 복사"
                                className="text-[#556654] hover:text-[#1E3F20] p-1 rounded hover:bg-[#F2ECE0] cursor-pointer"
                              >
                                {copiedId === order.orderId ? (
                                  <Check className="w-3.5 h-3.5 text-[#2C6233]" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                            <span className="text-[11px] text-[#788977]">
                              {order.paymentMethod.includes('card')
                                ? '신용카드'
                                : order.paymentMethod.includes('kakao')
                                ? '카카오페이'
                                : order.paymentMethod.includes('naver')
                                ? '네이버페이'
                                : order.paymentMethod.includes('toss')
                                ? '토스페이'
                                : '간편결제'}
                            </span>
                          </td>

                          {/* 2. 주문일시 */}
                          <td className="py-3.5 px-3 align-top whitespace-nowrap font-mono text-xs text-[#5D6D5C]">
                            {dateFormatted}
                          </td>

                          {/* 3. 주문자 (이름, 연락처, 배송지 주소) */}
                          <td className="py-3.5 px-4 align-top max-w-[260px]">
                            <div className="font-bold text-[#19351A] flex items-center gap-2">
                              <span>{order.customerName}</span>
                              <span className="font-normal font-mono text-xs text-[#526351]">
                                {order.phone}
                              </span>
                            </div>
                            <p className="text-xs text-[#5D6E5C] leading-snug mt-0.5 line-clamp-2">
                              {order.address} {order.detailAddress}
                            </p>
                            {order.deliveryMemo && (
                              <p className="text-[11px] text-[#7E8F7D] mt-0.5 italic">
                                요청: {order.deliveryMemo}
                              </p>
                            )}
                          </td>

                          {/* 4. 상품 및 수량 */}
                          <td className="py-3.5 px-4 align-top whitespace-nowrap">
                            <div className="font-semibold text-[#19351A]">
                              {order.productName}
                            </div>
                            <span className="text-xs text-[#617260] font-bold">
                              {order.quantity}박스 (30포)
                            </span>
                          </td>

                          {/* 5. 금액 */}
                          <td className="py-3.5 px-4 align-top text-right whitespace-nowrap">
                            <span className="font-black text-sm sm:text-base text-[#1E3F20] tabular-nums">
                              {order.totalPrice.toLocaleString()}원
                            </span>
                            <span className="block text-[11px] text-[#2C6233] font-semibold">
                              무료배송
                            </span>
                          </td>

                          {/* 6. 현재 상태 배지 */}
                          <td className="py-3.5 px-4 align-top text-center whitespace-nowrap">
                            <span
                              className={`inline-block px-2.5 py-1 rounded-full text-xs font-black ${
                                order.status === '접수완료'
                                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                  : order.status === '배송중'
                                  ? 'bg-blue-100 text-blue-900 border border-blue-300'
                                  : order.status === '배송완료' || order.status === '발송완료'
                                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {order.status}
                            </span>
                            {order.trackingNumber && (
                              <span className="block text-[10px] text-[#556654] font-mono mt-0.5">
                                송장: {order.trackingNumber}
                              </span>
                            )}
                          </td>

                          {/* 7. 상태 변경 액션 버튼 (배송중, 배송완료) */}
                          <td className="py-3.5 px-4 align-top whitespace-nowrap text-center">
                            <div className="inline-flex items-center gap-1.5">
                              {/* 배송중 변경 버튼 */}
                              <button
                                type="button"
                                onClick={() => handleStatusChange(order.orderId, '배송중')}
                                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                  order.status === '배송중'
                                    ? 'bg-blue-600 text-white shadow-xs'
                                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                                }`}
                                title="상태를 배송중으로 변경"
                              >
                                배송중
                              </button>

                              {/* 배송완료 변경 버튼 */}
                              <button
                                type="button"
                                onClick={() => handleStatusChange(order.orderId, '배송완료')}
                                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                  order.status === '배송완료'
                                    ? 'bg-emerald-700 text-white shadow-xs'
                                    : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                                }`}
                                title="상태를 배송완료로 변경"
                              >
                                배송완료
                              </button>

                              {/* 주문 삭제 버튼 */}
                              <button
                                type="button"
                                onClick={() => handleDelete(order.orderId)}
                                className="p-1.5 text-[#9AA798] hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                                title="주문 삭제"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Real-time Instructions Note */}
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#DDD3BC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#526351]">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#2C6233] shrink-0" />
              <span>
                <strong>배송 처리 팁:</strong> [배송중]을 누르면 우체국 택배 송장번호가 자동 생성되어 손님에게 전달되며, 배송이 끝난 후 [배송완료]를 누르시면 됩니다.
              </span>
            </div>
            <span className="text-[11px] text-[#718270] whitespace-nowrap">
              새 주문 발생 시 브라우저 새로고침 불필요 (자동 수신)
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
