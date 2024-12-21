import { Link } from "react-router-dom";

export default function Brand({ brandInfo }) {
    const { image } = brandInfo;
    return <>
        <section>
            <div className="brand w-40 h-40 rounded-full shadow-xl overflow-hidden flex justify-center items-center">
                <Link>
                    <img className="w-full" src={image} alt="" />
                </Link>
            </div>
        </section>
    </>
}
