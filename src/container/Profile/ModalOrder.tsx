import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
const ModalOrder: React.FC = (props) => {

    const [open, setOpen] = useState(false)

    const cancelButtonRef = useRef(null)

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
                                                <p className='col-span-3 row-span-2 text-right'>ชื่อสินค้า :</p>
                                                <p className='col-span-9 row-span-2'>KAKA K2SUPER คีย์บอร์ดที่ดีที่สุดสำหรับคนทำงาน</p>
                                            </div>
                                            <div className='grid grid-cols-12 grid-rows-2 space-x-1'>
                                                <p className='col-span-3 row-span-2 text-right'>ราคา :</p>
                                                <p className='col-span-9 row-span-2'>250 บาท</p>
                                            </div>
                                            <div className='grid grid-cols-12 grid-rows-2 space-x-1'>
                                                <p className='col-span-3 row-span-2 text-right'>วันที่สั่งซื้อ :</p>
                                                <p className='col-span-9 row-span-2'>15/8/2023</p>
                                            </div>
                                            <div className='grid grid-cols-12 grid-rows-2 space-x-1'>
                                                <p className='col-span-3 row-span-2 text-right'>หมายเลขคำสั่งซื้อ :</p>
                                                <p className='col-span-9 row-span-2'>P0000003932</p>
                                            </div>
                                            <div className='grid grid-cols-12 grid-rows-2 space-x-1'>
                                                <p className='col-span-3 row-span-2 text-right'>สถานะคำสั่งซื้อ :</p>
                                                <p className='col-span-9 row-span-2'>เตรียม</p>
                                            </div>
                                            <div className='grid grid-cols-12 grid-rows-2 space-x-1'>
                                                <p className='col-span-3 row-span-2 text-right'>ชื่อผู้รับ :</p>
                                                <p className='col-span-9 row-span-2'>ชัยวุฒิ ขันธีระพล</p>
                                            </div>
                                            <div className='grid grid-cols-12 grid-rows-2 space-x-1'>
                                                <p className='col-span-3 row-span-2 text-right'>เบอร์โทรศัพท์ :</p>
                                                <p className='col-span-9 row-span-2'>09572827374</p>
                                            </div>
                                            <div className='grid grid-cols-12 grid-rows-2 space-x-1'>
                                                <p className='col-span-3 row-span-2 text-right'>ที่อยู่จัดส่ง :</p>
                                                <p className='col-span-9 row-span-2'>ร้านวันนี้ไม่มีขายพรุ่งนี้มาใหม่ บ้านเลขที่ 214/23 ซอยพัฒนาไทย ถนนพันธุระ ตำบลในเมือง อำเภอเมือง จังหวัดศรีษะเกษ 42150</p>
                                            </div>


                                        </div>




                                        {/* <div className='grid grid-cols-12 m-10'>
                                            <div className=' text-right col-span-3 space-y-1'>
                                                <p>ชื่อสินค้า :</p>
                                                <p>ราคา :</p>
                                                <p>หมายเลขคำสั่งซื้อ : </p>
                                                <p>สถานะคำสั่งซื้อ :</p>
                                                <p>ชื่อผู้รับ :</p>
                                                <p>เบอร์โทรศัพท์ :</p>
                                                <p>ที่อยู่จัดส่ง :</p>
                                            </div>

                                            <div className='col-span-9 ml-2 space-y-1'>
                                                <p>KAKA K2SUPER คีย์บอร์ดที่ดีที่สุดสำหรับคนทำงาน</p>
                                                <p>250 บาท</p>
                                                <p>P0000003932 </p>
                                                <p>เตรียม</p>
                                                <p>ชัยวุฒิ ขันธีระพล</p>
                                                <p>09572827374</p>
                                                <p>บ้านเลขที่ 214/23 ถ.พันธุระ ต.ในเมือง อ.เมือง จ.ศรีษะเกษ 42150</p>
                                            </div>

                                        </div> */}

                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">

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
export default ModalOrder
