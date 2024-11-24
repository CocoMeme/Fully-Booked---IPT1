import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import {
  TextField,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext"; // Adjust the import path as necessary
import getBaseUrl from "../../utils/baseURL"; // Utility for base URL
import Apply from './Apply';

const Profile = () => {
  const { currentUser } = useAuth();
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      username: currentUser?.username || "",
      email: currentUser?.email || "",
      password: "",
      phone: currentUser?.phone || "",
      city: currentUser?.address?.city || "",
      country: currentUser?.address?.country || "",
      state: currentUser?.address?.state || "",
      zipcode: currentUser?.address?.zipcode || "",
      avatar: currentUser?.avatar || "",
    },
  });

  const [avatarFile, setAvatarFile] = useState(null);

  const onSubmit = async (data) => {
    try {
      let avatarUrl = data.avatar; // Use existing URL if no file uploaded

      // Upload avatar to Cloudinary if a new file is selected
      if (avatarFile) {
        const formData = new FormData();
        formData.append("avatar", avatarFile);

        const uploadResponse = await fetch(`${getBaseUrl()}/api/users/upload-avatar`, {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload the avatar.");
        }

        const { url } = await uploadResponse.json();
        avatarUrl = url;
      }

      // Construct the updated data payload
      const updatedData = {
        ...data,
        avatar: avatarUrl,
        address: {
          city: data.city,
          country: data.country,
          state: data.state,
          zipcode: data.zipcode,
        },
      };

      // Send the updated user data to the server
      const updateResponse = await fetch(`${getBaseUrl()}/api/users/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!updateResponse.ok) {
        throw new Error("Failed to update the profile.");
      }

      Swal.fire({
        title: "Profile Updated",
        text: "Your profile has been successfully updated!",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message || "Something went wrong. Please try again.",
        icon: "error",
      });
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setValue("avatar", ""); 
    }
  };

  return (
    <section className="absolute top-20 left-0 w-full h-full flex items-center justify-center bg-gray-100">
        
      <div className="container max-w-screen-lg mx-auto">
      <Apply />
        <Paper className="bg-white rounded shadow-lg p-4 md:p-8 mb-6">
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8">
            <div className="text-gray-600">
              <div className="flex items-center mb-4">
                <img
                  src={currentUser?.avatar || "/avatar-placeholder.png"}
                  alt="Profile Avatar"
                  className="size-10 mr-1"
                />
                <Typography variant="h5" fontWeight="bold">
                  Profile Details
                </Typography>
              </div>
              <Typography variant="body1" color="textSecondary">
                Update your information
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Please fill out all required fields.
              </Typography>
            </div>

            <div className="lg:col-span-2">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-2">
                  <TextField
                    {...register("username")}
                    label="Username"
                    fullWidth
                    variant="outlined"
                    size="small"
                    error={Boolean(errors.username)}
                    helperText={errors.username ? "This field is required" : ""}
                  />
                </div>
                <div className="md:col-span-3">
                  <TextField
                    {...register("email", { required: true })}
                    label="Email Address"
                    fullWidth
                    variant="outlined"
                    size="small"
                    error={Boolean(errors.email)}
                    helperText={errors.email ? "This field is required" : ""}
                  />
                </div>
                <div className="md:col-span-5">
                  <TextField
                    {...register("password", { required: true })}
                    label="Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    size="small"
                    error={Boolean(errors.password)}
                    helperText={errors.password ? "This field is required" : ""}
                  />
                </div>
                <div className="md:col-span-5">
                  <TextField
                    {...register("avatar")}
                    label="Avatar URL"
                    fullWidth
                    variant="outlined"
                    size="small"
                    placeholder="https://example.com/avatar.jpg"
                    error={Boolean(errors.avatar)}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="mt-2"
                  />
                </div>
                <div className="md:col-span-2">
                  <TextField
                    {...register("phone", { required: true })}
                    label="Phone Number"
                    fullWidth
                    variant="outlined"
                    size="small"
                    error={Boolean(errors.phone)}
                    helperText={errors.phone ? "This field is required" : ""}
                  />
                </div>
                <div className="md:col-span-3">
                  <TextField
                    {...register("city", { required: true })}
                    label="City"
                    fullWidth
                    variant="outlined"
                    size="small"
                    error={Boolean(errors.city)}
                    helperText={errors.city ? "This field is required" : ""}
                  />
                </div>
                <div className="md:col-span-2">
                  <TextField
                    {...register("country", { required: true })}
                    label="Country"
                    fullWidth
                    variant="outlined"
                    size="small"
                    error={Boolean(errors.country)}
                    helperText={errors.country ? "This field is required" : ""}
                  />
                </div>
                <div className="md:col-span-2">
                  <TextField
                    {...register("state", { required: true })}
                    label="State / Province"
                    fullWidth
                    variant="outlined"
                    size="small"
                    error={Boolean(errors.state)}
                    helperText={errors.state ? "This field is required" : ""}
                  />
                </div>
                <div className="md:col-span-1">
                  <TextField
                    {...register("zipcode", { required: true })}
                    label="Zipcode"
                    fullWidth
                    variant="outlined"
                    size="small"
                    error={Boolean(errors.zipcode)}
                    helperText={errors.zipcode ? "This field is required" : ""}
                  />
                </div>
                <div className="md:col-span-5 text-end">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      fontWeight: "bold",
                      padding: "8px 16px",
                      backgroundColor: "blue",
                      "&:hover": {
                        backgroundColor: "darkblue",
                      },
                    }}
                  >
                    Update Profile
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Paper>
      </div>
    </section>
  );
};

export default Profile;
