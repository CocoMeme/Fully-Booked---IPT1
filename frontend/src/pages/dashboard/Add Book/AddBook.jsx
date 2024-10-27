import React, { useState } from 'react'
import InputField from '../Add Book/InputField'
import SelectField from '../Add Book/SelectField'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useAddBookMutation } from '../../../redux/features/books/BooksApi';

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
  )
}

export default AddBook;
