import RootLayout from "@/components/Layout";
import { Html } from 'next/document';
import Link from "next/link";

const Success: React.FC = (props) => {

    return (

        <RootLayout loggedInUser="">
            <>
                <div className="  justify-center mt-40 mb-80">
                    <img src="/images/true.png" className="w-[150px] mx-auto" />
                    <p className="text-center text-lime-600 text-[30px]">สั่งซื้อสำเร็จ!</p>
                    <br />
                    <p className="text-center text-[25px]">"กรุณาชำระเงิน พร้อมกับแนบหลังฐานการชำระเงิน ภายใน 7 วัน หลังทำการสังซื้อ"</p>
                    <div className="justify-center text-center ">
                        <Link href={`/`} >
                        <button className="mt-16 w-[120px] h-[50px] rounded-lg bg-gray-300">ไปหน้าแรก</button>
                    </Link>
                    <button className="mt-16 ml-14 w-[120px] h-[50px] rounded-lg bg-gray-300">แจ้งชำระเงิน</button>
                </div>
            </div>

        </>
        </RootLayout >
    )
}
export default Success