import React from 'react'
import { FiShoppingCart } from "react-icons/fi"
import { useParams } from "react-router-dom"
import { useFetchBookByIdQuery } from '../../redux/features/books/BooksApi'
import { getImgUrl } from '../../utils/getImgUrl'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'
import Recommened from '../home/Recommened'

const SingleBook = () => {

    const {id} = useParams()
    const {data: book, isLoading, isError} = useFetchBookByIdQuery(id);

    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Error happened while loading books!</div>

    const dispatch = useDispatch();
    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }

    return (

        <div>
            <div className="max-w-lg shadow-md p-5">
                <h1 className="text-2xl font-bold mb-6">{book.title}</h1>
        
                <div className="">
                    <div>
                        <img
                            src={book?.coverImage} // Use the Cloudinary URL directly
                            alt={book?.title}
                            className="w-25 h-auto bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
                        />
                    </div>

                    <div className="mb-5">
                        <p className="text-gray-700 mb-2">
                            <strong>Author:</strong> {book.author || 'admin'}
                        </p>

                        <p className="text-gray-700 mb-4">
                            <strong>Published:</strong> {new Date(book?.createdAt).toLocaleDateString()}
                        </p>

                        <p className="text-gray-700 mb-4 capitalize">
                        <strong>Category:</strong> {book?.category}
                        </p>
                        
                        <p className="text-gray-700">
                            <strong>Description:</strong> {book.description}
                        </p>
                    </div>

                    <button 
                        onClick={() => handleAddToCart(book)} 
                        className="btn-primary px-6 space-x-1 flex items-center gap-1">
                        <FiShoppingCart className="" />
                        <span>Add to Cart</span>
                    </button>
                
                </div>
            </div>
            <Recommened/>
        </div>
  )
}

export default SingleBook