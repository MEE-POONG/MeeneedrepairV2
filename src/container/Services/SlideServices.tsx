// import React, { useRef, useState } from 'react';
// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import 'swiper/css/effect-fade'; // เพิ่ม CSS effect-fade



// // import required modules
// import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// export default function SlideServices() {

//     const [img1, setImg1] = useState('./images/banner 1.png'); // รูปภาพเริ่มต้น
//     const [img2, setImg2] = useState('./images/banner 2.png');

//     return (
//         <>
//             <div className='slidestyles'>
//                 <Swiper
//                     spaceBetween={30}
//                     centeredSlides={true}
//                     loop={true}
//                     autoplay={{
//                         delay: 2500,
//                         disableOnInteraction: false,
//                     }}
//                     pagination={{
//                         clickable: true,
//                     }}
//                     navigation={true}
//                     modules={[Autoplay, Pagination, Navigation]}
//                     className="mySwiper"
//                 >

//                     <SwiperSlide className="relative">
//                         <img src={img1} alt="img1" className="absolute inset-0 w-full h-full object-cover blur-xl" />
//                         <img src={img1} alt="img1" className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_1.2px_10px_rgba(0,0,0,0.8)]" />
//                         <h1 className="absolute md:text-2xl bottom-0 left-0 text-white p-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
//                         </h1>
//                         <h1 className="absolute md:text-2xl bottom-0 right-0 text-white p-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
//                         </h1>
//                     </SwiperSlide>

//                     <SwiperSlide className="relative">
//                         <img src={img2} alt="img2" className="absolute inset-0 w-full h-full object-cover blur-xl" />
//                         <img src={img2} alt="img2" className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_1.2px_10px_rgba(0,0,0,0.8)]" />
//                         <h1 className="absolute md:text-2xl bottom-0 left-0 text-white p-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
//                         </h1>
//                         <h1 className="absolute md:text-2xl bottom-0 right-0 text-white p-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
//                         </h1>
//                     </SwiperSlide>
//                 </Swiper>
//             </div>
//         </>
//     );
// }
