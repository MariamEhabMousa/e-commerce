import axios from "axios";
import { useFormik } from "formik"
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { data, useNavigate } from "react-router-dom";
import { object, ref, string } from "yup"
import { UserContext } from "../../context/User.context";

export default function Login() {
    let { setToken } = useContext(UserContext);

    const [incorrectEmailOrPassword, setIncorrectEmailOrPassword] = useState(null)
    const navigate = useNavigate()
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

    const validationSchema = object({
        email: string().required("Email is required").email("Email is invalid"),

        password: string().required("Password is required")
            .matches(passwordRegex, "Password should be Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),
    });

    async function sendDataToLogin(values) {
        const loadingToastId = toast.loading("Waiting ....")
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
                method: "POST",
                data: values,
            };
            let { data } = await axios.request(options);
            if (data.message === "success") {
                localStorage.setItem("token", data.token)
                setToken(data.token)
                toast.success("Welcome Backe :)")
                setTimeout(() => {
                    navigate("/")
                }, 2000)
            }

        } catch (error) {
            toast.error(error.response.data.message)
            setIncorrectEmailOrPassword(error.response.data.message)

        } finally {
            toast.dismiss(loadingToastId)

        }
    }
    const formik = useFormik({
        initialValues:
        {
            "email": "",
            "password": "",
        },
        validationSchema,
        onSubmit: sendDataToLogin,
    })
    return <>
        <h1 className="mb-5 text-xl text-slate-800 font-semibold">Login</h1>
        <form className="space-y-3" onSubmit={formik.handleSubmit}>
            <div className="email">
                <input type="email" className="w-full form-control"
                    onChange={formik.handleChange}
                    name="email"
                    onBlur={formik.handleBlur}
                    value={formik.values.email} placeholder="Email Address" />
                {formik.errors.email && formik.touched.email &&
                    (<p className="text-red-500 text-sm mt-1">*{formik.errors.email}</p>)}
            </div>

            <div className="password">
                <input type="password" className="w-full form-control"
                    onChange={formik.handleChange}
                    name="password"
                    onBlur={formik.handleBlur}
                    value={formik.values.password} placeholder="password" />
                {formik.errors.password && formik.touched.password && (<p className="text-red-500 text-sm mt-1">*{formik.errors.password}</p>)}
                {incorrectEmailOrPassword && (<p className="text-red-500 text-sm mt-1">*{incorrectEmailOrPassword}</p>)}
            </div>

            <button type="submit" className="btn bg-primary-500 hover:bg-primary-600 text-white w-full">Login</button>
        </form>
    </>
}


