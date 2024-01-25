import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SelectAddress from "./selectaddress_personaldata_profile";
import { LuUser2 } from "react-icons/lu";

const PersonalData = () => {
    const router = useRouter();
    const { id } = router.query;

    const [UserAddressData, setUserAddressData] = useState([]);
    const [UserData, setUserData] = useState({
        fname: "",
        lname: "",
        tel: "",
        email: "",
    });


    const [isLoading, setIsLoading] = useState(true);

    const [Address, setAddress] = useState("");
    const [Name, setName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Telephone, setTelephone] = useState("");
    const [Email, setEmail] = useState("");


    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);


    // Your UserAddressData and other code...

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const selectAddress = (address: any) => {
        setSelectedAddress(address);
        setIsDropdownOpen(false);
    };


    useEffect(() => {
        if (id) {
            fetch(`/api/user/address/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    // console.log(data.id);
                    setUserAddressData(data.Address)
                    // console.log(data.Address);


                    // const foundId = data.Address.find((address: { id: String; }) => address.id === data.addressId);
                    // if (foundId) {
                    //     // เช็คว่ามีที่อยู่ดั่งเดิมไหมถ้ามีเป็น true
                    //     setIsDefaultAddress(true);
                    //     // ค้นเจอ ID ใน data.Address
                    //     // ทำสิ่งที่คุณต้องการกับ foundId
                    //     // console.log(foundId);
                    //     console.log("เจอ id address");
                    //     // ตั้งค่า ID ของ address ที่มีอยู่
                    //     setCurrentAddressId(foundId)
                    // } else {
                    //     // เช็คว่ามีที่อยู่ดั่งเดิมไหมถ้า ไม่มี เป็น false
                    //     setIsDefaultAddress(false);
                    //     // ไม่พบ ID ที่ตรงกันใน data.Address
                    //     console.log('ID ไม่ตรงกับใน data.Address');
                    // }

                    setIsLoading(false); // ตั้งค่า isLoading เป็น false เมื่อโหลดเสร็จสมบูรณ์

                })
                .catch((error) => {
                    console.error('Error:', error);
                    setIsLoading(false); // ตั้งค่า isLoading เป็น false เมื่อโหลดเสร็จสมบูรณ์

                });

        }
    }, [id]);

    useEffect(() => {
        if (id) {
            fetch(`/api/user/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    // console.log(data.id);
                    setUserData(data);
                    setName(data.fname);
                    setLastName(data.lname);
                    setTelephone(data.tel);
                    setEmail(data.email);
                    // setAddress(data);
                    // console.log(data);

                    setIsLoading(false); // ตั้งค่า isLoading เป็น false เมื่อโหลดเสร็จสมบูรณ์

                })
                .catch((error) => {
                    console.error('Error:', error);
                    setIsLoading(false); // ตั้งค่า isLoading เป็น false เมื่อโหลดเสร็จสมบูรณ์

                });

        }
    }, [id]);


    const UpdateUserData = () => {
        if (id) {

            if (selectedAddressId !== null) {
                fetch(`/api/user/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({

                        fname: Name,
                        lname: LastName,
                        tel: Telephone,
                        email: Email,
                        addressId: selectedAddressId,


                    }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        // ทำอะไรกับข้อมูลที่ได้จาก API (เช่น แสดงข้อความสำเร็จ)
                        alert('บันทึกข้อมูลเรียบร้อยแล้ว');
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });

            } else {

                fetch(`/api/user/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({

                        fname: Name,
                        lname: LastName,
                        tel: Telephone,
                        email: Email,


                    }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        // ทำอะไรกับข้อมูลที่ได้จาก API (เช่น แสดงข้อความสำเร็จ)
                        alert('บันทึกข้อมูลเรียบร้อยแล้ว');
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });


            }

        }
    }


    return (
        <div className="">
            <div className="flex items-center">
            <LuUser2 className='w-[25px] h-[25px]' />
                <h3 className="text-2xl text-black  ml-2">จัดการข้อมูลส่วนตัว</h3>
            </div>

            <div className="w-[550px] bg-secondary2 mt-10 rounded-lg p-8 text-secondary1">
                <div>
                    <div className="flex justify-between">
                        <p className="text-lg font-semibold">ข้อมูลส่วนตัว</p>

                    </div>
                    <div className="mt-5 leading-loose gap-y-2 flex flex-wrap">

                        <p className="">
                            <strong>ชื่อ </strong>
                        </p>
                        {/* {userData.fname} {userData.lname} */}
                        <input type="text"
                            defaultValue={Name}
                            placeholder="กรุณากรอกชื่อ"
                            onChange={(e) => setName(e.target.value)}
                            className="  w-full h-9 pl-2 border border-b-black focus:outline-none focus:border-b-blue-500" />

                        <p className="">
                            <strong>นามกุล </strong>
                        </p>
                        {/* {userData.fname} {userData.lname} */}
                        <input type="text"
                            defaultValue={LastName}
                            placeholder="กรุณากรอกนามสกุล"
                            onChange={(e) => setLastName(e.target.value)}
                            className="  w-full h-9 pl-2 border border-b-black focus:outline-none focus:border-b-blue-500" />



                        <p className="">
                            <strong>เบอร์โทรศัพท์ </strong>
                        </p>
                        {/* {userData.tel} */}
                        <input
                            type="text"
                            defaultValue={Telephone}
                            placeholder="กรุณากรอกเบอร์โทรศัพท์"
                            onChange={(e) => setTelephone(e.target.value)}
                            className=" w-full h-9 pl-2 border border-b-black focus:outline-none focus:border-b-blue-500" />




                        <p className="">
                            <strong>อีเมล </strong>
                            {/* อีเมล@mail.com */}
                        </p>
                        <input type="text"
                            defaultValue={Email}
                            placeholder="กรุณากรอกอีเมล"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-9 pl-2 border border-b-black focus:outline-none focus:border-b-blue-500" />



                        <p className="">
                            <strong>ที่อยู่จัดส่ง </strong>
                            {/* หอพักหญิงอยู่สบาย 193 ถนน 30กันยา , ในเมือง เมืองนครราชสีมา นครราชสีมา 30000 */}
                        </p>
                        {/* <input type="text"
                            placeholder="กรุณากรอกที่อยู่"
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full h-9 pl-2 border border-b-black focus:outline-none focus:border-b-blue-500"
                        /> */}

                        <div className="w-full">
                            <SelectAddress UserAddressData={UserAddressData} onSelectAddress={(addressId) => setSelectedAddressId(addressId)} />

                        </div>




                    </div>



                </div>



            </div>
            <div className="flex justify-center my-5">
                <button
                    // onClick={updateUserAndAddress} 
                    onClick={UpdateUserData}
                    className="bg-[#18BCEB] h-10 w-24 rounded-3xl text-secondary2">บันทึก</button>
            </div>
        </div>
    )
}
export default PersonalData;