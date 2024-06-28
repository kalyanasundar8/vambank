import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/actions/Auth.action";

// Form validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { userSignIn } from "../services/AuthServices";
import LoaderService from "../services/LoaderService";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Form validation
  const validationSchema = Yup.object().shape({
    mobileNumber: Yup.string()
      .matches(/^[6-9]\d{9}$/, "Mobile number is not valid")
      .required("Mobilenumber is required"),
    userPassword: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,}$/,
        "Password must be at least 6 characters, contain one uppercase letter, one number, and one special character"
      )
      .required("Password is required")
      .min("6")
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
  const signin = async (data) => {
    console.log(data)
    try {
      setLoading(true);
      const response = await userSignIn(data);
      if (response.status === 200) {
        localStorage.setItem("token", JSON.stringify(response?.data?.token));
        navigate("/");
        window.location.reload(); //  If response 201 navigate to the home page
        setLoading(false); // Set loading false when page navigate to the home page
      } else {
        setLoading(false);
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
          onSubmit={handleSubmit(signin)}
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
              name="userPassword"
              placeholder="Password"
              className={`${
                errors.userPassword
                  ? "border-2 border-red-500 w-[300px] p-2 rounded outline-none"
                  : "border-2 border-gray-400 w-[300px] p-2 rounded"
              }`}
              {...register("userPassword")}
            />
            {errors.userPassword && (
              <p className="text-red-500 w-[300px]">
                {errors.userPassword.message}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="bg-[#0E46A3] text-white font-bold w-[300px] py-2 px-4 rounded"
              disabled={loading}
            >
              {loading ? <LoaderService size={5} /> : "Sign In"}
            </button>
          </div>
          <div className="flex items-center justify-between mt-4">
            <p>Dont't have an account?</p>
            <Link className="text-[#0E46A3] font-bold">Sign Up</Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
