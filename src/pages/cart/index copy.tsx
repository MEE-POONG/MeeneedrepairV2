import React, { useState } from "react";
import Cookies from "js-cookie";

interface CartItem {
  id: number;
  productname: string;
  price: number;
  quantity: number;
}

const CartPage: React.FC = () => {
  const [isOrdering, setIsOrdering] = useState(false);
  const cartItemsString = Cookies.get("cartItems");
  const cartItems: CartItem[] = cartItemsString ? JSON.parse(cartItemsString) : [];

  const handleRemoveFromCart = (productId: number) => {
    const updatedCart = cartItems.filter((item: CartItem) => item.id !== productId);
    Cookies.set("cartItems", JSON.stringify(updatedCart));
    window.location.reload();
  };

  const handleOrder = async () => {
    setIsOrdering(true);
    try {
      const response = await fetch("/api/orderlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productIds: cartItems.map((item: CartItem) => item.id) }),
      });

      if (response.ok) {
        console.log("Order placed successfully", cartItems);
        Cookies.remove("cartItems");
        window.location.reload();
      } else {
        console.error("Failed to place order");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold my-5">Your Cart</h1>
      <div className="grid grid-cols-1 gap-5">
        {cartItems.map((item: CartItem) => (
          <div key={item.id} className="bg-white shadow-md rounded-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">{item.productname}</h2>
                <p className="text-gray-600">Price: {item.price} Bath</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleRemoveFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-5">
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isOrdering ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={handleOrder}
          disabled={isOrdering}
        >
          {isOrdering ? "Placing Order..." : "Proceed to Order"}
        </button>
      </div>
    </div>
  );
};

export default CartPage;
