import {IProduct} from "../types/models";
import {useState} from "react";

interface ProductProps {
    product: IProduct
    openModal: (details: IProduct) => void
}

export function Product(props: ProductProps) {
    const [details, setDetails] = useState(false)
    const btnBgClassName = details ? 'bg-blue-400' : 'bg-yellow-300'
    const btnClasses = ['py-2 px-4 border', btnBgClassName]
    return (
        <div
            className={"border py-2 px-4 rounded flex flex-col items-center mb-2"}
        >
            <img src={props.product.image} className={"w-1/6"} alt={props.product.title}/>
            <p>{props.product.title}</p>
            <p className={"font-bold"}>{props.product.price}</p>
            <button
                className={btnClasses.join(' ')}
                onClick={() => {
                    setDetails(prev => !prev)}}
            >{ details ? 'Hide details' : 'Show details'}
            </button>

            {details && <button
                className={btnClasses.join(' ')}
                onClick={() => {
                    props.openModal(props.product)
                }}
            >
                Add to cart

            </button>}

            {/*кнопка которая появлялась при details: true*/}

            {/*{details && <button*/}
            {/*    className={"py-2 px-4 border bg-blue-400"}*/}
            {/*    onClick={() => {*/}
            {/*        setDetails(false)*/}
            {/*    }}*/}
            {/*>Hide description*/}
            {/*</button>}*/}

            {details && <div>
                <p>{props.product.description}</p>
                <p>Rate: <span style={{fontWeight: "bold"}}>{props?.product?.rating?.rate}</span></p>
            </div>}

        </div>
    )
}

























