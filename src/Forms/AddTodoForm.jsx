import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import CircularLoader from "../components/loading/CircularLoader";

export default function AddTodoForm(Props) {
  const [opened, { open, close }] = useDisclosure(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [disableBtn, setDisableBtn] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("todoToken");

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      setDisableBtn(true)

      const response = await axios.post(
        "https://todobackend-5twl.onrender.com/api/v1/todos/add-todo",
        formData,
        { headers }
      );


      if (response.data.statusCode === 200) {
        toast.success(response?.data.message);
        Props.getAllUserTodos();
        close();
      }
    } catch (error) {
      console.log(error);
      toast(error?.response?.data?.message);
    }
    setFormData({
      title: "",
      description: "",
    });
    setDisableBtn(false)
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add Todo" centered>
        {/* Modal content */}
        <form action="" className="" onSubmit={handleSubmit}>
          <div className="">
            <label htmlFor="">Title</label>
            <br />
            <input
              type="text"
              className="outline-none border-b border-black w-full mt-1 text-sm"
              placeholder="Title Here ..."
              name="title"
              onChange={handleInputChange}
              value={formData.title}
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="">Description</label>
            <br />
            <textarea
              name="description"
              id=""
              cols="30"
              rows="10"
              className="outline-none border border-black w-full mt-1 resize-none h-[100px] p-1 text-sm"
              placeholder="Description Here ..."
              onChange={handleInputChange}
              value={formData.description}
              required
            ></textarea>
          </div>
          <div className="mt-6">
            <button className="bg-[#f96a36] text-white py-[6px] w-full rounded-sm tracking-wide font-medium"  disabled={disableBtn}
        type="submit">
              {
          disableBtn ? <CircularLoader col="white" /> : "Save"
        }
            </button>
          </div>
        </form>
      </Modal>
      <button
        className="text-white border-2 border-white rounded-md py-1 px-3 text-xs"
        onClick={open}
      >
        <i className="fa fa-plus mr-2"></i> Add Task
        
      </button>
    </>
  );
}
