import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, Link, Outlet } from "react-router-dom";
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
  const { data: bookData, isLoading, isError, refetch } =
    useFetchBookByIdQuery(id);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
  const [uploading, setUploading] = useState(false);

  const { control, handleSubmit, setValue, reset, watch } = useForm({
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

  const uploadImages = async (files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("file", file));
    formData.append("upload_preset", "your_upload_preset"); // Replace with your Cloudinary preset

    try {
      const responses = await Promise.all(
        files.map(async (file) => {
          const response = await axios.post(
            "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", // Replace with your Cloudinary URL
            formData
          );
          return response.data.secure_url; // Get the uploaded image URL
        })
      );
      return responses;
    } catch (error) {
      console.error("Error uploading images:", error);
      return [];
    }
  };

  const onSubmit = async (data) => {
    try {
      setUploading(true);

      // Upload any newly selected files
      const newImageUrls = await uploadImages(selectedFiles);

      // Combine existing and new image URLs
      const updatedCoverImages = [...uploadedImageUrls, ...newImageUrls];

      // Prepare data for submission
      const updatedData = {
        ...data,
        coverImage: updatedCoverImages,
      };

      await axios.put(`${getBaseUrl()}/api/books/edit/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      Swal.fire({
        title: "Book Updated",
        text: "Your book has been updated successfully!",
        icon: "success",
      });

      refetch();
      setUploading(false);
    } catch (error) {
      console.error("Error updating book:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to update the book.",
        icon: "error",
      });
      setUploading(false);
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
          Update Book
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
          onChange={(e) => setSelectedFiles([...e.target.files])}
          className="mb-3"
        />

        {/* Preview */}
        <Box display="flex" flexWrap="wrap" gap={2} mb={2}>
          {uploadedImageUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Uploaded ${index + 1}`}
              style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 4 }}
            />
          ))}
          {selectedFiles.map((file, index) => (
            <img
              key={index}
              src={URL.createObjectURL(file)}
              alt={`Preview ${index + 1}`}
              style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 4 }}
            />
          ))}
        </Box>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Update Book"}
        </Button>
      </Box>
    </section>
  );
};

export default UpdateBook;