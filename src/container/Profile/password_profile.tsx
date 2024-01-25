import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LuUnlock } from "react-icons/lu";

const PasswordProfile: React.FC = (props) => {
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

    const handleSave = () => {
        const oldPasswordElement = document.getElementById('oldPassword') as HTMLInputElement;
        const newPasswordElement = document.getElementById('newPassword') as HTMLInputElement;
        const confirmPasswordElement = document.getElementById('confirmPassword') as HTMLInputElement;

        if (oldPasswordElement && newPasswordElement && confirmPasswordElement) {
            const oldPassword = oldPasswordElement.value;
            const newPassword = newPasswordElement.value;
            const confirmPassword = confirmPasswordElement.value;

            // ตรวจสอบรหัสผ่านเดิม
            if (oldPassword !== userData.password) {
                alert('รหัสผ่านเดิมไม่ถูกต้อง');
                return;
            }

            // ตรวจสอบรหัสผ่านใหม่และยืนยันรหัสผ่านใหม่
            if (newPassword !== confirmPassword) {
                alert('รหัสผ่านใหม่ไม่ตรงกัน');
                return;
            }

            // ส่งข้อมูลไปยัง API เพื่อแก้ไขรหัสผ่าน
            fetch(`/api/user/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password: newPassword }),
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


    };



    return (
        <div className="">
            <div className="flex items-center">
            <LuUnlock className='w-[25px] h-[25px]' />
                <h3 className="text-2xl text-black ml-2">เปลี่ยนรหัสผ่าน</h3>
            </div>

            <div className="bg-secondary2 mt-10 rounded-lg p-8 text-secondary1">
                <div>
                    <div className="flex justify-between">
                        <p className="text-lg font-semibold">เปลี่ยนรหัสผ่าน</p>

                    </div>
                    <div className="mt-5 leading-loose gap-y-2 flex flex-wrap">

                        <p className="">
                            <strong>รหัสผ่านเดิม </strong>
                        </p>
                        {/* {userData.fname} {userData.lname} */}
                        <input id="oldPassword" type="text" placeholder="รหัสผ่านเดิม" className="  w-full h-9 pl-2 border border-b-black focus:outline-none focus:border-b-blue-500" />



                        <p className="">
                            <strong>รหัสผ่านใหม่ </strong>
                        </p>
                        {/* {userData.tel} */}
                        <input id="newPassword" type="text" placeholder="รหัสผ่านใหม่" className=" w-full h-9 pl-2 border border-b-black focus:outline-none focus:border-b-blue-500" />




                        <p className="">
                            <strong>ยืนยันรหัสผ่านใหม่ </strong>
                            {/* อีเมล@mail.com */}
                        </p>
                        <input id="confirmPassword" type="text" placeholder="ยืนยันรหัสผ่านใหม่" className="w-full h-9 pl-2 border border-b-black focus:outline-none focus:border-b-blue-500" />






                    </div>



                </div>



            </div>
            <div className="flex justify-center my-5">
                <button onClick={handleSave} className="bg-[#18BCEB] h-10 w-24 rounded-3xl text-secondary2">บันทึก</button>
            </div>
        </div>
    )
}
export default PasswordProfile;