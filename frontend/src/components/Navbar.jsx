import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="flex items-center justify-between bg-primary text-white px-10 py-6 shadow-lg shadow-lightblueshadow overflow-x-hidden">
        <h1 className="font-primary text-2xl font-bold">VAMBank</h1>
        <div className="font-secondary flex items-center space-x-5">
          <Link>Help</Link>
          <Link>About Us</Link>
          <Link>Sign In</Link>
          <Link className="font-extrabold">Sign Up</Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
