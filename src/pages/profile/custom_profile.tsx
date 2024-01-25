import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CustomerProfile = () => {

    const router = useRouter();
    const { id } = router.query; // ดึงค่า id จาก query parameters

    const [userData, setUserData] = useState<any>({}); // กำหนดประเภทของข้อมูลบทความข่าว
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetch(`/api/user/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    setUserData(data); // กำหนดข้อมูลบทความข่าวที่ดึงมา
                    //console.log(data);
                    setIsLoading(false); // ตั้งค่า isLoading เป็น false เมื่อโหลดเสร็จสมบูรณ์

                })
                .catch((error) => {
                    console.error('Error:', error);
                    setIsLoading(false); // ตั้งค่า isLoading เป็น false เมื่อโหลดเสร็จสมบูรณ์

                });
        }
    }, [id]);


    return (
        <div className="">
            <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 45 45" fill="none">
                    <path d="M38.6719 4.92188H6.32812C5.55029 4.92188 4.92188 5.55029 4.92188 6.32812V38.6719C4.92188 39.4497 5.55029 40.0781 6.32812 40.0781H38.6719C39.4497 40.0781 40.0781 39.4497 40.0781 38.6719V6.32812C40.0781 5.55029 39.4497 4.92188 38.6719 4.92188ZM36.9141 36.9141H8.08594V8.08594H36.9141V36.9141ZM21.6211 17.5781H29.707C29.9004 17.5781 30.0586 17.4199 30.0586 17.2266V15.1172C30.0586 14.9238 29.9004 14.7656 29.707 14.7656H21.6211C21.4277 14.7656 21.2695 14.9238 21.2695 15.1172V17.2266C21.2695 17.4199 21.4277 17.5781 21.6211 17.5781ZM21.6211 23.9062H29.707C29.9004 23.9062 30.0586 23.748 30.0586 23.5547V21.4453C30.0586 21.252 29.9004 21.0938 29.707 21.0938H21.6211C21.4277 21.0938 21.2695 21.252 21.2695 21.4453V23.5547C21.2695 23.748 21.4277 23.9062 21.6211 23.9062ZM21.6211 30.2344H29.707C29.9004 30.2344 30.0586 30.0762 30.0586 29.8828V27.7734C30.0586 27.5801 29.9004 27.4219 29.707 27.4219H21.6211C21.4277 27.4219 21.2695 27.5801 21.2695 27.7734V29.8828C21.2695 30.0762 21.4277 30.2344 21.6211 30.2344ZM14.9414 16.1719C14.9414 16.6381 15.1266 17.0852 15.4563 17.4148C15.7859 17.7445 16.233 17.9297 16.6992 17.9297C17.1654 17.9297 17.6125 17.7445 17.9422 17.4148C18.2718 17.0852 18.457 16.6381 18.457 16.1719C18.457 15.7057 18.2718 15.2586 17.9422 14.9289C17.6125 14.5993 17.1654 14.4141 16.6992 14.4141C16.233 14.4141 15.7859 14.5993 15.4563 14.9289C15.1266 15.2586 14.9414 15.7057 14.9414 16.1719ZM14.9414 22.5C14.9414 22.9662 15.1266 23.4133 15.4563 23.743C15.7859 24.0726 16.233 24.2578 16.6992 24.2578C17.1654 24.2578 17.6125 24.0726 17.9422 23.743C18.2718 23.4133 18.457 22.9662 18.457 22.5C18.457 22.0338 18.2718 21.5867 17.9422 21.257C17.6125 20.9274 17.1654 20.7422 16.6992 20.7422C16.233 20.7422 15.7859 20.9274 15.4563 21.257C15.1266 21.5867 14.9414 22.0338 14.9414 22.5ZM14.9414 28.8281C14.9414 29.2943 15.1266 29.7414 15.4563 30.0711C15.7859 30.4007 16.233 30.5859 16.6992 30.5859C17.1654 30.5859 17.6125 30.4007 17.9422 30.0711C18.2718 29.7414 18.457 29.2943 18.457 28.8281C18.457 28.3619 18.2718 27.9148 17.9422 27.5852C17.6125 27.2555 17.1654 27.0703 16.6992 27.0703C16.233 27.0703 15.7859 27.2555 15.4563 27.5852C15.1266 27.9148 14.9414 28.3619 14.9414 28.8281Z" fill="#F4F5F5" />
                </svg>
                <h3 className="text-2xl text-secondary2 ml-2">ข้อมูลส่วนตัว</h3>
            </div>

            <div className="bg-secondary2 mt-10 rounded-lg p-8 text-secondary1">
                <div>
                    <div className="flex justify-between">
                        <p className="text-lg font-semibold">ข้อมูลส่วนตัว</p>
                        <Link
                            href={'profile/EditProfile'}
                            className="flex hover:text-natural04"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M7 7H6C5.46957 7 4.96086 7.21071 4.58579 7.58579C4.21071 7.96086 4 8.46957 4 9V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H15C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18V17" />
                                <path d="M16 4.99998L19 7.99998M20.385 6.58499C20.7788 6.19114 21.0001 5.65697 21.0001 5.09998C21.0001 4.543 20.7788 4.00883 20.385 3.61498C19.9912 3.22114 19.457 2.99988 18.9 2.99988C18.343 2.99988 17.8088 3.22114 17.415 3.61498L9 12V15H12L20.385 6.58499Z"  />
                            </svg>
                            แก้ไข
                        </Link>
                    </div>
                    <div className="mt-5 leading-loose">
                        <p>
                            <strong>ชื่อผู้รับ :</strong>
                            {userData.fname} {userData.lname}
                        </p>
                        <p>
                            <strong>เบอร์โทรศัพท์ :</strong>
                            {userData.tel}
                        </p>
                        <p>
                            <strong>อีเมล :</strong>
                            อีเมล@mail.com
                        </p>
                        <p>
                            <strong>ที่อยู่จัดส่ง :</strong>
                            หอพักหญิงอยู่สบาย 193 ถนน 30กันยา , ในเมือง เมืองนครราชสีมา นครราชสีมา 30000
                        </p>
                    </div>
                    <div className="w-full h-0.5 bg-gradient-to-r from-[#CA0808] to-[#0FC0E7] mx-auto mt-5"></div>

                </div>

                <div className="mt-10">
                    <div className="flex justify-between">
                        <p className="text-lg font-semibold">ข้อมูลส่วนตัว</p>
                        <Link
                            href={'profile/EditProfile'}
                            className="flex hover:text-natural04"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M7 7H6C5.46957 7 4.96086 7.21071 4.58579 7.58579C4.21071 7.96086 4 8.46957 4 9V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H15C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18V17"  />
                                <path d="M16 4.99998L19 7.99998M20.385 6.58499C20.7788 6.19114 21.0001 5.65697 21.0001 5.09998C21.0001 4.543 20.7788 4.00883 20.385 3.61498C19.9912 3.22114 19.457 2.99988 18.9 2.99988C18.343 2.99988 17.8088 3.22114 17.415 3.61498L9 12V15H12L20.385 6.58499Z" />
                            </svg>
                            แก้ไข
                        </Link>
                    </div>
                    <div className="mt-5 leading-loose">
                        <p>
                            <strong>ชื่อผู้รับ :</strong>
                            สวัสดี วันจันทร์
                        </p>
                        <p>
                            <strong>เบอร์โทรศัพท์ :</strong>
                            0954982096
                        </p>
                        <p>
                            <strong>อีเมล :</strong>
                            อีเมล@mail.com
                        </p>
                        <p>
                            <strong>ที่อยู่จัดส่ง :</strong>
                            หอพักหญิงอยู่สบาย 193 ถนน 30กันยา , ในเมือง เมืองนครราชสีมา นครราชสีมา 30000
                        </p>
                    </div>
                    <div className="w-full h-0.5 bg-gradient-to-r from-[#CA0808] to-[#0FC0E7] mx-auto mt-5"></div>

                </div>

                <div className="mt-10">
                    <div className="flex justify-between">
                        <p className="text-lg font-semibold">ข้อมูลส่วนตัว</p>
                        <Link
                            href={'profile/EditProfile'}
                            className="flex hover:text-natural04"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M7 7H6C5.46957 7 4.96086 7.21071 4.58579 7.58579C4.21071 7.96086 4 8.46957 4 9V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H15C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18V17"  />
                                <path d="M16 4.99998L19 7.99998M20.385 6.58499C20.7788 6.19114 21.0001 5.65697 21.0001 5.09998C21.0001 4.543 20.7788 4.00883 20.385 3.61498C19.9912 3.22114 19.457 2.99988 18.9 2.99988C18.343 2.99988 17.8088 3.22114 17.415 3.61498L9 12V15H12L20.385 6.58499Z"  />
                            </svg>
                            แก้ไข
                        </Link>
                    </div>
                    <div className="mt-5 leading-loose">
                        <p>
                            <strong>ชื่อผู้รับ :</strong>
                            สวัสดี วันจันทร์
                        </p>
                        <p>
                            <strong>เบอร์โทรศัพท์ :</strong>
                            0954982096
                        </p>
                        <p>
                            <strong>อีเมล :</strong>
                            อีเมล@mail.com
                        </p>
                        <p>
                            <strong>ที่อยู่จัดส่ง :</strong>
                            หอพักหญิงอยู่สบาย 193 ถนน 30กันยา , ในเมือง เมืองนครราชสีมา นครราชสีมา 30000
                        </p>
                    </div>

                </div>
            </div>

        </div>
    )
}
export default CustomerProfile;