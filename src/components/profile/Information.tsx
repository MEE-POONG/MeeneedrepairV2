import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
interface User {
    fname: string;
    lname: string;
    email: string;
    tel: string;
    img: string;
}

export default function Information() {
    const router = useRouter();
    const { id } = router.query;

    const [initialUserData, setInitialUserData] = useState<User>({
        fname: "",
        lname: "",
        email: "",
        tel: "",
        img: "",
    });
    const [userData, setUserData] = useState<User>({
        fname: "",
        lname: "",
        email: "",
        tel: "",
        img: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        if (id) {
            fetch(`/api/user/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    setUserData(data);
                    setInitialUserData(data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }, [id]);
//
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setImageFile(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setUserData({ ...userData, img: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        const updatedUserData = {
            fname: userData.fname,
            lname: userData.lname,
            email: userData.email,
            tel: userData.tel,
            img: userData.img
        };

        if (imageFile) {
            // ส่งไฟล์รูปภาพไปยัง API หรือทำการอัปโหลดตามที่ต้องการ
            // เช่น fetch('/api/upload-image', { method: 'POST', body: imageFile })
        }

        fetch(`/api/user/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUserData),
        })
            .then((response) => {
                if (response.ok) {
                    setIsEditing(false);
                    setInitialUserData(updatedUserData);
                } else {
                    console.error('Error:', response.status);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    const handleCancel = () => {
        // เมื่อกด "ยกเลิก" ให้กลับค่า userData ให้เป็นค่าเริ่มต้น
        setUserData(initialUserData);
        setIsEditing(false);

    };



    return (
        <div>
            {!isEditing ? (
                <div>
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
                    <div className="mt-5 leading-loose "
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        {userData.img ? (
                            <div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    id="imageInput"
                                    style={{ display: 'none' }} disabled
                                />
                                <img
                                    src={userData.img}
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

                        {isHovered && !isEditing && (
                            <div className="text-natural04 text-center">

                            </div>
                        )}


                        <p className="mt-5">
                            <strong>ชื่อ :</strong> {userData.fname} {userData.lname}
                        </p>
                        <p>
                            <strong>อีเมล :</strong> {userData.email}
                        </p>
                        <p>
                            <strong>เบอร์โทรศัพท์ :</strong> {userData.tel} { }
                        </p>
                        {/* <p>
                            <strong>ที่อยู่จัดส่ง :</strong> {userData.loca}
                        </p> */}

                    </div>
                    <div className="w-full h-0.5 bg-gradient-to-r from-[#CA0808] to-[#0FC0E7] mx-auto mt-5"></div>
                </div>
            ) : (
                <div>
                    <div className="flex justify-between">
                        <p className="text-lg font-semibold">แก้ข้อมูลส่วนตัว</p>
                        <div className="flex hover:text-natural04" onClick={() => setIsEditing(true)}>
                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M7 7H6C5.46957 7 4.96086 7.21071 4.58579 7.58579C4.21071 7.96086 4 8.46957 4 9V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H15C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18V17" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M16 4.99998L19 7.99998M20.385 6.58499C20.7788 6.19114 21.0001 5.65697 21.0001 5.09998C21.0001 4.543 20.7788 4.00883 20.385 3.61498C19.9912 3.22114 19.457 2.99988 18.9 2.99988C18.343 2.99988 17.8088 3.22114 17.415 3.61498L9 12V15H12L20.385 6.58499Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            แก้ไข */}
                        </div>
                    </div>
                    <form>
                        <div className="mt-5 leading-loose">

                            {userData.img ? (
                                <div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        id="imageInput"
                                        style={{ display: 'none' }}
                                    />
                                    <img
                                        src={userData.img}
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
                                    value={userData.fname}
                                    onChange={(e) => setUserData({ ...userData, fname: e.target.value })}
                                    className="mt-5 border border-b-black focus:outline-none focus:border-b-blue-500 pl-2 mr-2"
                                />
                                <input
                                    type="text"
                                    value={userData.lname}
                                    onChange={(e) => setUserData({ ...userData, lname: e.target.value })}
                                    className="border border-b-black focus:outline-none focus:border-b-blue-500 pl-2"
                                />
                            </p>

                            <p>
                                <strong>เบอร์โทรศัพท์ :</strong>
                                <input
                                    type="text"
                                    value={userData.tel}
                                    onChange={(e) => setUserData({ ...userData, tel: e.target.value })}
                                    className="border border-b-black focus:outline-none focus:border-b-blue-500 pl-2"

                                />
                            </p>


                            {/* <p>
                                <strong>ที่อยู่จัดส่ง :</strong>
                                <input
                                    type="text"
                                    value={userData.loca}
                                    onChange={(e) => setUserData({ ...userData, loca: e.target.value })}
                                    className="border border-b-black focus:outline-none focus:border-b-blue-500 pl-2"

                                />
                            </p> */}
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
    );
}
