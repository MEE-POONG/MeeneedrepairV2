import { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import Link from "next/link";
import Cookies from 'js-cookie';

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

    const removeFromCart = (productId: number) => {
        const updatedCart = cartItems.filter(item => item.id !== productId);
        setCartItems(updatedCart);
        Cookies.set('cart', JSON.stringify(updatedCart));
    };

    const increaseQuantity = (productId: number) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === productId) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCartItems(updatedCart);
        Cookies.set('cart', JSON.stringify(updatedCart));
    };

    const decreaseQuantity = (productId: number) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === productId && item.quantity > 0) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setCartItems(updatedCart);
        Cookies.set('cart', JSON.stringify(updatedCart));
    };

    const calculateItemTotal = (price: string, quantity: number) => {
        return (parseInt(price) * quantity).toFixed(2);
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (parseInt(item.price) * item.quantity), 0).toFixed(2);
    };

    const checkout = () => {
        console.log("Payment processing...");
    };

    return (
        <div className="container mx-auto my-24 font-fontTH02 px-3 lg:px-24">
            <title>ตะกร้าสินค้าของคุณ</title>

            <h3 className="text-lg md:text-2xl text-black">รายการสินค้า <span className="">({cartItems.length})</span></h3>
            <div className="grid grid-flow-row lg:grid-cols-12 gap-2 lg:gap-8 mt-3 lg:mt-8 ">
                <div className="lg:col-span-9 bg-secondary1 rounded-md">
                    {cartItems.map((product) => (
                            <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg p-4 mb-3 bg-white relative">
                                <div className="flex justify-end absolute top-4 right-4">
                                {/* <img src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${product.imgFirst ? product.imgFirst : 'f701ce08-7ebe-4af2-c4ec-2b3967392900'}/public`}
                                    alt="" className="w-[320PX] h-full object-cover rounded-xl"
                                /> */}
                                <span className="text-sm text-gray-500">Price: ${product.price}</span>
                                <span className="text-sm text-gray-500">Quantity: {product.quantity}</span>
                                <span className="text-sm text-gray-500">Item Total: ${calculateItemTotal(product.price, product.quantity)}</span>
                           
                            </div>
                            <div>
                                <button onClick={() => removeFromCart(product.id)}>
                                    <RiDeleteBin6Line className="text-red-500" />
                                </button>
                                <div className="flex items-center">
                                    <button onClick={() => decreaseQuantity(product.id)}>-</button>
                                    <span className="mx-2">{product.quantity}</span>
                                    <button onClick={() => increaseQuantity(product.id)}>+</button>
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
                    <Link href="./payment" >
                        <button type="submit"
                            className="bg-natural01 py-2 md:py-3 w-full text-center mt-3 rounded-xl hover:bg-natural01/80 text-xs md:text-sm"
                        >
                            ดำเนินการสั้งซื้อ
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
