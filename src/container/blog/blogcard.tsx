import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";


interface blog {
    id: string;
    title: string;
    subtitle: string;
    detail: string;
    author: string;
    date: string;
    img: string;

    // Add other properties if there are more
}

export default function BlogCard() {


    const initialVisibleItems = 5;
    const [visibleItems, setVisibleItems] = useState(initialVisibleItems);
    const [blogData, setblogData] = useState<blog[]>([]); // Use the defined interface here
    const [activeSlide, setActiveSlide] = useState(0);
    const [isLoading, setIsLoading] = useState(true);


    const handleLoadMore = () => {
        setVisibleItems(visibleItems + 4);
    };


    useEffect(() => {
        fetch('/api/blog')
            .then((response) => response.json())
            .then((data) => {
                setblogData(data.blog);
                setIsLoading(false); // ตั้งค่า isLoading เป็น false เมื่อโหลดเสร็จสมบูรณ์

            })
            .catch((error) => {
                console.error('Error:', error);
                setIsLoading(false); // ตั้งค่า isLoading เป็น false เมื่อโหลดเสร็จสมบูรณ์

            });
    }, []);

    return (
        <>

            <div className="container mx-auto mt-5">
                <div className="grid grid-col md:grid-cols-3 lg:grid-cols-5 justify-center gap-5">
                    {blogData.slice(0, visibleItems).map((blog) => (
                        <div key={blog.id} className="bg-white shadow-xl rounded-md overflow-hidden ">
                            <Link href={`/blog/${blog.id}`} >
                                <div className="flex md:flex-wrap items-center">
                                    <div className="w-[350px] md:w-full h-[100px] md:h-[220px]  md:rounded-tr-lg md:rounded-tl-lg overflow-hidden ">

                                        <Image className="w-full h-full object-cover" width={100} height={100}
                                            src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${blog.img ? blog.img : 'f701ce08-7ebe-4af2-c4ec-2b3967392900'}/public`}
                                            alt=""
                                        />

                                    </div>

                                    <div className="ml-0 w-[100%] md:mt-2 px-3">
                                        <div className="flex flex-wrap justify-between md:mt-5">
                                            <p className="text-black text-xs">
                                                by: {blog.author}
                                            </p>

                                            <p className="text-orange-600 text-xs">
                                                {blog.date}
                                            </p>

                                        </div>
                                        <p className="text-xs md:text-base font-bold line-clamp-2 text-black hover:text-amber-400 mt-2">
                                            {blog.title}
                                        </p>

                                        <div className="hidden md:block text-black text-xs md:text-sm py-3">
                                            <p className="line-clamp-2 text-sm">{blog.subtitle}</p>
                                        </div>

                                    </div>
                                </div>
                            </Link>

                        </div>
                    ))}
                </div>


            </div>


        </>
    )
}