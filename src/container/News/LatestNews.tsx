import React, { useEffect, useState } from 'react';
import { HiOutlineShoppingCart, HiMiniCheck } from "react-icons/hi2";
import { FiHeart } from "react-icons/fi";
import Link from 'next/link';
import CardProductAll from "../Product/CardProductAll";


interface news {
    id: number;
    title: string;
    subtitle: string;
    detail: string;
    date: string;
    author: string;
    refer: string;
    img: string;
    // Add other properties if there are more
}




const LatestNews = () => {

    const initialVisibleItems = 4;
    const [visibleItems, setVisibleItems] = useState(initialVisibleItems);
    const [newsData, setnewsData] = useState<news[]>([]); // Use the defined interface here
    //   const [sliderRef, setSliderRef] = useState<Slider | null>(null);
    const [activeSlide, setActiveSlide] = useState(0);
    const [isLoading, setIsLoading] = useState(true);


    const handleLoadMore = () => {
        setVisibleItems(visibleItems + 4);
    };

    useEffect(() => {
        fetch('/api/news')
            .then((response) => response.json())
            .then((data) => {
                setnewsData(data.news);
                setIsLoading(false); // ตั้งค่า isLoading เป็น false เมื่อโหลดเสร็จสมบูรณ์

            })
            .catch((error) => {
                console.error('Error:', error);
                setIsLoading(false); // ตั้งค่า isLoading เป็น false เมื่อโหลดเสร็จสมบูรณ์

            });
    }, []);

    return (
        <>
            {/* <div className='flex justify-center'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {newsData.slice(0, 1).map((news) => ( // แก้ไขตรงนี้เพื่อแสดงเฉพาะ ID ล่าสุด
                        <Link key={news.id} href={`/news/${news.id}`} passHref>

                            <div key={news.id} className="bg-[#F4F5F5] rounded-[20px] mx-auto w-[270px]">
                                <img
                                    className=' w-full h-24 object-cover'
                                    src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${news.img ? news.img : 'f701ce08-7ebe-4af2-c4ec-2b3967392900'}/public`}
                                    alt='indexActivity image'
                                />

                                <div className="px-4 mt-5">
                                    <p className="text-xl line-clamp-2 font-semibold bg-gradient-to-r from-[#081FF0] to-[#13D1D1] bg-clip-text text-transparent">
                                        {news.title}
                                    </p>
                                    <p className="text-secondary2 line-clamp-2 mb-5">{news.subtitle}
                                    </p>

                                    <div className="flex justify-between mb-3">

                                        <div className="flex text-[#18BCEB] text-sx">
                                            <p>By &nbsp;</p>
                                            <p>{news.author}</p>
                                        </div>

                                        <div className="flex text-[#FFCD4B] text-sx">
                                            <p>{news.date}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>


                        </Link>
                    ))}
                </div>
            </div> */}


            <div className="col-span-2 bg-[#1E293B] mt-10 rounded-lg p-6">
                <p className="text-white text-xl">ข่าวแนะนำ</p>
                {newsData.slice(-1).map((news) => (
                    <div className="bg-[#F4F5F5] rounded-[20px] mx-auto my-5 md:w-[270px] lg:w-[270px]  " key={news.id}>

                        <div className="p-3">
                            <img
                                className='rounded-[20px] w-full h-[150px]'
                                src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${news.img ? news.img : 'f701ce08-7ebe-4af2-c4ec-2b3967392900'}/public`}
                                alt='indexActivity image'
                            />
                        </div>
                        <div className="px-4 py-2">
                            <p className="text-2xl truncate font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#081FF0] to-[#13D1D1] ">{news.title}</p>
                            <div className="flex justify-between px-2 text-sm">
                                <p> By &nbsp; {news.refer}</p>
                                <p>{news.date}</p>
                            </div>
                            <p className="mt-2 truncate">{news.detail}</p>
                            <Link href={`/news/${news.id}`} passHref>
                                <p className="bg-yellow-500 p-2 rounded-full text-center mt-3 ">
                                    อ่าน
                                </p>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>


        </>
    );
};

export default LatestNews;
