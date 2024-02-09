import Link from "next/link";
import { useEffect, useState } from "react";
import { News } from "@prisma/client";
import RootLayout from "@/components/Layout";
import Image from "next/image";
// import SlideNews from "@/container/News/Slide";

interface NewsData {
    id: string;
    image: string;
    title: string;
    description: string;
    credit: string;
    date: string;
}

const NewsPage: React.FC = (props) => {
    const initialVisibleItems = 5;
    const [visibleItems, setVisibleItems] = useState(initialVisibleItems);
    const [newsData, setnewsData] = useState<News[]>([]); // Use the defined interface here
    //   const [sliderRef, setSliderRef] = useState<Slider | null>(null);
    const [activeSlide, setActiveSlide] = useState(0);
    const [isLoading, setIsLoading] = useState(true);


    const handleLoadMore = () => {
        setVisibleItems(visibleItems + 5);
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
        <RootLayout loggedInUser="">
            <div className="mb-24">
                {/* <SlideNews /> */}
            </div>
            <div className="container mx-auto px-6 md:px-24">
                <div className="flex items-center justify-center">
                    <div className="h-0.5 w-full bg-blue-950"></div>
                    <h2 className="w-full text-lg md:text-4xl text-center p-3 font-semibold text-blue-950">
                        News
                    </h2>
                    <div className="h-0.5 w-full bg-blue-950"></div>
                </div>

                <div className="grid grid-col md:grid-cols-3 lg:grid-cols-5 justify-center gap-5">
                    {newsData.slice(0, visibleItems).map((news) => (
                        <div key={news.id} className="bg-white shadow-xl rounded-md overflow-hidden ">
                            <Link href={`/news/${news.id}`} >
                                <div className="flex md:flex-wrap items-center">
                                    <div className="w-[350px] md:w-full h-[100px] md:h-[220px]  md:rounded-tr-lg md:rounded-tl-lg overflow-hidden ">

                                        <Image className="w-full h-full object-cover"
                                            src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${news.img ? news.img : 'f701ce08-7ebe-4af2-c4ec-2b3967392900'}/public`}
                                            alt=""
                                        />

                                    </div>

                                    <div className="ml-0 w-[100%] md:mt-2 px-3">
                                        <div className="flex flex-wrap justify-between md:mt-5">
                                            <p className="text-black text-xs">
                                                by: {news.author}
                                            </p>

                                            <p className="text-orange-600 text-xs">
                                                {news.date}
                                            </p>

                                        </div>
                                        <p className="text-xs md:text-base font-bold line-clamp-2 text-black hover:text-amber-400 mt-2">
                                            {news.title}
                                        </p>

                                        <div className="hidden md:block text-black text-xs md:text-sm py-3">
                                            <p className="line-clamp-2 text-sm">{news.subtitle}</p>
                                        </div>

                                    </div>
                                </div>
                            </Link>

                        </div>
                    ))}
                </div>
                <div className="py-9">
                    <button className="group relative h-8 w-36 md:h-12 md:w-48 overflow-hidden rounded-lg bg-white md:text-base text-sm shadow">
                        <div className="absolute inset-0 w-3 bg-slate-700 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                        <span className="relative text-black group-hover:text-white" onClick={handleLoadMore} >โหลดเพิ่มเติม</span>
                    </button>
                </div>
            </div>
        </RootLayout>
    )
}
export default NewsPage