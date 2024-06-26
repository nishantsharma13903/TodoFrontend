import React, { useEffect, useState } from "react";
import girlWithLaptop from "../assets/images/full-shot-man-working-night.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularLoader from "../components/loading/CircularLoader";

export default function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const [disableBtnOtp, setDisableBtnOtp] = useState(false);
  const [disableBtnPass, setDisableBtnPass] = useState(false);

  const navigate = useNavigate("");

  useEffect(() => {
    window.scrollTo(0, 0);
    window.document.title = "Forgot Password | Todo";
  }, []);

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    try {
      toast("Processing... ");
      setDisableBtnPass(true);
      const response = await axios.post(
        "https://todobackend-5twl.onrender.com/api/v1/users/forgot-password",
        formData
      );
      if (response.data.success) {
        toast(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast(error?.response?.data?.message);
    }
    setFormData({
      email: "",
      otp: "",
      newPassword: "",
    });
    setDisableBtnPass(false);
  };

  const generateOtp = async () => {
    try {
      if (!formData.email) {
        toast("Email is required to generate OTP");
        return;
      }
      toast("Sending OTP ...");
      setDisableBtnOtp(true);
      const response = await axios.post(
        "https://todobackend-5twl.onrender.com/api/v1/users/generate-otp-forgot-password",
        {
          email: formData.email,
        }
      );
      if (response.data.success) {
        toast(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast(error?.response?.data?.message);
    }
    setDisableBtnOtp(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#303030]">
      <ToastContainer />
      <div className="bg-white flex shadow-lg  md:rounded-xl rounded-none">
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
              Create New Passsword
            </h6>
            <p className="text-sm text-[grey]">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus,
              veniam?
            </p>
            <form action="" className="mt-8" onSubmit={updatePassword}>
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
                <div className="text-end mt-2 text-xs px-2 absolute right-0 -top-2 text-white border-l h-full flex items-center rounded-md cursor-pointer hover:shadow-sm bg-[#2c2c38]">
                  <button
                    type="button"
                    disabled={disableBtnOtp}
                    onClick={generateOtp}
                  >
                    {disableBtnOtp ? (
                      <CircularLoader col="white" />
                    ) : (
                      "Send OTP"
                    )}
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
                  value={formData.newPassword}
                  name="newPassword"
                  onChange={handleInputChange}
                  placeholder="Create New Password"
                  required
                />
              </div>
              <div className="mt-6">
                <button
                  className="bg-[#0b3b72] text-white w-full py-3 rounded-lg"
                  type="submit"
                  disabled={disableBtnPass}
                >
                  {disableBtnPass ? (
                    <CircularLoader col="white" />
                  ) : (
                    "Update Password"
                  )}
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
