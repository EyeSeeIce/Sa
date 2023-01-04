import React from 'react';
import {useState} from "react";
import {IProduct} from "../types/models";
import axios from "axios";
import {ErrorMessage} from "./ErrorMessage";


interface CreateProductProps {
    onCreate: (product: IProduct) => void
}


const productData: IProduct = {
    title: 'test product',
    price: 13.5,
    description: 'lorem ipsum set',
    image: 'https://i.pravatar.cc',
    category: 'electronic',
    rating: {
        rate: 43,
        count: 10,
    }
}

const CreateProduct = ({onCreate}: CreateProductProps) => {

    const [value, setValue] = useState('')
    const [error, setError] = useState('')

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        setError('')


        if (value.trim().length === 0) {
            setError('Please enter valid title')
            return
        }
        productData.title = value
        const response = await axios.post<IProduct>('https://fakestoreapi.com/products', productData)

        onCreate({...response.data, id: Date.now()})
    }

    return (
        <form onSubmit={submitHandler}>
            <input
                type="text"
                className={"border py-2 px-4 mb-4 mt-4 w-full  outline-0"}
                placeholder={"Enter product title..."}
                value={value}
                onChange={changeHandler} //event => setValue(event.target.value)
            />

            {error && <ErrorMessage error={error}/>}

            <button
                type={"submit"}
                className={"py-2 px-4 border bg-yellow-400 hover:text-white"}>
                Create
            </button>
        </form>
    );
};

export default CreateProduct;