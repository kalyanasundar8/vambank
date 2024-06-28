import React from "react";
import Vault from "../assets/vault.png";
import { Link } from "react-router-dom";
import UserReviews from "../components/UserReviews";

const Home = () => {
  return (
    <div>
      <section className="flex items-center justify-center space-x-3 mt-[80px]">
        <div>
          <h1 className="font-primary font-bold text-start w-[900px] leading-[100px] text-[80px]">
            Saving your money is easy and secure with vambank
          </h1>
          <p className="font-secondary w-[700px] tracking-tight">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt ipsum,
            accusantium ullam distinctio nemo, in accusamus tempore dolorem, eos
            quisquam nam quas molestias soluta a repellat? Eaque nobis vitae
            soluta?
          </p>
          <div className="flex items-center space-x-5 mt-5">
            <button className="bg-secondaryBlue px-5 py-3 rounded-md text-white font-bold">
              CREATE ACCOUNT
            </button>
            <Link>Learn more</Link>
          </div>
        </div>
        <img src={Vault} width={700} alt="Savings-pig" />
      </section>
      <h1 className="text-2xl font-primary font-bold mt-[70px]">Reviews from the users</h1>
      <UserReviews />
    </div>
  );
};

export default Home;
