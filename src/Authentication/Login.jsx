import React, { useEffect, useState } from "react";
import girlWithLaptop from '../assets/images/full-shot-man-working-night.jpg'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularLoader from "../components/loading/CircularLoader";

export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [disableBtn,setDisableBtn] = useState(false);

  const navigate = useNavigate('');

  useEffect(()=>{
    window.scrollTo(0, 0);
    window.document.title = "Login | Todo";
  },[])

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      toast("Checking Credentails ...")
      setDisableBtn(true);
      const response = await axios.post("https://todobackend-5twl.onrender.com/api/v1/users/login", formData);
      if (response.data.success) {
        toast(response.data.message);
        sessionStorage.setItem('todoToken',response.data.data.accessToken)
        navigate('/');
      }
    } catch (error) {
      console.log(error);
        toast(error?.response?.data?.message);
    }
    setFormData({
        email: "",
        password: "",
      })
      setDisableBtn(false);
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
              Login To Your Account
            </h6>
            <p className="text-sm text-[grey]">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus,
              veniam?<br /><Link to='/' className="underline text-sm">Chekout Todo's</Link>
            </p>
            <form action="" className="mt-8" onSubmit={loginUser}>
              <div className="bg-[#2c2c38] h-[45px] w-[full] flex mt-3 rounded-lg">
                <i className="fa fa-envelope text-white w-[50px] flex justify-center items-center"></i>
                <input
                  type="text"
                  className="bg-[transparent] w-full text-white outline-none pl-3 text-sm pr-10"
                  value={formData.email}
                  name="email"
                  onChange={handleInputChange}
                  placeholder="Email"
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
              <div className="mt-6">
                <button
                  className="bg-[#0b3b72] text-white w-full py-3 rounded-lg"
                  type="submit"
                  disabled={disableBtn}
                >
                  {
                    disableBtn ? <CircularLoader col="white" /> : "Login Now"
                  }
                </button>
              </div>
            </form>
            <div className="mt-4 text-center">
              <Link to="/forgot-password" className="underline text-sm">
                Forgot Password
              </Link>
              <br />
              <div className="mt-4">
                <span className="text-sm">
                  Not Have An Account ?{" "}
                  <Link
                    to="/signup"
                    className="text-[#0b3b72] text-base font-medium"
                  >
                    Signup
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
