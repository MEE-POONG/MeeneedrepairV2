import { Inter } from "next/font/google";
import RootLayout from "@/components/Layout";
import Slide from "@/container/Home/Slide";
import Menuservice from "@/container/Home/Menuservice";
import BlogCard from "@/container/blog/blogcard";
import NewsCard from "@/container/News/NewsCard";
import Head from "next/head";
import Link from "next/link";
import Cardsevice from "@/container/Home/Cardservice";

const inter = Inter({ subsets: ["latin"] });

// If you have specific props, define them here


const Home: React.FC = (props) => {
  return (
    <RootLayout loggedInUser="">
      <Head>
        <title>Mee Need Repair</title>
      </Head>
      <Slide />
      <div className=''>
        <Menuservice />
        {/* Other components */}
        <div className="container mx-auto my-auto py-6 px-5 lg:">
          <div className="flex justify-between">
            <p className="text-xl md:text-3xl font-bold text-black mb-5 text-center md:text-left">ข่าวสาร</p>
            <Link href='news' className="text-sx md:text-xl flex items-center hover:underline hover:decoration-sky-500 ">เพิ่มเติม</Link>
          </div>
          <NewsCard />
        </div>
        <div className="container mx-auto my-auto py-6 px-5 lg:">
          <div className="flex justify-between">
            <p className="text-xl md:text-3xl font-bold text-black text-center md:text-left">บทความน่าสนใจ</p>
            <Link href='blog' className="text-sx md:text-xl flex items-center hover:underline hover:decoration-sky-500 ">เพิ่มเติม</Link>
          </div>
          <BlogCard />
        </div>
        <Cardsevice />
      </div>
    </RootLayout>
  );
}

export default Home;
