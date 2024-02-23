import { useState, useEffect } from "react";
import { LiaCartArrowDownSolid, LiaHeartSolid } from "react-icons/lia";
import Link from "next/link";
import Cookies from 'js-cookie';
import Image from "next/image";
import { useRouter } from "next/router";

interface Product {
  id: number;
  productname: string;
  price: string;
  description: string;
  imgFirst: string;
  quantity?: number;

}
interface Categories {
  name: string
}

const Mainboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data.products);
        setIsLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const checkLoggedIn = () => {
      const userDataFromCookies = Cookies.get('user');
      if (userDataFromCookies) {
        const parsedUser = JSON.parse(userDataFromCookies);
        setLoggedInUser(parsedUser);
        setIsLoggedIn(true);
      }
    };

    checkLoggedIn();
  }, []);

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

  const addToCart = (product: Product) => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      const updatedCart = cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: (item.quantity || 0) + 1 } : item
      );
      updateCart(updatedCart);
    } else {
      const updatedCart = [...cartItems, { ...product, quantity: 1 }];
      updateCart(updatedCart);
    }
  };

  const updateCart = (updatedCart: Product[]) => {
    setCartItems(updatedCart);
    Cookies.set('cart', JSON.stringify(updatedCart));
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          products
            .filter(product => product.Categories && product.Categories.name === "เมนบอร์ด")
            .map(product => (
              <div key={product.id} className="bg-white shadow-xl rounded-md overflow-hidden">
                <div className="flex md:flex-wrap items-center">
                  <div className="w-[230px] md:w-full h-[200px] md:rounded-tr-lg md:rounded-tl-lg overflow-hidden">
                    <Link href={`/products/${product.id}`}>
                    <img src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${product.imgFirst ? product.imgFirst : 'f701ce08-7ebe-4af2-c4ec-2b3967392900'}/public`} alt="" width={100} height={100} className="w-[200PX] h-[200] object-cover rounded-xl mx-auto" />
                    </Link>
                  </div>

                  <div className="ml-0 w-full md:mt-2 px-3">
                    <div className="flex flex-wrap justify-between md:mt-5">
                      <Link href={`/products/${product.id}`}>
                        <p className="text-black text-xs">{product.productname}</p>
                      </Link>
                    </div>
                    <p className="text-xs md:text-base font-bold line-clamp-2 text-black hover:text-amber-400 mt-2">
                      {product.description}
                    </p>

                    <div className="flex flex-wrap my-3 justify-between md:mt-2">
                      <p className="text-red-400 text-[16px]" style={{ marginTop: 'auto', textShadow: '1px 2px 2px rgba(0, 0, 0, 0.5)' }}>
                        {product.price} Bath
                      </p>
                      <div className="flex items-center">
                        <button className="text-red-400 hover:text-red-900" onClick={() => isLoggedIn ? addToCart(product) : alert('กรุณาเข้าสู่ระบบก่อน')}>
                          <p className="text-orange-600 text-[16px]" style={{ marginTop: 'auto' }}>
                            <LiaCartArrowDownSolid className="text-[20px] ml-32" />
                          </p>
                        </button>

                      </div>
                     </div>
                  </div>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default Mainboard;
