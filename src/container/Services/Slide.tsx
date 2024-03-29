import React, { useRef, useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade'; // เพิ่ม CSS effect-fade

interface news {
    id: String,
    title: String,
    subtitle: string,
    detail: String,
    img: String,
    author: String,
    refer: String,
    date: String,
}

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Link from 'next/link';
import Image from 'next/image';

export default function SlideNews() {
    const initialVisibleItems = 5; //ตัวตั้ง Limited จำนวนสำหรับการแสดงบนหน้าจอ
    const [visibleItems, setVisibleItems] = useState(initialVisibleItems);
    const [blogData, setblogData] = useState<news[]>([]); // Use the defined interface here
    const [activeSlide, setActiveSlide] = useState(0);
    const [isLoading, setIsLoading] = useState(true);


    const handleLoadMore = () => {
        setVisibleItems(visibleItems + 4);
    };

    const hasMoreDataToLoad =

        useEffect(() => {
            fetch('/api/news')
                .then((response) => response.json())
                .then((data) => {
                    setblogData(data.news);
                    setIsLoading(false); // ตั้งค่า isLoading เป็น false เมื่อโหลดเสร็จสมบูรณ์

                })
                .catch((error) => {
                    console.error('Error:', error);
                    setIsLoading(false); // ตั้งค่า isLoading เป็น false เมื่อโหลดเสร็จสมบูรณ์

                });
        }, []);

    return (
        <>
            <div className=''>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    loop={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {blogData.slice(0, visibleItems).map((news) => (
                        <SwiperSlide key={news.id.toString()} className="relative">
                            <Link href={`/news/${news.id}`} className="text-natural04 text-xs">
                                {/* <img className="object-cover w-full h-[700px] aspect-[4/3]" src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${news.img ? news.img : 'f701ce08-7ebe-4af2-c4ec-2b3967392900'}/public`} alt="img1"  width={100} height={100}/> */}
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </>
    );
}
