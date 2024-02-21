import Image from "next/image";
import Link from "next/link";
import { FaFacebook } from 'react-icons/fa';
import ContactPage from "./contact";
import RootLayout from "@/components/Layout";
import CardMeeNeed from "@/container/Home/CardMeeNeed";

export default function AboutPage() {
    return (
        <RootLayout loggedInUser="">
            <div className='mb-10 relative bg-fixed'>
                <img src="../images/banner 2.png" className='w-full md:h-[640px] ' alt="" />
                <div className="absolute text-white text-center md:top-2/4 md:left-32 p-12 rounded-lg ">
                    <h2 className="hidden md:block text-7xl font-semibold text-white"></h2>
                    {/* <h2 className="hidden md:block text-7xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#CA0808]  to-[#0FC0E7]  bg-transparent text-clip">เกี่ยวกับเรา</h2> */}
                    {/* <h2 className="md:hidden text-3xl inset-0 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#CA0808]  to-[#0FC0E7]  bg-transparent text-clip">เกี่ยวกับเรา</h2> */}
                </div>
            </div>
            <div className="container mx-auto my-24">
                <div className="text-center">
                    <div className="w-64 h-1 bg-gradient-to-r from-[#CA0808] to-[#0FC0E7] mx-auto mb-10"></div>
                    <div className="text-black text-2xl md:text-5xl font-bold">
                        รู้จัก&nbsp;
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#081FF0] to-[#13D1D1]">
                            &quot;Mee Need Repair&quot;
                        </span>
                    </div>

                </div >
                <CardMeeNeed />






                

                <ContactPage />


            </div >
        </RootLayout >
    )
}