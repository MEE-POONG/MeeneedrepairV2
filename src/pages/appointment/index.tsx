import React, { useState, useEffect } from 'react';
import useAxios from "axios-hooks";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import SelectAddress from './address';
import RootLayout from '@/components/Layout';


function YourComponent() {

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


    // // เรียกใช้งานฟังก์ชันเมื่อกดปุ่ม "จองคิว"
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
        if (userId ) {
            fetch(`/api/user/${userId }`)
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
            <div className="flex justify-center items-center min-h-screen mt-24">
                <div className="bg-white w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-auto p-6 rounded-lg shadow-lg">
                    <h2 className=" font-semibold text-xl lg:text-2xl text-gray-800 mb-4">
                        จองคิวซ่อม
                    </h2>
                    <form >
                        <div className="flex justify-center">
                            <div className="relative mb-6 mr-6" data-te-input-wrapper-init>
                                <div className='mb-2'>ชื่อ</div>
                                <input
                                    type="text" value={fname} onChange={(e) => setFname(e.target.value)}
                                    className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-10 resize-none"
                                    placeholder="ชื่อ"
                                />
                            </div>
                            <div className="relative mb-6" data-te-input-wrapper-init>
                                <div className='mb-2'>นามสกุล</div>
                                <input
                                    type="text" value={lname} onChange={(e) => setLname(e.target.value)}
                                    className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-10 resize-none"
                                    id="exampleFormControlInput3"
                                    placeholder="นามสกุล" />

                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="relative mb-6 mr-6" data-te-input-wrapper-init>
                                <div className='mb-2'>อีเมล</div>
                                <input
                                    type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-10 resize-none"
                                    placeholder="อีเมล" />

                            </div>
                            <div className="relative mb-6" data-te-input-wrapper-init>
                                <div className='mb-2'>เบอร์โทรติดต่อ</div>
                                <input
                                    type="number" value={tel} onChange={(e) => setTel(e.target.value)}
                                    className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-10 resize-none"
                                    id="exampleFormControlInput3"
                                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                    placeholder="เบอร์โทรติดต่อ" />

                            </div>
                        </div>
                        <div>
                            <SelectAddress UserAddressData={UserAddressData} onSelectAddress={(addressId) => setSelectedAddressId(addressId)} />
                        </div>
                        <div className="max-w-md mx-auto mb-4 mt-5" data-te-input-wrapper-init>
                            <div className='mb-2'>ต้องการจองคิววันที่</div>
                            <input
                                type="date" value={time} onChange={(e) => setTime(e.target.value)}
                                className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-10 resize-none"
                                id="exampleFormControlInput3"
                            />

                        </div>

                        <div className="max-w-md mx-auto mb-4">
                            <label
                                htmlFor="equipment"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                อุปกรณ์ที่ต้องการซ่อม
                            </label>
                            <select
                                id="equipment"
                                value={request}
                                onChange={(e) => setRequest(e.target.value)}
                                className="w-full p-2 bg-gray-200 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            >
                                <option value="computers" id="computers">
                                    เช็คอุปกรณ์ คอมพิวเตอร์,โน๊ตบุ๊ค
                                </option>
                                <option value="cpu" id="cpu">
                                    ซีพียู
                                </option>
                                <option value="motherboard" id="motherboard">
                                    เมนบอร์ด
                                </option>
                                <option value="hdd" id="hdd">
                                    ฮาร์ดดิส / ssd
                                </option>
                                <option value="ram" id="ram">
                                    แรม
                                </option>
                                <option value="others" id="others">
                                    อื่นๆ
                                </option>
                            </select>
                            {/* เพิ่มปุ่มหรือเหตุการณ์เมื่อคลิกเพื่อบันทึกค่าในฐานข้อมูล */}
                        </div>
                        <div className="max-w-md mx-auto">
                            <label className="block uppercase tracking-wide text-sm font-medium text-gray-900 mb-2" htmlFor="description">
                                อธิบายอาการของอุปกรณ์พอสังเขป
                            </label>
                            <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none" id="description" placeholder="กรุณากรอกข้อมูล"></textarea>
                        </div>

                        <div className="flex justify-center mt-6">
                            <button
                                type="submit"
                                disabled={isLoading}
                                onClick={handleSubmit} // เรียกใช้ฟังก์ชัน handleSubmit ในการตรวจสอบข้อมูล
                                className="w-[200px] py-3 bg-[#FFCD4B] rounded-lg font-medium text-white uppercase focus:outline-none hover:bg-gray-700 hover:shadow-none"
                            >
                                จองคิว
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
        </RootLayout>
    );
}

export default YourComponent; 