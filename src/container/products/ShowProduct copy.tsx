// ShowproductsCard.tsx
import React, { useState, useEffect } from "react";
import { LiaCartArrowDownSolid, LiaHeartSolid } from "react-icons/lia";
import Link from "next/link";
import Cookies from 'js-cookie';
import Image from "next/image";

interface Products {
  id: number;
  productname: string;
  price: string;
  description: string;
  imgFirst: string;
  quantity?: number;
}

const ShowproductsCard: React.FC = () => {
  const [cartItems, setCartItems] = useState<Products[]>([]);
  const [newsData, setNewsData] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setNewsData(data.products);
        setIsLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const addToCart = (productId: number) => {
    const productToAdd = newsData.find((product) => product.id === productId);

    if (productToAdd) {
      const updatedCart = [...cartItems, { ...productToAdd, quantity: 1 }];
      setCartItems(updatedCart);
      Cookies.set('cartItems', JSON.stringify(updatedCart));
    }
  };

  const saveToOrderList = async (productId: number) => {
    try {
      const response = await fetch('/api/orderlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });

      if (response.ok) {
        console.log('Product ID saved to OrderList successfully');
      } else {
        console.error('Failed to save Product ID to OrderList');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          newsData.map((product) => (
            <div key={product.id} className="bg-white shadow-xl rounded-md overflow-hidden">
              <div className="flex md:flex-wrap items-center">
                <div className="w-[230px] md:w-full h-[200px] md:rounded-tr-lg md:rounded-tl-lg overflow-hidden">
                  <Link href={`/products/${product.id}`}>
                 <img src={product.imgFirst} alt="" className="w-[200PX] h-[200] object-cover rounded-xl" width={100} height={100}/>
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
                      <button className="text-red-400 hover:text-red-900" onClick={() => { addToCart(product.id); saveToOrderList(product.id); }}>
                        <p className="text-orange-600 text-[16px]" style={{ marginTop: 'auto' }}>
                          <LiaCartArrowDownSolid className="text-[20px] ml-32" />
                        </p>
                      </button>
                    </div>
                    <p className="text-orange-600 text-[16px]" style={{ marginTop: 'auto' }}>
                      <LiaHeartSolid className="text-[20px]" />
                    </p>
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

export default ShowproductsCard;
