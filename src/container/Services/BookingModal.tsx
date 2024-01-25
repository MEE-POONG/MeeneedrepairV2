
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function BookingModal() {
    const [open, setOpen] = useState(false)

    const cancelButtonRef = useRef(null)
    return (
        <>

            <button className=" font-fontTH01 w-[250px] h-[100px] bg-[#FFCD4B] rounded-2xl text-2xl" onClick={() => setOpen(true)}>จองซ่อม </button>



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
                                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg  text-left shadow-xl transition-all sm:my-8 ">







                                        <div className="bg-secondary2 mt-32  rounded-lg p-8 text-secondary1 lg:w-[1000px] font-fontTH01 ">
                                            <div>

                                                <div className="flex justify-between">
                                                    <p className="text-4xl font-semibold">จองคิวซ่อม</p>
                                                    <button onClick={() => setOpen(false)}>x</button>
                                                </div>
                                                <div className="mt-5 leading-loose">
                                                    <p className="text-lg">ข้อมูลผู้ติดต่อ</p>

                                                    <div className="grid grid-cols-12 gap-5 md:ml-10 my-5">

                                                        <div className="col-span-12 md:col-span-6">
                                                            <p className="text-[#666363] my-2">ชื่อ</p>
                                                            <input type="text" className=" w-full h-9 pl-2 border border-b-black focus:outline-none focus:border-b-blue-500" />
                                                        </div>

                                                        <div className="col-span-12 md:col-span-6">
                                                            <p className="text-[#666363] my-2">นามสกุล   </p>
                                                            <input type="text" className=" w-full h-9 pl-2 border border-b-black focus:outline-none focus:border-b-blue-500 " />
                                                        </div>

                                                        <div className="col-span-12 md:col-span-6">
                                                            <p className="text-[#666363] my-2">เบอร์โทรศัพท์</p>
                                                            <input type="text" className=" w-full h-9 pl-2   border border-b-black focus:outline-none focus:border-b-blue-500 " />
                                                        </div>

                                                        <div className="col-span-12 md:col-span-6">
                                                            <p className="text-[#666363] my-2">อีเมล</p>
                                                            <input type="text" className=" w-full h-9 pl-2   border border-b-black focus:outline-none focus:border-b-blue-500 " />
                                                        </div>

                                                    </div>



                                                    <div className="flex justify-between mt-10">
                                                        <p className="text-lg">อุปกรณ์ที่ต้องการซ่อม</p>
                                                        {/* <p className="text-sm">dsadsa</p> */}
                                                    </div>

                                                    <div className="grid grid-cols-12 gap-5 md:ml-10 my-5 ">

                                                        <div className="col-span-12">
                                                            <p className="text-[#666363] my-2  ">อุปกรณ์ที่ต้องการซ่อม</p>
                                                            <select className=" w-full h-9 pl-2  border border-b-black focus:outline-none focus:border-b-blue-500 " >
                                                                <option value="" disabled selected hidden >กรุณาเลือกประเภทอุปกรณ์</option>
                                                                <option value="บ้าน">บ้าน</option>
                                                                <option value="ที่ทำงาน">ที่ทำงาน</option>
                                                                <option value="หอพัก/คอนโด">หอพัก/คอนโด</option>
                                                            </select>
                                                        </div>

                                                        <div className="col-span-12">
                                                            <p className="text-[#666363] my-2">อธิบายอาการของอุปกรณ์พอสังเขป</p>
                                                            <textarea className=" w-full h-36 pl-2 border border-b-black focus:outline-none focus:border-b-blue-500 " />
                                                        </div>





                                                    </div>




                                                </div>
                                            </div>

                                            <div className='flex justify-center'>
                                                <button className='bg-[#FFCD4B]  rounded-full h-20 w-48 text-xl shadow-xl'>
                                                    จองคิว
                                                </button>
                                            </div>
                                            {/* <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => setOpen(false)}
                  >
                    Deactivate
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button> */}
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