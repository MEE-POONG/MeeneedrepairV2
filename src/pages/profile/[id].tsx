import React, { useState } from 'react';
import Head from 'next/head';
import Personalinformation from '../../container/Profile/Personalinformation';
import ReceiptProfile from '../../container/Profile/receipt_profile';
import AddressProfile from '../../container/Profile/address_profile';
import OrderProfile from '../../container/Profile/order_profile';
import FavoriteProfile from '../../container/Profile/favorite_profile';
import PasswordProfile from '../../container/Profile/password_profile';
import RepairProfile from '../../container/Profile/repair_profile';
import TabMenuMobile from '../../container/Profile/test/TabMenuMobile';
import { LuNewspaper, LuUser2, LuMapPin, LuReceipt, LuHeart, LuUnlock, LuLogOut } from "react-icons/lu";
import { AiOutlineTool } from "react-icons/ai";
import { TbShoppingCartSearch } from "react-icons/tb";
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import DeliveryLocations from '../../container/Profile/deliveryprofile';
import RootLayout from '@/components/Layout';

const RegisterPage: React.FC = (props) => {
    const [loggedInUser, setLoggedInUser] = useState<any>(null);
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
            <Head>
                <title>Mee Need Repair</title>
            </Head>
            <div className="lg:hidden ">
                <TabMenuMobile activeTab={activeTab} handleTabClick={handleTabClick} />
            </div>
            <div className='ml-40'>
                <div className=' flex mx-auto text-black mr-11 ' >


                    <div className="container w-[250px] h-[100%]  tab-buttons hidden lg:flex flex-col grid-cols-5 md:gap-2 my-10 mx-10">
                        <h3 className="text-3xl text-black mb-8">จัดการบัญชีผู้ใช้</h3>
                        <button onClick={() => handleTabClick(0)} className={activeTab === 0 ? 'active' : ''}><div className="ml-5 flex gap-1 text-black hover:underline text-[18px] ">
                            <LuNewspaper className='w-[25px] h-[25px]' />
                            ข้อมูลส่วนตัว
                        </div>
                        </button>

                        <button onClick={() => handleTabClick(1)} className={activeTab === 1 ? 'active' : ''}><div className="ml-5 flex gap-1 items-center mt-2 text-black hover:underline text-[18px] ">
                            <LuUser2 className='w-[25px] h-[25px]' />
                            จัดการข้อมูลส่วนตัว

                        </div>
                        </button>
                        <button onClick={() => handleTabClick(2)} className={activeTab === 2 ? 'active' : ''}> <div className="ml-5 flex gap-1 items-center mt-2 text-black hover:underline text-[18px] ">
                            <LuMapPin className='w-[25px] h-[25px]' />
                            เพิ่มที่อยู่จัดส่ง
                        </div>
                        </button>
                        <button onClick={() => handleTabClick(3)} className={activeTab === 3 ? 'active' : ''}><div className="ml-5 flex gap-1 items-center mt-2 text-black hover:underline text-[18px] ">
                            <LuReceipt className='w-[25px] h-[25px]' />
                            ใบเสร็จ/ใบกำกับภาษี
                        </div>
                        </button>
                        <button onClick={() => handleTabClick(4)} className={activeTab === 4 ? 'active' : ''}> <div className="ml-5 flex gap-1 items-center mt-2 text-black hover:underline text-[18px] ">
                            <AiOutlineTool className='w-[25px] h-[25px]' />
                            บริการซ่อมอุปกรณ์

                        </div>
                        </button>
                        <button onClick={() => handleTabClick(5)} className={activeTab === 5 ? 'active' : ''}> <div className="ml-5 flex gap-1 items-center mt-2 text-black hover:underline text-[18px] ">
                            <TbShoppingCartSearch className='w-[25px] h-[25px]' />
                            รายการคำสั่งซื้อ

                        </div></button>
                        <button onClick={() => handleTabClick(6)} className={activeTab === 6 ? 'active' : ''}><div className="ml-5 flex gap-1 items-center mt-2 text-black hover:underline text-[18px] ">
                            <LuHeart className='w-[25px] h-[25px]' />
                            รายการโปรด

                        </div>
                        </button>
                        <button onClick={() => handleTabClick(7)} className={activeTab === 7 ? 'active' : ''}><div className="ml-5 flex gap-1 items-center mt-2 text-black hover:underline text-[18px] ">
                            <LuUnlock className='w-[25px] h-[25px]' />
                            เปลี่ยนรหัสผ่าน

                        </div>
                        </button>
                        <button onClick={handleLogout} ><div className="ml-5 flex gap-1 items-center mt-2 text-black hover:underline text-[18px] ">
                            <LuLogOut className='w-[25px] h-[25px]' />
                            ออกจากระบบ
                        </div>
                        </button>


                    </div>
                    <div className="tab-content mx-5 col-span-18 p-5 lg:p-0 lg:col-span-10 pt-5 mb-10 lg:mb-0 lg:pt-0 my-10 ">
                        {activeTab === 0 && <Personalinformation />}
                        {activeTab === 1 && <p><DeliveryLocations /></p>}
                        {activeTab === 2 && <p><AddressProfile /></p>}
                        {activeTab === 3 && <p><ReceiptProfile /></p>}
                        {activeTab === 4 && <p><RepairProfile /></p>}
                        {activeTab === 5 && <p><OrderProfile /></p>}
                        {activeTab === 6 && <p><FavoriteProfile /></p>}
                        {activeTab === 7 && <p><PasswordProfile /></p>}
                    </div>

                </div>
            </div>
        </RootLayout>
    );
}

export default RegisterPage;
