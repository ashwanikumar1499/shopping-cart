import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      couponCode: null,
      discount: 0, // Initialize items as an array
      addToCart: (product) => {
        const currentItems = get().items;
        const productIndex = currentItems.findIndex(
          (item) => item.id === product.id
        );

        if (productIndex !== -1) {
          // If the product already exists, update its quantity
          const updatedItems = currentItems.map((item, index) =>
            index === productIndex
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          set({ items: updatedItems });
        } else {
          // If the product doesn't exist, add it with a quantity of 1
          set({ items: [...currentItems, { ...product, quantity: 1 }] });
        }
      },
      removeFromCart: (product) => {
        const currentItems = get().items;
        const productIndex = currentItems.findIndex(
          (item) => item.id === product.id
        );

        if (productIndex !== -1) {
          const product = currentItems[productIndex];

          if (product.quantity > 1) {
            // Decrease the quantity if more than 1
            const updatedItems = currentItems.map((item, index) =>
              index === productIndex
                ? { ...item, quantity: item.quantity - 1 }
                : item
            );
            set({ items: updatedItems });
          } else {
            // Remove the product if quantity is 1
            const updatedItems = currentItems.filter(
              (item) => item.id !== product.id
            );
            set({ items: updatedItems });
          }
        }
      },
      removeItemCompletely: (productId) => {
        const currentItems = get().items;
        const updatedItems = currentItems.filter(
          (item) => item.id !== productId
        );
        set({ items: updatedItems });
      },
      applyCoupon: (code) => {
        const validCoupons = {
          SAVE10: 0.1, // 10% discount
          SAVE20: 0.2, // 20% discount
        };

        if (validCoupons[code]) {
          set({ couponCode: code, discount: validCoupons[code] });
        } else {
          set({ couponCode: null, discount: 0 }); // Reset if invalid code
        }
      },
    }),
    {
      name: "cart-state",
    }
  )
);
