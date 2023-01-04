import React from "react";
import {useState} from "react";
import {IProduct} from "../types/models";

interface ModalProps {
    isOpen: boolean
    closeModal: () => void
    detail: IProduct | null
    addToCart: (data:IProduct, count:number) => void
}

export function Modal({isOpen, closeModal, detail, addToCart}: ModalProps) {
    const [count, setCount] = useState(0)
    const increment = () => {
        setCount((prev) => {
            return ++prev
        })
    }

    const decrement = () => {
        setCount((prev) => {
            if (prev <= 0) {
                return prev
            }
            return --prev
        })
    }

    const handleClick = () => {
        if (detail) {
            addToCart(detail, count)
            setCount(0)
            closeModal()
        }
    }

    const closeCartModal = () => {
        setCount(0)
        closeModal()

    }

    return (
        //bg-black/50 - прозрачность 50% // самозрывающийся див для того шоб им затемнить весь контент
        isOpen ?
            <div className={"fixed bg-black/50 top-0 right-0 left-0 bottom-0 flex justify-center items-center"}>

                <div
                    className={"w-96 h-80 bg-amber-50 flex flex-col relative"}>
                    <button className={"py-2 px-4 bg-yellow-300 absolute top-1 right-1"} onClick={closeCartModal}>
                         x
                    </button>
                    <div className={"py-2 px-4  flex flex-col flex-auto "}>
                        <div>{detail?.title}</div>
                        <div className={"flex gap-3 justify-center mt-auto"}>
                            <button className={"border w-8 h-8"} onClick={decrement}>-</button>
                            <div className={"font-bold flex justify-center items-center"}>{count}</div>
                            <button className={"border w-8 h-8"} onClick={increment}>+</button>
                        </div>
                        <button onClick={handleClick}>Add to cart</button>
                    </div>
                </div>

            </div> : null

    )
}