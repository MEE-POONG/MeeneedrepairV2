import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Link from 'next/link';
import Image from 'next/image';

interface Blog {
    id: string;
    title: string;
    subtitle: string;
    detail: string;
    img: string;
    author: string;
    refer: string;
    date: string;
}

export default function SlideBlog() {
    const initialVisibleItems = 5;
    const [visibleItems, setVisibleItems] = useState(initialVisibleItems);
    const [blogData, setBlogData] = useState<Blog[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/api/blog')
            .then(response => response.json())
            .then(data => {
                setBlogData(data.blog);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setIsLoading(false);
            });
    }, []);

    return (
        <div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {blogData.slice(0, visibleItems).map(blog => (
                    <SwiperSlide key={blog.id} className="relative">
                        <Link href={`/blog/${blog.id}`} className="text-natural04 text-xs">
                            <Image className="object-cover w-full h-[700px] aspect-[4/3]" src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${blog.img ? blog.img : 'f701ce08-7ebe-4af2-c4ec-2b3967392900'}/public`} alt="img1" />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
