import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import LatestNews from "../../container/News/LatestNews";
import RootLayout from "@/components/Layout";
import Image from "next/image";



const ReadNewsDetail: React.FC = (props) => {
    const router = useRouter();
    const { id } = router.query; // ดึงค่า id จาก query parameters
    const [newsData, setNewsData] = useState<any>({}); // กำหนดประเภทของข้อมูลบทความข่าว
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetch(`/api/news/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    setNewsData(data); // กำหนดข้อมูลบทความข่าวที่ดึงมา
                    //console.log(data);
                    setIsLoading(false); // ตั้งค่า isLoading เป็น false เมื่อโหลดเสร็จสมบูรณ์

                })
                .catch((error) => {
                    console.error('Error:', error);
                    setIsLoading(false); // ตั้งค่า isLoading เป็น false เมื่อโหลดเสร็จสมบูรณ์

                });
        }
    }, [id]);

    return (
        <RootLayout loggedInUser="">
            <div className="container   mx-auto ">
                <div className="my-20">
                    {/* <img className="w-full h-[300px] md:h-[400px] object-cover" src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${newsData.img}/public`} alt={newsData.img} width={100} height={100} /> */}
                    {/* Content Detail  */}
                    <div className=" xl:grid xl:grid-cols-9 xl:gap-2 mx-4 xl:mx-0 ">
                        {/* Left Content */}
                        <div className="col-span-7 bg-[#ffffff] text-white mt-10 rounded-xl shadow-2xl overflow-hidden">
                            <div className="">
                                <img
                                    className="object-cover object-center w-full h-full shadow-lg"
                                    src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${newsData.img}/public`}
                                    alt={newsData.img}
                                />
                                <div className="w-full text-end mt-2">
                                    <span className="text-sky-600">{newsData.date}</span>
                                    <span className="text-black"> I </span>
                                    <span className="text-cyan-600 font-black">{newsData.author}</span>
                                </div>
                                <h1 className="text-2xl p-3 text-black">{newsData.subtitle}</h1>

                                <p className="mx-6 text-base leading-relaxed text-gray-700">
                                    {newsData.detail}
                                </p>

                                <div className=" items-center text-end mt-4 my-2 text-sm text-gray-600 italic">
                                    อ้างอิง: {newsData.refer}
                                </div>
                            </div>
                        </div>


                        {/* Right Content */}
                        <LatestNews />

                    </div>
                </div>

            </div>
        </RootLayout>
    )
}
export default ReadNewsDetail;