import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Category from '../../Components/Category/Category';
import Loading from '../../Components/Loading/Loading';

export default function Categories() {
    const [categories, setCategories] = useState(null);

    async function getAllCategories() {
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/categories",
                method: "GET",
            };
            let { data } = await axios.request(options);
            setCategories(data.data);
            console.log(data);

        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        getAllCategories();
    }, [])


    return <>
        <h2 className="text-center font-semibold text-primary-950 text-xl">Categories</h2>
        {!categories ? <Loading /> :

            (<div className='p-14 grid sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
                {categories.map((category) => <Category categoryInfo={category} key={category._id} />)}
            </div>)}
    </>
}
