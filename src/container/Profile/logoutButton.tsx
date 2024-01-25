import React from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const LogoutButton: React.FC = (props) => {
  const router = useRouter();

  const handleLogout = () => {
    // ลบข้อมูลผู้ใช้ใน Cookies
    Cookies.remove('user');

    // ทำการ redirect หน้าไปที่หน้า login หรือหน้าที่คุณต้องการ
    router.push('/login');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;