import { SetStateAction, useState } from 'react';
import useAxios from "axios-hooks";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaYoutube, FaGoogle, FaLeaf } from "react-icons/fa";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { PiWarningCircleFill } from "react-icons/pi";
import crypto from 'crypto';
import RootLayout from '@/components/Layout';


function RegisterFrom() {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [tel, setTel] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [secretKey, setSecretKey] = useState('');

    const [errorText, setErrorText] = useState(false);
    const [showModal, setShowModal] = useState(false); // State for controlling modal visibility

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [{ error: errorpassword, loading: IndexActivityLoading }, executeIndexActivity] = useAxios(
        { url: '/api/user', method: 'POST' },
        { manual: true }
    );

    const handlePasswordChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setPassword(e.target.value);
        // เมื่อรหัสผ่านเปลี่ยน ตรวจสอบว่ารหัสผ่านและรหัสผ่านยืนยันตรงกันหรือไม่
        setPasswordsMatch(e.target.value === confirmPassword);
    };
    const handleConfirmPasswordChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setConfirmPassword(e.target.value);
        // เมื่อรหัสผ่านยืนยันเปลี่ยน ตรวจสอบว่ารหัสผ่านและรหัสผ่านยืนยันตรงกันหรือไม่
        setPasswordsMatch(e.target.value === password);
    };


    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const newSecretKey = crypto.randomBytes(16).toString('hex');
        setSecretKey(newSecretKey);

        if (!fname || !lname || !tel || !birthday || !email || !password) {

            setErrorText(true);
            return;
        }
        try {
            const response = await executeIndexActivity({
                data: { fname, lname, tel, birthday, email, password },
            });
            console.log('Response:', response);
            setShowModal(true);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handleConfirm = () => {
        window.location.reload();
        // ทำสิ่งที่คุณต้องการเมื่อยืนยัน
        // ตัวอย่าง: ปิด Modal
        setIsModalOpen(false);

    };





    return (

        <RootLayout loggedInUser="">
            <div className='login-page '>
                <div className="font-fontTH01 bg-gradient-to-br max-w-2xl mx-auto  bg-opacity-50  w-[300px] sm:w-12 md:w-6/12 lg:w-6/12 2xl:w-5/12  px-6 py-10 sm:px-10 sm:py-6  rounded-lg shadow-md lg:shadow-lg ">
                    <h2 className="text-lg text-1xl lg:text-3xl text-white ">
                        สมัครสมาชิก
                    </h2>
                    <form className="mt-10 " method="POST" onSubmit={handleSubmit}>
                        <div className=" top-[100px] flex gap-6 mb-6 lg:grid-cols-2">
                            <div className='w-[50%]'>
                                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-white dark:text-gray-300">ชื่อ</label>
                                <input type="text"
                                    value={fname}
                                    onChange={(e) => setFname(e.target.value)} id="first_name" className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="กรูณากรอกชื่อ" pattern="^[A-Za-zก-๙\s]*$" title="กรุณากรอกข้อมูลให้ถูกต้อง" required />
                            </div>
                            <div className='w-[50%]'>
                                <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-white dark:text-gray-300">นามสกุล</label>
                                <input type="text"
                                    value={lname}
                                    onChange={(e) => setLname(e.target.value)} id="last_name" className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="กรูณากรอกนามสกุล" pattern="^[A-Za-zก-๙\s]*$" title="กรุณากรอกข้อมูลให้ถูกต้อง" required />
                            </div>

                        </div>
                        <div className="mb-6 my-5">
                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-white dark:text-gray-300">เบอร์โทรศัพท์</label>
                            <input type="number"
                                value={tel}
                                onChange={(e) => setTel(e.target.value)} id="phone" className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" title="กรุณากรอกเบอร์โทรเป็นตัวเลขเท่านั้น" required />
                        </div>
                        <div>
                            <label htmlFor="date" className="block mb-2 text-sm font-medium text-white dark:text-gray-300">วัน/เดือน/ปี เกิด</label>
                            <input type="date"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)} id="website" className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div className="mb-6 my-5">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-white dark:text-gray-300">Email address</label>
                            <input type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} id="email" className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email address" required />
                        </div>
                        <div>
                            <div className="mb-6">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white dark:text-gray-300">Password</label>
                                <input
                                    type={showPassword ? 'text' : 'password'} // ใช้ showPassword เพื่อเปิดหรือปิดการแสดงรหัสผ่าน
                                    value={password}
                                    onChange={handlePasswordChange}
                                    id="password"
                                    className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="•••••••••"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-white dark:text-gray-300">Confirm password</label>
                                <input
                                    type={showPassword ? 'text' : 'password'} // ใช้ showPassword เพื่อเปิดหรือปิดการแสดงรหัสผ่าน
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    id="confirm_password"
                                    className={`bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${passwordsMatch ? '' : 'border-red-500'}`}
                                    placeholder="•••••••••"
                                    required
                                />
                                {!passwordsMatch && <p className="text-white">กรุณากรอกรหัสผ่านให้ถูกต้อง</p>}
                            </div>
                            <div className="mb-2 text-white">

                                <input
                                    type="checkbox"
                                    checked={showPassword}
                                    onChange={toggleShowPassword}
                                    className="mr-1"
                                />
                                Show Password
                            </div>

                        </div>
                        <button type="submit"
                            className="group relative h-12 w-full overflow-hidden rounded-2xl bg-[#0F172A]  text-1xl font-bold ">
                            สมัครสมาชิก
                        </button>
                    </form>
                    {secretKey && (
                        <div className="mb-4">
                            <p className="text-white">Your secret key: {secretKey}</p>
                            <p className="text-white">Please save this key securely.</p>
                        </div>
                    )}



                    <div className="flex justify-center mt-10 items-center w-full text-center text-white bg- text-1xl my-[20px]">
                        <span className="w-full border border-white"></span>
                        <span className="px-4 ">หรือ</span>
                        <span className="w-full border border-white"></span>
                    </div>

                    <button className="flex w-full text-white text-1xl px-3 py-2 md:px-4 md:py-3 rounded-lg font-medium bg-[#1879EB]">
                        <span className="text-md md:text-[25px]">
                            <FaFacebook />
                        </span>
                        <span className="ml-2 md:mx-10 text-xs md:text-lg">เข้าสู่ระบบด้วย Facebook</span>
                    </button>
                    <button className=" flex w-full my-3 text-white text-1xl px-3 py-2 md:px-4 md:py-3 rounded-lg font-medium bg-[#0F172A]">
                        <span className="text-md md:text-[25px]">
                            <FaGoogle />
                        </span>
                        <span className="ml-2 md:mx-10 text-xs md:text-lg">เข้าสู่ระบบด้วย Google</span>
                    </button>




                    <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center justify-center text-white">
                        <p>มีบัญชีผู้ใช้แล้ว?</p>
                        <Link className="mx-3 " href="./login">
                            <p className="flex-2 underline mx-2 text-[#1879EB]">
                                เข้าสู่ระบบ
                            </p>
                        </Link>

                    </div>



                    {showModal && (
                        <div className="modal fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 ">
                            <div className="bg-white p-6 rounded-lg w-[500px] h-[300px] flex flex-col items-center justify-center">
                                <div className='text-8xl mx-auto my-5 text-green-500'><BsFillCheckCircleFill /></div>
                                <h2 className="text-4xl font-semibold mb-4">สมัครเสร็จสิ้น</h2>
                                <p>คุณได้ทำการสมัรเสร็จสิ้น</p>
                                <div className="mt-4">
                                    <button
                                        onClick={handleConfirm}
                                        className="px-4 py-2 bg-green-500 text-white rounded-md"
                                    >
                                        ยืนยัน
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {errorText && (
                        <div className="modal fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 ">
                            <div className="bg-white p-6 rounded-lg w-[500px] h-[300px] flex flex-col items-center justify-center">
                                <div className='text-8xl mx-auto my-5 text-red-500'><PiWarningCircleFill /></div>
                                <h2 className="text-4xl font-semibold mb-4">กรุณากรอกข้อมูลให้ถูกต้อง</h2>
                                <p>ทำการกรอกข้อมูลให้ถูกต้อง</p>
                                <div className="mt-4">
                                    <button
                                        onClick={handleConfirm}
                                        className="px-4 py-2 bg-red-500 text-white rounded-md"
                                    >
                                        กลับ
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </RootLayout>



    );
}

export default RegisterFrom;

