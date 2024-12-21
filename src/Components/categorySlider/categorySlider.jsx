import axios from "axios"
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';

export default function CategorySlider() {
    const [categories, setcategories] = useState(null);
    async function getCategories() {
        const options = {
            url: "https://ecommerce.routemisr.com/api/v1/categories",
            method: "GET"
        }
        let { data } = await axios.request(options);
        setcategories(data.data)

    }
    useEffect(() => {
        getCategories();
    }, [])
    return <>
        <section className="my-8">
            <h2 className="text-lg mb-5 text-gray-600 font-semibold">Shop Popular Categories</h2>
            {!categories ? <Loading /> : <Swiper slidesPerView={6} loop={true}>
                {categories.map((category) => <SwiperSlide key={category._id}>
                    <div className="h-64">
                        <img className="w-full h-full object-cover" src={category.image} alt="" />
                    </div>
                    <h3 className="mt-2">{category.name}</h3>
                </SwiperSlide>)}
            </Swiper>}
        </section>
    </>
}
