"use Client";
import { useCartStore } from "@/store/cart";
import React from "react";

function QuantityBtn({ product }) {
  const cartItems = useCartStore((store) => store.items);
  const addToCart = useCartStore((store) => store.addToCart);
  const removeFromCart = useCartStore((store) => store.removeFromCart);
  return (
    <div className="flex justify-between items-end w-[100px] border-[1px] border-[solid] border-[#D83344]">
      <span
        onClick={() =>
          removeFromCart({
            ...product,
            quantity: cartItems.find((item) => product.id === item.id)
              ?.quantity,
          })
        }
        className="bg-[#D83344] text-white p-2 cursor-pointer"
      >
        -
      </span>
      <span className="text-[.8rem] font-bold mb-[10px] text-[#333333]">
        {cartItems.find((item) => product.id === item.id)?.quantity}
      </span>
      <span
        onClick={() =>
          addToCart({
            ...product,
            quantity: cartItems.find((item) => product.id === item.id)
              ?.quantity,
          })
        }
        className="bg-[#D83344] text-white p-2 cursor-pointer"
      >
        +
      </span>
    </div>
  );
}

export default QuantityBtn;
