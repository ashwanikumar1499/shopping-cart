"use client";
import { useCartStore } from "@/store/cart";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import QuantityBtn from "../quantity-btn/page";

const ProductCard = ({ product }) => {
  const cartItems = useCartStore((store) => store.items);
  const addToCart = useCartStore((store) => store.addToCart);
  const removeFromCart = useCartStore((store) => store.removeFromCart);

  const [showQuantityBtn, setShowQuantityBtn] = useState(false);
  const [currentProduct, setCurrentProduct] = useState();

  useEffect(() => {
    const currentProduct = cartItems.find((item) => product.id === item.id);
    setCurrentProduct(currentProduct);
    if (currentProduct?.quantity > 0) {
      setShowQuantityBtn(true);
    } else {
      setShowQuantityBtn(false);
    }
  }, [cartItems]);

  return (
    <div
      className="flex flex-col bg-white rounded-[20px] overflow-hidden shadow-card [transition:transform_0.3s_ease,_box-shadow_0.3s_ease]    hover:translate-y-[5px] hover:[box-shadow:0_15px_30px_rgba(0,_0,_0,_0.15)]
"
    >
      <div className="h-[250px] overflow-hidden">
        <Image
          src={product.image}
          alt="product-image"
          height={400}
          width={400}
          className="w-full h-full object-contain [transition:transform_0.3s_ease]  hover:scale-105"
        />
      </div>
      <div className="flex-1 flex flex-col p-[20px]">
        {product && (
          <p className="text-[1.5rem] font-bold mb-[10px] text-[#333333]">
            {product?.title}
          </p>
        )}

        {product && (
          <p className="text-[0.9rem] text-[#666] mb-[20px]">
            {product?.description}
          </p>
        )}
        <div className="mt-auto flex justify-between items-center">
          <span className="text-[1.25rem] font-semibold text-[#D83344]">
            ₹ {product.price}
          </span>
          {!showQuantityBtn && (
            <button
              onClick={() => addToCart(product)}
              className="bg-[#D83344] text-[white] border-[none] px-[20px] py-[10px] rounded-[50px] text-[0.9rem] font-semibold cursor-pointer [transition:background-color_0.3s_ease] hover:bg-[#C71729]"
            >
              Add to Cart
            </button>
          )}
          {showQuantityBtn && <QuantityBtn product={currentProduct} />}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
