import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface News {
    id: number;
    title: string;
    subtitle: string;
    detail: string;
    date: string;
    author: string;
    refer: string;
    img: string;
}

const LatestNews = () => {
    const [newsData, setNewsData] = useState<News[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/api/news')
            .then((response) => response.json())
            .then((data) => {
                setNewsData(data.news);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="col-span-2 bg-[#1E293B] mt-10 rounded-lg p-6">
            <p className="text-white text-xl">ข่าวแนะนำ</p>
            {newsData.slice(-2).map((news) => ( // แก้จาก .slice(-2, -1) เป็น .slice(-2) เพื่อให้แสดงข่าวทั้ง 2 ข่าว
                <div className="bg-[#F4F5F5] rounded-[20px] mx-auto my-5 md:w-[270px] lg:w-[270px]" key={news.id}>
                    <div className="p-3">
                        <img
                            className="rounded-[20px] w-full h-[150px]"
                            src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${news.img ? news.img : 'f701ce08-7ebe-4af2-c4ec-2b3967392900'}/public`}
                            alt="indexActivity image"
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className="px-4 py-2">
                        <p className="text-2xl truncate font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#081FF0] to-[#13D1D1]">{news.title}</p>
                        <div className="flex justify-between px-2 text-sm">
                            <p> By &nbsp; {news.refer}</p>
                            <p>{news.date}</p>
                        </div>
                        <p className="mt-2 truncate">{news.detail}</p>
                        <Link href={`/news/${news.id}`} passHref>
                            <p className="bg-yellow-500 p-2 rounded-full text-center mt-3">อ่าน</p>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LatestNews;
