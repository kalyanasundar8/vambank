import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import SignUp from "./Authentication/SignUp";
import SignIn from "./Authentication/SignIn";

const BankRoutes = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <div className="mx-[150px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default BankRoutes;
