import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DetailTodo(Props) {
  const [opened, { open, close }] = useDisclosure(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(()=>{
    getTodoData();
  },[Props])

  const getTodoData = async() => {
    try {
      const token = sessionStorage.getItem("todoToken");

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.get(
        `https://todobackend-5twl.onrender.com/api/v1/todos/get-todo/${Props.id}`,
        { headers }
      );

      console.log("server response: ", response);

      if (response.data.statusCode === 200) {
        setFormData(response?.data?.data)
      }
    } catch (error) {
      console.log(error);
      toast(error?.response?.data?.message);
    }
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Todo Details" centered>
        {/* Modal content */}
        <div className="">
            <div className="">
                <h3 className="text-lg font-medium tracking-wide">{formData.title}</h3>
                <p className="text-[#5b5a5a] text-[13px] mt-4 ">{formData.description}</p>
            </div>
        </div>
      </Modal>
      <button
        className="bg-[#ff3f5f] text-white h-[30px] w-[35px] cursor-pointer"
        onClick={open}
      >
        <i className="fa fa-eye"></i>
      </button>
    </>
  );
}
