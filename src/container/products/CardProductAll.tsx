import React, { useEffect, useState } from 'react';
import { HiOutlineShoppingCart, HiMiniCheck } from "react-icons/hi2";
import { FiHeart, FiSearch } from "react-icons/fi";
import Link from 'next/link';
import Image from 'next/image';


interface products {
    id: number;
    productname: string;
    productbrand: string;
    productmodel: string;
    productdetail: string;
    producttype: string;
    productcost: string;
    productprice: string;
    productremaining: string;
    productimg: string;
    // Add other properties if there are more
}


const CardProductAll = ({ searchText, setSearchText }:any) => {
    const [open, setOpen] = useState(false);
    const toggleDropdown = () => {
        setOpen(!open);
    };
    // const initialVisibleItems = 5;
    // const [visibleItems, setVisibleItems] = useState(initialVisibleItems);
    const [productsData, setproductsData] = useState<products[]>([]); // Use the defined interface here
    //   const [sliderRef, setSliderRef] = useState<Slider | null>(null);
    const [activeSlide, setActiveSlide] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const productGroups = [];
    const groupSize = 5;

    for (let i = 0; i < productsData.length; i += groupSize) {
        const group = productsData.slice(i, i + groupSize);
        productGroups.push(group);
    }

    // const handleLoadMore = () => {
    //     setVisibleItems(visibleItems + 5);
    // };

    useEffect(() => {
        fetch('/api/products')
            .then((response) => response.json())
            .then((data) => {
                let filteredProducts = data.products;
                if (searchText.trim() !== "") {
                    // กรองข้อมูลสินค้าโดยใช้คำค้นหา
                    filteredProducts = filteredProducts.filter((product:any) => {
                        const search = searchText.toLowerCase();
                        const productName = product.productname ? product.productname.toLowerCase() : "";
                        const productDetail = product.productdetail ? product.productdetail.toLowerCase() : "";
                        return (
                            productName.includes(search) ||
                            productDetail.includes(search)
                        );
                    });
                }
                setproductsData(filteredProducts);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setIsLoading(false);
            });
    }, [searchText]);
    
    
    




    return (
        <>


            <div className="flex flex-wrap justify-center">
                {productGroups.map((group, index) => (
                    <div key={index} className="flex flex-wrap justify-center">
                        {group.map((products) => (
                            <div key={products.id} className="w-[300px] sm:w-[200px] md:w-[300px] lg:w-[200px] xl:w-[200px] p-1 mx-2 my-3">
                                <div className="relative bg-secondary1 text-white shadow-3xl p-4 rounded-lg overflow-hidden">
                                    <button className="absolute top-3 right-3 flex items-center justify-center rounded-full text-brand-500 hover:cursor-pointer">
                                        <div className="flex h-full w-full items-center justify-center rounded-full text-xl">
                                            <FiHeart className="hover:fill-red-500" />
                                        </div>
                                    </button>
                                    <Link key={products.id} href={`/products/${products.id}`} passHref>
                                    <img
                                        className="w-[150px] h-[150px] object-cover mx-auto"
                                        src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${products.productimg ? products.productimg : 'f701ce08-7ebe-4af2-c4ec-2b3967392900'
                                            }/public`}
                                        alt="indexActivity image" width={100} height={100}
                                    /> 

                                    <div className="mb-3 flex flex-col justify-between h-[120px]">
                                        <div>
                                            <p className="text-sm md:text-md text-navy-700 mt-2">{products.productname}</p>
                                            <p className="mt-1 text-xs md:text-sm md:mt-2 line-clamp-2">{products.productdetail}</p>
                                        </div>
                                        <div className="mt-2 flex justify-between">
                                            <p className="text-sm md:text-md font-bold text-brand-500">฿ {products.productprice}</p>
                                            <button onClick={toggleDropdown} className="linear bg-brand-900 px-4 py-2 text-xs text-white">
                                                {open ? <HiMiniCheck size={20} /> : <HiOutlineShoppingCart size={20} className="hover:fill-black" />}
                                            </button>
                                        </div>
                                    </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>









        </>
    );
};

export default CardProductAll;
