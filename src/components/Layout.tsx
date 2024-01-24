import { Mitr } from 'next/font/google'
import React, { ReactNode } from "react";

import Navbar from './Navbar';
import Footer from './Footer';
import BackToTopButton from '../../../../nextjs/MEENEED/meeneedrepair/src/components/BactToTop';
import Header from '../../../../nextjs/MEENEED/meeneedrepair/src/components/Header';


interface RootLayoutProps {
    loggedInUser: any;
    children: ReactNode; // เพิ่มบรรทัดนี้
}

const fontMNR = Mitr({
    weight: "300",
    subsets: ['latin'],
    variable: '--font-mitr',
})


const RootLayout: React.FC<RootLayoutProps> = ({ loggedInUser, children }) => {

    return (
        <>
            <header className="sticky top-2 z-30 w-full sm:p-0  ">
                <Navbar />
            </header>
            <main className={fontMNR.className}>
                {children}
            </main>
            <footer className='bottom-0 w-full mt-24'>

                <Footer />
            </footer>
        </>
    )
}
export default RootLayout;