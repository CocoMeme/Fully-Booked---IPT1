import React, { useEffect, useState } from 'react'
import InputField from '../dashboard/Add Book/InputField'
import SelectField from '../dashboard/Add Book/SelectField'
import { useForm } from 'react-hook-form'
import { Link, Outlet, useParams } from 'react-router-dom'
import Loading from '../../components/Loading'
import Swal from 'sweetalert2'
import axios from 'axios'
import getBaseUrl from '../../utils/baseURL'
import { useFetchBookByIdQuery, useUpdateBookMutation } from '../../redux/features/books/booksApi';


const UpdateBook = () => {
  const { id } = useParams();
  const { data: bookData, isLoading, isError, refetch } = useFetchBookByIdQuery(id);
  const [updateBook] = useUpdateBookMutation();
  const { register, handleSubmit, setValue, reset } = useForm();

  // New state for tag
  const [tag, setTag] = useState('');

  useEffect(() => {
    if (bookData) {
      setValue('title', bookData.title);
      setValue('description', bookData.description);
      setValue('category', bookData.category);
      setValue('tag', bookData.tag);
      setValue('price', bookData.price);
      setValue('discountPrice', bookData.discountPrice);
      setValue('coverImage', bookData.coverImage);
      setTag(bookData.tag);  // Set initial tag state
    }
  }, [bookData, setValue]);

  const handleTagChange = (e) => {
    setTag(e.target.value);
  };

  const onSubmit = async (data) => {
    const updateBookData = {
      title: data.title,
      description: data.description,
      category: data.category,
      tag: data.tag,
      price: Number(data.price),
      discountPrice: tag === 'Sale' ? Number(data.discountPrice) : null, // Set to null if not "Sale"
      coverImage: data.coverImage || bookData.coverImage,
    };

    try {
      await axios.put(`${getBaseUrl()}/api/books/edit/${id}`, updateBookData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      Swal.fire({
        title: "Book Updated",
        text: "Your book is updated successfully!",
        icon: "success",
      });
      await refetch();
    } catch (error) {
      console.log("Failed to update book.");
      alert("Failed to update book.");
    }
  };


  if (isLoading) return <Loading />;
  if (isError) return <div>Error fetching book data</div>;

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
      
      <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Book</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Title */}
          <InputField
            label="Title"
            name="title"
            placeholder="Enter book title"
            register={register}
          />

          {/* Description */}
          <InputField
            label="Description"
            name="description"
            placeholder="Enter book description"
            type="textarea"
            register={register}
          />

          {/* Category */}
          <SelectField
            label="Category"
            name="category"
            options={[
              { value: '', label: 'Choose A Category' },
              { value: 'Business', label: 'Business' },
              { value: 'Comedy', label: 'Comedy' },
              { value: 'Fiction', label: 'Fiction' },
              { value: 'Horror', label: 'Horror' },
              { value: 'Adventure', label: 'Adventure' },
            ]}
            register={register}
          />

          {/* Price */}
          <InputField
            label="Price"
            name="price"
            type="number"
            placeholder="Price"
            register={register}
          />

          {/* Tag */}
          <SelectField
            label="Tag"
            name="tag"
            options={[
              { value: '', label: 'Choose A Tag' },
              { value: 'New', label: 'New' },
              { value: 'Hot', label: 'Hot' },
              { value: 'Sale', label: 'Sale' },
            ]}
            register={register}
            onChange={handleTagChange} // Update tag state on change
          />

          {/* Discount Price */}
          <InputField
            label="Discount Price"
            name="discountPrice"
            type="number"
            placeholder="Discount Price"
            register={register}
            disabled={tag !== 'Sale'}
            isRequired={tag === 'Sale'} // Conditionally require based on tag value
          />

          {/* Cover Image URL */}
          <InputField
            label="Cover Image URL"
            name="coverImage"
            type="text"
            placeholder="Cover Image URL"
            register={register}
          />

          <button type="submit" className="w-full py-2 bg-blue-500 text-white font-bold rounded-md">
            Update Book
          </button>
        </form>
      </div>
      
    </section>
  )
}

export default UpdateBook