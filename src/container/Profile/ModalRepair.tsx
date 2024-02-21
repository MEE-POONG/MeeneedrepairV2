import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

// Import Appointment type from your project

// Import axios-hooks and useRouter from appropriate libraries
import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import { Appointment } from '@prisma/client';

// Define Props interface
interface ModalRepairProps {
    appointmentData: Appointment; // Use the Appointment type from your project
}

// Modify ModalRepair component to accept props with the correct type
const ModalRepair: React.FC<ModalRepairProps> = ({ appointmentData }) => {
    const [open, setOpen] = useState(false)
    const router = useRouter();
    const cancelButtonRef = useRef(null)

    const [
        { loading: deleteAppointmentLoading, error: deleteAppointmentError },
        executeAppointmentDelete,
    ] = useAxios({}, { manual: true });

    const deleteAppointment = async (id: string): Promise<void> => {
        try {
            await executeAppointmentDelete({
                url: `/api/appointment/${id}`,
                method: "DELETE",
            });
        } catch (error) {
            console.error("Error deleting appointment:", error);
        }
    };

    return (
        <>
            <button onClick={() => setOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-file-description" width="32" height="32" viewBox="0 0 24 24" fill="none" >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                    <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
                    <path d="M9 17h6"></path>
                    <path d="M9 13h6"></path>
                </svg>
            </button>

            {open ? (
                <Transition.Root show={open} as={Fragment}>
                    <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                >
                                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                        <div className='m-10 space-y-2'>
                                            <div className='grid grid-cols-12 grid-rows-2 space-x-1'>
                                                <p className='col-span-3 row-span-2 text-right'>ชื่ออุปกรณ์ซ่อม :</p>
                                                <p className='col-span-9 row-span-2 text-rose-500'><strong>{appointmentData.request}</strong></p>
                                            </div>
                                            <div className='grid grid-cols-12 grid-rows-2 space-x-1'>
                                                <p className='col-span-3 row-span-2 text-right'>ชื่อผู้ส่งซ่อม :</p>
                                                <p className='col-span-9 row-span-2  text-rose-500'><strong>{appointmentData.fname} {appointmentData.lname}</strong></p>
                                            </div>

                                            <div className='grid grid-cols-12 grid-rows-2 space-x-1'>
                                                <p className='col-span-3 row-span-2 text-right'>สถานะการจอง :</p>
                                                <p className='col-span-9 row-span-2 text-rose-500'> <strong> {appointmentData.status} </strong></p>
                                            </div>
                                            <div className='grid grid-cols-12 grid-rows-2 space-x-1'>
                                                <p className='col-span-3 row-span-2 text-right'>เบอร์โทรศัพท์ :</p>
                                                <p className='col-span-9 row-span-2  text-rose-500'><strong>{appointmentData.tel}</strong></p>
                                            </div>
                                            {/* ถ้ามีข้อมูล หรือ วีดีโอในฐานข้อมูลจะแสดงคำว่าดูวีดีโอ ถ้าไม่มีจะแสดงคำว่า ไม่มีวีดีโอ */}
                                            <div className='grid grid-cols-12 grid-rows-2 space-x-1'>
                                                <p className='col-span-3 row-span-2 text-right'>วีดีโอ :</p>
                                                {appointmentData.video ? (
                                                    <a href={appointmentData.video} target="_blank" className='col-span-9 row-span-2 text-rose-500'>
                                                        <strong>ดูวีดีโอ</strong>
                                                    </a>
                                                ) : (
                                                    <p className='col-span-9 row-span-2 text-rose-500'>ไม่มีวีดีโอ</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <button
                                                onClick={() => deleteAppointment(appointmentData.id)}
                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:text-black shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            >
                                                ยกเลิกการจองคิว
                                            </button>
                                            <button
                                                type="button"
                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:text-black shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                onClick={() => setOpen(false)}
                                                ref={cancelButtonRef}
                                            >
                                                ปิด
                                            </button>

                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>
            ) : null}
        </>
    )
}
export default ModalRepair;
