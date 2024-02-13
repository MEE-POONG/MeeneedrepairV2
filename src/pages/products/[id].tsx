// import Link from "next/link";
// import React, { useState, useEffect, useRef, CSSProperties } from 'react';
// import { useRouter } from 'next/router';
// import { FiHeart, FiSearch } from "react-icons/fi";
// import { AiOutlineShareAlt, AiOutlineArrowUp } from "react-icons/ai";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/free-mode';
// import 'swiper/css/navigation';
// import 'swiper/css/thumbs';
// import RootLayout from "@/components/Layout";

// const ReadProductsDetail: React.FC = (props) => {
//     const router = useRouter();
//     const { id } = router.query; // ดึงค่า id จาก query parameters

//     const [productsData, setProductsData] = useState<any>({}); // กำหนดประเภทของข้อมูลบทความข่าว
//     const [isLoading, setIsLoading] = useState(true);

//     const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
//     // const [productimg, setproductimg] = useState(`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${productsData.productimg}/public`); 
//     // const [productimg1, setproductimg1] = useState(`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${productsData.productimg1}/public`);
//     const [count, setCount] = useState(1);
//     const incrementCount = () => {
//         // Update state with incremented value
//         setCount(count + 1);
//     };
//     const deincrementCount = () => {
//         // Update state with incremented value
//         if (count > 1) {
//             setCount(count - 1);
//         }
//         else {

//         }

//     };
//     const toggleFavorite = () => {
//         setFavorite(!favorite);
//     };

//     const [favorite, setFavorite] = useState(false);

//     useEffect(() => {
//         if (id) {
//             fetch(`/api/products/${id}`)
//                 .then((response) => response.json())
//                 .then((data) => {
//                     setProductsData(data); // กำหนดข้อมูลบทความข่าวที่ดึงมา
//                     //console.log(data);
//                     setIsLoading(false); // ตั้งค่า isLoading เป็น false เมื่อโหลดเสร็จสมบูรณ์

//                 })
//                 .catch((error) => {
//                     console.error('Error:', error);
//                     setIsLoading(false); // ตั้งค่า isLoading เป็น false เมื่อโหลดเสร็จสมบูรณ์

//                 });
//         }
//     }, [id]);

//     return (
//         <RootLayout loggedInUser="">
//             <div className="container mx-auto"
//             >
//                 <div>

//                     {/* <img className=" h-[300px]md:h-[567px] object-cover" src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${productsData.productimg}/public`} alt={productsData.productimg} /> */}

//                     <div className="grid grid-cols-1 lg:grid-cols-2">
//                         <div className='slideproduct'>
//                             <Swiper
//                                 style={{
//                                     '--swiper-navigation-color': '#fff',
//                                     '--swiper-pagination-color': '#fff',
//                                 } as CSSProperties}
//                                 loop={true}
//                                 autoplay={{
//                                     delay: 2500,
//                                     disableOnInteraction: false,
//                                 }}
//                                 spaceBetween={10}
//                                 navigation={true}
//                                 thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}

//                                 modules={[Autoplay, FreeMode, Navigation, Thumbs]}
//                                 className="mySwiper2"
//                             >
//                                 <SwiperSlide >

//                                  <img src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${productsData.productimg}/public`} alt={productsData.productimg} />
//                                 </SwiperSlide>

//                                 <SwiperSlide>

//                                  <img src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${productsData.productimg1}/public`} alt={productsData.productimg1} />
//                                 </SwiperSlide>

//                                 <SwiperSlide >

//                                  <img src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${productsData.productimg}/public`} alt={productsData.productimg} />
//                                 </SwiperSlide>

//                                 <SwiperSlide>

//                                  <img src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${productsData.productimg1}/public`} alt={productsData.productimg1} />
//                                 </SwiperSlide>


//                             </Swiper>
//                             {/* <img src={img1} alt="img2" className="" /> */}
//                             <Swiper
//                                 onSwiper={setThumbsSwiper}
//                                 loop={true}
//                                 spaceBetween={10}
//                                 slidesPerView={4}
//                                 freeMode={true}
//                                 watchSlidesProgress={true}
//                                 modules={[FreeMode, Navigation, Thumbs]}
//                                 className="mySwiper"
//                             >

