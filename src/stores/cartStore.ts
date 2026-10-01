import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STUDENT } from '@constants/student';
import { Alert } from 'react-native';

export interface CartItem {
  id: string; // id sẽ ghép MSSV-id ở màn Home theo yêu cầu
  title: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  add: (item: CartItem, hapticFn?: () => void) => void;
  remove: (id: string) => void;
  changeQty: (id: string, delta: number) => void;
  totalQuantity: () => number;
  totalAmount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item, hapticFn) => {
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        });

        // Gọi hàm Haptic (rung) nếu có truyền vào
        if (hapticFn) hapticFn();

        // Alert yêu cầu phải có MSSV
        Alert.alert('Thành công', `Đã thêm món vào giỏ!\nMSSV: ${STUDENT.mssv}`);
      },
      remove: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      changeQty: (id, delta) =>
        set((state) => ({
          items: state.items.map((i) => {
            if (i.id === id) {
              const newQty = i.quantity + delta;
              return { ...i, quantity: newQty > 0 ? newQty : 1 };
            }
            return i;
          }),
        })),
      totalQuantity: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalAmount: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: `ktxgo-cart-${STUDENT.mssv}`, // Yêu cầu: Persist key giỏ ktxgo-cart-{mssv}
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
