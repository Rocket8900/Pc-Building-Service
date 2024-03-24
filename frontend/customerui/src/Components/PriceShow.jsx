import { useEffect, useState } from "react";

export function PriceShow({ totalPrice }) {
    console.log(totalPrice)
    return (
        <div className="price-show-container flex flex-col items-center justify-center border border-blue-800 p-4 m-1 rounded-lg bg-transparent w-4/5"
        style={{ position: 'sticky', top: '20px' }}>
            <h2 className="text-black">Total Price</h2>
            <p className="text-black">${totalPrice.toFixed(2)}</p>
        </div>
  );
}

