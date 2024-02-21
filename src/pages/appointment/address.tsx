import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function SelectAddress({ UserAddressData, onSelectAddress }: { UserAddressData: any[], onSelectAddress: (addressId: string | null) => void }) {
  const [selected, setSelected] = useState<any | null>(null);

  return (
    <>
      <Listbox value={selected} onChange={(address) => {
        setSelected(address);
        // Pass the selected address's id to the parent component
        onSelectAddress(address ? address.id : null);
      }}>
        {({ open }) => (
          <>
            <div className="relative px-[60px] mt-5 mx-auto">
              <Listbox.Button className=" w-full  bg-gray-200 text-gray-700 border border-gray-200 rounded  px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus: h-10 resize-none ">
                <span className="flex items-center">
                  <span className=" truncate">
                    {selected
                      ? `${selected.name || "ไม่มีข้อมูล"} ${selected.lname || "ไม่มีข้อมูล"} ${selected.phonenumber || "ไม่มีข้อมูล"} ${selected.addressline || "ไม่มีข้อมูล"} ${selected.district || "ไม่มีข้อมูล"} ${selected.subdistrict || "ไม่มีข้อมูล"} ${selected.province || "ไม่มีข้อมูล"} ${selected.zipcode || "ไม่มีข้อมูล"}`
                      : UserAddressData && UserAddressData.length > 0
                        ? "กรุณาเลือกที่อยู่จัดส่ง"
                        : "ยังไม่มีที่อยู่จัดส่ง"}


                  </span>
                  
                  <ChevronUpDownIcon className="h-5 w-5 text-black" aria-hidden="true" />
                
                </span>
                
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {Array.isArray(UserAddressData) ? (
                    UserAddressData.map((address) => (
                      <Listbox.Option
                        key={address.id}
                        className={({ active }) =>
                          classNames(
                            active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                            'relative cursor-default select-none py-2 pl-3 pr-9'
                          )
                        }
                        value={address}
                      >
                        {({ selected, active }) => (
                          <>
                            <div className="flex items-center">
                              <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                              <p>
                                    <strong>ชื่อผู้รับ : </strong>{address.name} {address.lname}
                                </p>
                                <p>
                                    <strong>เบอร์โทรศัพท์ : </strong>{address.phonenumber}
                                </p>
                                <p>
                                    <strong>ที่อยู่จัดส่ง : </strong>{address.addressline} {address.district} {address.province} {address.subdistrict} {address.zipcode} 
                                </p>
                                <p>
                                <strong>หมายเหตุ : </strong> {address.note}
                                </p>
                              </span>
                            </div>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? 'text-white' : 'text-indigo-600',
                                  'absolute inset-y-0 right-0 flex items-center pr-4'
                                )}
                              >
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))
                  ) : (
                    <Listbox.Option value="">ไม่มีข้อมูล</Listbox.Option>
                  )}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </>
  )
}
