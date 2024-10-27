import React, { useEffect, useState } from 'react'
import InputField  from '../dashboard/Add Book/InputField'
import SelectField  from '../dashboard/Add Book/SelectField'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
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
    );
  };
  
  export default UpdateBook;