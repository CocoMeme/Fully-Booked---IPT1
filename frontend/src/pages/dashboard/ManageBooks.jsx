import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDeleteBookMutation, useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

const ManageBooks = () => {
    const navigate = useNavigate();

    const { data: books, refetch } = useFetchAllBooksQuery()

    const [deleteBook] = useDeleteBookMutation()

    // Handle deleting a book
    const handleDeleteBook = async (id) => {
        try {
            await deleteBook(id).unwrap()
            alert('Book deleted successfully!')
            refetch()

        } catch (error) {
            console.error('Failed to delete book:', error.message)
            alert('Failed to delete book. Please try again.')
        }
    }

    // Handle navigating to Edit Book page
    const handleEditClick = (id) => {
        navigate(`dashboard/edit-book/${id}`)
    }

    return (

        <section className="py-1 bg-blueGray-50">
            <main className="mb-5">
                <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
                    <div className="mr-6">
                        <h1 className="text-4xl font-bold mb-1">Book Management</h1>
                        <h2 className="text-gray-600 ml-0.5">Admin Functionality</h2>
                    </div>
                    <div className="flex flex-col md:flex-row items-start justify-end -mb-3">
                        <Link to="/dashboard/manage-books" className="inline-flex px-5 py-3 text-gray-600 hover:text-gray-700 focus:text-gray-700 hover:bg-gray-100 focus:bg-gray-100 border border-gray-600 rounded-md mb-3">
                            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="flex-shrink-0 h-5 w-5 -ml-1 mt-0.5 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            Manage Books
                        </Link>
                        <Link to="/dashboard/add-new-book" className="inline-flex px-5 py-3 text-white bg-gray-600 hover:bg-gray-700 focus:bg-gray-700 rounded-md ml-6 mb-3">
                            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add New Book
                        </Link>
                    </div>
                </div>
                <Outlet />
            </main>
            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-base text-blueGray-700">All Books</h3>
                            </div>
                            {/* <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                    Refresh
                                </button>
                            </div> */}
                        </div>
                    </div>

                    <div className="block w-full overflow-x-auto">
                        <table className="items-center bg-transparent w-full border-collapse ">
                            <thead>
                                <tr>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        #
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Book Title
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Category
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Price
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Discounted Price
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    books && books.map((book, index) => (
                                        <tr key={index}>
                                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                {index + 1}
                                            </th>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                {book.title}
                                            </td>
                                            <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {book.category}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                ₱{book.price}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                ₱{book.discountPrice ? book.discountPrice : "0"}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 space-x-4">

                                                <Link to={`/dashboard/edit-book/${book._id}`} className="font-medium text-indigo-600 hover:text-indigo-700 mr-2 hover:underline underline-offset-2">
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteBook(book._id)}
                                                    className="font-medium bg-red-500 py-1 px-4 rounded-full text-white mr-2">Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                }


                            </tbody>

                        </table>
                    </div>
                </div>
            </div>


        </section>
    )
}

export default ManageBooks