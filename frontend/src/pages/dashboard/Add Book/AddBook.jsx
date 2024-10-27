import React, { useState } from 'react'
import InputField from '../Add Book/InputField'
import SelectField from '../Add Book/SelectField'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useAddBookMutation } from '../../../redux/features/books/BooksApi';
import { Link, Outlet } from 'react-router-dom';

const AddBook = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [imageFile, setimageFile] = useState(null);
  const [addBook, { isLoading, isError }] = useAddBookMutation()
  const [imageFileName, setimageFileName] = useState('');
  const [tag, setTag] = useState('');

  const onSubmit = async (data) => {
    // Exclude discountPrice if tag is not "Sale"
    const newBookData = {
      ...data,
      coverImage: imageFileName,
      discountPrice: tag === 'Sale' ? data.discountPrice : undefined, // Only include discountPrice if tag is "Sale"
    }

    try {
      await addBook(newBookData).unwrap();
      Swal.fire({
        title: "Book added",
        text: "Your book is uploaded successfully!",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm!"
      });
      reset();
      setimageFileName('');
      setimageFile(null);
    } catch (error) {
      console.error(error);
      alert("Failed to add book. Please try again.")
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setimageFile(file);
      setimageFileName(file.name);
    }
  }

  const handleTagChange = (e) => {
    setTag(e.target.value); // Update tag state
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

      <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Book</h2>

        {/* Form starts here */}
        <form onSubmit={handleSubmit(onSubmit)} className=''>
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
            onChange={handleTagChange}
          />

          {/* Discount Price */}
          <InputField
            label="Discount Price"
            name="discountPrice"
            type="number"
            placeholder="Discount Price"
            register={register}
            disabled={tag !== 'Sale'}
            isRequired={tag === 'Sale'} // Pass conditional required prop
          />


          {/* Cover Image Upload */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2 w-full" />
            {imageFileName && <p className="text-sm text-gray-500">Selected: {imageFileName}</p>}
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
            {
              isLoading ? <span>Adding...</span> : <span>Add Book</span>
            }
          </button>
        </form>
      </div>
    </section>
  )
}

export default AddBook;
