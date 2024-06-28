import React from "react";
import SavingsPig from "../assets/savings.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex items-center space-x-3 mt-[80px]">
      <div>
        <h1 className="font-primary font-bold text-start w-[900px] leading-[100px] text-[80px]">
          Saving your money is easy and secure with vambank
        </h1>
        <p className="font-secondary w-[700px]">
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
      <img src={SavingsPig} width={700} alt="Savings-pig"/>
    </div>
  );
};

export default Home;
