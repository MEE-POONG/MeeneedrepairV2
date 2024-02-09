
import React, { useState, useEffect } from 'react';
import useAxios from "axios-hooks";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import SelectAddress from './address';
import RootLayout from '@/components/Layout';
import Image from 'next/image';

const Payment: React.FC = (props) => {

    useEffect(() => {
        const fetchData = async () => {
            const userDataFromCookies = Cookies.get('user');
            if (userDataFromCookies) {
                try {
                    const parsedUser = JSON.parse(userDataFromCookies);
                    setLoggedInUser(parsedUser);
                } catch (error) {
                    console.error('Error parsing user data:', error);
                }
            }
        };

        fetchData();
    }, []);

    const [{ error: errorMessage, loading: IndexActivityLoading }, executeIndexActivity] = useAxios(
        { url: '/api/appointment', method: 'POST' },
        { manual: true }
    )
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [fname, setFname] = useState<string>("");
    const [lname, setLname] = useState<string>("");
    const [tel, setTel] = useState<string>("");
    const [time, setTime] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [request, setRequest] = useState<string>("");
    const [userId, setUserId] = useState<string>("");


    const [UserAddressData, setUserAddressData] = useState<any>({});
    const [addressId, setSelectedAddressId] = useState<string | null>(null);
    const [taxaddress, setSelectedTaxAddress] = useState<string | null>(null);
    const [CurrentAddress, setCurrentAddress] = useState<any>({});
    const [selectedAddress, setSelectedAddress] = useState<any | null>(null)


    const [loggedInUser, setLoggedInUser] = useState<any>(null);
    const [message, setMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [isMissingModalOpen, setIsMissingModalOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (loggedInUser) {
            // ให้ทำการตั้งค่า state ต่าง ๆ ด้วยข้อมูลที่ได้จาก loggedInUser
            setFname(loggedInUser.fname || ""); // ตั้งค่าเป็นค่า fname หรือว่าเป็นค่าว่างถ้าไม่มี
            setLname(loggedInUser.lname || "");
            setTel(loggedInUser.tel || "");
            setEmail(loggedInUser.email || "");
            setUserId(loggedInUser.id || "");

            // ... (ตั้งค่า state อื่น ๆ ตามต้องการ)
        }
    }, [loggedInUser])

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        console.log(addressId);


        // ตรวจสอบว่าข้อมูลถูกกรอกครบถ้วน
        // if (!fname || !lname || !tel || !email || !time || !request || !message ) {
        //     // ถ้าข้อมูลไม่ครบถ้วน ให้แสดง modal แจ้งเตือน
        //     setIsMissingModalOpen(true);
        //     return;
        // }

        // ส่งข้อมูลไปยัง API
        try {
            setIsLoading(true);
            const response = await executeIndexActivity({
                data: {
                    fname,
                    lname,
                    tel,
                    email,
                    time,
                    request,
                    userId,
                    status: "กำลังดำเนินการ",
                    message,
                    addressId

                    // UserAddressData
                    // เพิ่มข้อมูลอื่น ๆ ตามที่ต้องการ
                },
            });

            // ประมวลผลเมื่อสำเร็จ
            setIsLoading(false);
            setIsSuccess(true);
            setMessage("สำเร็จ! คุณได้ทำการจองคิวเรียบร้อยแล้ว");

            // setIsModalOpen(true);
        } catch (error) {
            // ประมวลผลเมื่อเกิดข้อผิดพลาด
            setIsLoading(false);
            setIsSuccess(false);
            setMessage("เกิดข้อผิดพลาดในการจองคิว");
            console.error('Error:', error);
        }
    };


    // เรียกใช้งานฟังก์ชันเมื่อกดปุ่ม "จองคิว"
    // const handleOpenModal = () => {
    //     setIsModalOpen(true);
    // };

    // // เรียกใช้งานฟังก์ชันเมื่อกดปุ่ม "ยกเลิก"
    // const handleCloseModal = () => {

    //     window.location.reload();
    //     setIsModalOpen(false);
    // };
    // const handleConfirm = () => {

    //     window.location.reload();
    //     // ทำสิ่งที่คุณต้องการเมื่อยืนยัน
    //     // ตัวอย่าง: ปิด Modal
    //     setIsModalOpen(false);

    // };

    const [UserData, setUserData] = useState({
        fname: "",
        lname: "",
        tel: "",
        email: "",
        id: ""
    });
    useEffect(() => {
        if (userId) {
            fetch(`/api/user/address/${userId}`)
                .then((response) => response.json())
                .then((data) => {
                    const foundAddress = data.Address.find((address: { id: string; }) => address.id === addressId);

                    if (foundAddress) {
                        setCurrentAddress(foundAddress);
                        setSelectedAddress(foundAddress);
                    }

                    setUserAddressData(data.Address);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setIsLoading(false);
                });
        }
    }, [userId, addressId]);

    useEffect(() => {
        if (userId) {
            fetch(`/api/user/${userId}`)
                .then((response) => response.json())
                .then((data) => {
                    // console.log(data.id);
                    setUserData(data);
                    setFname(data.fname);
                    setLname(data.lname);
                    setTel(data.tel);
                    setEmail(data.email);
                    setRequest(data.request);
                    setUserId(data.id);
                    // setAddress(data);
                    // console.log(data);

                    setIsLoading(false); // ตั้งค่า isLoading เป็น false เมื่อโหลดเสร็จสมบูรณ์

                })
                .catch((error) => {
                    console.error('Error:', error);
                    setIsLoading(false); // ตั้งค่า isLoading เป็น false เมื่อโหลดเสร็จสมบูรณ์

                });

        }
    }, [userId]);

    return (

        <RootLayout loggedInUser="">
            <>
                <div className='mt-[140px] text-3xl'>การชำระเงิน</div>
                <div className='grid grid-cols-5'>
                    <div className="col-start-2 justify-center items-center min-h-screen ">
                        <div className=" w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-auto ">
                            <div className='text-xl'>ที่อยู่จัดส่ง</div>
                            <div className="w-full h-0.5 bg-black mx-auto mt-5"></div>
                            <div className='mt-3'>
                                <SelectAddress UserAddressData={UserAddressData} onSelectAddress={(addressId) => setSelectedAddressId(addressId)} />
                            </div>
                            <div className='text-xl mt-5'>ที่อยู่ออกใบกำกับภาษี</div>
                            <div className=' mt-2 my-5'>
                                <input id="remember_me" name="remember_me" type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-4" />
                                <label className=" text-base font-medium mx-1 text-gray-700 ">
                                    ที่อยู่เดียวกับจัดส่ง
                                </label>

                            </div>
                            <form >
                                <div className="flex  " >
                                    <div className="relative mb-6 mr-6" data-te-input-wrapper-init>
                                        <div className='mb-2'>ชื่อ</div>
                                        <input
                                            type="text" value={fname} onChange={(e) => setFname(e.target.value)}
                                            className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-10 resize-none"
                                            placeholder="ชื่อ"
                                        />
                                    </div>
                                    <div className="relative mb-6 mr-6" data-te-input-wrapper-init>
                                        <div className='mb-2 '>นามสกุล</div>
                                        <input
                                            type="text" value={lname} onChange={(e) => setLname(e.target.value)}
                                            className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-10 resize-none"
                                            id="exampleFormControlInput3"
                                            placeholder="นามสกุล" />

                                    </div>



                                    <div className="relative " data-te-input-wrapper-init>
                                        <div className='mb-2'>เบอร์โทร</div>
                                        <input
                                            type="number" value={tel} onChange={(e) => setTel(e.target.value)}
                                            className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-10 resize-none"
                                            id="exampleFormControlInput3"
                                            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                            placeholder="เบอร์โทรติดต่อ" />

                                    </div>
                                </div>

                                <div className="col-span-12 mb-6">
                                    <p className="text-[#666363] ">ที่อยู่</p>
                                    <input
                                        placeholder="ที่อยู่"
                                        type="text"
                                        className=" w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-10 resize-none"
                                    // onChange={(e) => setAddressLine(e.target.value)}
                                    />
                                </div>

                                <div className="col-span-12 md:col-span-6">
                                    <p className="text-[#666363] my-2">รหัสไปรษณีย์</p>
                                    <input
                                        placeholder="รหัสไปรษณีย์"
                                        //  value={ZipCode.toString()}
                                        type="text"
                                        className=" w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-10 resize-none"
                                    // onChange={(e) => setZipCode(e.target.value)}
                                    />
                                </div>

                                <div className="col-span-12 md:col-span-6">
                                    <p className="text-[#666363] my-2">จังหวัด</p>
                                    <select
                                        className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded  px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-10 resize-none "
                                    // onChange={(e) => { setProvince(e.target.value); handleProvinceChange(e); }}
                                    >
                                        <option value="" disabled selected hidden className="text-slate-500 ">กรุณาเลือกจังหวัด</option>
                                        {/* {provinces.map((province) => (
                                        <option key={province.id} value={province.name_th}>
                                            {province.name_th}
                                        </option>
                                    ))} */}
                                    </select>
                                </div>

                                <div className="col-span-12 md:col-span-6">
                                    <p className="text-[#666363] my-2">อำเภอ/เขต</p>
                                    <select
                                        className=" w-full bg-gray-200 text-gray-700 border border-gray-200 rounded  px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-10 resize-none "
                                    // onChange={(e) => {setDistrict(e.target.value); handleDistrictChange(e)}}

                                    >
                                        <option value="" disabled selected hidden className="text-gray-500">กรุณาเลือกอำเภอ/เขต</option>
                                        {/* {districts.map((district) => (
                                        <option key={district.id} value={district.name_th}>
                                            {district.name_th}
                                        </option>
                                    ))} */}
                                    </select>
                                </div>

                                <div className="col-span-12 md:col-span-6">
                                    <p className="text-[#666363] my-2">ตำบล/แขวง</p>
                                    <select
                                        className=" w-full bg-gray-200 text-gray-700 border border-gray-200 rounded  px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-10 resize-none"
                                    // onChange={(e) => { setSubDistrict(e.target.value);handleSubDistrictChange(e) }} 

                                    >
                                        <option value="" disabled selected hidden className="text-gray-500">กรุณาเลือกตำบล</option>
                                        {/* {subdistricts.map((subdistrict) => (
                                        <option key={subdistrict.id} value={subdistrict.name_th}>
                                            {subdistrict.name_th}
                                        </option>
                                    ))} */}
                                    </select>
                                </div>

                                <div className="flex justify-center mt-6">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        onClick={handleSubmit} // เรียกใช้ฟังก์ชัน handleSubmit ในการตรวจสอบข้อมูล
                                        className="w-[200px] py-3 bg-[#FFCD4B] rounded-lg font-medium text-white uppercase focus:outline-none hover:bg-gray-700 hover:shadow-none"
                                    >
                                        ยืนยันคำสั่งซื้อ
                                    </button>
                                </div>

                                {/* Modal แจ้งเตือน */}
                                {isMissingModalOpen && (
                                    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75">
                                        <div className="bg-white p-6 rounded-lg text-center">
                                            <p className="text-red-500 text-lg mb-4">กรุณากรอกข้อมูลให้ครบถ้วน</p>
                                            <button
                                                onClick={() => setIsMissingModalOpen(false)}
                                                className="px-4 py-2 bg-red-500 text-white rounded-md focus:outline-none"
                                            >
                                                ปิด
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {/* {isModalOpen && (
                                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
                                    <div className="bg-white p-6 rounded-lg">
                                        <p className="text-2xl font-semibold mb-4">ยืนยันการจองคิว</p>
                                        <p>คุณต้องการจองคิวหรือไม่?</p>
                                        <div className="mt-4 flex justify-end">
                                            <button
                                                onClick={handleCloseModal} // เรียกใช้งานเมื่อกดปุ่ม "ยกเลิก"
                                                className="px-4 py-2 bg-red-500 text-white rounded-md mr-2"
                                            >
                                                ยกเลิก
                                            </button>
                                            <button
                                                onClick={handleConfirm} // เรียกใช้งานเมื่อกดปุ่ม "ยืนยัน"
                                                className="px-4 py-2 bg-green-500 text-white rounded-md"
                                            >
                                                ยืนยัน
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )} */}
                            </form>

                        </div>
                    </div>
                    <div className='col-start-3 text-xl ps-36'>
                        <div>วิธีการชำระเงิน</div>
                        <div className="w-full h-0.5 bg-black mx-auto mt-5"></div>
                        <input id="remember_me" name="remember_me" type="checkbox"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-4" />
                        <label className=" text-base font-medium mx-1 text-gray-700 ">
                            โอนผ่าน mobile banking
                        </label>

                        <div className='flex'>
                            <Image
                                className='w-[60px] pt-5 '
                                src="/images/kbank.png"
                                alt="indexActivity image" width={100} height={100}
                            />
                            <p className='text-sm mt-5 ml-3'> บัญชี ธนาคาร กสิกร ไทย
                                <span className='text-sm '> 11-111-1111</span>
                                <span className='text-sm'>นาย ดุกดุ๋ย ดุ๊กดิ๊ก</span>
                            </p>

                        </div>
                        <div className='flex'>
                            <Image
                                className='w-[60px] pt-5 '
                                src="/images/bank.png"
                                alt="indexActivity image" width={100} height={100}
                            />
                            <p className='text-sm mt-5 ml-3'> บัญชี ธนาคาร กสิกร ไทย
                                <span className='text-sm '> 11-111-1111 </span>
                                <span className='text-sm'>นาย ดุกดุ๋ย ดุ๊กดิ๊ก</span>
                            </p>
                        </div>
                        <input id="remember_me" name="remember_me" type="checkbox"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-4" />
                        <label className=" text-base font-medium mx-1 text-gray-700 ">
                            คิวอาร์โค้ด
                        </label>
                    </div>

                    <div className='col-start-4 text-xl ps-28'>
                        <div>สรุปรายการสั่งสื้อสินค้า</div>
                        <div className="w-full h-0.5 bg-black mx-auto mt-5"></div>
                        <div className='container h-80 bg-white border border-gray-400 rounded-md mt-5'>


                        </div>

                    </div>

                </div>




            </>
        </RootLayout >
    );
}; export default Payment;