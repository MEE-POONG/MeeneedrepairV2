import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Products {
  id: number;
  productname: string;
  price: string;
  detail: string;
  date: string;
  author: string;
  refer: string;
  imgFirst: string;
  // Add other properties if there are more
}

export default function PromoteCard2() {
  const visibleItems = 2; // จำนวนรูปที่ต้องการแสดง
  const [newsData, setnewsData] = useState<Products[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then((response) => response.json())
      .then((data) => {
        setnewsData(data.products);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide + 1) % newsData.length);
    }, 3000); // เปลี่ยน slide ทุก 3 วินาที

    return () => clearInterval(timer);
  }, [newsData]);

  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-col md:grid-cols-2 lg:grid-cols-2 justify-center gap-8">
          {newsData.slice(0, visibleItems).map((products, index) => (
            <div
              key={products.id}
              className={`bg-white shadow-2xl rounded-md overflow-hidden ${index === activeSlide ? 'active-slide' : ''
                }`}
            >
              <Link href={`/products/${products.id}`}>
                <div className="flex md:flex-wrap items-center">
                  <div className="w-[350px] md:w-full h-[100px] md:h-[280px] shadow-2xl md:rounded-tr-lg md:rounded-tl-lg overflow-hidden">
                    <Image
                      className="w-full h-full object-cover"
                      src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${products.imgFirst || 'f701ce08-7ebe-4af2-c4ec-2b3967392900'}/public`}
                      alt=""
                    />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
