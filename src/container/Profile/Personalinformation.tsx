import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { User } from '@prisma/client';
import Information from "../../components/profile/Information";
import { LuNewspaper } from "react-icons/lu";


export default function Personalinformation() {
    const router = useRouter();
    const { id } = router.query; // ดึงค่า id จาก query parameters

    const [userData, setUserData] = useState<any>({}); // กำหนดประเภทของข้อมูลบทความข่าว
    const [deliveryLocationData, setDeliveryLocationData] = useState<any>({}); // กำหนดประเภทของข้อมูลบทความข่าว
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        if (id) {
            fetch(`/api/user/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    setUserData(data); // กำหนดข้อมูลบทความข่าวที่ดึงมา
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
        <>
            <div className="">
                <div className="flex items-center">
                <LuNewspaper className='w-[25px] h-[25px]' />
                    <h3 className="text-2xl text-black ml-2">ข้อมูลส่วนตัว</h3>
                </div>

                <div className="container w-[800px] bg-secondary2 mt-10 rounded-lg p-8 text-secondary1">
                    <Information />
                    {/* <DeliveryLocation /> */}

                </div>

            </div>

        </>
    )
}