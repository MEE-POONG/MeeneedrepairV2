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
                <div className="w-full h-full md:h-[280px] shadow-2xl md:rounded-tr-lg md:rounded-tl-lg overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src="../images/12.png"

                    alt="" 
                  />
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
