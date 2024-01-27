import Link from "next/link";
import { LuReceipt } from "react-icons/lu"
const ReceiptProfile: React.FC = (props) => {


    return (
        <div className="">
            <div className="flex items-center">
                <LuReceipt className='w-[30px] h-[30px]' />
                <h3 className="text-2xl text-black ml-2">ใบเสร็จ/ใบกำกับภาษี</h3>
            </div>

            <div className="bg-secondary2 mt-10 rounded-lg p-8 text-secondary1">
                <div>
                    <p className="text-red-500 text-center mb-5">**แสดงเมื่อกดปุ่ม เพิ่มที่อยู่ หรือ แก้ไข**</p>
                    <div className="flex justify-between">
                        <p className="text-lg font-semibold">แก้ไขข้อมูลใบเสร็จ/ใบกำกับภาษี</p>

                    </div>
                    <div className="mt-5 leading-loose">
                        <p className="text-lg">ข้อมูลผู้ซื้อสินค้า</p>

                        <div className="grid grid-cols-12 gap-5 md:ml-10 my-5">

                            <div className="col-span-12 md:col-span-6">
                                <p className="text-[#666363] my-2">ชื่อผู้ซื้อสินค้า</p>
                                <input type="text" className=" w-full h-9 pl-2 border border-b-black focus:outline-none focus:border-b-blue-500" />
                            </div>

                            <div className="col-span-12 md:col-span-6">
                                <p className="text-[#666363] my-2">นามสกุลผู้ซื้อสินค้า</p>
                                <input type="text" className=" w-full h-9 pl-2 border border-b-black focus:outline-none focus:border-b-blue-500 " />
                            </div>


                            <div className="col-span-12 md:col-span-6">
                                <p className="text-[#666363] my-2">หมายเลขประจำตัวผู้เสียภาษีของผู้ซื้อ</p>
                                <input type="text" className=" w-full h-9 pl-2   border border-b-black focus:outline-none focus:border-b-blue-500 " />
                            </div>

                            <div className="col-span-12 md:col-span-12">
                                <p className="text-[#666363] my-2">ที่อยู่ผู้ซื้อสินค้า</p>
                                <input type="text" className=" w-full h-9 pl-2   border border-b-black focus:outline-none focus:border-b-blue-500 " />
                            </div>

                            <div className="col-span-12 md:col-span-6">
                                <p className="text-[#666363] my-2">รหัสไปรษณีย์</p>
                                <input type="text" className=" w-full h-9 pl-2 border border-b-black focus:outline-none focus:border-b-blue-500 " />
                            </div>

                            <div className="col-span-12 md:col-span-6">
                                <p className="text-[#666363] my-2">จังหวัด</p>
                                <select className=" w-full h-9 pl-2  border border-b-black focus:outline-none focus:border-b-blue-500 " >
                                    <option value="" disabled selected hidden className="text-gray-500">กรุณาเลือกจังหวัด</option>
                                    <option value="บ้าน">บ้าน</option>
                                    <option value="ที่ทำงาน">ที่ทำงาน</option>
                                    <option value="หอพัก/คอนโด">หอพัก/คอนโด</option>
                                </select>
                            </div>

                            <div className="col-span-12 md:col-span-6">
                                <p className="text-[#666363] my-2">อำเภอ/เขต</p>
                                <select className=" w-full h-9 pl-2  border border-b-black focus:outline-none focus:border-b-blue-500 " >
                                    <option value="" disabled selected hidden className="text-gray-500">กรุณาเลือกอำเภอ/เขต</option>
                                    <option value="บ้าน">บ้าน</option>
                                    <option value="ที่ทำงาน">ที่ทำงาน</option>
                                    <option value="หอพัก/คอนโด">หอพัก/คอนโด</option>
                                </select>
                            </div>

                            <div className="col-span-12 md:col-span-6">
                                <p className="text-[#666363] my-2">ตำบล/แขวง</p>
                                <select className=" w-full h-9 pl-2 border border-b-black focus:outline-none focus:border-b-blue-500 " >
                                    <option value="" disabled selected hidden className="text-gray-500">กรุณาเลือกตำบล/แขวง</option>
                                    <option value="บ้าน">บ้าน</option>
                                    <option value="ที่ทำงาน">ที่ทำงาน</option>
                                    <option value="หอพัก/คอนโด">หอพัก/คอนโด</option>
                                </select>
                            </div>




                        </div>



                        <div className="flex justify-between mt-10">
                            <p className="text-lg">ข้อมูลผู้ประกอบการ</p>
                            {/* <p className="text-sm">dsadsa</p> */}
                        </div>

                        <div className="grid grid-cols-12 gap-5 md:ml-10 my-5 ">


                            <div className="col-span-12 md:col-span-6">
                                <p className="text-[#666363] my-2">ชื่อผู้ประกอบการ</p>
                                <input type="text" className=" w-full h-9 pl-2 border border-b-black focus:outline-none focus:border-b-blue-500" />
                            </div>


                            <div className="col-span-12 md:col-span-6">
                                <p className="text-[#666363] my-2">หมายเลขประจำตัวผู้เสียภาษีของผู้ซื้อ</p>
                                <input type="text" className=" w-full h-9 pl-2   border border-b-black focus:outline-none focus:border-b-blue-500 " />
                            </div>

                            <div className="col-span-12 md:col-span-12">
                                <p className="text-[#666363] my-2">ที่อยู่ผู้ซื้อสินค้า</p>
                                <input type="text" className=" w-full h-9 pl-2   border border-b-black focus:outline-none focus:border-b-blue-500 " />
                            </div>



                            <div className="col-span-12 md:col-span-6">
                                <p className="text-[#666363] my-2">รหัสไปรษณีย์</p>
                                <input type="text" className=" w-full h-9 pl-2 border border-b-black focus:outline-none focus:border-b-blue-500 " />
                            </div>

                            <div className="col-span-12 md:col-span-6">
                                <p className="text-[#666363] my-2">จังหวัด</p>
                                <select className=" w-full h-9 pl-2  border border-b-black focus:outline-none focus:border-b-blue-500 " >
                                    <option value="" disabled selected hidden className="text-gray-500">กรุณาเลือกจังหวัด</option>
                                    <option value="บ้าน">บ้าน</option>
                                    <option value="ที่ทำงาน">ที่ทำงาน</option>
                                    <option value="หอพัก/คอนโด">หอพัก/คอนโด</option>
                                </select>
                            </div>

                            <div className="col-span-12 md:col-span-6">
                                <p className="text-[#666363] my-2">อำเภอ/เขต</p>
                                <select className=" w-full h-9 pl-2  border border-b-black focus:outline-none focus:border-b-blue-500 " >
                                    <option value="" disabled selected hidden className="text-gray-500">กรุณาเลือกอำเภอ/เขต</option>
                                    <option value="บ้าน">บ้าน</option>
                                    <option value="ที่ทำงาน">ที่ทำงาน</option>
                                    <option value="หอพัก/คอนโด">หอพัก/คอนโด</option>
                                </select>
                            </div>

                            <div className="col-span-12 md:col-span-6">
                                <p className="text-[#666363] my-2">ตำบล/แขวง</p>
                                <select className=" w-full h-9 pl-2 border border-b-black focus:outline-none focus:border-b-blue-500 " >
                                    <option value="" disabled selected hidden className="text-gray-500">กรุณาเลือกตำบล/แขวง</option>
                                    <option value="บ้าน">บ้าน</option>
                                    <option value="ที่ทำงาน">ที่ทำงาน</option>
                                    <option value="หอพัก/คอนโด">หอพัก/คอนโด</option>
                                </select>
                            </div>




                        </div>

                        <div className="flex flex-row gap-4 ml-10">
                            <input type="checkbox" className="self-center  w-5 h-5 pl-2 ring-2  ring-green-500" />
                            <p className="text-[#666363] my-2">ตั้งเป็นที่อยู่ปัจจุบัน</p>
                        </div>


                    </div>
                </div>
            </div>
            <div className="flex justify-center my-5">
                <button className="bg-[#18BCEB] h-10 w-24 rounded-3xl text-secondary2">บันทึก</button>
            </div>
        </div>
    )
}
export default ReceiptProfile;