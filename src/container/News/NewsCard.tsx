import Link from "next/link";
import { useEffect, useState } from "react";


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

export default function NewsCard() {


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
            <div className="container mx-auto mt-5 px-6">
                <div className="grid grid-col md:grid-cols-3 lg:grid-cols-5 justify-center gap-5">
                    {newsData.slice(0, visibleItems).map((news) => (
                        <div key={news.id} className="bg-secondary1 shadow-xl rounded-md overflow-hidden p-2 md:p-4">
                            <div className="flex md:flex-wrap items-center">
                                <div className="w-[350px] md:w-full h-[80px] md:h-[150px] rounded-l-md md:rounded-lg overflow-hidden ">
                                <Link href={`/news/${news.id}`} className="text-natural04 text-xs">  <img className="w-full h-full object-cover"
                                        src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${news.img ? news.img : 'f701ce08-7ebe-4af2-c4ec-2b3967392900'}/public`}
                                        alt=""
                                    /></Link>
                                </div>

                                <div className="ml-3 md:ml-0 md:mt-2">
                                    <p className="text-sm lg:text-lg line-clamp-2 font-semibold bg-gradient-to-r from-[#081FF0] to-[#13D1D1] bg-clip-text text-transparent">
                                        {news.title}
                                    </p>

                                    <div className="hidden md:block text-secondary2 text-xs md:text-sm mt-2 ">
                                        <p className="line-clamp-2">{news.subtitle}</p>
                                    </div>

                                    <div className="flex justify-between mt-5">
                                        <p className="text-natural01 text-xs">
                                            By: &nbsp;{news.author}
                                        </p>

                                        <Link href={`/news/${news.id}`} 
                                            className="text-natural04 text-xs">
                                            อ่าน
                                        </Link>

                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}