import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import useAxios from "axios-hooks";

interface Orderlist {
    id: string;
    date: Date;
    status: string;
    OrderList: any[]; // สมมติว่าเป็นอาร์เรย์ของสินค้า
}

const ModalOrderlist: React.FC<{ OrderlistData: Orderlist }> = ({ OrderlistData }) => {
    const [open, setOpen] = useState(false);
    const cancelButtonRef = useRef(null);
    const [{ loading: deleteAppointmentLoading, error: deleteAppointmentError }, executeAppointmentDelete] = useAxios({}, { manual: true });

    const deleteAppointment = async (id: string): Promise<void> => {
        try {
            await executeAppointmentDelete({
                url: `/api/orderlist/${id}`,
                method: "DELETE",
            });
            setOpen(false);
        } catch (error) {
            console.error("Error deleting orderlist:", error);
        }
    };

    return (
        <>
            <button onClick={() => setOpen(true)}>
                รายละเอียด
            </button>

            {open ? (
                <Transition.Root show={open} as={Fragment}>
                    <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => setOpen(false)}>
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
                                                <p className='col-span-3 row-span-2 text-right'>วันที่สั่งซื้อ :</p>
                                                <p className='col-span-9 row-span-2 text-rose-500'>
                                                    <strong>
                                                        {new Date(OrderlistData.date).toLocaleDateString('th-TH', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                        })}
                                                    </strong>
                                                </p>
                                            </div>
                                            <div className='grid grid-cols-12 grid-rows-2 space-x-1'>
                                                <p className='col-span-3 row-span-2 text-right'>สถานะคำสั่งซื้อ :</p>
                                                <p className='col-span-9 row-span-2 text-rose-500'> <strong> {OrderlistData.status} </strong></p>
                                            </div>
                                            {OrderlistData.OrderList.map((orderItem: any, index: number) => (
                                                <div key={index} className="grid grid-cols-12 grid-rows-2 space-x-1">
                                                    <p className="col-span-3 row-span-2 text-right">สินค้า {index + 1}:</p>
                                                    <p className="col-span-9 row-span-2 text-rose-500">
                                                        <strong>{orderItem.Products.productname} {orderItem.Products.description} {orderItem.Products.productmodel}
                                                        </strong>
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="bg-gray-50 px-4 gap-2 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <button
                                                onClick={() => deleteAppointment(OrderlistData.id)}
                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white hover:text-black shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            >
                                                แจ้งชำระสินค้า
                                            </button>
                                            <button
                                                type="button"
                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:text-black shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                onClick={() => setOpen(false)}
                                                ref={cancelButtonRef}
                                            >
                                                ปิด
                                            </button>
                                            <button
                                                onClick={() => deleteAppointment(OrderlistData.id)}
                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:text-black shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            >
                                                ยกเลิกการจองคิว
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

export default ModalOrderlist;
