import React, { useState, useEffect, useMemo } from "react";
import { HiMinusSmall, HiPlusSmall } from "react-icons/hi2";
import { LuNewspaper, LuUser2, LuMapPin, LuReceipt, LuHeart, LuUnlock, LuLogOut } from "react-icons/lu";
import { AiOutlineTool } from "react-icons/ai";
import { TbShoppingCartSearch } from "react-icons/tb";
import NewsCard from "../News/NewsCard";
import ShowproductsCard from "./ShowProduct";

const categories = [
  { id: 0, icon: <LuNewspaper />, name: "ซีพียู", component: <ShowproductsCard /> },
  { id: 1, icon: <LuUser2 />, name: "เมนบอร์ด", component: <NewsCard /> },
  { id: 2, icon: <LuMapPin />, name: "การ์ดจอ", component: <NewsCard /> },
  { id: 3, icon: <LuReceipt />, name: "แรม", component: <NewsCard /> },
  { id: 4, icon: <AiOutlineTool />, name: "ฮาร์ดดิสก์", component: <NewsCard /> },
  { id: 5, icon: <TbShoppingCartSearch />, name: "เอสเอสดี", component: <NewsCard /> },
  { id: 6, icon: <LuHeart />, name: "พาวเวอร์ซัพพลาย", component: <NewsCard /> },
  { id: 7, icon: <LuUnlock />, name: "โน๊ตบุ๊ก", component: <NewsCard /> },
];

const CategoriesList = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const memoizedCategories = useMemo(() => categories, []); // Memoize the categories array

  return (
    <div className="bg-secondary2 p-4 rounded-lg">
      <div className="container w-[250px] h-[100%] tab-buttons hidden lg:flex flex-col grid-cols-5 md:gap-2 my-10 mx-10">
        <h3 className="text-3xl text-black mb-8">หมวดหมู่สินค้า</h3>
        {memoizedCategories.map((Categories, index) => (
          <button key={Categories.id} onClick={() => handleTabClick(index)} className={activeTab === index ? 'active' : ''}>
            <div className="ml-5 flex gap-1 text-black hover:underline text-[18px] ">
              {Categories.icon}
              {Categories.name}
            </div>
          </button>
        ))}
      </div>      
    </div>
    
  );
};

export default CategoriesList;
