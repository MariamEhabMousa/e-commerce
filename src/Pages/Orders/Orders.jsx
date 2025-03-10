import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/User.context";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import { Link } from "react-router-dom";

export default function Oreders() {
    const [orders, setOrders] = useState(null);
    const { token } = useContext(UserContext);
    let { id } = jwtDecode(token);

    async function getUserOrders() {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
                method: "GET"
            };
            let { data } = await axios.request(options);
            setOrders(data);
            console.log(data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserOrders();
    }, [])
    return <>
        {orders ?
            (
                <section className="space-y-4">
                    {orders.map((order) => <div key={order.id} className="order p-4 border-2 border-gray-500 border-opacity-25 rounded-lg">
                        <header className="flex justify-between items-center">
                            <div>
                                <h2 className="text-gray-500">Order ID</h2>
                                <span className="text-gray-700 font-semibold text-lg">#{order.id}</span>
                            </div>
                            <div>
                                {order.isPaid ? <span className="font-cairo mx-2 inline-block px-3 py-1 bg-lime-500 text-white font-semibold rounded-full">تم الدفع</span> :
                                    <span className="font-cairo mx-2 inline-block px-3 py-1 bg-red-500 text-white font-semibold rounded-full">غير مدفوع</span>

                                }
                                {order.isDelivered ? <span className="font-cairo inline-block px-3 py-1 bg-lime-500 text-white font-semibold rounded-full">تم الإستلام</span> :
                                    <span className="font-cairo inline-block px-3 py-1 bg-blue-500 text-white font-semibold rounded-full">قيد التوصيل</span>
                                }
                            </div>
                        </header>

                        <div className="grid mt-4 md:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-6">
                            {order.cartItems.map((product) => <div key={product._id} className="product-item overflow-hidden border-2 border-gray-400 border-opacity-30 rounded-md">
                                <img
                                    className="w-full"
                                    src={product.product.imageCover} alt="" />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold line-clamp-2">
                                        <Link to={`/product/${product.product.id}`}>{product.product.title}</Link>
                                    </h3>
                                    <div className="flex mt-2 justify-between items-center">
                                        <p><span className="font-bold underline">Count:</span>{product.count}</p>
                                        <span>{product.price} L.E</span>
                                    </div>
                                </div>
                            </div>)}
                        </div>

                        <p className="text-lg mt-4 text-gray-600 font-semibold">Your Total Order Price Is : <span className="mx-1 font-bold text-primary-400">{order.totalOrderPrice}</span>L.E</p>
                    </div>)}
                </section>
            ) : (
                <Loading />
            )}
    </>
}
