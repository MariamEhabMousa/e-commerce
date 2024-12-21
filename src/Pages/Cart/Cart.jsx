import { useContext, useEffect } from "react"
import { CartContext } from "../../context/Cart.context"
import Loading from "../../Components/Loading/Loading"
import CartItem from "../../Components/CartItem/CartItem"
import { Link } from "react-router-dom"

export default function Cart() {
    let { getCartProducts, cartInfo, clearCart } = useContext(CartContext)
    useEffect(() => {
        getCartProducts()
    }, [])
    return <>
        {cartInfo === null ? <Loading /> : <section>
            <div className="flex gap-8 items-center">
                <i className="fa-brands fa-opencart text-3xl"></i>
                <h2 className="text-xl text-slate-600 font-semibold pl-4 relative before:absolute before:w-0.5 before:h-3/4 before:bg-slate-600 before:-left-1 before:top-1/2 before:-translate-y-1/2">Your Shopping Cart</h2>
            </div>
            {cartInfo.numOfCartItems === 0 ?
                (<div className="bg-gray-100 rounded-md p-6 mt-6 shadow-sm flex justify-center flex-col gap-3 items-center">
                    <h2>
                        Oops! Your cart is empty. Start shopping now by clicking the
                        button below and find something you love!
                    </h2>
                    <Link to="/" className="btn bg-primary-500 hover:bg-primary-600 text-white uppercase font-bold" >Back To Home</Link>
                </div>)
                :
                <>
                    <div className="space-y-4 mt-8">
                        {cartInfo.data.products.map((product) => <CartItem key={product._id} productInfo={product} />)}
                    </div>
                    <div className="mt-5 flex justify-between items-center">
                        <p className="text-lg">
                            <i className="fa-solid fa-dollar-sign mr-2 text-primary-500 text-xl"></i>
                            Your Total Cart Price <span className="text-primary-500 font-bold">{cartInfo.data.totalCartPrice}</span></p>
                        <button
                            onClick={clearCart}
                            className="bg-red-500 uppercase font-semibold hover:bg-red-600 text-white btn">
                            <i class="fa-solid fa-trash mr-2"></i>
                            clear Cart</button>
                    </div>

                    <Link
                        className="btn bg-primary-500 hover:bg-primary-600 text-white inline-block w-full text-center mt-8"
                        to={"/checkout"}>Next Step (Payment)</Link>
                </>
            }
        </section>}
    </>
}
