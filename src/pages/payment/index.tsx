
import React, { useState, useEffect } from 'react';
import useAxios from "axios-hooks";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import SelectAddress from './address';
import RootLayout from '@/components/Layout';
import Image from 'next/image';

const Payment: React.FC = (props) => {


    const [fname, setFname] = useState<string>("");
    const [lname, setLname] = useState<string>("");
    const [phonenumber, setTel] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [request, setRequest] = useState<string>("");
    const [userId, setUserId] = useState<string>("");
    const [AddressLine, setAddressLine] = useState<String>("");
    const [ZipCode, setZipCode] = useState<String>("");

    const [Province, setProvince] = useState<String>("");
    const [District, setDistrict] = useState<String>("");
    const [SubDistrict, setSubDistrict] = useState<String>("");
    const [provinces, setProvinces] = useState<any[]>([]);
    const [districts, setDistricts] = useState<any[]>([]);
    const [subdistricts, setSubDistricts] = useState<any[]>([]);
    const [UserAddressData, setUserAddressData] = useState<any>({});
    const [addressId, setSelectedAddressId] = useState<string | null>(null);
    const [CurrentAddress, setCurrentAddress] = useState<any>({});
    const [selectedAddress, setSelectedAddress] = useState<any | null>(null)
    const [loggedInUser, setLoggedInUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isMissingModalOpen, setIsMissingModalOpen] = useState(false);
    const [isTexaddress, setIsTexaddress] = useState(false);
    const [isTexaddress2, setIsTexaddress2] = useState(false);
    const [isTexaddress3, setIsTexaddress3] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isQrcode, setIsQrcode] = useState(false);

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

    useEffect(() => {
        fetch(`https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json`)
            .then((response) => response.json())
            .then((data) => {
                setProvinces(data);
            })
            .catch((error) => {
                console.error("Error fetching provinces:", error);
            });
    }, []);

    const handleProvinceChange = (e: any) => {
        const selectedProvinceName = e.target.value;
        const selectedProvince = provinces.find((province) => province.name_th === selectedProvinceName);
        if (selectedProvince) {
            // ดึงข้อมูลอำเภอที่เกี่ยวข้องกับจังหวัดที่เลือก   
            fetch(`https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json`)
                .then((response) => response.json())
                .then((data) => {
                    const filteredDistricts = data.filter((district: any) => district.province_id === selectedProvince.id);
                    setDistricts(filteredDistricts);
                })
                .catch((error) => {
                    console.error("Error fetching districts:", error);
                });
        }
    };

    const handleDistrictChange = (e: any) => {
        const selectedAmphureName = e.target.value;
        const selectedAmphure = districts.find((district) => district.name_th === selectedAmphureName);
        if (selectedAmphure) {
            // ดึงข้อมูลตำบลที่เกี่ยวข้องกับอำเภอที่เลือก
            fetch(`https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json`)
                .then((response) => response.json())
                .then((data) => {
                    const filteredSubDistricts = data.filter((subdistrict: any) => subdistrict.amphure_id === selectedAmphure.id);
                    setSubDistricts(filteredSubDistricts);
                })
                .catch((error) => {
                    console.error("Error fetching subdistricts:", error);
                });
        }
    };

    const handleSubDistrictChange = (e: any) => {
        const selectedSubDistrictName = e.target.value;
        const selectedSubDistrict = subdistricts.find((subdistrict) => subdistrict.name_th === selectedSubDistrictName);
        if (selectedSubDistrict) {
            // Update the zip code based on the selected subdistrict
            setZipCode(selectedSubDistrict.zip_code.toString());
            // console.log(selectedSubDistrict.zip_code);
        }
    };

    const texaddressCheckboxChange = () => {
        setIsTexaddress(!isTexaddress);
        setIsTexaddress2(false);
        setIsTexaddress3(false);
    }

    const texaddressCheckboxChange2 = () => {
        setIsTexaddress2(!isTexaddress2);
        setIsTexaddress(false);
        setIsTexaddress3(false);
    }

    const texaddressCheckboxChange3 = () => {
        setIsTexaddress3(!isTexaddress3);
        setIsTexaddress(false);
        setIsTexaddress2(false);

    }

    // const handleCheckboxChange = () => {
    //     setIsChecked(!isChecked);
    //     setIsQrcode(false);
    // };

    // const handleCheckboxChange2 = () => {
    //     setIsQrcode(!isQrcode);
    //     setIsChecked(false);
    // };

    useEffect(() => {
        if (loggedInUser) {
            // ให้ทำการตั้งค่า state ต่าง ๆ ด้วยข้อมูลที่ได้จาก loggedInUser
            setFname(loggedInUser.fname || ""); // ตั้งค่าเป็นค่า fname หรือว่าเป็นค่าว่างถ้าไม่มี
            setLname(loggedInUser.lname || "");
            setTel(loggedInUser.phonenumber || "");
            setEmail(loggedInUser.email || "");
            setUserId(loggedInUser.id || "");

            // ... (ตั้งค่า state อื่น ๆ ตามต้องการ)
        }
    }, [loggedInUser])


    const [UserData, setUserData] = useState({
        fname: "",
        lname: "",
        phonenumber: "",
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
                    setTel(data.phonenumber);
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

    const [cartItems, setCartItems] = useState<any[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const userDataFromCookies = Cookies.get("user");
            if (userDataFromCookies) {
                try {
                    const parsedUser = JSON.parse(userDataFromCookies);
                    setLoggedInUser(parsedUser);
                } catch (error) {
                    console.error("Error parsing user data:", error);
                }
            }
        };

        fetchData();
    }, []);

    // รับข้อมูลสินค้าที่เลือกจากหน้า CartPage


    useEffect(() => {
        const cartItemsFromCookies = Cookies.get("cart");
        if (cartItemsFromCookies) {
            const parsedCartItems = JSON.parse(cartItemsFromCookies);
            setCartItems(parsedCartItems);
        }
    }, []);

    // รวมยอดเงินทั้งหมด
    const calculateTotal = () => {
        return cartItems.reduce(
            (total: number, item: any) => total + item.price * item.quantity,
            0
        );
    };
    const checkout = async () => {
        try {
            const productIds = cartItems.map(item => item.id);
            const quantities = cartItems.map(item => item.quantity);
            const paymentData = {
                name: fname,
                lname: lname,
                phonenumber: phonenumber,
                addressline: AddressLine,
                zipcode: ZipCode,
                province: Province,
                district: District,
                subdistrict: SubDistrict
            };
            const response = await fetch('/api/orderlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productIds, paymentData, quantities, date: new Date(), userId, addressId }), // เพิ่ม addressId ในข้อมูลที่ส่ง
            });

            if (response.ok) {
                console.log('Order placed successfully', cartItems);
                setCartItems([]);
                Cookies.remove('cart');
                // ทำการโหลดหน้าอื่น ๆ หรือทำการ Redirect ไปยังหน้าอื่น ๆ ตามที่ต้องการ
                window.location.href = "/payment/success"; // ตัวอย่างการ Redirect ไปยังหน้า success
            } else {
                console.error('Failed to place order');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (

        <RootLayout loggedInUser="">
            <>
                <div className='mt-[140px] text-3xl ml-[450px] my-10'>ยืนยันคำสั่งซื้อ</div>
                <div className='grid grid-cols-4 mt-3'>
                    <div className="col-start-2 ps-20 justify-center items-center min-h-screen ">
                        <div className=" w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-auto ">
                            <div className='text-xl'>ที่อยู่จัดส่ง</div>
                            <div className="w-full h-0.5 bg-black mx-auto mt-5"></div>
                            <div className='mt-3'>
                                <SelectAddress UserAddressData={UserAddressData} onSelectAddress={(addressId) => setSelectedAddressId(addressId)} />
                            </div>
                            <div className='text-xl mt-5'>ที่อยู่ออกใบกำกับภาษี</div>

                            <div className=' mt-2 '>
                                <input id="remember_me" name="remember_me" type="checkbox" onChange={texaddressCheckboxChange} checked={isTexaddress}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-4" />
                                <label className=" text-base font-medium mx-1 text-gray-700 ">
                                    ไม่ออกใบกำกับภาษี
                                </label>

                            </div>
                            <div className=' mt-2 '>
                                <input id="remember_me" name="remember_me" type="checkbox" onChange={texaddressCheckboxChange2} checked={isTexaddress2}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-4" />
                                <label className=" text-base font-medium mx-1 text-gray-700 ">
                                    ที่อยู่เดียวกับที่อยู่จัดส่ง
                                </label>
                            </div>

                            <div className=' mt-2 my-5'>
                                <input id="remember_me" name="remember_me" type="checkbox" onChange={texaddressCheckboxChange3} checked={isTexaddress3}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-4" />
                                <label className=" text-base font-medium mx-1 text-gray-700 ">
                                    ที่อยู่อื่น
                                </label>
                            </div>
                            {isTexaddress3 && (
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
                                                type="number" value={phonenumber} onChange={(e) => setTel(e.target.value)}
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
                                            onChange={(e) => setAddressLine(e.target.value)}
                                        />
                                    </div>



                                    <div className="col-span-12 md:col-span-6">
                                        <p className="text-[#666363] my-2">จังหวัด</p>
                                        <select
                                            className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded  px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-10 resize-none "
                                            onChange={(e) => { setProvince(e.target.value); handleProvinceChange(e); }}
                                        >
                                            <option value="" disabled selected hidden className="text-slate-500 ">กรุณาเลือกจังหวัด</option>
                                            {provinces.map((province) => (
                                                <option key={province.id} value={province.name_th}>
                                                    {province.name_th}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="col-span-12 md:col-span-6">
                                        <p className="text-[#666363] my-2">อำเภอ/เขต</p>
                                        <select
                                            className=" w-full bg-gray-200 text-gray-700 border border-gray-200 rounded  px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-10 resize-none "
                                            onChange={(e) => { setDistrict(e.target.value); handleDistrictChange(e) }}

                                        >
                                            <option value="" disabled selected hidden className="text-gray-500">กรุณาเลือกอำเภอ/เขต</option>
                                            {districts.map((district) => (
                                                <option key={district.id} value={district.name_th}>
                                                    {district.name_th}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="col-span-12 md:col-span-6">
                                        <p className="text-[#666363] my-2">ตำบล/แขวง</p>
                                        <select
                                            className=" w-full bg-gray-200 text-gray-700 border border-gray-200 rounded  px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-10 resize-none"
                                            onChange={(e) => { setSubDistrict(e.target.value); handleSubDistrictChange(e) }}

                                        >
                                            <option value="" disabled selected hidden className="text-gray-500">กรุณาเลือกตำบล</option>
                                            {subdistricts.map((subdistrict) => (
                                                <option key={subdistrict.id} value={subdistrict.name_th}>
                                                    {subdistrict.name_th}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <p className="text-[#666363] my-2">รหัสไปรษณีย์</p>
                                        <input
                                            placeholder="รหัสไปรษณีย์"
                                            value={ZipCode.toString()}
                                            type="text"
                                            className=" w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-10 resize-none"
                                            onChange={(e) => setZipCode(e.target.value)}
                                        />
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

                                </form>

                            )}

                        </div>
                    </div>


                    <div className='col-start-3 text-xl ps-20'>
                        <div>สรุปรายการสั่งสื้อสินค้า</div>
                        <div className="w-full h-0.5 bg-black mx-auto mt-5"></div>
                        <div className="container h-80 bg-white border border-gray-400 rounded-md mt-5">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-2 border-b">
                                    <div className="flex items-center space-x-2">
                                        <div>
                                            <p className="text-sm font-bold">{item.productname}</p>
                                            <p className="text-sm text-gray-500">{item.quantity} x {item.price}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm font-bold">{item.quantity * item.price}</p>
                                </div>
                            ))}
                            <div className="flex items-center justify-between p-2 border-t">
                                <p className="text-sm font-bold">ยอดรวมทั้งหมด</p>
                                <p className="text-sm font-bold">{calculateTotal()}</p>
                            </div>
                        </div>
                        <div className="flex justify-center mt-6">
                            <button
                                type="submit"
                                disabled={isLoading}
                                onClick={checkout} // เรียกใช้ฟังก์ชัน handleSubmit ในการตรวจสอบข้อมูล
                                className="w-[150px] py-3 bg-[#FFCD4B] rounded-lg font-medium text-white uppercase focus:outline-none hover:bg-gray-700 hover:shadow-none"
                            >
                                ยืนยันคำสั่งซื้อ
                            </button>
                        </div>
                    </div>

                </div>
            </>
        </RootLayout >
    );
}; export default Payment;