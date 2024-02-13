// CartPage.tsx

import { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import Link from "next/link";
import Cookies from 'js-cookie';
import Image from "next/image";

interface Product {
  id: number;
  productname: string;
  price: number;
  imgFirst: string;
  description: string;
  quantity: number;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const updateCart = (updatedCart: Product[]) => {
    setCartItems(updatedCart);
    Cookies.set('cart', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };


  const removeFromCart = (productId: number) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    updateCart(updatedCart);
  };

  const increaseQuantity = (productId: number) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    updateCart(updatedCart);
  };

  const decreaseQuantity = (productId: number) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === productId && item.quantity > 0) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    updateCart(updatedCart);
  };
  useEffect(() => {
    const getCartItemsFromCookies = () => {
      const cartItemsFromCookies = Cookies.get('cart');
      if (cartItemsFromCookies) {
        const parsedCartItems = JSON.parse(cartItemsFromCookies);
        setCartItems(parsedCartItems);
      }
    };

    getCartItemsFromCookies();
  }, []);

  const checkout = async () => {
    try {
      const productIds = cartItems.map(item => item.id); // ดึงรหัสสินค้าทั้งหมดจากตะกร้าสินค้า

      const response = await fetch('/api/orderlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productIds, date: new Date() }), // ส่งรหัสสินค้าทั้งหมดในรูปแบบของอาร์เรย์
      });

      if (response.ok) {
        console.log('Order placed successfully', cartItems);
        setCartItems([]); // เมื่อสั่งซื้อสำเร็จ ล้างตะกร้า
        Cookies.remove('cart'); // เมื่อสั่งซื้อสำเร็จ ลบคุกกี้
      } else {
        console.error('Failed to place order');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto my-24 font-fontTH02 px-3 lg:px-24">
      <title>ตะกร้าสินค้าของคุณ</title>

      <h3 className="text-lg md:text-2xl text-black">รายการสินค้า <span className="">({cartItems.length})</span></h3>
      <div className="grid grid-flow-row lg:grid-cols-12 gap-2 lg:gap-8 mt-3 lg:mt-8 ">
        <div className="lg:col-span-9 bg-secondary1 rounded-md">
          {cartItems.map((product) => (
            <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg p-4 mb-3 bg-white relative">
              <img src={`https://addin.co.th/wp-content/uploads/2022/10/desktop-pc-lenovo-thinkcentre-neo-30a-cover.jpg`} alt="" className="w-[200PX] h-[200] object-cover rounded-xl" width={100} height={100} />
              <div className="flex flex-col justify-end absolute top-4 ml-56 mt-5 space-y-2">
                <span className="text-sm font-bold text-black">{product.productname}</span>
                <span className="text-sm text-black">{product.description}</span>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-red-600 hover:text-red-300">฿ {product.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <button onClick={() => decreaseQuantity(product.id)}>-</button>
                    <span className="mx-2">{product.quantity}</span>
                    <button onClick={() => increaseQuantity(product.id)}>+</button>
                    <button onClick={() => removeFromCart(product.id)}>
                      <RiDeleteBin6Line className="text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-3 md:h-48 bg-secondary2 rounded-md p-2 lg:p-5 text-center">
          <div className="text-left text-xs md:text-sm">
            <p className="flex justify-between mb-2">ยอดรวม <strong>฿ {calculateTotal()}</strong></p>
            <p className="flex justify-between">ส่วนลด <strong className="text-natural03">฿ - 0.00</strong></p>
            <div className="w-full h-0.5 bg-secondary1 mt-5 mb-2"></div>
            <p className="flex justify-between"> <strong>ยอดรวมสุทธิ </strong><strong>฿ {calculateTotal()}</strong></p>
          </div>
          <button
            onClick={checkout}
            className="mt-5 text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
          >
            ดำเนินการสั่งซื้อ
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
