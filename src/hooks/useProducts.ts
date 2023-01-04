import {useState} from "react";
import {IProduct} from "../types/models";
import {useEffect} from "react";
import {AxiosError} from "axios";
import axios from "axios";

export function useProducts () {
    const [products, setProducts] = useState<IProduct[]>([])
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([])

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    function addProduct (product: IProduct) {
        setProducts(prev => [...prev, product])
    }

    function filterProducts (str: string) {
        setFilteredProducts(prev => {
           return products.filter(product => product.title.includes(str))
        })

    }

    // начинаем загрузку данных
    async function fetchProducts() {

        try {
            setLoading(true)
            const response = await axios.get<IProduct[]>('https://fakestoreapi.com/products?limit=5')
            setProducts(response.data)
            setLoading(false)
        } catch (e: unknown) {
            const error = e as AxiosError
            setLoading(false)
            setError(error.message)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    useEffect(() => {
        setFilteredProducts(products)
    }, [products])

    return {products, loading, error, addProduct, filterProducts, filteredProducts}
}