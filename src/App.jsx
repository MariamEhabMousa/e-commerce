import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./Pages/Login/Login"
import Signup from "./Pages/Signup/Signup"
import Home from "./Pages/Home/Home"
import Layout from "./Components/Layout/Layout"
import { Toaster } from "react-hot-toast"
import ProdectedRoute from "./Components/ProdectedRoute/ProdectedRoute"
import GuestRoute from "./Components/GuestRoute/GuestRoute"
import UserProvider from "./context/User.context"
import CartProvider from "./context/Cart.context"
import Cart from "./Pages/Cart/Cart"
import ProductDetails from "./Pages/ProductDetails/ProductDetails"
import Checkout from "./Pages/Checkout/Checkout"
import Oreders from "./Pages/Orders/Orders"
import Categories from "./Pages/Categories/Categories"
import Brands from "./Pages/Brands/Brands"
import Products from "./Pages/Products/Products"

function App() {

  const router = createBrowserRouter([
    {
      path: "/", element: (
        <ProdectedRoute>
          <Layout />
        </ProdectedRoute>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "cart", element: <Cart /> },
        { path: "product/:id", element: <ProductDetails /> },
        { path: "checkout", element: <Checkout /> },
        { path: "allorders", element: <Oreders /> },
        { path: "categories", element: <Categories /> },
        { path: "brands", element: <Brands /> },
        { path: "products", element: <Products /> },

      ],
    },
    {
      path: "/", element: (<GuestRoute>
        <Layout />
      </GuestRoute>),
      children: [
        { path: "signup", element: <Signup /> },
        { path: "login", element: <Login /> },
      ]
    }
  ]);

  return <>
    <UserProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </UserProvider>
    <Toaster />


  </>
}

export default App
