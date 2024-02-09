import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

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

const PromoteCard: React.FC = () => {
  const [newsData, setNewsData] = useState<Products[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    fetch('/api/products')
      .then((response) => response.json())
      .then((data) => {
        setNewsData(data.products);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide + 1) % newsData.length);
    }, 3000); // เปลี่ยน slide ทุก 3 วินาที

    return () => clearInterval(timer);
  }, [newsData]);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 justify-center gap-6">
        {newsData.length > 0 && (
          <div className="bg-white shadow-2xl rounded-md overflow-hidden" style={{ maxWidth: '1000px' }}>
            <Link href={`/products/${newsData[activeSlide].id}`}>
              <div className="flex items-center">
                <div className="w-full h-[100px] md:h-[280px] shadow-2xl md:rounded-tr-lg md:rounded-tl-lg overflow-hidden">
                  {/* <Image
                    className="w-full h-full object-cover"
                    src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${newsData[activeSlide].imgFirst || 'f701ce08-7ebe-4af2-c4ec-2b3967392900'}/public`}

                    alt="" width={100} height={100}
                  /> */}
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromoteCard;
