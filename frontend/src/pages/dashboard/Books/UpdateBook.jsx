import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import axios from "axios";
import getBaseUrl from "../../../utils/baseURL";
import {
  useFetchBookByIdQuery,
  useUpdateBookMutation,
} from "../../../redux/features/books/booksApi";
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

// Validation schema using Yup
const validationSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
  tag: yup.string().required("Tag is required"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be greater than 0"),
  discountPrice: yup
    .number()
    .nullable()
    .when("tag", (tag, schema) =>
      tag === "Sale"
        ? schema
          .required("Discount price is required when tag is 'Sale'")
          .positive("Discount price must be greater than 0")
        : schema.nullable()
    ),
});

const UpdateBook = () => {
  const { id } = useParams();
  const { data: bookData, isLoading, isError, refetch } = useFetchBookByIdQuery(id);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
  const [updateBook, { isLoading: updating }] = useUpdateBookMutation();

  const { control, handleSubmit, reset, watch } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      tag: "",
      price: "",
      discountPrice: "",
      coverImage: [],
    },
  });

  const tag = watch("tag");

  // Populate form with existing book data
  useEffect(() => {
    if (bookData) {
      reset({
        title: bookData.title,
        description: bookData.description,
        category: bookData.category,
        tag: bookData.tag,
        price: bookData.price,
        discountPrice: bookData.discountPrice,
        coverImage: bookData.coverImage || [],
      });
      setUploadedImageUrls(bookData.coverImage || []);
    }
  }, [bookData, reset]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const uploadImages = async (files) => {
    if (!files.length) return []; // Early return if no files selected
  
    const formData = new FormData();
    files.forEach((file) => formData.append("coverImages", file)); // Ensure 'coverImages' matches multer's field name
  
    try {
      const response = await axios.post(`${getBaseUrl()}/api/books/upload-cover`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data.coverImages || []; // Return uploaded image URLs
    } catch (error) {
      console.error("Error uploading images:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to upload images. Please try again.",
        icon: "error",
      });
      return [];
    }
  };
  
  const onSubmit = async (data) => {
    try {
      let newImageUrls = [];
  
      // If new files are selected, upload them
      if (imageFiles.length > 0) {
        newImageUrls = await uploadImages(imageFiles);
      }
  
      // Replace old URLs with the new ones
      const updatedData = {
        ...data,
        coverImage: newImageUrls, // Replace old URLs with new ones
      };
  
      console.log("Updated Data:", updatedData); // Debug updated data
  
      // Ensure id is correctly passed
      console.log("Book ID:", id);
  
      // Send updated data to the server
      await updateBook({ id, ...updatedData }).unwrap();
  
      Swal.fire({
        title: "Book Updated",
        text: "Your book has been updated successfully!",
        icon: "success",
      });
  
      refetch(); // Refetch book data
      reset();
      setImageFiles([]);
      setImagePreviews([]);
    } catch (error) {
      console.error("Error updating book:", error);
      Swal.fire({
        title: "Error",
        text: error?.data?.message || "Failed to update the book. Please try again.",
        icon: "error",
      });
    }
  };
  
  
  

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">
          Error fetching book data
        </Typography>
      </Box>
    );
  }

  return (
    <section>
      <main className="mb-7 w-full xl:w-10/12 xl:mb-7 px-4 mx-auto">
        <h1 className="text-4xl font-bold mb-1">Update Book</h1>
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
            >
              <MenuItem value="">Choose A Category</MenuItem>
              <MenuItem value="Business">Business</MenuItem>
              <MenuItem value="Comedy">Comedy</MenuItem>
              <MenuItem value="Fiction">Fiction</MenuItem>
              <MenuItem value="Horror">Horror</MenuItem>
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
            />
          )}
        />

        {/* Tag */}
        <Controller
          name="tag"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              fullWidth
              displayEmpty
              margin="normal"
            >
              <MenuItem value="">Choose A Tag</MenuItem>
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

        {/* File Upload */}
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="mb-3"
        />

        {/* Preview Images */}
        <Box display="flex" flexWrap="wrap" gap={2} mb={2}>
          {/* Existing Images */}
          {uploadedImageUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Existing ${index + 1}`}
              style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 4 }}
            />
          ))}

          {/* New Previews */}
          {imagePreviews.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Preview ${index + 1}`}
              style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 4 }}
            />
          ))}
        </Box>

        <Button variant="contained" color="primary" fullWidth type="submit" disabled={updating}>
          {updating ? "Updating..." : "Update Book"}
        </Button>
      </Box>
    </section>
  );
};

export default UpdateBook;