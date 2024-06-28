import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { verifyUserToken } from "../services/AuthServices";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/actions/Auth.action";

const Navbar = () => {
  const dispatch = useDispatch();

  const [verifiedUser, setVerifiedUser] = useState();

  const token = JSON.parse(localStorage.getItem("token"));

  const verify = async () => {
    
    try {
      const response = await verifyUserToken({ token: token });
      setVerifiedUser(response?.data);
      dispatch(setUser(response?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(token) {
      verify();
    }
  }, [token]);

  return (
    <div>
      <nav className="flex items-center justify-between bg-primary text-white px-[250px] py-6 shadow-lg shadow-lightblueshadow overflow-x-hidden">
        <h1 className="font-primary text-2xl font-bold">VAMBank</h1>
        <div className="font-secondary flex items-center space-x-5">
          <Link>Help</Link>
          <Link>About Us</Link>
          <Link>Review our bank</Link>
          {!verifiedUser ? (
            <div className="flex items-center space-x-5">
              <Link to="/signin">Sign In</Link>
              <Link to="/signup" className="font-extrabold">
                Sign Up
              </Link>
            </div>
          ) : verifiedUser.verificationStatus === true ? (
            <div className="flex items-center space-x-3">
              <h1 className="text-[20px] font-bold font-primary">
                {verifiedUser.Username}
              </h1>
              <p className="text-xl bg-white text-blue-950 px-2 rounded-full">
                {verifiedUser.Username.charAt(0)}
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
