import { Link } from "react-router-dom";

export default function Category({ categoryInfo }) {

    const { image, name } = categoryInfo
    return <>
        <section>
            <div className="w-fit overflow-hidden">
                <Link>
                    <img
                        className="w-40 h-40 object-cover shadow-md rounded-3xl"
                        src={image} alt="" />
                    <div>
                        <h2 className="mt-2 text-center text-primary-950 font-semibold">{name}</h2>
                    </div>
                </Link>
            </div>
        </section>
    </>
}
