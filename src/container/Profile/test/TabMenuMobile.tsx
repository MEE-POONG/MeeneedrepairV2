import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function TabMenuMobile({ activeTab, handleTabClick }: any) {
    return (
        <Menu as="div" className="relative my-5 font-fontTH02">
            <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-[#0F172A] px-3 py-2 text-xl font-semibold text-white shadow-sm  hover:bg-[#0F172A]">
                    จัดการบัญชีผู้ใช้
                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-white" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className=" right-0 w-full bg-[#1E293B] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    style={{
                        width: '100%',  // ตั้งค่าความกว้างเท่ากับ Menu
                        top: '100%',    // ตั้งค่า top ให้ Menu.Items อยู่ด้านล่างของ Menu
                    }}
                >
                    <div className="py-1 text-center">
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    onClick={() => handleTabClick(0)}
                                    className={classNames(
                                        active ? 'bg-white text-white' : 'text-white',
                                        'block px-4 py-2 text-xl border-black border-b'
                                    )}
                                >
                                    ข้อมูลส่วนตัว
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    onClick={() => handleTabClick(1)}
                                    className={classNames(
                                        active ? 'bg-white text-white' : 'text-white',
                                        'block px-4 py-2 text-xl border-black border-b'
                                    )}
                                >
                                    จัดการข้อมูลส่วนตัว
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    onClick={() => handleTabClick(2)}
                                    className={classNames(
                                        active ? 'bg-white text-white' : 'text-white',
                                        'block px-4 py-2 text-xl border-black border-b'
                                    )}
                                >
                                    เพิ่มที่อยู่ส่ง
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    onClick={() => handleTabClick(3)}
                                    className={classNames(
                                        active ? 'bg-white text-white' : 'text-white',
                                        'block px-4 py-2 text-xl border-black border-b'
                                    )}
                                >
                                    ใบเสร็จ/ใบกำกับภาษี
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    onClick={() => handleTabClick(4)}
                                    className={classNames(
                                        active ? 'bg-white text-white' : 'text-white',
                                        'block px-4 py-2 text-xl border-black border-b'
                                    )}
                                >
                                    บริการซ่อมอุปกรณ์
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    onClick={() => handleTabClick(5)}
                                    className={classNames(
                                        active ? 'bg-white text-white' : 'text-white',
                                        'block px-4 py-2 text-xl border-black border-b'
                                    )}
                                >
                                    รายการคำสั่งซื้อ
                                </a>
                            )}
                        </Menu.Item>

                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    onClick={() => handleTabClick(6)}
                                    className={classNames(
                                        active ? 'bg-white text-white' : 'text-white',
                                        'block px-4 py-2 text-xl border-black border-b'
                                    )}
                                >
                                    รายการโปรด
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    onClick={() => handleTabClick(7)}
                                    className={classNames(
                                        active ? 'bg-white text-white' : 'text-white',
                                        'block px-4 py-2 text-xl border-black border-b'
                                    )}
                                >
                                    เปลี่ยนรหัสผ่าน
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    onClick={() => handleTabClick(8)}
                                    className={classNames(
                                        active ? 'bg-white text-white' : 'text-white',
                                        'block px-4 py-2 text-xl border-black '
                                    )}
                                >
                                    ออกจากระบบ
                                </a>
                            )}
                        </Menu.Item>

                       

                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
