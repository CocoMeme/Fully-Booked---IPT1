import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";
import { useAddBookMutation } from "../../../redux/features/books/booksApi";
import { Link, Outlet } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import getBaseUrl from "../../../utils/baseURL";

const AddBook = () => {
  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      tag: "",
      price: "",
      discountPrice: "",
    },
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [addBook, { isLoading }] = useAddBookMutation();
  const tag = watch("tag");

  const onSubmit = async (data) => {
    if (imageFiles.length === 0) {
      Swal.fire({
        title: "Error",
        text: "Please upload at least one cover image!",
        icon: "error",
      });
      return;
    }
  
    const formData = new FormData();
    imageFiles.forEach((file) => {
      formData.append("coverImages", file); // Ensure 'coverImages' matches multer's field name
    });
  
    console.log([...formData.entries()]); // Debug FormData content
  
    try {
      // Upload images
      const uploadResponse = await fetch(`${getBaseUrl()}/api/books/upload-cover`, {
        method: "POST",
        body: formData,
      });
  
      if (!uploadResponse.ok) {
        throw new Error("Failed to upload the cover images.");
      }
  
      const { coverImages } = await uploadResponse.json();
  
      if (!coverImages || coverImages.length === 0) {
        throw new Error("No image URLs returned from upload!");
      }
  
      console.log("Uploaded Image URLs:", coverImages);
  
      // Add book data
      const newBookData = {
        ...data,
        coverImage: coverImages,
      };
  
      if (tag === "Sale") {
        newBookData.discountPrice = data.discountPrice;
      } else {
        delete newBookData.discountPrice;
      }
  
      console.log("New Book Data to Submit:", newBookData);
  
      await addBook(newBookData).unwrap();
  
      Swal.fire({
        title: "Book Added",
        text: "Your book has been added successfully!",
        icon: "success",
      });
  
      reset();
      setImageFiles([]);
      setImagePreviews([]);
    } catch (error) {
      console.error("Error adding book:", error);
      Swal.fire({
        title: "Error",
        text: error.message || "Failed to add the book. Please try again.",
        icon: "error",
      });
    }
  };


  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  return (
    <section>
      <main className="mb-7 w-full xl:w-10/12 xl:mb-7 px-4 mx-auto">
        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
          <div className="mr-6">
            <h1 className="text-4xl font-bold mb-1">Book Management</h1>
            <h2 className="text-gray-600 ml-0.5">Admin Functionality</h2>
          </div>
          <div className="flex flex-col md:flex-row items-start justify-end -mb-3">
            <Link
              to="/dashboard/manage-books"
              className="inline-flex px-5 py-3 text-gray-600 hover:text-gray-700 focus:text-gray-700 hover:bg-gray-100 focus:bg-gray-100 border border-gray-600 rounded-md mb-3"
            >
              Manage Books
            </Link>
            <Link
              to="/dashboard/add-new-book"
              className="inline-flex px-5 py-3 text-white bg-gray-600 hover:bg-gray-700 focus:bg-gray-700 rounded-md ml-6 mb-3"
            >
              Add New Book
            </Link>
          </div>
        </div>
        <Outlet />
      </main>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        maxWidth="sm"
        mx="auto"
        p={3}
        boxShadow={3}
        borderRadius={2}
        bgcolor="white"
      >
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
          Add New Book
        </Typography>

        {/* Title */}
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Title"
              fullWidth
              margin="normal"
              error={!!error}
              helperText={error?.message}
              required
            />
          )}
        />

        {/* Description */}
        <Controller
          name="description"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Description"
              multiline
              rows={4}
              fullWidth
              margin="normal"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />

        {/* Category */}
        <Controller
          name="category"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Select
              {...field}
              fullWidth
              displayEmpty
              margin="normal"
              error={!!error}
              required
            >
              <MenuItem value="">Choose A Category</MenuItem>
              <MenuItem value="Business">Business</MenuItem>
              <MenuItem value="Comedy">Comedy</MenuItem>
              <MenuItem value="Fiction">Fiction</MenuItem>
              <MenuItem value="Adventure">Adventure</MenuItem>
            </Select>
          )}
        />

        {/* Price */}
        <Controller
          name="price"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Price"
              type="number"
              fullWidth
              margin="normal"
              error={!!error}
              helperText={error?.message}
              required
            />
          )}
        />

        {/* Tag */}
        <Controller
          name="tag"
          control={control}
          required
          render={({ field }) => (
            <Select {...field} fullWidth displayEmpty margin="normal">
              <MenuItem value="" disabled>
                Choose a Tag
              </MenuItem>
              <MenuItem value="New">New</MenuItem>
              <MenuItem value="Hot">Hot</MenuItem>
              <MenuItem value="Sale">Sale</MenuItem>
            </Select>
          )}
        />

        {/* Discount Price */}
        {tag === "Sale" && (
          <Controller
            name="discountPrice"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Discount Price"
                type="number"
                fullWidth
                margin="normal"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        )}

        {/* Cover Images Upload */}
        <Box mb={2}>
          <Typography variant="subtitle1" mb={1}>
            Cover Images
          </Typography>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            style={{ display: "block", marginBottom: "8px" }}
          />
          <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
            {imagePreviews.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Preview ${index}`}
                style={{ width: "100px", height: "auto" }}
              />
            ))}
          </Box>
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Add Book"}
        </Button>
      </Box>
    </section>
  );
};

export default AddBook;
