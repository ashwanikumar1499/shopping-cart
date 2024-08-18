"use client";
import { useCartStore } from "@/store/cart";
import Link from "next/link";
import React from "react";

function NavigationBar() {
  const cartItems = useCartStore((store) => store.items);
  return (
    <div className="flex justify-between items-center">
      <p className="text-[1.5rem] font-bold mb-[10px] text-[#333333]">
        Products
      </p>
      <Link href={"/cart"}>
        <p className="relative">
          🛒{" "}
          {cartItems.length > 0 && (
            <span className="absolute -top-[16px] -right-[13px] bg-[#D83344] rounded-[100%] p-[5px] text-[white] text-[12px]">
              {cartItems.length}
            </span>
          )}
        </p>
      </Link>
    </div>
  );
}

export default NavigationBar;
