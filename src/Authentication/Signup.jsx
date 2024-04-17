import React, { useState } from "react";
import girlWithLaptop from '../assets/images/full-shot-man-working-night.jpg'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    otp: "",
    password: "",
  });
  const [terms, setTerms] = useState(false);

  const navigate = useNavigate('');

  const handleInputChange = (e) => {
    console.log(e.target.name, " : ", e.target.value);
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const signupUser = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      if (!terms) {
        toast("Please Accept Terms & Conditions");
        return;
      }
      toast("Processing ... ");
      const response = await axios.post("/api/v1/users/signup", formData);
      console.log("Server Response", response.data);
      if (response.data.success) {
        toast(response.data.message);
        sessionStorage.setItem("eToken", response.data.data.accessToken);
        navigate('/')
      }
    } catch (error) {
      console.log(error);
      if (!error.response.data.success) {
        toast(error.response.data.message);
      }
    }
    setFormData({
      userName: "",
      email: "",
      otp: "",
      password: "",
    });
  };

  const generateOtp = async () => {
    try {
      if (!formData.email) {
        toast("Email is required to generate OTP");
        return;
      }
      toast("Sending OTP ...");
      const response = await axios.post("/api/v1/users/generate-otp", {
        email: formData.email,
      });
      console.log("Server Response", response);
      if (response.data.success) {
        toast(response.data.message);
      }
    } catch (error) {
      console.log(error.response.data);
      if (!error.response.data.success) {
        toast(error.response.data.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#303030]">
      <ToastContainer />
      <div className="bg-white flex shadow-lg md:rounded-xl rounded-none">
        <div
          className="rounded-tl-xl rounded-bl-xl hidden md:block"
          style={{
            backgroundImage: `url(${girlWithLaptop})`,
            height: "650px",
            width: "420px",
            backgroundSize: "cover",
          }}
        >
          <div className="mt-16 mx-auto flex justify-center text-center">
            <h4 className="text-white text-3xl font-bold w-[300px]">
              Get Access To Your ToDo Lists
            </h4>
          </div>
        </div>
        <div className="flex justify-center items-center md:w-[500px] w-full">
          <div className="md:w-[350px] w-full md:p-0 px-4 py-6">
            <h6 className="text-[#2c2c38] font-bold text-2xl">
              Create New Account
            </h6>
            <p className="text-sm text-[grey]">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus,
              veniam? <br /><Link to='/' className="underline text-sm">Chekout ToDo's</Link>
            </p>
            <form action="" className="mt-8" onSubmit={signupUser}>
              <div className="bg-[#2c2c38] h-[45px] flex rounded-lg">
                <i className="fa fa-user text-white w-[50px] flex justify-center items-center"></i>
                <input
                  type="text"
                  className="bg-[transparent] w-full text-white outline-none pl-3 text-sm"
                  value={formData.userName}
                  name="userName"
                  onChange={handleInputChange}
                  placeholder="User Name"
                  required
                />
              </div>
              <div className="relative">
                <div className="bg-[#2c2c38] h-[45px] w-[full] flex mt-3 rounded-lg">
                  <i className="fa fa-envelope text-white w-[50px] flex justify-center items-center"></i>
                  <input
                    type="text"
                    className="bg-[transparent] w-full text-white outline-none pl-3 text-sm pr-20"
                    value={formData.email}
                    name="email"
                    onChange={handleInputChange}
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="text-end mt-2 text-xs px-2 absolute right-0 -top-2 text-white border-l h-full flex items-center rounded-md cursor-pointer hover:shadow-sm">
                  <button type="button" onClick={generateOtp}>
                    Send OTP
                  </button>
                </div>
              </div>
              <div className="bg-[#2c2c38] h-[45px] flex mt-3 rounded-lg">
                <i className="fa fa-phone text-white w-[50px] flex justify-center items-center"></i>
                <input
                  type="text"
                  className="bg-[transparent] w-full text-white outline-none pl-3 text-sm"
                  value={formData.otp}
                  name="otp"
                  onChange={handleInputChange}
                  placeholder="Enter OTP"
                  required
                />
              </div>
              <div className="bg-[#2c2c38] h-[45px] flex mt-3 rounded-lg">
                <i className="fa fa-key text-white w-[50px] flex justify-center items-center"></i>
                <input
                  type="password"
                  className="bg-[transparent] w-full text-white outline-none pl-3 text-sm"
                  value={formData.password}
                  name="password"
                  onChange={handleInputChange}
                  placeholder="Create Password"
                  required
                />
              </div>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  name="terms"
                  id="terms"
                  value={terms}
                  checked={terms}
                  onChange={() => {
                    setTerms(!terms);
                  }}
                  className="h-[18px] w-[18px]"
                />
                <p className="ml-2 text-sm accent-[#0b3b72]">
                  I agree to all statements with{" "}
                  <Link to='' className="text-[#0b3b72] font-medium">
                    Terms of Use
                  </Link>
                </p>
              </div>
              <div className="mt-6">
                <button
                  className="bg-[#0b3b72] text-white w-full py-3 rounded-lg"
                  type="submit"
                >
                  SignUp Now
                </button>
              </div>
            </form>
            <div className="mt-4 text-center">
              <div className="mt-4">
                <span className="text-sm">
                  Already a member ?{" "}
                  <Link
                    to="/login"
                    className="text-[#0b3b72] text-base font-medium"
                  >
                    Login
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
