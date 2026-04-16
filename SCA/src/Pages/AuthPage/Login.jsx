import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../AuthContext/AuthContext";
import { toast } from 'react-hot-toast';
import SocialLogin from "../../components/Shared/SocialLogin";
import useAxiosSecure from "../../Hooks/useAxiosSecure";






const Login = () => {
  const { register, handleSubmit,getValues, formState: {errors} } = useForm();
  const { loginUser,userPassRest } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const axisoNormal=useAxiosSecure()
  

  const handleLogin = async userInfo => {
     setLoading(true);
    if (!userInfo?.email) {
      setLoading(false);
      toast.error('Please enter a valid email');
      return;
    }
    try {
      const user = await axisoNormal.get(`/temp/check-locke?email=${userInfo?.email}`);
      if (user?.data?.locked) {
         setLoading(false);
        return toast.error(
          `your account is locked for 2 minutes`,
        );
      }
     
    // ✅ login try
      const res = await loginUser(userInfo.email, userInfo.password);

      // Save user to DB if not already there (handles users created before DB save was wired up)
      const userInfoDb = {
        name: res.user.displayName || userInfo.email,
        email: res.user.email,
        image: res.user.photoURL || '',
      };
      await axisoNormal.post('/users', userInfoDb).catch(() => {});

      toast.success('Login successful!');
      navigate('/');

      await axisoNormal.patch('/temp/success',{email:userInfo?.email});

    } catch (err) {
      toast.error(err.message);
      const updateTempCount = await axisoNormal.patch('/temp/login-failed', {
        email: userInfo?.email,
      });
      if (updateTempCount?.data?.message) {
        toast.error(updateTempCount?.data?.message);
      }

    } finally {
      setLoading(false);
    }
  };

   const handleForgetPassword = () => {
     const email = getValues("email");
      userPassRest(email)
        .then((res) => {
          console.log(res);
          setLoading(false);
          toast.success("Check your email to reset password");
        })
        .catch((e) => {
          toast.error(e.message);
        });
    };


  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4">
      <div className="card bg-base-100 w-full max-w-md shadow-2xl border border-base-200 overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-8 text-center text-white">
          <h3 className="text-3xl font-black tracking-tight mb-2">
            Shahid Cadet Academy
          </h3>
          <p className="text-blue-50 opacity-90 font-medium">
            Login to your School
          </p>
        </div>

        <div className="card-body p-8 pt-6">
          <form  onSubmit={handleSubmit(handleLogin)} className="space-y-4">
           
            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Email Address</span>
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className={`input input-bordered focus:input-primary w-full `} //${errors.email ? "input-error" : ""}
                placeholder="name@example.com"
              />
              {errors.email && (
                <span className="text-error text-xs mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label flex justify-between">
                <span className="label-text font-bold">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "At least 6 characters" },
                })}
                className={`input input-bordered focus:input-primary w-full`}
                placeholder="••••••••"
              />
              {errors.password && (
                <span className="text-error text-xs mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>
            {/* create by saleh-ahmad */}
            <div>
              <button onClick={handleForgetPassword} type='button' className="link link-hover">Forget password?</button>
            </div>
            {/* Login Button */}
            <button className={`${loading ? 'opacity-80' : ''} btn btn-primary btn-block text-white font-bold mt-2 `}>
              {loading ? "Logging in..." : " Sign In"}
            </button>
          </form>
        </div>
        {/* Social Login */}
        <SocialLogin></SocialLogin>

        <p className="text-center text-sm mt-4 pb-3">
          New to <span className="font-semibold">Shahid Cadet Academy? </span>
          <Link
            state={location.state}
            className="text-primary font-bold hover:underline"
            to="/register"
          >
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
