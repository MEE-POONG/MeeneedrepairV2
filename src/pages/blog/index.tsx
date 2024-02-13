import React, { useEffect, useState } from "react";
import Link from "next/link";
import RootLayout from "@/components/Layout";
import Image from "next/image";
// import SlideBlog from "@/container/blog/SlideBlog";

interface Blog {
    id: string;
    title: string;
    detail: string;
    subtitle: string;
    img: string;
    img1: string;
    date: string;
    author: string;
}

const BlogsPage: React.FC = () => {
    const initialVisibleItems = 5;
    // const [visibleItems, setVisibleItems] = useState(initialVisibleItems);
    const [blogData, setblogData] = useState<Blog[]>([]); // Use the defined interface here
    const [isLoading, setIsLoading] = useState(true);


    // const handleLoadMore = () => {
    //     setVisibleItems(visibleItems + 4);
    // };

    const hasMoreDataToLoad =
        useEffect(() => {
            fetch('/api/blog')
                .then((response) => response.json())
                .then((data) => {
                    setblogData(data.blog);
                    // setIsLoading(false); // ตั้งค่า isLoading เป็น false เมื่อโหลดเสร็จสมบูรณ์

                })
                .catch((error) => {
                    console.error('Error:', error);
                    // setIsLoading(false); // ตั้งค่า isLoading เป็น false เมื่อโหลดเสร็จสมบูรณ์

                });
        }, []);

    return (
        <RootLayout loggedInUser="">
            <div className='relative flex items-center justify-center bg-gray-800'>
                <div className="md:h-[590px] w-full mb-24">
                    {/* <SlideBlog /> */}
                </div>
                <div className='absolute inset-x-0 top-[35%]  md:h-40 text-center'>
                    <button className=" bg-black/20  rounded-lg w-28 h-14  md:w-80 md:h-28">
                        <div className=" text-xl md:text-5xl text-white">สาระน่ารู้</div>
                    </button>
                </div>
            </div>
            <div className="container mx-auto px-6 md:px-24">

                <div className="flex items-center justify-center mt-9">
                    <div className="h-0.5 w-full bg-blue-950"></div>
                    <h2 className="w-full text-2xl md:text-4xl text-center p-3 font-semibold text-blue-950">
                        บทความน่าสนใจ
                    </h2>
                    <div className="h-0.5 w-full bg-blue-950"></div>
                </div>

                <div className="grid grid-col md:grid-cols-3 lg:grid-cols-5 justify-center gap-5">
                    {/* {blogData.slice(0, visibleItems).map((blog) => ( */}
                    {blogData.slice(0).map((blog) => (
                        <div key={blog.id} className="bg-white shadow-xl rounded-md overflow-hidden ">
                            <Link href={`/blog/${blog.id}`} >
                                <div className="flex md:flex-wrap items-center">
                                    <div className="w-[350px] md:w-full h-[100px] md:h-[220px]  md:rounded-tr-lg md:rounded-tl-lg overflow-hidden ">
                                        {/* 
                                        <Image className="w-full h-full object-cover"
                                            src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${blog.img ? blog.img : 'f701ce08-7ebe-4af2-c4ec-2b3967392900'}/public`}
                                            alt="" width={100} height={100}
                                        /> */}

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

                {/* <div className="py-9">
                    <button className="group relative h-8 w-36 md:h-12 md:w-48 overflow-hidden rounded-lg bg-white md:text-base text-sm shadow">
                        <div className="absolute inset-0 w-3 bg-slate-700 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                        <span className="relative text-black group-hover:text-white" onClick={handleLoadMore} >โหลดเพิ่มเติม</span>
                    </button>
                </div> */}
            </div>
        </RootLayout>
    )
}
export default BlogsPage;