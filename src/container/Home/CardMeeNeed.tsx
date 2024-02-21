import Image from 'next/image';
import Link from 'next/link';
export default function CardMeeNeed() {
  return (
    <div className="slide-fwd-center container mx-auto py-6 lg:px-24 ">
      <div className="bg-[#1E293B] p-6 rounded-lg h-auto mx-5 ">
        <div className="grid md:grid-cols-3 items-center gap-8">
          <div>
            <Image
              className='mx-auto mt-10 md:w-[200px]'
              src="/images/logo/logoMR3.png"
              width={130}
              height={130}
              alt="Picture of the author"
            />
          </div>
          <div className='md:col-span-2'>
            <p className='text-lg text-secondary2 text-center md:text-left mb-5'>ทำความรู้จัก</p>
            <div className='flex items-end'>
              <h3 className='text-2xl md:text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-sky-400'
              > Mee Need 
              <span className='text-secondary2 text-sm md:text-xl ml-3'>REPAIR</span>
              </h3>
             
            </div>

            <div className='text-secondary2 text-sm md:text-base mt-5'>
              Me Support ให้บริการด้านไอทีซัพพอร์ท
              ให้คำปรึกษาด้านการใช้งานอุปกรณ์ไอที
              รวมถึงรับซ่อมอุปกรณ์ไอทีทุกประเภท
              และจำหน่ายสินค้าไอทีหลากหลายประเภท
            </div>
            <div className='text-center md:text-right mt-12 lg:mt-28 '>
              <Link href='/about' className='bg-natural04 py-2 px-5 rounded-lg text-sm md:text-base'>รู้จักเรามากขึ้น</Link>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
