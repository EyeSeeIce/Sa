import React from 'react';
import {useProducts} from "../hooks/useProducts";
import {useContext} from "react";
import {ModalContext} from "../context/ModalContext";
import {useState} from "react";
import {IProduct} from "../types/models";
import {Loader} from "../components/Loader";
import {ErrorMessage} from "../components/ErrorMessage";
import {Product} from "../components/Product";
import ModalSearch from "../components/ModalSearch";
import CreateProduct from "../components/CreateProduct";
import {Modal} from "../components/Modal";
import {CartModal} from "../components/CartModal";
import {TypeCart} from "../types/typeCart";
import SearchBar from "../components/SearchBar";

const ProductsPage = () => {
    const {loading, error, products, addProduct, filterProducts, filteredProducts} = useProducts()
    const {modal, close: closeModalByContext, open: openModalByContext} = useContext(ModalContext)
    // const [modal, setModal] = useState(false) //ща это все не нужно потому что создали контекст
    const [open, setOpen] = useState(false)
    const [openCart, setOpenCart] = useState(false)
    const [detail, setDetail] = useState<IProduct | null>(null)
    const [cart, setCart] = useState<TypeCart[]>([])

    const addToCart = (data:IProduct, count:number) => {
        setCart((prev) => {
            const newCart = [{...data, count}, ...prev]
            return newCart
        })
    }

    const openModal = (data: IProduct) => {
        setDetail(data)
        setOpen(true)
    }

    const closeModal = () => {
        setDetail(null)
        setOpen(false)
    }

    const openModalCart = () => {
        setOpenCart(true)
    }

    const closeModalCart = () => {
        setOpenCart(false)
    }

    const createHandler = (product: IProduct) => {
        closeModalByContext()
        addProduct(product)
    }

    return (
        <div className={"container mx-auto max-w-2xl pt-5"}>
            <SearchBar onChange={filterProducts}/>
            <button onClick={openModalCart}>
                <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M2.67007 1H0V0H2.67007C3.3919 0 4.01136 0.514108 4.14438 1.22357L4.49133 3.07396L20.1477 3.00588C21.1552 3.00149 21.8805 3.97186 21.591 4.93688L19.1927 12.931C19.0024 13.5655 18.4184 14 17.756 14H6.53996L6.83849 15.5921C6.88283 15.8286 7.08932 16 7.32993 16H18V17H7.32993C6.6081 17 5.98864 16.4859 5.85562 15.7764L3.16151 1.40786C3.11717 1.17137 2.91068 1 2.67007 1ZM6.35246 13H17.756C17.9768 13 18.1714 12.8552 18.2349 12.6437L20.6331 4.64954C20.7296 4.32786 20.4879 4.00441 20.152 4.00587L4.67868 4.07315L6.35246 13Z" fill="#2F3744"/>
                    <path d="M9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18C8.32843 18 9 18.6716 9 19.5Z" fill="#2F3744"/>
                    <path d="M16.5 21C17.3284 21 18 20.3284 18 19.5C18 18.6716 17.3284 18 16.5 18C15.6716 18 15 18.6716 15 19.5C15 20.3284 15.6716 21 16.5 21Z" fill="#2F3744"/>
                </svg>

            </button>
            {loading && <Loader />}
            {error && <ErrorMessage error={error}/>}
            {filteredProducts.map(product => <Product product={product} key={product.id} openModal={openModal} />)}
            {/*<Product product={products[0]}/> - так не надо. Сверху эта типа шоб итерировать (ну типа вдруг их тыща)*/}


            {modal && <ModalSearch title={"Create new product"} onClose={closeModalByContext}> {/*по черному тык и пропала модалка*/}
                <CreateProduct onCreate={createHandler}/> {/*() => setModal(false) - как только что-то было создано, там вызвалась функция и мы терь можем менять на фолс*/}
            </ModalSearch>}

            <button
                className={"fixed bottom-5 right-5 rounded-full bg-red-500 text-white text-2xl w-10 h-10 font-bold text-xl leading-6 align-middle pb-0.5"}
                onClick={openModalByContext}
            >+</button>
            <Modal isOpen={open} closeModal={closeModal} detail={detail} addToCart={addToCart}/>
            <CartModal isOpen={openCart} closeModal={closeModalCart} cart={cart}/>
        </div>
    )
};

export default ProductsPage;