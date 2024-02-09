import Link from "next/link";
import ModalRepair from "./ModalRepair";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineTool } from "react-icons/ai";
const RepairProfile: React.FC = (props) => {

    const router = useRouter();
    const { id } = router.query; // ดึงค่า id จาก query parameters
    const [AppointmentData, setAppointmentData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        if (id) {
            fetch(`/api/user/appointment/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    // console.log("ข้อมูลเริ่มต้นของ appointment");
                    // console.log(data);
                    // console.log(data.Appointment);
                    setAppointmentData(data.Appointment);
                    // console.log(data.AddressId);
                    // console.log(data.Address);


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
                <AiOutlineTool className='w-[25px] h-[25px]' />
                <h3 className="text-2xl text-black ml-2">บริการซ่อมอุปกรณ์</h3>
            </div>

            <div className=" rounded-lg md:p-8 text-secondary1 text-sm md:text-base ">

                {AppointmentData && AppointmentData.map((appointment: any, index: number) => (
                    <div className="bg-secondary2 rounded-2xl p-3 grid grid-cols-12 mb-5" key={index}>
                        <img src="" alt="" className="col-span-2 md:col-span-2 h-24 w-24 object-contain" />
                        <div className="col-span-4 md:col-span-5 self-center flex flex-wrap">
                            อุปกรณ์:
                            <p className="md:ml-1 text-[#645cff]  self-center truncate">{appointment.request}</p>

                        </div>
                        <div className="col-span-2 md:col-span-2 self-center  flex justify-center flex-wrap">
                            วันที่:
                            <p className="md:ml-1 text-[#645cff] text-center"> {new Date(appointment.time).toLocaleDateString('th-TH', {
                                year: 'numeric',
                                month: 'long',
                                // month: 'long',
                                day: 'numeric',
                            })} </p>

                        </div>

                        <div className="col-span-3 md:col-span-2 self-center flex justify-center flex-wrap">
                            สถานะ:
                            <strong className={`self-center md:ml-1 text-${appointment.status === 'กำลังดำเนินการ' ? 'yellow-400' : appointment.status === 'อยู่ระหว่างการซ่อม' ? 'green-500' : 'red-500'} text-center`}>{appointment.status}</strong>
                        </div>
                        {/* <div className="flex items-center justify-center">
                            <ModalRepair appointmentData={appointment} />
                        </div> */}
                    </div>
                ))}





            </div>

        </div>
    )
}
export default RepairProfile;