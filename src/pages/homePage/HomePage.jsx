import React, { useEffect, useState } from "react";
import "../../styles/HomePage.css";
import AddTodoForm from "../../Forms/AddTodoForm";
import UpdateTodoForm from "../../Forms/UpdateTodoForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import DetailTodo from "../detailTodo/DetailTodo";
import axios from "axios";

export default function HomePage() {
  const navigate = useNavigate("");
  const [todos, setTodos] = useState([]);
  const [AllTodos, setAllTodos] = useState([]);
  const [selectTodos, setSelectTodos] = useState("");

  useEffect(() => {
    getAllUserTodos();
  }, []);

  useEffect(() => {
    filteringTodos();
  }, [selectTodos]);

  const logoutUser = () => {
    sessionStorage.removeItem("todoToken");
    navigate("/login");
  };

  const itemsPerPage = 9;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(todos.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedData = todos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getAllUserTodos = async () => {
    try {
      const token = sessionStorage.getItem("todoToken");

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      console.log("working");
      const response = await axios.get(
        "https://todobackend-5twl.onrender.com/api/v1/todos/get-user-todos",
        { headers }
      );

      console.log("server response: ", response);

      if (response?.data?.statusCode === 200) {
        console.log("I have been called");
        setTodos(response.data.data);
        setAllTodos(response.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const updateTodoStatus = async (id, stat) => {
    try {
      const status = stat === "Completed" ? true : false;
      console.log(id, stat);
      const token = sessionStorage.getItem("todoToken");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      console.log(status);
      const response = await axios.put(
        `https://todobackend-5twl.onrender.com/api/v1/todos/update-todo-status/${id}`,
        { completed: status },
        { headers }
      );
      console.log("server response: ", response);
      if (response.data.statusCode === 200) {
        getAllUserTodos();
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete? ")) {
        return;
      }
      const token = sessionStorage.getItem("todoToken");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await axios.delete(
        `https://todobackend-5twl.onrender.com/api/v1/todos/delete-todo/${id}`,
        { headers }
      );
      console.log("server response: ", response);
      if (response.data.statusCode === 200) {
        getAllUserTodos();
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const searchingTodos = (e) => {
    const searchTerm = e.target.value;
    const filteredTodos = AllTodos.filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCurrentPage(1);
    setTodos(filteredTodos);
  };

  const filteringTodos = (todo) => {
    let filteredTodos = [];
    if (selectTodos === "Pending") {
      filteredTodos = AllTodos.filter((todo) => {
        return todo.completed === false;
      });
    } else if (selectTodos === "Completed") {
      filteredTodos = AllTodos.filter((todo) => {
        return todo.completed === true;
      });
    } else if (selectTodos === "All") {
      filteredTodos = AllTodos;
    }
    setCurrentPage(1);
    setTodos(filteredTodos);
  };

  return (
    <div className="md:h-screen h-auto bg-[#303030] pb-10">
      <ToastContainer />
      <div className="flex justify-between items-center border-b border-white p-4">
        <div className=" text-white flex gap-3 items-end">
          <i className="fa fa-tasks md:text-2xl text-xl"></i>
          <h2 className="md:text-2xl text-xl font-medium">Todo Lists</h2>
        </div>
        <div className="flex gap-4">
          <AddTodoForm getAllUserTodos={getAllUserTodos} />
          <button onClick={logoutUser}>
            <i className="fa fa-sign-out text-xl text-white"></i>
          </button>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <div className="bg-[#424242] w-[90%] md:p-6 p-2 md:h-[600px] h-auto md:overflow-y-auto">
          <div className="flex md:flex-row flex-col md:gap-10 gap-6 justify-end p-4 mr-16">
            <div className="">
              <input
                type="text"
                className="border-b border-white bg-transparent outline-none md:w-[300px] w-full text-[whitesmoke] italic text-sm"
                placeholder="Search By Title"
                onChange={searchingTodos}
              />
            </div>
            <div className="">
              <select
                name=""
                id=""
                className=" px-2 py-[2px] text-xs outline-none cursor-pointer"
                value={selectTodos}
                onChange={(e) => setSelectTodos(e.target.value)}
              >
                <option value="All" className="bg-[white] text-[grey]">
                  All
                </option>
                <option value="Completed" className="bg-[white] text-[grey]">
                  Completed
                </option>
                <option value="Pending" className="bg-[white] text-[grey]">
                  Pending
                </option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap md:gap-10 gap-4 mt-6 justify-center">
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => {
                return (
                  <div className="bg-[#303030] w-[350px] px-8 py-6" key={index}>
                    <div className="flex justify-between items-center">
                      <h4 className="text-white tracking-wide">{item.title}</h4>
                      <div className="">
                        <select
                          name=""
                          id=""
                          className={`text-white px-2 py-[2px] text-xs outline-none cursor-pointer ${
                            item.completed ? "bg-[green]" : "bg-[orange]"
                          }`}
                          value={item.completed ? "Completed" : "Pending"}
                          onChange={(e) => {
                            updateTodoStatus(item._id, e.target.value);
                          }}
                        >
                          <option
                            value="Completed"
                            className="bg-[white] text-[grey]"
                          >
                            Completed
                          </option>
                          <option
                            value="Pending"
                            className="bg-[white] text-[grey]"
                          >
                            Pending
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className=" line-clamp-3">
                      <p className="text-[#b5b4b4] text-[13px] mt-4 ">
                        {item.description}
                      </p>
                    </div>
                    <div className="mt-4 flex justify-end gap-3">
                      <button
                        className="bg-[red] text-white h-[30px] w-[35px] cursor-pointer"
                        onClick={() => {
                          deleteTodo(item._id);
                        }}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                      <UpdateTodoForm
                        getAllUserTodos={getAllUserTodos}
                        id={item._id}
                      />
                      <DetailTodo id={item._id} />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="h-full flex justify-center items-center text-[grey] font-semibold text-2xl">
                Hey 👋, Create Your First Todo
              </div>
            )}
          </div>
          {/* Pagination controls */}
          <div className="flex gap-3 mt-12 justify-end mr-10">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className="border py-1 w-[35px]"
              >
                <span className="text-white">{index + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
