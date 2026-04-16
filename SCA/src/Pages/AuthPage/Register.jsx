import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../../AuthContext/AuthContext";
// import { toast } from "react-toastify";
import SocialLogin from "../../components/Shared/SocialLogin";
import toast from "react-hot-toast";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQueryClient } from "@tanstack/react-query";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { userRegister, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const handleRegister = async (userInfo) => {
    setLoading(true);
    try {
      // Step 1: Upload image to Cloudinary (fall back to default avatar if it fails)
      let imageurl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userInfo.name)}&background=random`;
      const profilePhoto = userInfo.photo?.[0];
      if (profilePhoto) {
        try {
          const formData = new FormData();
          formData.append('file', profilePhoto);
          formData.append('upload_preset', import.meta.env.VITE_IMAGE_HOSTING_PRESET);
          const imageRes = await axios.post(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_IMAGE_HOSTING_KEY}/image/upload`,
            formData,
          );
          imageurl = imageRes.data.secure_url;
        } catch (uploadErr) {
          console.warn('Image upload failed, using default avatar:', uploadErr?.response?.data?.error?.message);
        }
      }

      // Step 2: Create Firebase account
      const res = await userRegister(userInfo.email, userInfo.password);

      // Step 3: Update Firebase profile
      await updateUserProfile({ displayName: userInfo.name, photoURL: imageurl });

      // Step 4: Save user to database
      const userInfoDb = {
        name: userInfo.name,
        email: res.user.email,
        image: imageurl,
      };

      await axiosSecure.post('/users', userInfoDb);

      queryClient.invalidateQueries({ queryKey: ['user-role', userInfoDb.email] });

      toast.success('Registered successfully!');
      navigate('/');
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };


  


  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4">
      <div className="card bg-base-100 w-full max-w-md shadow-2xl border border-base-200 overflow-hidden">
        <div className="bg-linear-to-r from-blue-600 to-cyan-500 p-8 text-center text-white">
          <h3 className="text-3xl font-black tracking-tight mb-2">
            Shahid Cadet Academy
          </h3>
          <p className="text-blue-50 opacity-90 font-medium">
            Register in your school
          </p>
        </div>
        <form
          className="card-body my-0 py-0"
          onSubmit={handleSubmit(handleRegister)}
        >
          <fieldset className="fieldset">
            {/* name field */}
            <label className="label">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input w-full"
              placeholder="Your Name"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500">Name is required.</p>
            )}

            {/* photo image field */}
            <label className="label">Photo</label>

            <input
              type="file"
              {...register("photo", { required: true })}
              className="file-input w-full"
              placeholder="Your Photo"
            />

            {errors.name?.type === "required" && (
              <p className="text-red-500">Photo is required.</p>
            )}

            {/* email field */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input w-full"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required.</p>
            )}

            {/* password */}
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
              })}
              className="input w-full"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500 font-semibold italic">
                Password is required.
              </p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 font-semibold italic">
                Password must be 6 characters or longer
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500 font-semibold italic">
                Password must have at least one uppercase, at least one
                lowercase, at least one number, and at least one special
                characters
              </p>
            )}

            <button className={`btn btn-neutral mt-4 ${loading ? 'bg-neutral/60' : ''}`}>
              {loading ? <span>Wait for verify...</span> : <span>Register</span>}
            </button>
          </fieldset>
          <p className="font-semibold text-xs">
            Already have an account?{" "}
            <Link
              state={location.state}
              className="text-blue-400 underline"
              to="/login"
            >
              Login
            </Link>
          </p>
        </form>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Register;
