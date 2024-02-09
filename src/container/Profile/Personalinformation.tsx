import { useEffect, useState } from "react";
import { LuNewspaper } from "react-icons/lu";
import Cookies from 'js-cookie';
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";

// กำหนด interface หรือ type ของ User
interface User {
    id: string;
    fname?: string;
    lname?: string;
    birthday?: string;
    email?: string;
    password?: string;
    comfirmPassword?: string;
    img?: string;
    tel?: string;
    secretKey?: string;
    facebook?: string;
    google?: string;
}

// สร้าง component PersonalInformation
const PersonalInformation: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User>();
    const [editUser, setEditUser] = useState<User>({
        id: '',
        fname: '',
        lname: '',
        tel: '',
        img: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const userDataFromCookies = Cookies.get('user');
            if (userDataFromCookies) {
                const parsedUser = JSON.parse(userDataFromCookies);
                setLoggedInUser(parsedUser);
                setEditUser({
                    id: parsedUser.id,
                    fname: parsedUser.fname || '',
                    lname: parsedUser.lname || '',
                    tel: parsedUser.tel || '',
                    img: parsedUser.img || '',
                });
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        console.log(editUser);
    }, [editUser]);

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setImageFile(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                // อาจจะทำการ set รูปภาพใหม่เพื่อดูตัวอย่าง แต่ในที่นี้ไม่ได้ใช้
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        // ต้องทำการบันทึกข้อมูลที่แก้ไขลงในฐานข้อมูล และสิ้นสุดการแก้ไข
    };

    return (
        <>
            <div className="">
                <div className="flex items-center">
                    <LuNewspaper className='w-[25px] h-[25px]' />
                    <h3 className="text-2xl text-black ml-2">ข้อมูลส่วนตัว</h3>
                </div>

                <div className="container w-[800px] bg-secondary2 mt-10 rounded-lg p-8 text-secondary1">
                    {!isEditing ? (
                        <>
                            <div className="flex justify-between">
                                <p className="text-lg font-semibold">ข้อมูลส่วนตัว</p>
                                <button className="flex hover:text-natural04" onClick={() => setIsEditing(true)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M7 7H6C5.46957 7 4.96086 7.21071 4.58579 7.58579C4.21071 7.96086 4 8.46957 4 9V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H15C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18V17" />
                                        <path d="M16 4.99998L19 7.99998M20.385 6.58499C20.7788 6.19114 21.0001 5.65697 21.0001 5.09998C21.0001 4.543 20.7788 4.00883 20.385 3.61498C19.9912 3.22114 19.457 2.99988 18.9 2.99988C18.343 2.99988 17.8088 3.22114 17.415 3.61498L9 12V15H12L20.385 6.58499Z" />
                                    </svg>
                                    แก้ไข
                                </button>
                            </div>
                            <div className="mt-5 leading-loose">
                                {loggedInUser?.img ? (
                                    <Image
                                        src={loggedInUser?.img}
                                        alt="profile"
                                        className="shadow rounded-full object-cover mx-auto"
                                        style={{ width: '150px', height: '150px' }}
                                    />
                                ) : (
                                    <FaUserCircle
                                        className="shadow rounded-full object-cover mx-auto"
                                        style={{ width: '150px', height: '150px' }}
                                    />
                                )}

                                <p className="mt-5">
                                    <strong>ชื่อ :</strong> {loggedInUser?.fname} {loggedInUser?.lname}
                                </p>
                                <p>
                                    <strong>อีเมล :</strong> {loggedInUser?.email}
                                </p>
                                <p>
                                    <strong>เบอร์โทรศัพท์ :</strong> {loggedInUser?.tel} { }
                                </p>
                            </div>
                            <div className="w-full h-0.5 bg-gradient-to-r from-[#CA0808] to-[#0FC0E7] mx-auto mt-5"></div>
                        </>
                    ) : (
                        <div>
                            <div className="flex justify-between">
                                <p className="text-lg font-semibold">แก้ข้อมูลส่วนตัว</p>
                                <div className="flex hover:text-natural04" onClick={() => setIsEditing(true)}>
                                </div>
                            </div>
                            <form>
                                <div className="mt-5 leading-loose">
                                    {loggedInUser?.img ? (
                                        <div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                id="imageInput"
                                                style={{ display: 'none' }}
                                            />
                                            <Image
                                                src={loggedInUser?.img}
                                                alt="profile"
                                                className="shadow rounded-full object-cover mx-auto"
                                                style={{ width: '150px', height: '150px', cursor: 'pointer' }}
                                                onClick={() => document.getElementById("imageInput")?.click()}
                                            />
                                        </div>
                                    ) : (
                                        <div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                id="imageInput"
                                                style={{ display: 'none' }}
                                            />
                                            <FaUserCircle
                                                className="shadow rounded-full object-cover mx-auto"
                                                style={{ width: '150px', height: '150px', cursor: 'pointer' }}
                                                onClick={() => document.getElementById("imageInput")?.click()}
                                            />
                                        </div>
                                    )}
                                    <p>
                                        <strong>ชื่อผู้รับ :</strong>
                                        <input
                                            type="text"
                                            value={editUser?.fname || ''}
                                            onChange={(e) => setEditUser({ ...editUser, fname: e.target.value })}
                                            className="mt-5 border border-b-black focus:outline-none focus:border-b-blue-500 pl-2 mr-2"
                                        />
                                        <input
                                            type="text"
                                            value={editUser?.lname || ''}
                                            onChange={(e) => setEditUser({ ...editUser, lname: e.target.value })}
                                            className="border border-b-black focus:outline-none focus:border-b-blue-500 pl-2"
                                        />
                                    </p>
                                    <p>
                                        <strong>เบอร์โทรศัพท์ :</strong>
                                        <input
                                            type="text"
                                            value={editUser?.tel || ''}
                                            onChange={(e) => setEditUser({ ...editUser, tel: e.target.value })}
                                            className="border border-b-black focus:outline-none focus:border-b-blue-500 pl-2"
                                        />
                                    </p>
                                </div>
                            </form>
                            <div className="my-2">
                                <button onClick={handleSave} className="bg-green-500 text-white w-16 h-8 rounded">บันทึก</button>
                                <button onClick={handleCancel} className="ml-2 bg-red-500 text-white w-16 h-8 rounded">ยกเลิก</button>
                            </div>
                            <div className="w-full h-0.5 bg-gradient-to-r from-[#CA0808] to-[#0FC0E7] mx-auto mt-5"></div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
export default PersonalInformation;
