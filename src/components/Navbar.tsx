import Image from "next/image";
import Link from "next/link";

import React, { useState, useEffect } from "react";
import { HiBars3BottomLeft, HiOutlineXMark, HiUser, HiChevronDown, HiChevronUp, HiChevronRight } from "react-icons/hi2";
import Cookies from 'js-cookie';
import { Mitr } from 'next/font/google'

const fontMNR = Mitr({
  weight: "300",
  subsets: ['latin'],
  variable: '--font-mitr',
})

const Navbar: React.FC = () => {

  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const [cartItemCount, setCartItemCount] = useState<number>(0); // เพิ่ม state สำหรับจำนวนสินค้าในตะกร้า

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
    const cartItemsFromCookies = Cookies.get("cart");
    if (cartItemsFromCookies) {
      const parsedCartItems = JSON.parse(cartItemsFromCookies);
      setCartItemCount(parsedCartItems.length); // นับจำนวนสินค้าในตะกร้าและกำหนดให้ state
    }
  }, []);
  const navLinks = [
    { name: 'หน้าแรก', link: `/` },
    {
      name: 'เกี่ยวกับเรา',
      link: 'about',
      children: [
        { name: 'เกี่ยวกับเรา', link: `./../about` },
        { name: 'ข่าวสาร', link: `./../news` },
        { name: 'บทความ', link: `./../blog` },
      ],
    },
    { name: 'บริการของเรา', link: `./../services` },
    { name: 'สินค้า', link: `./../products` },
  ];

  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleDropdown = () => {
    setOpen(!open);
  };

  return (
    <nav className={` ${fontMNR.className}`}>
      <div className="fixed  top-0 z-50 w-full " style={{ backgroundColor: `${scroll > 90 ? "" : "#0f172a"}` }}>
        <div className=" container  mx-auto flex items-center justify-between md:rounded-[100px] px-10 drop-shadow-2xl" style={{ backgroundColor: `${scroll > 90 ? "#F4F5F5" : ""}` }}>
          <div className="items-center py-5">
            <div onClick={() => setIsOpen(!isOpen)}
              className="md:hidden duration-700 ease-in-out "
              style={{ color: `${scroll > 90 ? "" : "#F4F5F5"}` }}>
              {
                isOpen ? <HiOutlineXMark size={38} /> : <HiBars3BottomLeft size={38} />
              }
            </div>
            <div className="" >
              <img
                src="/images/logo.png"
                width={100}
                height={100}
                className="w-[50px]" alt="" />
            </div>
          </div>

          <ul className="md:flex gap-7 hidden mr-[600px] font-medium text-sm md:text-lg items-center">
            {navLinks.map((list) => (
              <li key={list?.name} className="hover:border-b-2  hover:border-natural04"
                style={{ color: `${scroll > 90 ? "" : "#F4F5F5"}` }}>
                {list?.children ? (
                  <div
                    className="dropdown"
                    onClick={toggleDropdown}
                  >
                    <button
                      className="btn btn-link flex items-center"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : 'false'}
                    >
                      {list?.name}

                      <span
                        className="">
                        {
                          open ? <HiChevronUp size={20} /> : <HiChevronDown size={20} />
                        }
                      </span>
                    </button>

                    <ul
                      className="dropdown-menu absolute bg-secondary1 p-3 rounded-lg drop-shadow-lg"
                      aria-labelledby="dropdownMenuButton"
                      style={{ display: `${open ? 'block' : 'none'}`, backgroundColor: `${scroll > 90 ? "#F4F5F5" : "#0f172a"}` }}
                    >
                      {list?.children.map((child) => (
                        <li key={child.name} className="my-4 pl-2 hover:border-l-2 hover:border-natural01"
                          style={{ color: `${scroll > 90 ? "" : "#F4F5F5"}` }}
                        >
                          <a href={child.link}>{child.name}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <a href={list?.link}>{list?.name}</a>
                )}
              </li>
            ))}
          </ul>


          <ul className="flex gap-3 font-semibold items-center text-base">

            <li className="hover:border-b-2 hover:border-natural04" style={{ color: `${scroll > 90 ? "" : "#F4F5F5"}` }}>

              {loggedInUser ? (
                <Link href={`./../profile/${loggedInUser.id}`} className="flex items-center">
                  <HiUser size={20} />
                  <span className="hidden lg:block">{loggedInUser.email}</span>
                </Link>
              ) : (
                <Link href="./login" className="flex items-center">

                  <HiUser size={20} />
                  <span className="hidden lg:block text-sm md:text-lg ">เข้าสู่ระบบ</span>

                </Link>

              )}
            </li>
            <div className="bg-natural04 w-[1px] h-10 "></div>

            <li className="mr-5 relative"> {/* เพิ่มคลาส relative เพื่อให้ระบุตำแหน่งของจำนวนสินค้าในตะกร้า */}
              <Link href="./cart">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 30 30" fill="none">
                  <path d="M8.5 18H6.5V26H8.5V18Z" fill="url(#paint0_linear_220_322)" />
                  <path d="M13.5 18H11.5V26H13.5V18Z" fill="url(#paint1_linear_220_322)" />
                  <path d="M18.5 18H16.5V26H18.5V18Z" fill="url(#paint2_linear_220_322)" />
                  <path d="M23.5 18H21.5V26H23.5V18Z" fill="url(#paint3_linear_220_322)" />
                  <path d="M28.6051 9.5L23.6289 0H21.3711L26.3473 9.5H3.65269L8.62887 0H6.37113L1.39494 9.5H0V16.4667L2.6785 30H27.3198L30 16.599V9.5H28.6051ZM28 16.401L25.6802 28H4.3215L2 16.2708V16H28V16.401ZM28 14H2V11.5H28V14Z" fill="url(#paint4_linear_220_322)" />
                  <defs>
                    <linearGradient id="paint0_linear_220_322" x1="6.5" y1="21.9835" x2="8.3642" y2="21.9835" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#CA0808" />
                      <stop offset="1" stopColor="#0FC0E7" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_220_322" x1="11.5" y1="21.9835" x2="13.3642" y2="21.9835" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#CA0808" />
                      <stop offset="1" stopColor="#0FC0E7" />
                    </linearGradient>
                    <linearGradient id="paint2_linear_220_322" x1="16.5" y1="21.9835" x2="18.3642" y2="21.9835" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#CA0808" />
                      <stop offset="1" stopColor="#0FC0E7" />
                    </linearGradient>
                    <linearGradient id="paint3_linear_220_322" x1="21.5" y1="21.9835" x2="23.3642" y2="21.9835" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#CA0808" />
                      <stop offset="1" stopColor="#0FC0E7" />
                    </linearGradient>
                    <linearGradient id="paint4_linear_220_322" x1="-2.48931e-07" y1="14.9383" x2="27.963" y2="14.9383" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#CA0808" />
                      <stop offset="1" stopColor="#0FC0E7" />
                    </linearGradient>
                  </defs>
                </svg>
                {cartItemCount > 0 && ( // เพิ่มการตรวจสอบว่ามีสินค้าในตะกร้าหรือไม่ก่อนแสดงจำนวนสินค้า
                  <span className="absolute top-[-10px] right-[-10px] bg-red-500 text-white text-xs px-2 py-1 rounded-full">{cartItemCount}</span>
                )}
              </Link>
            </li>
          </ul>
        </div>





      </div>
    </nav>
  );
};

export default Navbar;