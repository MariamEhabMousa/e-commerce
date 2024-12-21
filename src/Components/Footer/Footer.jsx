import Amazon from "../../assets/images/amazon-pay.png"
import American from "../../assets/images/American-Express-Color.png"
import Paypel from "../../assets/images/paypal.png"
import Master from "../../assets/images/mastercard.webp"
import AppStore from "../../assets/images/get-apple-store.png"
import GooglePlay from "../../assets/images/get-google-play.png"

export default function Footer() {
    return <>
        <footer className="bg-slate-100 py-4">
            <div className="container space-y-4">
                <div className="header">
                    <h2 className="text-xl font-semibold text-slate-800">Get The FreshCart app</h2>

                    <p className="text-slate-400">We Will Send You a link, open it on your phone to download the app.</p>
                </div>
                <div className="flex gap-2">
                    <input className="form-control grow" type="email" placeholder='Email Adderss' />
                    <button className="btn uppercase bg-primary-500 hover:bg-primary-600 text-white font-semibold text-sm">Share App Link</button>
                </div>

                <div className="flex justify-between py-4 border-y-2 border-slate-300 border-opacity-50 items-center">
                    <div className="payment flex gap-3 items-center">
                        <h3>Payment Patenrs</h3>
                        <img className="w-24" src={Amazon} alt="" />
                        <img className="w-24" src={American} alt="" />
                        <img className="w-20" src={Master} alt="" />
                        <img className="w-24" src={Paypel} alt="" />

                    </div>
                    <div className="download flex gap-3 items-center">
                        <h3>Get Deliveries with FreshCart</h3>
                        <img className="w-24" src={AppStore} alt="" />
                        <img className="w-[110px]" src={GooglePlay} alt="" />
                    </div>
                </div>
            </div>
        </footer>

    </>
}
