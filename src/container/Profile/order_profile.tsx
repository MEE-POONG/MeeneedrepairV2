import Link from "next/link";
import ModalOrder from './ModalOrder';
import { TbShoppingCartSearch } from "react-icons/tb";
import Image from "next/image";
const OrderProfile: React.FC = (props) => {
    return (
        <div className="">
            <div className="flex items-center">
                <TbShoppingCartSearch className='w-[25px] h-[25px]' />
                <h3 className="text-2xl text-black ml-2">รายการคำสั่งซื้อ</h3>
            </div>

            <div className=" rounded-lg md:p-8 text-secondary1 text-sm md:text-base">

                <div className="bg-secondary2 rounded-2xl p-3 grid grid-cols-12 mb-5">
                    <Image src="/images/joystick.png" alt="" className="col-span-2 md:col-span-2 h-24 w-24 object-contain" />
                    <p className="col-span-4 md:col-span-6 self-center truncate">ชื่อสินค้า</p>
                    <p className="col-span-2 md:col-span-1 self-center text-[#FF5C74] text-center">฿ 490</p>
                    <div className="col-span-3 md:col-span-2 self-center flex justify-center flex-wrap">สถานะ:
                        <p className="self-center md:ml-1 text-green-500 text-center">สำเร็จ</p>
                    </div>

                    <div className="flex items-center justify-center">
                        <ModalOrder />
                    </div>

                </div>


                <div className="bg-secondary2 rounded-2xl p-3 grid grid-cols-12 mb-5">
                    <Image src="/images/joystick.png" alt="" className="col-span-2 md:col-span-2 h-24 w-24 object-contain" />
                    <p className="col-span-4 md:col-span-6 self-center truncate">ชื่อสินค้า ถ้ายาวจะเป็นแบบนี้ อันนี้คือความยาวของตัวหนังสือ ถ้ายาว </p>
                    <p className="col-span-2 md:col-span-1 self-center text-[#FF5C74] text-center">฿ 490</p>
                    <div className="col-span-3 md:col-span-2  self-center flex justify-center flex-wrap">สถานะ:
                        <p className="self-center md:ml-1 text-orange-500 text-center">เตรียม</p>
                    </div>

                    <div className="flex items-center justify-center">
                        <ModalOrder />
                    </div>

                </div>

                <div className="bg-secondary2 rounded-2xl p-3 grid grid-cols-12 mb-5">
                    <Image src="/images/joystick.png" alt="" className="col-span-2 md:col-span-2 h-24 w-24 object-contain" />
                    <p className="col-span-4 md:col-span-6 self-center truncate">ชื่อสินค้า</p>
                    <p className="col-span-2 md:col-span-1 self-center text-[#FF5C74] text-center">฿ 490</p>
                    <div className="col-span-3 md:col-span-2  self-center flex justify-center flex-wrap">สถานะ:
                        <p className="self-center md:ml-1 text-orange-500 text-center">กำลังส่ง</p>
                    </div>

                    <div className="flex items-center justify-center">
                        <ModalOrder />
                    </div>

                </div>


                <div className="bg-secondary2 rounded-2xl p-3 grid grid-cols-12 mb-5">
                    <Image src="/images/joystick.png" alt="" className="col-span-2 md:col-span-2 h-24 w-24 object-contain" />
                    <p className="col-span-4 md:col-span-6 self-center truncate">ชื่อสินค้า</p>
                    <p className="col-span-2 md:col-span-1 self-center text-[#FF5C74] text-center">฿ 490</p>
                    <div className="col-span-3 md:col-span-2  self-center flex justify-center flex-wrap">สถานะ:
                        <p className="self-center md:ml-1 text-red-500 text-centertext-center">ยกเลิก</p>
                    </div>

                    <div className="flex items-center justify-center">
                        <ModalOrder />
                    </div>

                </div>








            </div>

        </div>
    )
}
export default OrderProfile;