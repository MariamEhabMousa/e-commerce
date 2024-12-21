import { useContext } from "react"
import { CartContext } from "../../context/Cart.context"
import { Link } from "react-router-dom";

export default function Card({ productInfo }) {
    let { addProductToCart } = useContext(CartContext);

    const { imageCover, title, price, category, description, ratingsAverage, id } = productInfo;

    return <>
        <div className="card group/card rounded-lg overflow-hidden shadow-lg">
            <div className="relative">
                <img src={imageCover} alt="" />
                <div className="layer group-hover/card:opacity-100 transition-opacity duration-300 gap-3 flex justify-center items-center absolute w-full h-full bg-slate-400 bg-opacity-40 opacity-0 left-0 top-0">
                    <div className="icon cursor-pointer w-8 h-8 rounded-full bg-primary-500 text-white flex justify-center items-center">
                        <i className="fa-solid fa-heart"></i>
                    </div>

                    <div
                        onClick={() => {
                            addProductToCart({ productId: id })
                        }}
                        className="icon cursor-pointer w-8 h-8 rounded-full bg-primary-500 text-white flex justify-center items-center">
                        <i className="fa-solid fa-cart-shopping"></i>
                    </div>

                    <Link to={`/product/${id}`} className="icon cursor-pointer w-8 h-8 rounded-full bg-primary-500 text-white flex justify-center items-center">
                        <i className="fa-solid fa-eye"></i>
                    </Link>
                </div>
            </div>

            <div className="card-body p-4 space-y-3">
                <header>
                    <h3 className="text-lg text-gray-500 font-semibold line-clamp-1">

                        <Link to={`/product/${id}`}>{title}</Link>
                    </h3>
                    <h4 className="text-primary-400 font-semibold">{category.name}</h4>
                </header>
                <p className="text-sm text-slate-400 line-clamp-2">{description}</p>

                <div className="flex items-center justify-between">
                    <span>{price} L.E</span>
                    <div>
                        <i className="fa-solid fa-star text-yellow-400 mr-1"></i>
                        <span>{ratingsAverage}</span>
                    </div>
                </div>
            </div>
        </div>
    </>
}