//                                 <SwiperSlide>
//                                     {/* <img src={img1} alt="img1" className="" /> */}
//                                  <img className=" " src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${productsData.productimg}/public`} alt={productsData.productimg} />


//                                 </SwiperSlide>

//                                 <SwiperSlide>

//                                  <img className="" src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${productsData.productimg1}/public`} alt={productsData.productimg1} />
//                                 </SwiperSlide>

//                                 <SwiperSlide >

//                                  <img src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${productsData.productimg}/public`} alt={productsData.productimg} />
//                                 </SwiperSlide>

//                                 <SwiperSlide>

//                                  <img src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${productsData.productimg1}/public`} alt={productsData.productimg1} />
//                                 </SwiperSlide>

//                                 {/* 
//                             <SwiperSlide className="flex">
//                              <img className="w-[100px] h-[100px]" src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${productsData.productimg}/public`} alt={productsData.productimg} />
//                              <img className="w-[100px] h-[100px]" src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${productsData.productimg1}/public`} alt={productsData.productimg1} />
//                             </SwiperSlide> */}


//                             </Swiper>





//                         </div>

//                         <div className="text-secondary2 m-10">
//                             <p className="text-4xl">ชื่อสินค้า</p>
//                             <div className="flex space-x-5 mt-5 mb-10">
//                                 <p className="text-xl ">แบรนด์: ชื่อแบรนด์</p>
//                                 <p className="text-xl">รหัสสินค้า: XXX25185</p>
//                             </div>
//                             <p className="text-xl ">อธิบายเกี่ยวกับสินค้า</p>
//                             <p className="text-bas mt-5 mb-10">ไร้สาย LIGHTSPEED สำหรับทุกคน
//                                 ระบบไร้สาย LIGHTSPEED เจเนอเรชันใหม่พร้อมสำหรับคอเกมทุกคนแล้ว
//                                 G304 คือเมาส์เกมมิ่งไร้สาย LIGHTSPEED ที่ที่ได้รับการออกแบบมาเพื่อมอบประสิทธิภาพอย่างแท้จริงด้วยนวัตกรรมทางเทคโนโลยีล่าสุดในราคาที่ย่อมเยา
//                                 เซ็นเซอร์
//                                 ความละเอียด 12,000 DPI, ประสิทธิภาพดีขึ้น 10 เท่า
//                                 เซ็นเซอร์ HERO คือเซ็นเซอร์ออปติคอลเจเนอเรชันใหม่สำหรับการเล่นเกมจาก Logitech Logitech G ที่มีทั้งประสิทธิภาพอันน่าทึ่งและความสามารถที่ไม่มีใครเทียบได้ เพราะในการเล่นเกมด้วยระบบไร้สาย ไม่มีคำว่าประนีประนอม กำหนด DPI ได้ตั้งแต่ 200 - 12,000 และบันทึกได้สูงสุด 5 โปรไฟล์บนหน่วยความจำออนบอร์ด1
//                             </p>
//                             {/* <p className="text-xl my-5">คุณสมบัติ</p> */}
//                             <ul className="text-base list-disc p-10">
//                                 <li >Bluetooth Headphones</li>
//                                 <li>20 Hz - 20 KHz</li>
//                                 <li>40mm Neodymium</li>
//                             </ul>


//                             <p className="text-3xl text-[#18BCEB] my-10">฿890</p>

//                             <div className="text-xl flex">
//                                 <p className="mr-5">จำนวน</p>
//                                 <button onClick={incrementCount}>+</button>
//                                 <input type="number" value={count} className="mx-3 text-black text-center w-14 rounded-lg" readOnly />
//                                 <button onClick={deincrementCount}>-</button>
//                             </div>

