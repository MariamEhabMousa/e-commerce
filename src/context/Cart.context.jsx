import axios from "axios";
import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.context";
import toast from "react-hot-toast";

export const CartContext = createContext(null);

export default function CartProvider({ children }) {

    const { token } = useContext(UserContext);
    const [cartInfo, setCartInfo] = useState(null);

    // * Add 
    async function addProductToCart({ productId }) {
        const toastId = toast.loading("Adding Product...")
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "POST",
                headers: {
                    token
                },
                data: {
                    productId
                }
            }
            let { data } = await axios.request(options);
            if (data.status === "success") {
                toast.success(data.message);
                getCartProducts()
            }
        } catch (error) {
            console.log(error);
        } finally {
            toast.dismiss(toastId)
        }
    }

    // ~ Get 
    async function getCartProducts() {
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "GET",
                headers: {
                    token
                }
            };
            let { data } = await axios.request(options);
            console.log(data);
            setCartInfo(data);
        } catch (error) {
            console.log(error);
        }
    }

    // & Remove

    async function removeProductFromCart({ productId }) {
        const toastId = toast.loading("Deleteing Product....")
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                method: "DELETE",
                headers: {
                    token,
                },
            };
            let { data } = await axios.request(options);
            if (data.status === "success") {
                toast.success("Product has been deleted")
                setCartInfo(data)
            }
        } catch (error) {
            console.log(error);
        } finally {
            toast.dismiss(toastId)
        }
    }

    // ? Clear 

    async function clearCart() {
        const toastId = toast.loading("Clear Cart...")
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "DELETE",
                headers: {
                    token,
                },
            };
            let { data } = await axios.request(options);
            if (data.message === "success") {
                toast.success("Cart has been Cleard")
                setCartInfo({
                    numOfCartItems: 0
                });
            }


        } catch (error) {
            console.log(error);
        } finally {
            toast.dismiss(toastId)
        }
    }

    // ^ Update Count

    async function updateProductCount({ count, productId }) {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                method: "PUT",
                headers: {
                    token
                },
                data: {
                    count
                },
            };
            let { data } = await axios.request(options);
            if (data.status === "success") {
                setCartInfo(data)
            }

        } catch (error) {
            console.log(error);
        }
    }

    return <CartContext.Provider value={{
        addProductToCart,
        getCartProducts,
        cartInfo,
        removeProductFromCart,
        clearCart,
        updateProductCount
    }}>
        {children}
    </CartContext.Provider>
}