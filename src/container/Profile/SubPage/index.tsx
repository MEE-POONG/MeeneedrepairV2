import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { LuNewspaper, LuUser2, LuMapPin, LuReceipt, LuHeart, LuUnlock, LuLogOut } from "react-icons/lu";
import { AiOutlineTool } from "react-icons/ai";
import { TbShoppingCartSearch } from "react-icons/tb";

import Personalinformation from '../Personalinformation';
import ReceiptProfile from '../receipt_profile';
import AddressProfile from '../address_profile';
import OrderProfile from '../order_profile';
import FavoriteProfile from '../favorite_profile';
import PasswordProfile from '../password_profile';
import RepairProfile from '../repair_profile';
import DeliveryLocations from '../deliveryprofile';

interface User {
    // Define the structure of your user object
}

interface SubPageProps {
    // Define any props if necessary
}

const SubPage: React.FC<SubPageProps> = (props) => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [activeTab, setActiveTab] = useState<number>(0);

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userDataFromCookies = Cookies.get('user');
                if (userDataFromCookies) {
                    const parsedUser = JSON.parse(userDataFromCookies) as User;
                    setLoggedInUser(parsedUser);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        Cookies.remove('user');
        router.push('/login');
    };

    const handleTabClick = (index: number) => {
        setActiveTab(index);
    };

    const buttonSubPages = [
        { id: 0, label: 'ข้อมูลส่วนตัว', icon: LuNewspaper, },
        { id: 1, label: 'จัดการข้อมูลส่วนตัว', icon: LuUser2, },
        { id: 2, label: 'เพิ่มที่อยู่จัดส่ง', icon: LuMapPin, },
        { id: 3, label: 'ใบเสร็จ/ใบกำกับภาษี', icon: LuReceipt, },
        { id: 4, label: 'บริการซ่อมอุปกรณ์', icon: AiOutlineTool, },
        { id: 5, label: 'รายการคำสั่งซื้อ', icon: TbShoppingCartSearch, },
        { id: 6, label: 'รายการโปรด', icon: LuHeart, },
        { id: 7, label: 'เปลี่ยนรหัสผ่าน', icon: LuUnlock, },
    ];

    return (
        <div className='ml-40'>
            <div className='flex mx-auto text-black mr-11'>
                <div className="container w-[250px] h-[100%] tab-buttons hidden lg:flex flex-col grid-cols-5 md:gap-2 my-10 mx-10">
                    <h3 className="text-3xl text-black mb-8">จัดการบัญชีผู้ใช้</h3>
                    {buttonSubPages.map(({ id, label, icon: Icon }) => (
                        <button key={id} onClick={() => handleTabClick(id)} className={activeTab === id ? 'active' : ''}>
                            <div className="ml-5 flex gap-1 items-center mt-2 text-black hover:underline text-[18px]">
                                <Icon className='w-[25px] h-[25px]' />
                                {label}
                            </div>
                        </button>
                    ))}
                    <button onClick={handleLogout} >
                        <div className="ml-5 flex gap-1 items-center mt-2 text-black hover:underline text-[18px] ">
                            <LuLogOut className='w-[25px] h-[25px]' />
                            ออกจากระบบ
                        </div>
                    </button>
                </div>
                <div className="tab-content mx-5 col-span-18 p-5 lg:p-0 lg:col-span-10 pt-5 mb-10 lg:mb-0 lg:pt-0 my-10">
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
    );
}

export default SubPage;