//                             <div className="space-x-5 my-5 flex justify-center">
//                                 <button className="bg-[#A2E1F3] w-32 h-16 md:w-48 xl:w-52 xl:h-20  text-xl text-black rounded-xl ring-2 hover:ring-[#18BCEB]">หยิบใส่ตะกร้า</button>
//                                 <button className="bg-[#18BCEB] w-32 h-16 md:w-48 xl:w-52 xl:h-20 text-xl text-black rounded-xl ring-2 hover:ring-[#18BCEB]">ซื้อสินค้า</button>
//                             </div>


//                             <div className="flex space-x-2 justify-between">


//                                 <div className="flex space-x-2">
//                                     <button onClick={toggleFavorite}>
//                                         {favorite ? (
//                                             <FiHeart className="text-3xl fill-red-500 hover:fill-transparent text-red-500" />
//                                         ) : (
//                                             <FiHeart className="text-3xl hover:fill-red-500 text-red-500" />
//                                         )}
//                                     </button>
//                                     <p className=" self-center">เพิ่มในรายการโปรด</p>
//                                 </div>

//                                 <div className="flex space-x-2">
//                                     <button>
//                                         <AiOutlineShareAlt className="text-3xl" />
//                                     </button>
//                                     <p className=" self-center">แชร์</p>
//                                 </div>

//                             </div>

//                         </div>
//                     </div>


//                     <p className="text-[#FFCD4B] font-bold text-3xl my-10">คุณสมบัติสินค้า</p>

//                     <div className="grid place-items-center space-y-5">
//                      <img src="https://i.imgur.com/Gn1CojE.png" alt="" />
//                      <img src="https://www.jib.co.th/img_master/uploads/Aoy/Xiaomi/x1.jpg" alt="" />
//                      <img src="https://www.jib.co.th/img_master/uploads/Aoy/Xiaomi/x2.jpg" alt="" />

//                     </div>




//                     <div className="flex justify-center my-24">
//                         <button className="bg-[#18BCEB] rounded-lg w-48 h-16 text-2xl text-secondary2 flex items-center justify-center gap-x-2 "
//                         onClick={() => {
//                             window.scrollTo({
//                               top: 0,
//                               behavior: 'smooth',
//                             });
//                           }}>
//                             <AiOutlineArrowUp />
//                             <p>กลับสู่ด้านบน</p>
//                         </button>
//                     </div>

//                     <div className="mt-8 mx-4 xl:mx-0">
//                         <h4 className="text-2xl md:text-4xl font-semibold text-white">{productsData.title}</h4>
//                         <div className="flex mt-8 gap-10">
//                             <div className="flex items-center gap-2">
//                                 <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 50 50" fill="none">
//                                     <path d="M39.5834 8.33317H35.4167V6.24984C35.4167 5.6973 35.1973 5.1674 34.8066 4.7767C34.4159 4.386 33.886 4.1665 33.3334 4.1665C32.7809 4.1665 32.251 4.386 31.8603 4.7767C31.4696 5.1674 31.2501 5.6973 31.2501 6.24984V8.33317H18.7501V6.24984C18.7501 5.6973 18.5306 5.1674 18.1399 4.7767C17.7492 4.386 17.2193 4.1665 16.6667 4.1665C16.1142 4.1665 15.5843 4.386 15.1936 4.7767C14.8029 5.1674 14.5834 5.6973 14.5834 6.24984V8.33317H10.4167C8.75915 8.33317 7.16943 8.99165 5.99733 10.1638C4.82523 11.3359 4.16675 12.9256 4.16675 14.5832V39.5832C4.16675 41.2408 4.82523 42.8305 5.99733 44.0026C7.16943 45.1747 8.75915 45.8332 10.4167 45.8332H39.5834C41.241 45.8332 42.8307 45.1747 44.0028 44.0026C45.1749 42.8305 45.8334 41.2408 45.8334 39.5832V14.5832C45.8334 12.9256 45.1749 11.3359 44.0028 10.1638C42.8307 8.99165 41.241 8.33317 39.5834 8.33317ZM41.6668 39.5832C41.6668 40.1357 41.4473 40.6656 41.0566 41.0563C40.6659 41.447 40.136 41.6665 39.5834 41.6665H10.4167C9.86421 41.6665 9.33431 41.447 8.94361 41.0563C8.55291 40.6656 8.33342 40.1357 8.33342 39.5832V24.9998H41.6668V39.5832ZM41.6668 20.8332H8.33342V14.5832C8.33342 14.0306 8.55291 13.5007 8.94361 13.11C9.33431 12.7193 9.86421 12.4998 10.4167 12.4998H14.5834V14.5832C14.5834 15.1357 14.8029 15.6656 15.1936 16.0563C15.5843 16.447 16.1142 16.6665 16.6667 16.6665C17.2193 16.6665 17.7492 16.447 18.1399 16.0563C18.5306 15.6656 18.7501 15.1357 18.7501 14.5832V12.4998H31.2501V14.5832C31.2501 15.1357 31.4696 15.6656 31.8603 16.0563C32.251 16.447 32.7809 16.6665 33.3334 16.6665C33.886 16.6665 34.4159 16.447 34.8066 16.0563C35.1973 15.6656 35.4167 15.1357 35.4167 14.5832V12.4998H39.5834C40.136 12.4998 40.6659 12.7193 41.0566 13.11C41.4473 13.5007 41.6668 14.0306 41.6668 14.5832V20.8332Z" fill="url(#paint0_linear_363_180)" />
//                                     <defs>
//                                         <linearGradient id="paint0_linear_363_180" x1="0.694526" y1="24.9998" x2="40.1042" y2="24.9998" gradientUnits="userSpaceOnUse">
//                                             <stop stopColor="#081FF0" />
//                                             <stop offset="1" stopColor="#13D1D1" />
//                                         </linearGradient>
//                                     </defs>
//                                 </svg>
//                                 <span className="text-amber-400">{productsData.date}</span>
//                             </div>

