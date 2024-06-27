import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import SignUp from "./Authentication/SignUp";

const BankRoutes = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <div className="mx-[120px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default BankRoutes;
