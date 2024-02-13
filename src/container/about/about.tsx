// import useAxios from "axios-hooks";
// import React, { useEffect, useState } from "react";
// import { About } from "@prisma/client";

// const AboutPage: React.FC = (props) => {

//     const [{ data: aboutData }, getAbout] = useAxios({
//         url: "/api/about",
//         method: "GET",
//     });

//     const [filteredaboutData, setFilteredAboutData] = useState<About[]>([]);

//     useEffect(() => {
//         setFilteredAboutData(aboutData?.about ?? []);
//     }, [aboutData]);

//     return (
//         <>
//             <div className='mb-10 relative bg-fixed'>
//              <img src="../images/imgslider/banner4.jpg" className='w-full md:h-[640px] ' alt="" />
//                 <div className="absolute text-white text-center md:top-2/4 md:left-32 p-12 rounded-lg ">
//                     <h2 className="hidden md:block text-7xl font-semibold text-white">เกี่ยวกับเรา</h2>
//                 </div>
//             </div>

//             {filteredaboutData.map((about) => (
//                 <div className="container mx-auto my-24">
//                     <div className="text-center">
//                         <div className="w-64 h-1 bg-gradient-to-r from-[#CA0808] to-[#0FC0E7] mx-auto mb-10"></div>
//                         <div className="text-blue-950 text-2xl md:text-5xl font-bold">
//                             รู้จัก&nbsp;
//                             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f04208] to-[#f5997a]">
//                                 &quot;{about.title}&quot;
//                             </span>
//                         </div>

//                     </div>
//                     <div className="bg-[#1E293B] p-3 md:p-6 rounded-lg w-11/12 lg:w-2/3 h-auto mx-auto mt-10">
//                         <div className="md:flex justify-between items-center gap-8">
//                             <div>
//                                 <img
//                                     className='w-28 md:w-72 mx-auto'
//                                     src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${about.imgLogo}/public`}
//                                     alt="Picture of the Logo"
//                                 />
//                             </div>
//                             <div className='md:col-span-2'>
//                                 <p className='text-lg text-secondary2 text-center md:text-left my-5'>ทำความรู้จัก</p>
//                                 <div className='flex items-end'>
//                                     <h3 className='text-xl md:text-4xl font-semibold text-orange-500'
//                                     > {about.title}
//                                     </h3>

//                                 </div>

//                                 <div className='text-secondary2 text-sm md:text-base md:mt-5'>
//                                     {about.description}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="flex flex-row flex-nowrap items-center my-8">
//                         <span className="flex-grow block border-t border-blue-950" aria-hidden="true" role="presentation"></span>
//                         <span className="flex-none block mx-4   px-4 py-2.5 text-xs leading-none font-medium uppercase text-blue-950">
//                             Our Team
//                         </span>
//                         <span className="flex-grow block border-t border-blue-950" aria-hidden="true" role="presentation"></span>
//                     </div>
// {/* 
//                     <RepairmanCard /> */}

//                     <div className="grid grid-flow-row lg:grid-cols-12 gap-5 mt-10">
//                         <div className="lg:col-span-7 mx-3 bg-secondary1 rounded-lg drop-shadow-lg">
//                             <div className="p-5">
//                                 <h4 className="text-xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#081FF0] via-sky-300 to-[#13D1D1] mb-5">{about.title}</h4>
//                                 <p className="text-[#F4F5F5] flex gap-3 mt-2 text-sm md:text-base">
//                                     <strong>Address:</strong> {about.Address}
//                                 </p>
//                                 <p className="text-[#F4F5F5] flex gap-3 mt-2 text-sm md:text-base">
//                                     <strong>Email:</strong> {about.email}
//                                 </p>
//                                 <p className="text-[#F4F5F5] flex gap-3 mt-2 text-sm md:text-base">
//                                     <strong>Phone:</strong>{about.phoneOne}, {about.phoneTwo}
//                                 </p>
//                                 <p className="text-[#F4F5F5] flex gap-3 mt-2 text-sm md:text-base">
//                                     <strong>Facebook:</strong>
//                                 </p>
//                                 <p className="text-[#F4F5F5] flex gap-3 mt-2 text-sm md:text-base">
//                                     <strong>Line:</strong>
//                                 </p>

//                             </div>
//                             {/* <div className="absolute hidden lg:block w-1 h-464 bg-gradient-to-b from-[#CA0808] to-[#0FC0E7] mx-auto mb-10 mt-24 right-0 -inset-y-1"></div> */}

//                         </div>
//                         <div className="lg:col-span-5 mx-8">
//                             <iframe className="rounded-lg w-full drop-shadow-lg"
//                                 src={`${about.linkmap}`}
//                                 height="400"
//                                 loading="lazy"
//                                 referrerPolicy="no-referrer-when-downgrade">
//                             </iframe>
//                         </div>
//                     </div>


//                 </div>
//             ))}
//         </>
//     )
// }
// export default AboutPage;