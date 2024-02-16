
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import RootLayout from "@/components/Layout";
import Cookies from 'js-cookie';

const CartPage: React.FC = () => {
  // รับข้อมูลสินค้าจาก Cookies
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const cartItemsFromCookies = Cookies.get("cart");
    if (cartItemsFromCookies) {
      const parsedCartItems = JSON.parse(cartItemsFromCookies);
      setCartItems(parsedCartItems);
    }
  }, []);

  // รวมยอดราคาทั้งหมด
  const calculateTotal = () => {
    return cartItems.reduce(
      (total: number, item: any) => total + item.price * item.quantity,
      0
    );
  };

  // ไปยังหน้า Payment เมื่อกดปุ่ม "ดำเนินการสั่ง"
  const router = useRouter();
  const handleCheckout = () => {
    router.push("/payment");
  };

  return (
    <RootLayout loggedInUser="">
      <div className="mt-[140px] text-3xl">ตะกร้าสินค้า</div>
      <div className="container mx-auto my-10">
        {cartItems.length > 0 ? (
          <div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    สินค้า
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ราคา
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    จำนวน
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    รวม
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={item.imgFirst} alt={item.productname} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.productname}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity * item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-8 flex justify-end">
              <p className="mr-4 text-xl">ยอดรวมทั้งหมด: {calculateTotal()}</p>
              <button onClick={handleCheckout} className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none">
                ดำเนินการสั่ง
              </button>
            </div>
          </div>
        ) : (
          <p>ไม่มีสินค้าในตะกร้า</p>
        )}
      </div>
    </RootLayout>
  );
};

export default CartPage;