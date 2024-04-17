import React from "react";
import "../../styles/HomePage.css";
import AddTodoForm from "../../Forms/AddTodoForm";
import UpdateTodoForm from "../../Forms/UpdateTodoForm";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function HomePage() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="md:h-screen h-auto bg-[#303030] pb-10">
        <ToastContainer />
      <div className="flex justify-between items-center border-b border-white p-4">
        <div className=" text-white flex gap-3 items-center">
          <i className="fa fa-tasks md:text-2xl text-xl"></i>
          <h2 className="md:text-2xl text-xl font-medium">Task Lists</h2>
        </div>
        <div className="">
          <AddTodoForm />
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <div className="bg-[#424242] w-[90%] md:p-6 p-2 md:h-[600px] h-auto md:overflow-y-auto">
          <div className="flex gap-10 justify-end p-4 mr-16">
            <div className="">
              <input
                type="text"
                className="border-b border-white bg-transparent outline-none w-[300px] text-[whitesmoke] italic text-sm"
                placeholder="Search By Title"
              />
            </div>
            <div className="">
              <select
                name=""
                id=""
                className=" px-2 py-[2px] text-xs outline-none cursor-pointer"
              >
                <option value="Pending" className="bg-[white] text-[grey]">
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
            {arr.map((item, index) => {
              return (
                <div className="bg-[#303030] w-[350px] px-8 py-6">
                  <div className="flex justify-between items-end">
                    <h4 className="text-white">Title TODO</h4>
                    <div className="">
                      {/* <span className="bg-[green] text-white px-4 py-[2px] text-xs">
                      Completed
                    </span> */}
                      <select
                        name=""
                        id=""
                        className="bg-[green] text-white px-2 py-[2px] text-xs outline-none cursor-pointer"
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
                  <p className="text-[#b5b4b4] text-[13px] mt-4">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Repellat earum animi, architecto, laborum, nihil porro
                    accusantium nisi nam a ratione id officiis. Odit, quod vero.
                    Suscipit ipsum aliquid asperiores deserunt.
                  </p>
                  <div className="mt-4 flex justify-end gap-3">
                    <button className="bg-[red] text-white h-[30px] w-[35px] cursor-pointer">
                      <i className="fa fa-trash"></i>
                    </button>
                    <UpdateTodoForm />
                    <button className="bg-[#ff3f5f] text-white h-[30px] w-[35px] cursor-pointer">
                      <i className="fa fa-eye"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
