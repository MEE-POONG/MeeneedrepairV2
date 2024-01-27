import React, { useEffect, useState } from 'react';

import CustomerProfile from "./custom_profile";
import TabMenu from "../../container/Profile/test/TabMenu";
import TabMenuMobile from "../../container/Profile/test/TabMenuMobile";
import Cookies from 'js-cookie';
import RootLayout from "@/components/Layout";
import Subpage from '@/container/Profile/SubPage';
import { LuLogOut, LuNewspaper, LuUnlock, LuUser2 } from 'react-icons/lu';

const RegisterPage: React.FC = (props) => {
    const buttonSubPages = [
        { id: 0, label: 'ข้อมูลส่วนตัว', icon: LuNewspaper, selct: 0 },
        { id: 1, label: 'จัดการข้อมูลส่วนตัว', icon: LuUser2, select: 1 },
        { id: 7, label: 'เปลี่ยนรหัสผ่าน', icon: LuUnlock, select: 7 },
    ];

    const [loggedInUser, setLoggedInUser] = useState<any>(null);
    useEffect(() => {
        const fetchData = async () => {
            const userDataFromCookies = Cookies.get('user');
            if (userDataFromCookies) {
                const parsedUser = JSON.parse(userDataFromCookies);
                setLoggedInUser(parsedUser);
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        console.log(loggedInUser);
    }, [loggedInUser]);
    return (
        <RootLayout loggedInUser={loggedInUser}>
            <Subpage />
        </RootLayout>
    )
}

export default RegisterPage;