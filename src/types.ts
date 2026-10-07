export interface IngredientCategory {
  id: string;
  name: string;
  description: string;
  items: {
    name: string;
    origin: string;
    feature: string;
  }[];
}

export interface ProductInfo {
  id: string;
  name: string;
  subName: string;
  originalPrice: number;
  salePrice: number;
  unit: string;
  capacity: string;
  badge: string;
  freeShippingThreshold: number;
  bonusGift: string;
  deliveryTime: string;
}

export interface OrderFormData {
  quantity: number;
  customerName: string;
  phone: string;
  address: string;
  detailAddress: string;
  deliveryMemo: string;
  paymentMethod: 'card' | 'transfer' | 'easyPay' | 'kakaopay' | 'naverpay' | 'tosspay';
}

export interface OrderConfirmation {
  orderId: string;
  orderDate: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  customerName: string;
  phone: string;
  address: string;
  deliveryMemo: string;
  paymentMethod: string;
  status?: string;
  trackingNumber?: string;
}

export interface OrderRecord {
  orderId: string;
  customerName: string;
  phone: string;
  address: string;
  detailAddress?: string;
  deliveryMemo?: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  paymentMethod: 'card' | 'transfer' | 'easyPay' | 'kakaopay' | 'naverpay' | 'tosspay';
  status: '접수완료' | '배송준비' | '배송중' | '배송완료' | '발송완료' | '주문취소';
  trackingNumber?: string;
  createdAt: string;
}
