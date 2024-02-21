import RootLayout from "@/components/Layout";

const consult: React.FC = (props) => {
    return(
        <RootLayout loggedInUser="">
                    <div className="container mx-auto" >
                <div className=" h-auto bg-gray-200 rounded-xl  mt-36 my-24 ">
                    <div className="text-[36px] text-center my-4">
                        <span ><br />บริการซ่อมบำรุง คอมพิวเตอร์</span>


                    </div>
                    <span className="text-[26px] ml-60 ">ทั่วไป</span>
                    <div className="text-[20px] ml-52">
                    <p>เช็คระบบฮาร์ดแวร์</p>
                    <p>เช็คระบบซอฟแวร์</p>
                    <p>เช็คระบบทั้งหมด</p>

                    </div>
                    <span className="text-[26px] ml-60 ">เช็คระบบฮาร์ดแวร์</span>
                    <div className="text-[20px] ml-52">
                    <p>เช็คระบบฮาร์ดแวร์</p>
                    <p>เช็คระบบซอฟแวร์</p>
                    <p>เช็คระบบทั้งหมด</p>

                    </div>
                    <span className="text-[26px] ml-60 ">เช็คระบบฮาร์ดแวร์</span>
                    <div className="text-[20px] ml-52">
                    <p>เช็คระบบฮาร์ดแวร์</p>
                    <p>เช็คระบบซอฟแวร์</p>
                    <p>เช็คระบบทั้งหมด</p>

                    </div>
                </div>

            </div>
        </RootLayout>
    )
}
export default consult;