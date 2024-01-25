import Link from "next/link";
import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { LiaCartArrowDownSolid } from "react-icons/lia";
import { LiaHeartSolid } from "react-icons/lia";
import Cookies from 'js-cookie';
import axios from "axios";

interface Products {
  id: number;
  productname: string;
  price: string;
  description: string;
  date: string;
  author: string;
  refer: string;
  imgFirst: string;
}

export default function ShowproductsCard() {
  const [newsData, setNewsData] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const [productsSentToRepairman, setproductsSentToRepairman] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then((response) => response.json())
      .then((data) => {
        setNewsData(data.products);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const userDataFromCookies = Cookies.get('user');
      if (userDataFromCookies) {
        const parsedUser = JSON.parse(userDataFromCookies);
        setLoggedInUser(parsedUser);
      }
    };
    fetchData();
  }, []);

  async function Addtocart(productId: any) {
  try {
    if (!productsSentToRepairman.includes(productId)) {
      // ทำการเรียก API หรือทำอย่างอื่นที่ต้องการ เพื่อทำการเก็บค่า products.id ไว้ใน orderlist
      // ตัวอย่างเช่น
      await axios.post('/api/orderlist', {
        productId: productId,
        userId: loggedInUser.id,
      });

      // ทำการอัปเดต state ของ productsSentToRepairman
      setproductsSentToRepairman((prevSent) => [...prevSent, productId]);

      // รีโหลดหน้าหลังจากที่ทำการเพิ่มข้อมูลใน orderlist เพื่อให้แสดงผลลัพธ์ล่าสุด
      window.location.reload();
    } else {
      console.warn('ใส่ตะกร้าเรียบร้อยแล้วค่ะ.');
    }
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการเพิ่มสินค้า', error);
  }
}

  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {newsData.map((products) => (
            <div key={products.id} className="bg-white shadow-xl rounded-md overflow-hidden">
              <div className="flex md:flex-wrap items-center">
                <div className={`w-[230px] md:w-full h-[100px] md:h-[200px] md:rounded-tr-lg md:rounded-tl-lg overflow-hidden `}>
                  <Link href={`/products/${products.id}`}>
                    <img
                      className="w-full h-full object-cover"
                      src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${products.imgFirst ? products.imgFirst : 'f701ce08-7ebe-4af2-c4ec-2b3967392900'}/public`}
                      alt=""
                    />
                  </Link>
                </div>

                <div className="ml-0 w-[100%] md:mt-2 px-3">
                  <div className="flex flex-wrap justify-between md:mt-5">
                    <Link href={`/products/${products.id}`}>
                      <p className="text-black text-xs">{products.productname}</p>
                    </Link>
                  </div>
                  <p className="text-xs md:text-base font-bold line-clamp-2 text-black hover:text-amber-400 mt-2">
                    {products.description}
                  </p>

                  <div className="flex flex-wrap my-3 justify-between md:mt-2">
                    <p className="text-red-400 text-[16px]" style={{ marginTop: 'auto', textShadow: '1px 2px 2px rgba(0, 0, 0, 0.5)' }}>
                      {products.price} Bath
                    </p>
                    <button
                      className="text-red-400 hover:text-red-900"
                      onClick={() => Addtocart(products.id)}
                    >
                      <p className="text-orange-600 text-[16px]" style={{ marginTop: 'auto' }}>
                        <LiaCartArrowDownSolid className="text-[20px] ml-32" />
                      </p>
                    </button>
                    <p className="text-orange-600 text-[16px]" style={{ marginTop: 'auto' }}>
                      <LiaHeartSolid className="text-[20px]" />
                    </p>
                  </div>
                </div>

                <div className="absolute top-0 right-0 p-2">
                  <p><LiaCartArrowDownSolid /></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}