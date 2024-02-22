
import { useState } from "react";
import Link from "next/link";
import NewsCard from '../../container/News/NewsCard';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import Slideproduct from "@/container/products/Slideproduct";
import PromoteCard2 from "@/container/products/Promote2";
import PromoteCard from "@/container/products/Promote";
import ShowproductsCard from "@/container/products/ShowProduct";
import RootLayout from "@/components/Layout";
import MouseCard from "@/container/products/Category/Mouse";
import CPUCard from "@/container/products/Category/CPU";
import Mainboard from "@/container/products/Category/mainboard";

// Main ProductPage component
const ProductPage: React.FC = (props) => {
    // State for search text
    const [activeTab, setActiveTab] = useState(0);
    const router = useRouter();
    const handleLogout = () => {
        // ลบข้อมูลผู้ใช้ใน Cookies
        Cookies.remove('user');

        // ทำการ redirect หน้าไปที่หน้า login หรือหน้าที่คุณต้องการ
        router.push('/login');
    };

    const handleTabClick = (index: number) => {
        setActiveTab(index);
    };

    return (
        <RootLayout loggedInUser="">
            {/* Slideproduct component */}
            <div className="mt-[84px]">
                <Slideproduct />
            </div>
            {/* Main content container */}
            <div className="container my-[84px]  mx-auto font-fontTH01">
                {/* Promotion section */}
                <div className="mx-auto text-center text-[50px]">
                    <p>Promotion</p>
                </div>
                <div className="container mx-auto my-auto py-6 px-5 lg:">
                    <div className="flex justify-between">
                        <p className="text-xl md:text-3xl font-bold text-black mb-5 text-center md:text-left">สินค้าแนะนำ</p>
                        <Link href='/news' className="text-sx md:text-xl flex items-center hover:underline hover:decoration-sky-500 ">เพิ่มเติม</Link>
                    </div>
                    {/* Grid for promotions */}
                    <div className="grid md:flex md:space-x-3 md:grid-cols-12 gap-3">
                        {/* PromoteCard component */}
                        <PromoteCard />
                        {/* PromoteCard2 component */}
                        <div className="col-span-12">
                            <PromoteCard2 />
                        </div>
                    </div>
                </div>

                {/* Card Product section */}
                <div className="flex mx-auto bg-secondary2 rounded-lg">
                    <div className="container w-[250px] h-[100%] tab-buttons hidden lg:flex flex-col grid-cols-5 md:gap-2 my-10 mx-10">        <h3 className="text-3xl text-black mb-8">หมวดหมู่สินค้า</h3>
                        <button onClick={() => handleTabClick(0)} className={activeTab === 0 ? 'active' : ''}>
                            <div className="ml-5 flex gap-1 text-black hover:underline text-[18px] ">
                                <p className='w-[25px] h-[25px]' />
                                สินค้าทั้งหมด
                            </div>
                        </button>

                        <button onClick={() => handleTabClick(1)} className={activeTab === 0 ? 'active' : ''}>
                            <div className="ml-5 flex gap-1 text-black hover:underline text-[18px] ">
                                <p className='w-[25px] h-[25px]' />
                                ซีพียู
                            </div>
                        </button>

                        <button onClick={() => handleTabClick(2)} className={activeTab === 1 ? 'active' : ''}><div className="ml-5 flex gap-1 items-center mt-2 text-black hover:underline text-[18px] ">
                            <p className='w-[25px] h-[25px]' />
                            เมนบอร์ด

                        </div>
                        </button>
                        <button onClick={() => handleTabClick(3)} className={activeTab === 2 ? 'active' : ''}> <div className="ml-5 flex gap-1 items-center mt-2 text-black hover:underline text-[18px] ">
                            <p className='w-[25px] h-[25px]' />
                            เมาส์
                        </div>
                        </button>
                        {/* <button onClick={() => handleTabClick(3)} className={activeTab === 3 ? 'active' : ''}><div className="ml-5 flex gap-1 items-center mt-2 text-black hover:underline text-[18px] ">
                            <p className='w-[25px] h-[25px]' />
                            แรม
                        </div>
                        </button>
                        <button onClick={() => handleTabClick(4)} className={activeTab === 4 ? 'active' : ''}> <div className="ml-5 flex gap-1 items-center mt-2 text-black hover:underline text-[18px] ">
                            <p className='w-[25px] h-[25px]' />
                            Harddsik/SSD
                        </div>
                        </button>
                        <button onClick={() => handleTabClick(5)} className={activeTab === 5 ? 'active' : ''}> <div className="ml-5 flex gap-1 items-center mt-2 text-black hover:underline text-[18px] ">
                            <p className='w-[25px] h-[25px]' />
                            พาวเวอร์ซัพพลาย
                        </div>
                        </button>
                        <button onClick={() => handleTabClick(6)} className={activeTab === 6 ? 'active' : ''}><div className="ml-5 flex gap-1 items-center mt-2 text-black hover:underline text-[18px] ">
                            <p className='w-[25px] h-[25px]' />
                            โน๊ตบุ๊ค

                        </div>
                        </button>
                        <button onClick={() => handleTabClick(7)} className={activeTab === 7 ? 'active' : ''}><div className="ml-5 flex gap-1 items-center mt-2 text-black hover:underline text-[18px] ">
                            <p className='w-[25px] h-[25px]' />
                            อุปกรณ์เสริม

                        </div>
                        </button> */}
                    </div>
                    <div className="tab-content mx-5 col-span-18 p-5 lg:p-0 lg:col-span-10 pt-5 mb-10 lg:mb-0 lg:pt-0 my-10 ">
                        {activeTab === 0 && <ShowproductsCard />}
                        {activeTab === 1 && <p><CPUCard /></p>}
                        {activeTab === 2 && <p><Mainboard /></p>}
                        {activeTab === 3 && <p><MouseCard /></p>}
                     
                    </div>
                </div>
            </div>

        </RootLayout>
    );
}
export default ProductPage;