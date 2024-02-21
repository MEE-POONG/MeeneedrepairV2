import React from "react";
import Link from "next/link";
import { ImHome } from 'react-icons/im';
import { BiLogoGmail } from 'react-icons/bi';
import { FiPhoneCall } from 'react-icons/fi';
import { Mitr } from 'next/font/google'
import Image from "next/image";

const fontMNR = Mitr({
    weight: "300",
    subsets: ['latin'],
    variable: '--font-mitr',
})

const Footer: React.FC = () => {
    return (
        <footer className={`w-full ${fontMNR.className}`}>
            <div className="font-fontTH01 w-full bg-[#F4F5F5] bottom-0">
                <div className="md:grid grid-cols-6 lg:grid-cols-5 gap-3 mx-5 md:mx-8 py-4 justify-center">
                 <img className="w-24 lg:w-36 md:col-start-2 md:mx-auto md:col-span-2 lg:col-span-1" src={"/images/LOGO.png"} alt="" width={`150`} height={`150`} />
                    <div className="md:col-span-3 lg:col-span-2 ">
                        <p className="text-base lg:text-3xl font-extrabold text-transparent 
                                      bg-gradient-to-r from-orange-400 to-blue-600
                                      bg-clip-text mb-1 "
                        >Mee Need Repair
                        </p>
                        <div className=" flex items-center gap-2">
                            <ImHome />
                            <span className="text-[10px] md:text-base ">
                                46/3 ถ.ราชนิกุล ต.ในเมือง อ.เมือง, นครราชสีมา 30000
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <BiLogoGmail />
                            <span className="text-[10px] md:text-base"> me.prompt.tec@gmail.com </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FiPhoneCall size={13} />
                            <p className="text-[10px] md:text-base"> 099-164-1044,
                                <span className="text-[10px] md:text-sm"> 065-821-4605</span>
                            </p>

                        </div>
                    </div>
                    <div className="md:col-span-2 md:col-start-2 lg:col-span-1">
                        <p className="text-sm md:text-base font-semibold mb-1">บริกรของเรา</p>
                        <p className="text-[10px] md:text-sm">รับซ่อมบำรุงอุปกรณ์ IT</p>
                        <p className="text-[10px] md:text-sm">ให้คำปรึกษาปัญหาเกี่ยวกับอุปกรณ์ IT</p>
                    </div>
                    <div className="md:col-span-2 md:col-start-4 lg:col-span-1">
                        <p className=" text-sm md:text-base font-semibold mb-1">สนับสนุน</p>
                        <Link href="./howto_register" className="text-[10px] md:text-sm"><p >วิธีการสมัครสมาชิก</p></Link>
                        <Link href="" className=" text-[10px] md:text-sm"><p >วิธีการสั่งซื้อ และชำระเงิน</p></Link>
                        <Link href="" className=" text-[10px] md:text-sm"><p >การติดตามสถานะ</p></Link>
                    </div>
                </div>
                <div className=" bg-[#0F172A] text-white text-center py-2">
                    <div className="text-[10px] md:text-sm">©2023
                        <Link className="text-natural01 hover:text-natural04"
                            href=''> Me Prompt technology Co.
                        </Link>
                        &nbsp;,Ltd. All Rights Reserved.
                    </div>
                </div>

            </div>
        </footer>

    )
}
export default Footer;