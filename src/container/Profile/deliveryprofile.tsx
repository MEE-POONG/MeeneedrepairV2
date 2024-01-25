import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { User } from '@prisma/client';
import SelectAddress from "./selectaddress_personaldata_profile";
import DeleteMemberModal from "./Modal/DeleteAlertModal";
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import useAxios from "axios-hooks";

interface Address {
    name: string;
    lname: string;
    email: string;
    tel: string;
}
//พรุ่งนี้ต้อง ทำให้แก้ไขข้อมูลได้sภายในหน้านี้ และ ทำ เพิ่มที่อยู่แบบ Modal
export default function DeliveryLocations() {
    const router = useRouter();
    const { id } = router.query;
    const [deliveryLocationData, setDeliveryLocationData] = useState<any>();
    const [UserAddressData, setUserAddressData] = useState<any[]>([]); // เปลี่ยนเป็นอาร์เรย์เปล่า
    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    //

    const [{ data: addressData }, getblog] = useAxios({
        url: `/api/address/`,
        method: "GET",
    });

    const [
        { loading: deletenewsLoading, error: deletenewsError },
        executenewsDelete,
    ] = useAxios({}, { manual: true });
    const [
        { loading: deleteAddressLoading, error: deleteAddressError },
        executeDeleteAddress,
    ] = useAxios({}, { manual: true });

    const [filteredBlogData, setFilteredBlogData] = useState<
        Address[]
    >([]);
    const [filteredAddressData, setFilteredAddressData] = useState<Address[]>([]);



    const deleteAddress = (id: string): Promise<any> => {
        return executeDeleteAddress({
            url: "/api/address/" + id,
            method: "DELETE",
        }).then(() => {
            setFilteredAddressData((prevAddresses) =>
                prevAddresses.filter((address) => address.id !== id)
            );
            router.reload();
        });
    };
    const handleSave = () => {
        if (!selectedAddressId) {
            alert('กรุณาเลือกที่อยู่');
            return;
        }

        if (id) {
            fetch(`/api/user/address/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Address: selectedAddressId,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    alert('แก้ไขที่อยู่เริ่มต้นเรียบร้อยแล้ว');
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }

        setIsEditing(false);
        router.reload();
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleDelete = () => {
        if (!selectedAddressId) {
            alert('กรุณาเลือกที่อยู่');
            return;
        }

        if (id) {
            fetch(`/api/address/${selectedAddressId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Address: selectedAddressId,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    alert('ลบข้อมูลทีอยู่เรียบร้อยแล้ว');
                    setIsEditing(false);
                    router.reload();
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    };
    //
    useEffect(() => {
        if (id) {
            fetch(`/api/user/address/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    setUserAddressData(data.Address);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setIsLoading(false);
                });
        }
    }, [id]);

    useEffect(() => {
        setFilteredAddressData(addressData?.news ?? []);
    }, [addressData]);


    ///
    return (
        <>
            <div className="mt-5 mx-10">

                <div>
                    <div className="flex justify-between">
                        <p className="text-lg font-semibold">จัดการที่อยู่จัดส่ง</p>
                        <button
                            className="flex hover:text-natural04"
                            onClick={() => setIsEditing(true)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M7 7H6C5.46957 7 4.96086 7.21071 4.58579 7.58579C4.21071 7.96086 4 8.46957 4 9V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H15C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18V17" />
                                <path d="M16 4.99998L19 7.99998M20.385 6.58499C20.7788 6.19114 21.0001 5.65697 21.0001 5.09998C21.0001 4.543 20.7788 4.00883 20.385 3.61498C19.9912 3.22114 19.457 2.99988 18.9 2.99988C18.343 2.99988 17.8088 3.22114 17.415 3.61498L9 12V15H12L20.385 6.58499Z" />
                            </svg>
                            เพิ่มที่อยู่
                        </button>
                    </div>
                    <div className="mt-5 leading-loose">
                        {UserAddressData.map((address, index) => (
                            <div key={address.id} className="border rounded-lg overflow-hidden shadow-lg p-4 mb-3 bg-white relative">
                                <div className="flex justify-end absolute top-4 right-4">
                                    <DeleteMemberModal data={address} apiDelete={() => deleteAddress(address.id)} />
                                    <button className="flex hover:text-natural04" onClick={() => setIsEditing(true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M7 7H6C5.46957 7 4.96086 7.21071 4.58579 7.58579C4.21071 7.96086 4 8.46957 4 9V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H15C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18V17" />
                                            <path d="M16 4.99998L19 7.99998M20.385 6.58499C20.7788 6.19114 21.0001 5.65697 21.0001 5.09998C21.0001 4.543 20.7788 4.00883 20.385 3.61498C19.9912 3.22114 19.457 2.99988 18.9 2.99988C18.343 2.99988 17.8088 3.22114 17.415 3.61498L9 12V15H12L20.385 6.58499Z" />
                                        </svg>
                                        <MdOutlineEdit />
                                    </button>

                                </div>
                                <p>
                                    <strong>ชื่อผู้รับ : </strong> {address.name} {address.lname}
                                </p>
                                <p>
                                    <strong>เบอร์โทรศัพท์ : </strong>
                                    {address.phonenumber}
                                </p>
                                <p>
                                    <strong>ที่อยู่จัดส่ง : </strong>
                                    {address.addressline} {address.district} {address.province} {address.subdistrict} {address.zipcode} {address.note}
                                </p>
                                <div className="w-full h-0.5 bg-gradient-to-r from-[#CA0808] to-[#0FC0E7] mx-auto mt-5"></div>
                                {/* เพิ่มตัวกั้นหลังจากการวนลูปครบ 1 ครั้ง */}
                                {index !== UserAddressData.length - 1 && <></>}
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </>
    );
}
