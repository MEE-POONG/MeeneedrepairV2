import Link from "next/link";
import { LuTimerReset } from "react-icons/lu";
import { MdComputer } from "react-icons/md";
import { HiMiniWrenchScrewdriver } from "react-icons/hi2";
import { FaHeadset } from "react-icons/fa6";
export default function Menuservice() {
  return (
    <>
      <div className="container mx-auto ">
        <p className="flex justify-center gap-2 mt-12 text-xl md:text-5xl">
          <span className="text-black font-bold capitalize">Menu </span>
          <span className="text-orange-500 font-bold capitalize">Service</span>
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 px-3 lg:px-32 gap-3 my-8 h-48">
          <div className="bg-white rounded-xl p-3 hover:bg-slate-900 hover:text-white">
            <Link href='/services/program' className="text-sm text-center">
              <MdComputer className="text-5xl md:text-7xl lg:text-[100px] mx-auto mb-2" />
              <p className="text-sm md:text-base">บริการติดตั้งโปรแกรม</p>
            </Link>
          </div>
          <div className="bg-white rounded-xl p-3 hover:bg-slate-900 hover:text-white">
            <Link href='/services/consult' className="text-sm text-center">
              <FaHeadset className="text-5xl md:text-7xl lg:text-[100px] mx-auto mb-2 md:p-3" />
              <p className="text-sm md:text-base">บริการให้คำปรึกษา</p>
            </Link>
          </div><div className="bg-white rounded-xl p-3 hover:bg-slate-900 hover:text-white">
            <Link href='./services/repair' className="text-sm text-center">
              <HiMiniWrenchScrewdriver className="text-5xl md:text-7xl lg:text-[100px] mx-auto mb-2 md:p-3" />
              <p className="text-sm md:text-base">บริการซ่อมบำรุง </p>
            </Link>
          </div><div className="bg-white rounded-xl p-3 hover:bg-slate-900 hover:text-white">
            <Link href='/appointment' className="text-sm text-center">
              <LuTimerReset className="text-5xl md:text-7xl lg:text-[100px] mx-auto mb-2 md:p-3" />
              <p className="text-sm md:text-base">บริการจองซ่อม</p>
            </Link>
          </div>
        </div>


      </div>

    </>
  );
}