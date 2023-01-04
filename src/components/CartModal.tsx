
import * as React from 'react';
import {TypeCart} from "../types/typeCart";

type Props = {
    isOpen: boolean
    closeModal: () => void
    cart: TypeCart[]
};

export function CartModal(props: Props) {
    const {isOpen, closeModal, cart} = props
    return (
        isOpen ?
            <div className={"fixed bg-black/50 top-0 right-0 left-0 bottom-0 flex justify-center items-center"}>

                <div
                    className={"w-96 h-80 bg-amber-50 flex flex-col relative px-4 py-4"}>
                    <button className={"w-8 h-8 bg-yellow-300 absolute top-1 right-1 pb-1"} onClick={closeModal}>
                        x
                    </button>
                    <ul className={"mt-10 flex flex-col gap-4 overflow-auto max-h-64"}>
                        {cart.map((item) => {
                            return (
                                <li className={"flex gap-2 border rounded-xl  bg-white"}>
                                    <div className={'w-20 h-20'}><img className={"w-full h-full object-cover"} src={item.image} alt=""/></div>
                                    <div className={"flex justify-between flex-col py-1"}>
                                        <div>{item.title}</div>
                                        <div className={"flex gap-2 items-center" }>
                                            <div>{item.price} ({item.count})</div>
                                            <div>All: {item.price * item.count}</div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}

                    </ul>
                </div>

            </div> : null
    );
};