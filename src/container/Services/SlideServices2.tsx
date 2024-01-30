import React, { CSSProperties, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {Autoplay, EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import Link from "next/link";

export default function App() {

    const [img1, setImg1] = useState('./images/imgsevice/s1.jpg'); // รูปภาพเริ่มต้น
    const [img2, setImg2] = useState('./images/imgsevice/s2.jpg');
    const [img3, setImg3] = useState('./images/imgsevice/s3.jpg');
    const [img4, setImg4] = useState('./images/imgsevice/s4.jpg');
    const [img5, setImg5] = useState('./images/imgsevice/s5.jpg');
    const [img6, setImg6] = useState('./images/imgsevice/s6.jpg');

    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");

    const openModal = (imageSrc: any) => {
        setSelectedImage(imageSrc);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedImage("");
        setShowModal(false);
    };

    return (
        <>
            <div className="slidestyles2">
                <Swiper
                    style={{
                        '--swiper-navigation-color': 'black',
                        '--swiper-pagination-color': 'black',

                    } as CSSProperties}
                    effect={"coverflow"}
                    loop={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    centeredSlides={true}
                    slidesPerView={3}
                    navigation={true}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true
                    }}
                    pagination={true}
                    modules={[Autoplay,EffectCoverflow, Pagination, Navigation]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <img
                            src={img1}
                            onClick={() => openModal(img1)}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            src={img2}
                            onClick={() => openModal(img2)}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            src={img3}
                            onClick={() => openModal(img3)}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            src={img4}
                            onClick={() => openModal(img4)}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            src={img5}
                            onClick={() => openModal(img5)}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            src={img6}
                            onClick={() => openModal(img6)}
                        />
                    </SwiperSlide>

                    {/* เพิ่มรูปภาพอื่น ๆ ที่คุณต้องการ */}
                </Swiper>


                {/* {showModal && (
                    <div className="modal" onClick={closeModal}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <span className="close" onClick={closeModal}>&times;</span>
                            <img src={selectedImage} alt="Image" />
                        </div>
                    </div>
                )} */}

            </div>
        </>
    );
}
