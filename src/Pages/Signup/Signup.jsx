import axios from "axios";
import { useFormik } from "formik"
import { useState } from "react";
import toast from "react-hot-toast";
import { data, useNavigate } from "react-router-dom";
import { object, ref, string } from "yup"

export default function Signup() {

    const navigate = useNavigate()
    const [acountExistError, setAcountExistError] = useState(null);

    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    const phoneRegex = /^(02)?01[0125][0-9]{8}$/;

    const validationSchema = object({
        name: string()
            .required("name is required").min(3, "name must be at least 5 characters")
            .max(25, "name can not be more than 25 characters"),
        email: string().required("Email is required").email("Email is invalid"),

        password: string().required("Password is required")
            .matches(passwordRegex, "Password should be Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),

        rePassword: string().required("Confirm password is required").oneOf([ref("password"), "password and repassword should be the same"]),

        phone: string().required("phone number is required").matches(phoneRegex, "sorry we accept egyptian numbers only")
    });

    async function sendDataToRegister(values) {
        const loadingToastId = toast.loading("Waiting ....")
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
                method: "POST",
                data: values,
            };
            let { data } = await axios.request(options);
            if (data.message === "success") {
                toast.success("User Created Successfully")
                setTimeout(() => {
                    navigate("/login")
                }, 2000)
            }
        } catch (error) {
            toast.error(error.response.data.message)
            setAcountExistError(error.response.data.message);
        } finally {
            toast.dismiss(loadingToastId)

        }
    }
    const formik = useFormik({
        initialValues:
        {
            "name": "",
            "email": "",
            "password": "",
            "rePassword": "",
            "phone": ""
        },
        validationSchema,
        onSubmit: sendDataToRegister,
    })
    return <>
        <h1 className="mb-5 text-xl text-slate-800 font-semibold">Register Now:</h1>
        <form className="space-y-3" onSubmit={formik.handleSubmit}>
            <div className="name">
                <input type="text" className="w-full form-control"
                    onChange={formik.handleChange}
                    name="name"
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                    placeholder="Type Your Name" />
                {formik.errors.name && formik.touched.name && (<p className="text-red-500 text-sm mt-1">*{formik.errors.name}</p>)}
            </div>

            <div className="email">
                <input type="email" className="w-full form-control"
                    onChange={formik.handleChange}
                    name="email"
                    onBlur={formik.handleBlur}
                    value={formik.values.email} placeholder="Email Address" />
                {formik.errors.email && formik.touched.email &&
                    (<p className="text-red-500 text-sm mt-1">*{formik.errors.email}</p>)}
                {acountExistError && (<p className="text-red-500 text-sm mt-1">*{acountExistError}</p>)}

            </div>

            <div className="password">
                <input type="password" className="w-full form-control"
                    onChange={formik.handleChange}
                    name="password"
                    onBlur={formik.handleBlur}
                    value={formik.values.password} placeholder="password" />
                {formik.errors.password && formik.touched.password && (<p className="text-red-500 text-sm mt-1">*{formik.errors.password}</p>)}

            </div>
            <div className="rePassword">
                <input type="password" className="w-full form-control"
                    onChange={formik.handleChange}
                    name="rePassword"
                    onBlur={formik.handleBlur}
                    value={formik.values.rePassword} placeholder="Confirm password" />
                {formik.errors.rePassword && formik.touched.rePassword && (<p className="text-red-500 text-sm mt-1">*{formik.errors.rePassword}</p>)}

            </div>

            <div className="phone">
                <input type="tel" className="w-full form-control"
                    onChange={formik.handleChange}
                    name="phone"
                    onBlur={formik.handleBlur}
                    value={formik.values.phone} placeholder="Phone Number" />
                {formik.errors.phone && formik.touched.phone && (<p className="text-red-500 text-sm mt-1">*{formik.errors.phone}</p>)}

            </div>

            <button type="submit" className="btn bg-primary-500 hover:bg-primary-600 text-white w-full">Sign Up</button>
        </form>
    </>
}
