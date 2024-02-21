import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LuMapPin } from "react-icons/lu";

const AddressProfile: React.FC = (props) => {
    const router = useRouter();
    const { id } = router.query; // ดึงค่า id จาก query parameters
    const [UserId, setUserId] = useState<String>();
    const [AddressData, setAddressData] = useState<any>(); // กำหนดประเภทของข้อมูลบทความข่าว
    const [CurrentAddressId, setCurrentAddressId] = useState<String>();
    const [IsDefaultAddress, setIsDefaultAddress] = useState<boolean>();
    const [isLoading, setIsLoading] = useState(true);
    const [Name, setName] = useState<String>("");
    const [Lname, setLname] = useState<String>("");
    const [PhoneNumber, setPhoneNumber] = useState<String>("");
    const [TypeAddress, setTypeAddress] = useState<String>("");
    const [AddressLine, setAddressLine] = useState<String>("");
    const [ZipCode, setZipCode] = useState<String>("");
    const [Province, setProvince] = useState<String>("");
    const [District, setDistrict] = useState<String>("");
    const [SubDistrict, setSubDistrict] = useState<String>("");
    const [Note, setNote] = useState<String>("");
    const [CheckDefault, setCheckDefault] = useState(false);
    const [DefaultAddress, setDefaultAddress] = useState<String>("");
    const [provinces, setProvinces] = useState<any[]>([]);
    const [districts, setDistricts] = useState<any[]>([]);
    const [subdistricts, setSubDistricts] = useState<any[]>([]);


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


    useEffect(() => {
        if (id) {
            fetch(`/api/user/address/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    // console.log(data.id);
                    setUserId(data.id)
                    // console.log(data.Address);
                    // console.log(data.Address);
                    const foundId = data.Address.find((address: { id: String; }) => address.id === data.Address);
                    if (foundId) {
                        // เช็คว่ามีที่อยู่ดั่งเดิมไหมถ้ามีเป็น true
                        setIsDefaultAddress(true);
                        // ค้นเจอ ID ใน data.Address
                        // ทำสิ่งที่คุณต้องการกับ foundId
                        // console.log(foundId);
                        // console.log("เจอ id address");
                        // ตั้งค่า ID ของ address ที่มีอยู่
                        setCurrentAddressId(foundId)
                    } else {
                        // เช็คว่ามีที่อยู่ดั่งเดิมไหมถ้า ไม่มี เป็น false
                        setIsDefaultAddress(false);
                        // ไม่พบ ID ที่ตรงกันใน data.Address
                        // console.log('ID ไม่ตรงกับใน data.Address');
                    }

                    setIsLoading(false); // ตั้งค่า isLoading เป็น false เมื่อโหลดเสร็จสมบูรณ์

                })
                .catch((error) => {
                    console.error('Error:', error);
                    setIsLoading(false); // ตั้งค่า isLoading เป็น false เมื่อโหลดเสร็จสมบูรณ์

                });

        }
    }, [id]);


    const UploadAndSetDefault = (UploadData: any) => {
        // กระทำอะไรบางอย่างเมื่อ checkbox ถูกเลือก
        if (
            Name == "" ||
            Lname == "" ||
            PhoneNumber == "" ||
            TypeAddress == "" ||
            AddressLine == "" ||
            ZipCode == "" ||
            Province == "" ||
            District == "" ||
            SubDistrict == ""
        ) {
            {
                alert("กรุณากรอกข้อมูลให้ครบ")
                return;
            }

        }

        fetch(`/api/address`, {
            method: 'POST', // หรือเปลี่ยนเป็น 'POST' หากต้องการใช้การสร้างข้อมูลใหม่
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(UploadData),
        })
            .then((response) => response.json())
            .then((data2) => {

                fetch(`/api/user/${id}`, {
                    method: 'PUT', // หรือเปลี่ยนเป็น 'POST' หากต้องการใช้การสร้างข้อมูลใหม่
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ Address: data2.id }),
                })
                    .then((response) => {
                        if (response.ok) {
                            // หากสำเร็จในการแก้ไขข้อมูล
                            alert("บันทึกข้อมูลสำเร็จ")
                            console.log("บันทึกข้อมูลสำเร็จ")
                            setIsLoading(false);
                            router.reload();
                        } else {
                            // แสดงข้อผิดพลาดหรือดำเนินการเพิ่มเติมตามที่คุณต้องการ
                            alert("บันทึก ไม่ ข้อมูลสำเร็จ")
                            console.log("บันทึกข้อมูล ไม่ สำเร็จ")
                            console.error('Error:', response.status);
                            setIsLoading(false);
                        }
                    })
                    .catch((error) => {
                        alert("บันทึก ไม่ ข้อมูลสำเร็จ")
                        console.error('Error:', error);
                        setIsLoading(false);
                    });

            })
            .catch((error) => {
                alert("บันทึก ไม่ ข้อมูลสำเร็จ")
                console.error('Error:', error);
                setIsLoading(false);
            });
    }


    const UploadNoDefault = (UploadData: any) => {
        if (
            Name == "" ||
            Lname == "" ||
            PhoneNumber == "" ||
            TypeAddress == "" ||
            AddressLine == "" ||
            ZipCode == "" ||
            Province == "" ||
            District == "" ||
            SubDistrict == ""
        ) {
            {
                alert("กรุณากรอกข้อมูลให้ครบ")
                return;
            }

        }

        fetch(`/api/address`, {
            method: 'POST', // หรือเปลี่ยนเป็น 'POST' หากต้องการใช้การสร้างข้อมูลใหม่
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(UploadData),
        })
            .then((response) => {
                if (response.ok) {
                    // หากสำเร็จในการแก้ไขข้อมูล
                    alert("บันทึกข้อมูลสำเร็จ")
                    console.log("บันทึกข้อมูลสำเร็จ")
                    setIsLoading(false);
                    router.reload();
                } else {
                    // แสดงข้อผิดพลาดหรือดำเนินการเพิ่มเติมตามที่คุณต้องการ
                    alert("บันทึก ไม่ ข้อมูลสำเร็จ")
                    console.log("แบันทึกข้อมูล ไม่ สำเร็จ")
                    console.error('Error:', response.status);
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                alert("บันทึก ไม่ ข้อมูลสำเร็จ")
                console.error('Error:', error);
                setIsLoading(false);
            });

    }


    const SaveAddress = () => {
        setIsLoading(true);

        const UploadData = {
            name: Name,
            lname: Lname,
            phonenumber: PhoneNumber,
            typeaddress: TypeAddress,
            addressline: AddressLine,
            zipcode: ZipCode,
            province: Province,
            district: District,
            subdistrict: SubDistrict,
            note: Note,
            userId: UserId,
        }


        if (IsDefaultAddress) {
            if (CheckDefault) {
                // กระทำอะไรบางอย่างเมื่อ checkbox ถูกเลือก
                UploadAndSetDefault(UploadData);


            } else {
                // กระทำอะไรบางอย่างเมื่อ checkbox ไม่ถูกเลือก

                UploadNoDefault(UploadData);


            }


        }
        else {


            if (CheckDefault) {
                UploadAndSetDefault(UploadData);


            } else {
                // กระทำอะไรบางอย่างเมื่อ checkbox ไม่ถูกเลือก

                UploadNoDefault(UploadData);


            }



        }



    }


    return (
        <div className="">
            <div className="flex items-center">
            <LuMapPin className='w-[25px] h-[25px]' />
                <h3 className="text-2xl text-black ml-2">จัดการที่อยู่จัดส่ง</h3>
            </div>

            <div className="bg-secondary2 mt-10 rounded-lg p-8 text-secondary1">
                <div>
                    {/* <p className="text-red-500 text-center mb-5">**แสดงเมื่อกดปุ่ม เพิ่มที่อยู่ หรือ แก้ไข**</p> */}
                    <div className="flex justify-between">
                        {/* <p className="text-lg font-semibold">แก้ไขที่อยู่</p> */}
                        <p className="text-lg font-semibold">เพิ่มที่อยู่</p>

                    </div>
                    <div className="mt-5 leading-loose">
                        <p className="text-lg">ข้อมูลผู้ติดต่อ</p>

                        <div className="grid grid-cols-12 gap-5 md:ml-10 my-5">

                            <div className="col-span-12 md:col-span-6">
                                <p className="text-[#666363] my-2">ชื่อผู้รับ</p>
                                <input
                                    placeholder="ชื่อผู้รับ"
                                    type="text"
                                    className=" w-full h-9 pl-2 border border-b-black focus:outline-none focus:border-b-blue-500"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="col-span-12 md:col-span-6">
                                <p className="text-[#666363] my-2">นามสกุลผู้รับ</p>
                                <input
                                    placeholder="นามสกุลผู้รับ"
                                    type="text"
                                    className=" w-full h-9 pl-2 border border-b-black focus:outline-none focus:border-b-blue-500 "
                                    onChange={(e) => setLname(e.target.value)}
                                />
                            </div>

                            <div className="col-span-12 md:col-span-6">
                                <p className="text-[#666363] my-2">เบอร์โทรศัพท์</p>
                                <input
                                    placeholder="เบอร์โทรศัพท์"
                                    type="text"
                                    className=" w-full h-9 pl-2   border border-b-black focus:outline-none focus:border-b-blue-500 "
                                    onChange={(e) => setPhoneNumber(e.target.value)}

                                />
                            </div>

                        </div>



                        <div className="flex justify-between mt-10">
                            <p className="text-lg">ข้อมูลที่อยู่</p>
                            {/* <p className="text-sm">dsadsa</p> */}
                        </div>

                        <div className="grid grid-cols-12 gap-5 md:ml-10 my-5 ">

                            <div className="col-span-12">
                                <p className="text-[#666363] my-2  ">ประเภทที่อยู่</p>
                                <select
                                    className=" w-full h-9 pl-2  border border-b-black focus:outline-none focus:border-b-blue-500 "
                                    onChange={(e) => setTypeAddress(e.target.value)}
                                >
                                    <option value="" disabled selected hidden >กรุณาเลือก</option>
                                    <option value="บ้าน">บ้าน</option>
                                    <option value="ที่ทำงาน">ที่ทำงาน</option>
                                    <option value="หอพัก/คอนโด">หอพัก/คอนโด</option>
                                </select>
                            </div>

                            <div className="col-span-12">
                                <p className="text-[#666363] my-2">ที่อยู่</p>
                                <input
                                    placeholder="ที่อยู่"
                                    type="text"
                                    className=" w-full h-9 pl-2 border border-b-black focus:outline-none focus:border-b-blue-500 "
                                    onChange={(e) => setAddressLine(e.target.value)}

                                />
                            </div>

                            <div className="col-span-12 md:col-span-6">
                                <p className="text-[#666363] my-2">รหัสไปรษณีย์</p>
                                <input
                                    placeholder="รหัสไปรษณีย์"
                                     value={ZipCode.toString()}
                                    type="text"
                                    className=" w-full h-9 pl-2 border border-b-black focus:outline-none focus:border-b-blue-500 "
                                    onChange={(e) => setZipCode(e.target.value)}
                                />
                            </div>

                            <div className="col-span-12 md:col-span-6">
                                <p className="text-[#666363] my-2">จังหวัด</p>
                                <select
                                    className=" w-full h-9 pl-2  border border-b-black focus:outline-none focus:border-b-blue-500 "
                                    onChange={(e) => { setProvince(e.target.value); handleProvinceChange(e); }}
                                >
                                    <option value="" disabled selected hidden className="text-gray-500">กรุณาเลือกจังหวัด</option>
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
                                    className=" w-full h-9 pl-2  border border-b-black focus:outline-none focus:border-b-blue-500 "
                                    onChange={(e) => {setDistrict(e.target.value); handleDistrictChange(e)}}

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
                                    className=" w-full h-9 pl-2 border border-b-black focus:outline-none focus:border-b-blue-500 "
                                    onChange={(e) => { setSubDistrict(e.target.value);handleSubDistrictChange(e) }}

                                >
                                    <option value="" disabled selected hidden className="text-gray-500">กรุณาเลือกตำบล</option>
                                    {subdistricts.map((subdistrict) => (
                                        <option key={subdistrict.id} value={subdistrict.name_th}>
                                            {subdistrict.name_th}
                                        </option>
                                    ))}
                                </select>
                            </div>


                            <div className="col-span-12">
                                <p className="text-[#666363] my-2">จุดสังเกตุ (ถ้ามี)</p>
                                <input
                                    placeholder="ข้อมูลเพิ่มเติม"
                                    type="text"
                                    className=" w-full h-9 pl-2 border border-b-black focus:outline-none focus:border-b-blue-500 "
                                    onChange={(e) => setNote(e.target.value)}

                                />
                            </div>




                        </div>

                        <div className="flex flex-row gap-4 ml-10">
                            <input
                                type="checkbox"
                                className="self-center  w-5 h-5 pl-2 ring-2  ring-green-500"
                                onChange={(e) => setCheckDefault(e.target.checked)}
                            />
                            <p className="text-[#666363] my-2">ตั้งเป็นที่อยู่ปัจจุบัน</p>
                        </div>


                    </div>
                </div>
            </div>
            <div className="flex justify-center my-5">
                <button
                    onClick={SaveAddress}
                    className="bg-[#18BCEB] h-10 w-24 rounded-3xl text-secondary2"
                >
                    บันทึก
                </button>
            </div>
        </div>
    )
}
export default AddressProfile;