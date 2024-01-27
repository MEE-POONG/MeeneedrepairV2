import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import RootLayout from "@/components/Layout";
import SubPage from '@/container/Profile/SubPage';


const RegisterPage: React.FC = (props) => {

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
    return (
        <RootLayout loggedInUser={loggedInUser}>
            <SubPage />
        </RootLayout>
    )
}

export default RegisterPage;