// import { Fragment, useRef, useState } from 'react'
// import { Dialog, Transition } from '@headlessui/react'
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
// import ReactPlayer from 'react-player';
// import Link from 'next/link';
// import { Appointment } from '@prisma/client';
// import useAxios from "axios-hooks";
// import { useRouter } from 'next/router';
// import React, { useEffect } from 'react';
// import axios from 'axios';

// export default function ModalRepair({ appointmentData }: any) {
//     const [open, setOpen] = useState(false)
//     const router = useRouter();
//     const cancelButtonRef = useRef(null)

//     const [
//         { loading: deleteappointmentLoading, error: deleteappointmentError },
//         executeappointmentDelete,
//     ] = useAxios({}, { manual: true });

//     const [filteredappointmentsData, setFilteredappointmentsData] = useState<
//         Appointment[]
//     >([]);
//     const deleteappointment = async (id: string): Promise<any> => {
//         try {
//             await executeappointmentDelete({
//                 url: "/api/appointment/" + id,
//                 method: "DELETE",
//             });

//             // ทำการรีเฟรชหน้าจอ
//             //router.reload();
//         } catch (error) {
//             console.error("Error deleting appointment:", error);
//         }
//     };

//     //รับคิวเชื่อมไอดีช่าง
//     const [UserData, setUserData] = useState({
//         fname: "",
//         lname: "",
//         tel: "",
//         email: "",
//         time: "",
//         userId: ""
//     });
//     const [fname, setFname] = useState<string>("");
//     const [lname, setLname] = useState<string>("");
//     const [tel, setTel] = useState<string>("");
//     const [time, setTime] = useState<string>("");
//     const [email, setEmail] = useState<string>("");
//     const [request, setRequest] = useState<string>("");
//     const [userId, setuserId] = useState<string>("");
//     const [isSuccess, setIsSuccess] = useState(false);
//     const [message, setMessage] = useState<string>("");
//     const [isLoading, setIsLoading] = useState(true);
//     const [repairmanId, setrepairmanId] = useState<string>("");
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [{ error: errorMessage, loading: IndexActivityLoading }, executeIndexActivity] = useAxios(
//         { url: '/api/appointment', method: 'POST' },
//         { manual: true }
//     )

//     const { id } = router.query; // ดึงค่า id จาก query parameters
//     const handleSubmit = async (e: { preventDefault: () => void }) => {
//         // e.preventDefault();

//         // ตั้งค่าเวลาเป็นวันที่ปัจจุบัน
//         const currentDate = new Date();

//         const formattedDate = currentDate.toISOString(); // ปรับรูปแบบตามต้องการ

//         // ส่งข้อมูลไปยัง API
//         try {
//             setIsLoading(true);
//             const response = await executeIndexActivity({
//                 data: {
//                      fname,
//                 lname,
//                 time: formattedDate,
//                 request,
//                 email,
//                 tel,
//                 userId,
//                 repairmanId,
//                 status: "อยู่ระหว่างการซ่อม",
//                 },
//             });
        

//             setIsSuccess(true);
//             setMessage("สำเร็จ! คุณได้ทำการรับคิวซ่อมเรียบร้อยแล้ว");
//             setIsModalOpen(true);
//         } catch (error) {
//             setIsSuccess(false);
//             setMessage("เกิดข้อผิดพลาดในการรับคิวซ่อม");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (id) {
//             fetch(`/api/user/${id}`)
//                 .then((response) => response.json())
//                 .then((data) => {
//                     console.log(data.id);
//                     setUserData(data);
//                     setFname(data.fname);
//                     setLname(data.lname);
//                     setTel(data.tel);
//                     setEmail(data.email);
//                     setRequest(data.request)
//                     setuserId(data.id)
//                     setTime(data.time)
//                     setrepairmanId(data.id)
//                     // setAddress(data);
//                     // console.log(data);

//                     setIsLoading(false); // ตั้งค่า isLoading เป็น false เมื่อโหลดเสร็จสมบูรณ์

//                 })
//                 .catch((error) => {
//                     console.error('Error:', error);
//                     setIsLoading(false); // ตั้งค่า isLoading เป็น false เมื่อโหลดเสร็จสมบูรณ์

//                 });

//         }
//     }, [id]);


//     //ถึงนี้
//     return (
//         <>
//             <button onClick={() => setOpen(true)}>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-file-description" width="32" height="32" viewBox="0 0 24 24" fill="none">
//                     <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
//                     <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
//                     <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
//                     <path d="M9 17h6"></path>
//                     <path d="M9 13h6"></path>
//                 </svg>
//             </button>

//             {open ? (
//                 <Transition.Root show={open} as={Fragment}>
//                     <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
//                         <Transition.Child
//                             as={Fragment}
//                             enter="ease-out duration-300"
//                             enterFrom="opacity-0"
//                             enterTo="opacity-100"
//                             leave="ease-in duration-200"
//                             leaveFrom="opacity-100"
//                             leaveTo="opacity-0"
//                         >
//                             <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//                         </Transition.Child>

//                         <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
//                             <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
//                                 <Transition.Child
//                                     as={Fragment}
//                                     enter="ease-out duration-300"
//                                     enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                                     enterTo="opacity-100 translate-y-0 sm:scale-100"
//                                     leave="ease-in duration-200"
//                                     leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//                                     leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                                 >
//                                     <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
//                                         <div className='m-10 space-y-2'>
//                                             <div className='grid grid-cols-12 grid-rows-2 space-x-1'>
//                                                 <p className='col-span-3 row-span-2 text-right'>ชื่ออุปกรณ์ซ่อม :</p>
//                                                 <p className='col-span-9 row-span-2 text-rose-500'><strong>{appointmentData.request}</strong></p>
//                                             </div>
//                                             <div className='grid grid-cols-12 grid-rows-2 space-x-1'>
//                                                 <p className='col-span-3 row-span-2 text-right'>ชื่อผู้ส่งซ่อม :</p>
//                                                 <p className='col-span-9 row-span-2  text-rose-500'><strong>{appointmentData.request} {appointmentData.lname}</strong></p>
//                                             </div>

//                                             {/* <div className='grid grid-cols-12 grid-rows-2 space-x-1'>
//                                                 <p className='col-span-3 row-span-2 text-right'>ราคา :</p>
//                                                 <p className='col-span-9 row-span-2'>250 บาท</p>
//                                             </div> */}
//                                             {/* <div className='grid grid-cols-12 grid-rows-2 space-x-1'>
//                                                 <p className='col-span-3 row-span-2 text-right'>วันที่จองคิวซ่อม </p>
//                                                 <p className='col-span-9 row-span-2 text-rose-500'> <strong>{new Date(appointmentData.time).toLocaleDateString('th-TH', {
//                                                     year: 'numeric',
//                                                     month: 'long',
//                                                     // month: 'long',
//                                                     day: 'numeric',
//                                                 })}</strong></p>
//                                             </div> */}
//                                             {/* <div className='grid grid-cols-12 grid-rows-2 space-x-1'>
//                                                 <p className='col-span-3 row-span-2 text-right'>หมายเลขคิวซ่อม :</p>
//                                                 <p className='col-span-9 row-span-2'>{appointmentData.id}</p>
//                                             </div> */}

//                                             <div className='grid grid-cols-12 grid-rows-2 space-x-1'>
//                                                 <p className='col-span-3 row-span-2 text-right'>วันที่จองซ่อม :</p>
//                                                 <p className='col-span-9 row-span-2 text-rose-500'>
//                                                     <strong>
//                                                         {new Date(appointmentData.time).toLocaleDateString('th-TH', {
//                                                             year: 'numeric',
//                                                             month: 'long',
//                                                             day: 'numeric',
//                                                         })}
//                                                     </strong>
//                                                 </p>

//                                             </div>
//                                             <div className='grid grid-cols-12 grid-rows-2 space-x-1'>
//                                                 <p className='col-span-3 row-span-2 text-right'>สถานะคำสั่งซื้อ :</p>
//                                                 <p className='col-span-9 row-span-2 text-rose-500'> <strong> {appointmentData.status} </strong></p>
//                                             </div>
//                                             <div className='grid grid-cols-12 grid-rows-2 space-x-1'>
//                                                 <p className='col-span-3 row-span-2 text-right'>ชื่อผู้ส่งซ่อม :</p>
//                                                 <p className='col-span-9 row-span-2  text-rose-500'><strong>{appointmentData.fname} {appointmentData.lname}</strong></p>
//                                             </div>
//                                             <div className='grid grid-cols-12 grid-rows-2 space-x-1'>
//                                                 <p className='col-span-3 row-span-2 text-right'>เบอร์โทรศัพท์ :</p>
//                                                 <p className='col-span-9 row-span-2  text-rose-500'><strong>{appointmentData.tel}</strong></p>
//                                             </div>
//                                             {/* <div className='grid grid-cols-12 grid-rows-2 space-x-1'>
//                                                 <p className='col-span-3 row-span-2 text-right'>ที่อยู่ :</p>
//                                                 <p className='col-span-9 row-span-2'>ร้านวันนี้ไม่มีขายพรุ่งนี้มาใหม่ บ้านเลขที่ 214/23 ซอยพัฒนาไทย ถนนพันธุระ ตำบลในเมือง อำเภอเมือง จังหวัดศรีษะเกษ 42150</p>
//                                             </div> */}

//                                             {/* ถ้ามีข้อมูล หรือ วีดีโอในฐานข้อมูลจะแสดงคำว่าดูวีดีโอ ถ้าไม่มีจะแสดงคำว่า ไม่มีวีดีโอ */}
//                                             <div className='grid grid-cols-12 grid-rows-2 space-x-1'>
//                                                 <p className='col-span-3 row-span-2 text-right'>วีดีโอ :</p>
//                                                 {appointmentData.video ? (
//                                                     <a href={appointmentData.video} target="_blank" className='col-span-9 row-span-2 text-rose-500'>
//                                                         <strong>ดูวีดีโอ</strong>
//                                                     </a>
//                                                 ) : (
//                                                     <p className='col-span-9 row-span-2 text-rose-500'>ไม่มีวีดีโอ</p>
//                                                 )}
//                                             </div>

//                                         </div>



//                                         {/* <div className='grid grid-cols-12 m-10'>
//                                             <div className=' text-right col-span-3 space-y-1'>
//                                                 <p>ชื่อสินค้า :</p>
//                                                 <p>ราคา :</p>
//                                                 <p>หมายเลขคำสั่งซื้อ : </p>
//                                                 <p>สถานะคำสั่งซื้อ :</p>
//                                                 <p>ชื่อผู้รับ :</p>
//                                                 <p>เบอร์โทรศัพท์ :</p>
//                                                 <p>ที่อยู่จัดส่ง :</p>
//                                             </div>

//                                             <div className='col-span-9 ml-2 space-y-1'>
//                                                 <p>KAKA K2SUPER คีย์บอร์ดที่ดีที่สุดสำหรับคนทำงาน</p>
//                                                 <p>250 บาท</p>
//                                                 <p>P0000003932 </p>
//                                                 <p>เตรียม</p>
//                                                 <p>ชัยวุฒิ ขันธีระพล</p>
//                                                 <p>09572827374</p>
//                                                 <p>บ้านเลขที่ 214/23 ถ.พันธุระ ต.ในเมือง อ.เมือง จ.ศรีษะเกษ 42150</p>
//                                             </div>

//                                         </div> */}


//                                         <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
//                                             <button
//                                                 onClick={() => deleteappointment(appointmentData.id)}
//                                                 className="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:text-black shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
//                                             >
//                                                 ยกเลิกการจองคิว
//                                             </button>
//                                             <button
//                                                 type="button"
//                                                 className="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:text-black shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
//                                                 onClick={() => setOpen(false)}
//                                                 ref={cancelButtonRef}
//                                             >
//                                                 ปิด
//                                             </button>
//                                             <button
//                                                 type="submit"
//                                                 disabled={isLoading}
//                                                  onClick={() => handleSubmit(appointmentData.id)}// เรียกใช้ฟังก์ชัน handleSubmit ในการตรวจสอบข้อมูล
//                                                 className="w-[200px] py-3 bg-[#FFCD4B] rounded-lg font-medium text-white uppercase focus:outline-none hover:bg-gray-700 hover:shadow-none"
//                                             >
//                                                 รับคิว
//                                             </button>
//                                         </div>
//                                     </Dialog.Panel>
//                                 </Transition.Child>
//                             </div>
//                         </div>
//                     </Dialog>
//                 </Transition.Root>
//             ) : null}
//         </>
//     )
// }