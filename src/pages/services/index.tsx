import Link from "next/link";
import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import Menuservice from "../../container/Home/Menuservice";
import RootLayout from "@/components/Layout";
import Slide from "@/container/Services/Slide";


const AdviserService: React.FC = (props) => {



    return (
        <>
            <RootLayout loggedInUser="">
                <div className="mt-[84px]">
                    <Slide />
                    <Menuservice />
                    <div className="container mx-auto mt-28 mb-24 px-3">
                        <div className="relative bg-white shadow-lg p-3 rounded-md max-w-[1300px] mx-auto">
                            <div className="absolute bg-black p-3 rounded-md -top-6 left-5">
                                <p className="text-white">รูปแบบการบริการ</p>
                            </div>
                            <ul className="mt-8 ml-6">
                                <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum aut, impedit alias labore saepe, expedita et laborum unde officiis amet excepturi quaerat voluptatibus rem natus.</li>
                                <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum aut, impedit alias labore saepe, expedita et laborum unde officiis amet excepturi quaerat voluptatibus rem natus.</li>
                                <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum aut, impedit alias labore saepe, expedita et laborum unde officiis amet excepturi quaerat voluptatibus rem natus.</li>
                                <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum aut, impedit alias labore saepe, expedita et laborum unde officiis amet excepturi quaerat voluptatibus rem natus.</li>

                            </ul>
                        </div>

                        <div className="relative bg-white shadow-lg p-3 rounded-md mt-16  max-w-[1300px] mx-auto">
                            <div className="absolute bg-black p-3 rounded-md -top-6 left-5">
                                <p className="text-white">การจองใช้บริการ</p>
                            </div>
                            <ul className="mt-8 ml-6">
                                <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum aut, impedit alias labore saepe, expedita et laborum unde officiis amet excepturi quaerat voluptatibus rem natus.</li>
                                <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum aut, impedit alias labore saepe, expedita et laborum unde officiis amet excepturi quaerat voluptatibus rem natus.</li>
                                <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum aut, impedit alias labore saepe, expedita et laborum unde officiis amet excepturi quaerat voluptatibus rem natus.</li>
                                <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum aut, impedit alias labore saepe, expedita et laborum unde officiis amet excepturi quaerat voluptatibus rem natus.</li>
                                <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum aut, impedit alias labore saepe, expedita et laborum unde officiis amet excepturi quaerat voluptatibus rem natus.</li>

                            </ul>
                        </div>
                    </div>

                    {/* <div className=" bg-white w-full py-16 ">
                        <div className="w-[1100px] mx-auto">
                            <h1 className="text-black  text-xl md:text-3xl font-bold text-center  py-5">
                                ตัวอย่างบริการของเรา
                            </h1>

                        </div>
                    </div> */}
                </div>
            </RootLayout>
        </>
    )
}
export default AdviserService;