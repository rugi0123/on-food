import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { OrderRecord } from '../types';

const LOCAL_STORAGE_KEY = 'onharu_all_orders_cache';

// Helper to get local cache
export function getLocalOrdersCache(): OrderRecord[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Helper to save to local cache
export function saveLocalOrdersCache(orders: OrderRecord[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(orders));
  } catch (err) {
    console.error('Failed to update local orders cache:', err);
  }
}

function notifyOrderEvent() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('onharu_order_event'));
  }
}

/**
 * Creates a real order in Firestore and syncs locally
 */
export async function createOrder(
  orderData: Omit<OrderRecord, 'status' | 'createdAt'>
): Promise<OrderRecord> {
  const newOrder: OrderRecord = {
    ...orderData,
    status: '접수완료',
    createdAt: new Date().toISOString(),
  };

  const path = `orders/${newOrder.orderId}`;

  try {
    // Save to Firestore
    await setDoc(doc(db, 'orders', newOrder.orderId), newOrder);
  } catch (error) {
    console.warn('Firestore write warning:', error);
    try {
      handleFirestoreError(error, OperationType.CREATE, path);
    } catch {}
  }

  // Always update local cache for instant feedback
  const cache = getLocalOrdersCache();
  const updated = [newOrder, ...cache.filter((o) => o.orderId !== newOrder.orderId)];
  saveLocalOrdersCache(updated);
  notifyOrderEvent();

  return newOrder;
}

/**
 * Gets a single order by ID
 */
export async function getOrder(orderId: string): Promise<OrderRecord | null> {
  const path = `orders/${orderId}`;
  try {
    const snap = await getDoc(doc(db, 'orders', orderId));
    if (snap.exists()) {
      return snap.data() as OrderRecord;
    }
  } catch (error) {
    console.warn('Error reading order from Firestore:', error);
  }

  // Fallback to local cache
  const local = getLocalOrdersCache().find((o) => o.orderId === orderId);
  return local || null;
}

/**
 * Fetches all orders for the store owner/admin
 */
export async function getAllOrders(): Promise<OrderRecord[]> {
  const path = 'orders';
  let firestoreOrders: OrderRecord[] = [];

  try {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'), limit(150));
    const snap = await getDocs(q);
    firestoreOrders = snap.docs.map((d) => d.data() as OrderRecord);
  } catch (error) {
    console.warn('Error fetching all orders from Firestore:', error);
  }

  const localOrders = getLocalOrdersCache();
  const map = new Map<string, OrderRecord>();

  for (const o of firestoreOrders) {
    map.set(o.orderId, o);
  }
  for (const o of localOrders) {
    if (!map.has(o.orderId)) {
      map.set(o.orderId, o);
    }
  }

  const merged = Array.from(map.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  saveLocalOrdersCache(merged);
  return merged;
}

/**
 * Real-time order subscription (새 주문이 들어오면 새로고침 없이 실시간 반영!)
 */
export function subscribeOrders(callback: (orders: OrderRecord[]) => void): () => void {
  // 1. Immediate initial emit
  callback(getLocalOrdersCache());

  // 2. Set up Firestore onSnapshot listener
  const path = 'orders';
  let unsubscribeFirestore = () => {};

  try {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'), limit(150));
    unsubscribeFirestore = onSnapshot(
      q,
      (snapshot) => {
        const firestoreOrders = snapshot.docs.map((d) => d.data() as OrderRecord);
        const localOrders = getLocalOrdersCache();
        const map = new Map<string, OrderRecord>();

        for (const o of firestoreOrders) {
          map.set(o.orderId, o);
        }
        for (const o of localOrders) {
          if (!map.has(o.orderId)) {
            map.set(o.orderId, o);
          }
        }

        const merged = Array.from(map.values()).sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        saveLocalOrdersCache(merged);
        callback(merged);
      },
      (error) => {
        try {
          handleFirestoreError(error, OperationType.LIST, path);
        } catch {
          callback(getLocalOrdersCache());
        }
      }
    );
  } catch (err) {
    console.warn('onSnapshot setup warning:', err);
  }

  // 3. Listen to local event across tabs & windows
  const handleSync = () => {
    callback(getLocalOrdersCache());
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('storage', handleSync);
    window.addEventListener('onharu_order_event', handleSync);
  }

  return () => {
    unsubscribeFirestore();
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('onharu_order_event', handleSync);
    }
  };
}

/**
 * Updates order status and tracking number
 */
export async function updateOrderStatus(
  orderId: string,
  status: OrderRecord['status'],
  trackingNumber?: string
): Promise<void> {
  const path = `orders/${orderId}`;
  const updates: Partial<OrderRecord> = { status };
  if (trackingNumber !== undefined) {
    updates.trackingNumber = trackingNumber;
  }

  try {
    await updateDoc(doc(db, 'orders', orderId), updates);
  } catch (error) {
    console.warn('Failed to update in Firestore:', error);
  }

  // Update local cache
  const cache = getLocalOrdersCache();
  const updated = cache.map((o) =>
    o.orderId === orderId ? { ...o, ...updates } : o
  );
  saveLocalOrdersCache(updated);
  notifyOrderEvent();
}

/**
 * Deletes an order
 */
export async function deleteOrder(orderId: string): Promise<void> {
  const path = `orders/${orderId}`;
  try {
    await deleteDoc(doc(db, 'orders', orderId));
  } catch (error) {
    console.warn('Failed to delete in Firestore:', error);
  }

  const cache = getLocalOrdersCache().filter((o) => o.orderId !== orderId);
  saveLocalOrdersCache(cache);
  notifyOrderEvent();
}
