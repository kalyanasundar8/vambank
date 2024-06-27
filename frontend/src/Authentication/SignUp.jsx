import React from "react";

// Form validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { userSignUp } from "../services/AuthServices";

const SignUp = () => {
  // Form validation
  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("Username is required"),
    mobileNumber: Yup.string()
      .matches(/^[6-9]\d{9}$/, "Mobile number is not valid")
      .required("Mobilenumber is required"),
    password: Yup.string().required("Password is required").min("6"),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password")], "Password must match"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const signup = async (data) => {
    console.log(data);
    try {
      const response = await userSignUp(data);
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error:", error.message || error);
    }
  };

  return (
    <section className="flex items-center justify-center m-[50px]">
      {/* <div className="flex items-center space-x-[90px]"> */}
      {/* <img src={SignupIllustration} alt="Signup illustration" width={500} /> */}
      <div>
        <h1 className="text-3xl font-bold mb-5">Sign Up</h1>
        <form
          onSubmit={handleSubmit(signup)}
          className="bg-white shadow-md px-[40px] py-12"
        >
          <div className="mb-4">
            <input
              type="text"
              name="userName"
              placeholder="Username"
              className={`${
                errors.userName
                  ? "border-2 border-red-500 w-[300px] p-2 rounded outline-none"
                  : "border-2 border-gray-400 w-[300px] p-2 rounded"
              }`}
              {...register("userName")}
            />
            {errors.userName && (
              <p className="text-red-500">{errors.userName.message}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="tel"
              name="mobileNumber"
              placeholder="Phone Number"
              className={`${
                errors.mobileNumber
                  ? "border-2 border-red-500 w-[300px] p-2 rounded outline-none"
                  : "border-2 border-gray-400 w-[300px] p-2 rounded"
              }`}
              {...register("mobileNumber")}
            />
            {errors.mobileNumber && (
              <p className="text-red-500">{errors.mobileNumber.message}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={`${
                errors.password
                  ? "border-2 border-red-500 w-[300px] p-2 rounded outline-none"
                  : "border-2 border-gray-400 w-[300px] p-2 rounded"
              }`}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Confirm Password"
              className={`${
                errors.confirmPassword
                  ? "border-2 border-red-500 w-[300px] p-2 rounded outline-none"
                  : "border-2 border-gray-400 w-[300px] p-2 rounded"
              }`}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="bg-[#0E46A3] text-white font-bold w-[300px] py-2 px-4 rounded"
            >
              Sign Up
            </button>
          </div>
          <div className="flex items-center justify-between mt-4">
            <p>Already I have an account?</p>
            <Link className="text-[#0E46A3] font-bold">Sign In</Link>
          </div>
        </form>
      </div>
      {/* </div> */}
    </section>
  );
};

export default SignUp;
