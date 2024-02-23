// const  EditProfile = () => {
//     return (
//         <div></div>
//     )

// }
// export default EditProfile;

import Link from "next/link";
import OrderProfile from "./order_profile";
import TabMenu from "../../container/Profile/test/TabMenu";
import TabMenuMobile from "../../container/Profile/test/TabMenuMobile";
import RootLayout from "@/components/Layout";
const EditFavoritePage: React.FC = (props) => {

    return (
        <RootLayout loggedInUser="">
            {/* <ProductCategories /> */}
            <div className="xl:hidden">
                <TabMenuMobile />
            </div>
            <div className="container mx-auto font-fontTH02">
                <div className="grid grid-cols-12 md:gap-10 bg-[#1E293B] lg:bg-[#0F172A]">
                    <div className="lg:col-span-2">
                        <div className="hidden lg:block">
                            <h3 className="text-3xl text-secondary2 mb-8">จัดการที่อยู่จัดส่ง</h3>
                            <TabMenu />
                        </div>
                    </div>
                    <div className="col-span-12 p-5 lg:p-0 lg:col-span-10 pt-5 mb-10 lg:mb-0 lg:pt-0">
                        <OrderProfile />
                        {/* <EditProfile /> */}
                    </div>
                </div>

            </div>
        </RootLayout>
    )
}
export default EditFavoritePage