import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loading from '../../Components/Loading/Loading';
import Brand from '../../Components/Brand/Brand';

export default function Brands() {

    const [brands, setBrands] = useState(null);

    async function getAllBrands() {
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/brands",
                method: "GET",
            };
            let { data } = await axios.request(options);
            setBrands(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllBrands();
    }, [])

    return <>
        <h2 className="font-semibold text-primary-950 text-center text-xl mb-3">Our Brands</h2>
        {!brands ? <Loading /> :
            (<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 xl:gap-6 ">
                {brands.map((brand) => <Brand brandInfo={brand} key={brand._id} />)}
            </div>)
        }
    </>
}
