import React from "react";
import OB from "../assets/online_banking.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBanSmoking,
  faBank,
  faExchange,
  faHandHoldingUsd,
  faMoneyBillTransfer,
  faPiggyBank,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  return (
    <div className="mx-[200px]">
      <section className="flex items-center justify-center space-x-5">
        <div className="">
          <h1 className="text-5xl font-bold">Navigate to Online Bank.</h1>
          <h1 className="text-5xl font-bold">Save your money.</h1>
          <p className="text-xl text-justify mt-5 mb-8">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae magni
            sunt repellendus eveniet consequuntur in culpa explicabo debitis
            nesciunt delectus! Autem dolore
          </p>
          <button className="text-xl bg-secondaryBlue px-5 py-3 rounded-md text-white font-bold">
            Create account
          </button>
        </div>
        <img src={OB} alt="Online banking" width={550} />
      </section>
      {/* Services */}
      <section className="flex items-center justify-between m-[80px]">
        <div className="flex flex-col items-center space-y-5">
          <FontAwesomeIcon icon={faUserPlus} className="text-5xl text-secondaryBlue" />
          <h1 className="text-2xl font-semiBold w-[150px] text-center">Easy Account Creation</h1>
        </div>
        <div className="flex flex-col items-center space-y-5">
          <FontAwesomeIcon icon={faPiggyBank} className="text-5xl text-secondaryBlue" />
          <h1 className="text-2xl font-semiBold w-[150px] text-center">Save your money</h1>
        </div>
        <div className="flex flex-col items-center space-y-5">
          <FontAwesomeIcon icon={faExchange} className="text-5xl text-secondaryBlue" />
          <h1 className="text-2xl font-semiBold w-[150px] text-center">Secure Transaction</h1>
        </div>
        <div className="flex flex-col items-center space-y-5">
          <FontAwesomeIcon icon={faHandHoldingUsd} className="text-5xl text-secondaryBlue" />
          <h1 className="text-2xl font-semiBold w-[150px] text-center">Geat loan easy</h1>
        </div>
      </section>
    </div>
  );
};

export default Home;
