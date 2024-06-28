import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/actions/Auth.action";

// Form validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { userSignUp } from "../services/AuthServices";
import LoaderService from "../services/LoaderService";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Form validation
  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("Username is required"),
    mobileNumber: Yup.string()
      .matches(/^[6-9]\d{9}$/, "Mobile number is not valid")
      .required("Mobilenumber is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,}$/,
        "Password must be at least 6 characters, contain one uppercase letter, one number, and one special character"
      )
      .required("Password is required")
      .min("6"),
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

  // Signup state handling
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  // API request
  const signup = async (data) => {
    try {
      setLoading(true); // Setloading true while trying to fetch response
      const response = await userSignUp(data);

      // Check the response
      if (response.status === 201) {
        dispatch(setUser(response?.data));
        localStorage.setItem("token", JSON.stringify(response?.data?.token)); // Set the token from the response
        navigate("/"); //  If response 201 navigate to the home page
        setLoading(false); // Set loading false when page navigate to the home page
      } else {
        setLoading(false); // Set loading false if response not 201
      }
    } catch (error) {
      setLoading(false); // Set loading false while response will be error
      setErrorMessage(error?.response?.data?.mssg); // Set the error message to the errorMessage state
      setTimeout(() => {
        setErrorMessage("");
      }, 3000); // Set the timeout for the error message
    }
  };

  return (
    <section className="flex items-center justify-center m-[50px]">
      <div>
        <h1 className="text-3xl font-bold mb-5">Sign Up</h1>
        <form
          onSubmit={handleSubmit(signup)}
          className="bg-white shadow-md px-[40px] pt-7 pb-12"
        >
          {errorMessage ? (
            <div className="border-2 border-red-500 px-2 py-2 bg-red-300 mb-5 rounded-md">
              <p className="text-red-500 font-bold">{errorMessage}</p>
            </div>
          ) : (
            ""
          )}
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
              <p className="text-red-500 w-[300px]">
                {errors.password.message}
              </p>
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
              disabled={loading}
            >
              {loading ? <LoaderService /> : "Sign Up"}
            </button>
          </div>
          <div className="flex items-center justify-between mt-4">
            <p>Already I have an account?</p>
            <Link className="text-[#0E46A3] font-bold">Sign In</Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
