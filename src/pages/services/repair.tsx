import RootLayout from "@/components/Layout";

const repair: React.FC = (props) => {
    return (
        <RootLayout loggedInUser="">
            <div className="container mx-auto" >
                <div className=" h-auto bg-gray-200 rounded-xl  mt-36 my-24 ">
                    <div className="text-[36px] text-center my-4">
                        <span ><br />บริการซ่อมบำรุง คอมพิวเตอร์</span>


                    </div>
                    <span className="text-[26px] ml-60 ">ทั่วไป</span>
                    <div className="text-[20px] ml-52 mb-5">
                        <p>เช็คระบบฮาร์ดแวร์</p>
                        <p>เช็คระบบซอฟแวร์</p>
                        <p>เช็คระบบทั้งหมด</p>

                    </div>

                    <span className="text-[26px] ml-60 ">เช็คระบบฮาร์ดแวร์</span>
                    <div className="text-[20px] ml-52 mb-5">
                        <p>เช็คระบบฮาร์ดแวร์ทังหมด</p>
                        <p>เปลี่ยน ซิลีโคน</p>
                        <p>เช็คระบบไฟ</p>
                        <p>เดินสาย-เก็บสาย</p>
                        <p>เช็ค HDD SSD M.2</p>
                        <p>ทำความสะอาด</p>
                        <p className="text-red-600">อื่นๆ โปรดระบุในรายละการจอง</p>
                    </div>

                    <span className="text-[26px] ml-60 ">เช็คระบบซอฟแวร์</span>
                    <div className="text-[20px] ml-52 pb-16">
                        <p>ลงระบบปฎิบัติการใหม่</p>
                        <p>เช็คความสมบูรณ์ของระบบปฎิบัติการ</p>
                        <p>ลงโปรแกรมพื้นฐาน</p>
                        <p className="text-red-600">อื่นๆ โปรดระบุในรายละการจอง</p>
                    </div>
                </div>

            </div>
        </RootLayout>
    )
}
export default repair;  