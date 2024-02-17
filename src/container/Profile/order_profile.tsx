import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineTool } from "react-icons/ai";
import Image from "next/image";
import ModalOrderlist from "./Modal/ModalOrderlist";

const OrderProfile: React.FC = (props) => {
    const router = useRouter();
    const { id } = router.query;
    const [OrderData, setOrderData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false); // เพิ่ม state เพื่อเก็บสถานะของ Modal

    useEffect(() => {
        if (id) {
            fetch(`/api/user/orderlist/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    setOrderData(data.Order);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setIsLoading(false);
                });
        }
    }, [id]);

    return (
        <div className="">
            <div className="flex items-center">
                <AiOutlineTool className='w-[25px] h-[25px]' />
                <h3 className="text-2xl text-black ml-2">บริการซ่อมอุปกรณ์</h3>
            </div>

            <div className="rounded-lg md:p-8 text-secondary1 text-sm md:text-base ">
                {OrderData && OrderData.map((order: any, index: number) => (
                    <div className="bg-secondary2 rounded-2xl p-3 grid grid-cols-12 mb-5" key={index}>
                        <img src="" alt="" className="col-span-2 md:col-span-2 h-24 w-24 object-contain" width={100} height={100} />
                        <div className="col-span-4 md:col-span-5 self-center flex flex-wrap">
                            รายการที่: {index + 1} {/* แสดงหมายเลขลำดับของรายการ */}
                           
                        </div>

                        <div className="col-span-2 md:col-span-2 self-center  flex justify-center flex-wrap">
                            วันที่: {new Date(order.date).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>

                        <div className="col-span-3 md:col-span-2 self-center flex justify-center flex-wrap">
                            สถานะ: {order.status}
                        </div>

                        {/* เรียกใช้ ModalOrderlist เมื่อคลิกที่ปุ่ม */}
                        <ModalOrderlist OrderlistData={order} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderProfile;
