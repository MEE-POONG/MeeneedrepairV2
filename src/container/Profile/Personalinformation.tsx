import Information from "../../components/profile/Information";
import { LuNewspaper } from "react-icons/lu";

const Personalinformation: React.FC = (props) => {



    return (
        <>
            <div className="">
                <div className="flex items-center">
                    <LuNewspaper className='w-[25px] h-[25px]' />
                    <h3 className="text-2xl text-black ml-2">ข้อมูลส่วนตัว</h3>
                </div>

                <div className="container w-[800px] bg-secondary2 mt-10 rounded-lg p-8 text-secondary1">
                    <Information />
                    {/* <DeliveryLocation /> */}

                </div>

            </div>

        </>
    )
}
export default Personalinformation