import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card from '../../Components/Card/Card';
import Loading from '../../Components/Loading/Loading';

export default function Products() {

    const [products, setProducts] = useState(null)

    async function getProducts() {
        const options = {
            url: "https://ecommerce.routemisr.com/api/v1/products",
            method: "GET"
        }

        let { data } = await axios.request(options);
        setProducts(data.data)
    }

    useEffect(() => {
        getProducts()
    }, [])

    return <>
        <h2 className="font-semibold text-xl mb-3 text-primary-950 text-center">All Products</h2>
        {!products ? <Loading /> : <div className="grid sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {products.map((product) => <Card productInfo={product} key={product.id} />)}
        </div>}


    </>
}