//                             <div className="flex items-center gap-2">
//                                 <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 50 50" fill="none">
//                                     <path d="M22.619 41.6665H41.6666M36.9047 15.476L39.2856 17.8569M40.4761 9.52361C40.9452 9.99256 41.3173 10.5493 41.5712 11.1621C41.8251 11.7749 41.9558 12.4317 41.9558 13.095C41.9558 13.7583 41.8251 14.4151 41.5712 15.0279C41.3173 15.6407 40.9452 16.1975 40.4761 16.6665L17.8571 39.2855L8.33325 41.6665L10.7142 32.276L33.3428 9.53313C34.2347 8.63687 35.431 8.10876 36.6942 8.05362C37.9574 7.99849 39.1952 8.42037 40.1618 9.23551L40.4761 9.52361Z" stroke="#F4F5F5" strokeLinecap="round" strokeLinejoin="round" />
//                                 </svg>
//                                 <span className="text-cyan-600"> {productsData.author}</span>
//                             </div>

//                             <div className=" text-white flex items-center gap-2"> อ้างอิง :
//                                 {productsData.refer}
//                             </div>



//                         </div>
//                     </div>

//                     {/* Content Detail  */}
//                     <div className="xl:grid xl:grid-cols-9 xl:gap-6 mx-4 xl:mx-0">

//                         {/* Left Content */}
//                         <div className="col-span-7 bg-[#F4F5F5] mt-10 rounded-lg">
//                             <div className="py-16">
//                                 {/* <img
//                                     className="w-[726px] px-2 md:px-0 mx-auto rounded-sm drop-shadow-lg"
//                                     src="https://images.yourstory.com/cs/wordpress/2017/02/52-Blog.jpg?w=1152&fm=auto&ar=2:1&mode=crop&crop=faces"
//                                     alt=""
//                                 /> */}
//                              <img className="w-[726px] px-2 md:px-0 mx-auto rounded-sm drop-shadow-lg" src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${productsData.img}/public`} alt={productsData.img} />
//                                 <article className="prose lg:prose-md md:mx-auto mt-8 px-2 md:px-0">
//                                     <h1>{productsData.subtitle}</h1>
//                                     <p>
//                                         {productsData.detail}
//                                     </p>
//                                 </article>


//                             </div>
//                         </div>


//                     </div>
//                 </div>

//             </div>
//         </RootLayout>
//     )
// }
// export default ReadProductsDetail;