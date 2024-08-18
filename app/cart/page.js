"use client";
import QuantityBtn from "@/components/quantity-btn/page";
import { useCartStore } from "@/store/cart";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function ShoppingCart() {
  const cartItems = useCartStore((store) => store.items);
  const removeItem = useCartStore((store) => store.removeItemCompletely);
  const applyCoupon = useCartStore((store) => store.applyCoupon);
  const discount = useCartStore((store) => store.discount);
  const couponCode = useCartStore((store) => store.couponCode);
  const [coupon, setCoupon] = useState(couponCode);
  const [error, setError] = useState(null);

  const subtotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const total = subtotal * (1 - discount);

  const handleApplyCoupon = () => {
    applyCoupon(coupon);
    if (discount === 0) {
      setError("Invalid coupon code. Please try again.");
    } else {
      setError(null);
    }
  };

  return (
    <div className="p-5">
      <div className="flex gap-2 items-center mb-[10px]">
        <Link href={"/products"}>
          <button className="bg-[#333333] text-white p-2 rounded-sm">
            {" "}
            Back
          </button>{" "}
        </Link>
        <p className="text-[1.5rem] font-bold  text-[#333333]">Shopping Cart</p>
      </div>
      <table className="mt-3 w-full" cellpadding="10">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th className="text-center">Price</th>
            <th className="text-center">Quantity</th>
            <th></th>
            <th className="text-center">Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => {
            return (
              <tr>
                <td>
                  <Image
                    src={item.image}
                    alt="product-image"
                    height={100}
                    width={100}
                  />
                </td>
                <td>
                  <p>{item.title}</p>
                </td>
                <td>
                  <p> ₹ {item.price}</p>
                </td>
                <td>
                  <QuantityBtn product={item} />
                </td>
                <td>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="bg-[#D83344] text-white p-2 rounded-full text-sm"
                  >
                    Remove
                  </button>
                </td>
                <td> ₹ {item.price * item.quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <hr />
      <div className="flex flex-col items-end gap-[30px] w-full px-[40px] py-[10px]">
        <div className="flex items-baseline gap-[30px]">
          <div className="flex flex-col gap-1">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="border-[1px] border-[solid] border-[black] p-[10px]"
            />
            {error && <p className="text-red-700">{error}</p>}
          </div>

          <button onClick={handleApplyCoupon}>Apply Coupon</button>
        </div>
        <div className="flex gap-[30px]">
          <p className="text-[1rem] font-bold  text-[#333333]">Subtotal</p>
          <p> ₹ {total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
