import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";

export default function UpdateTodoForm() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Update Todo" centered>
        {/* Modal content */}
        <form action="" className="">
          <div className="">
            <label htmlFor="">Title</label>
            <br />
            <input
              type="text"
              className="outline-none border-b border-black w-full mt-1 text-sm"
              placeholder="Title Here ..."
            />
          </div>
          <div className="mt-4">
            <label htmlFor="">Description</label>
            <br />
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              className="outline-none border border-black w-full mt-1 resize-none h-[100px] p-1 text-sm"
              placeholder="Description Here ..."
            ></textarea>
          </div>
          <div className="mt-6">
            <button className="bg-[#f96a36] text-white py-[6px] w-full rounded-sm tracking-wide font-medium">
              Save
            </button>
          </div>
        </form>
      </Modal>

      <button
        className="bg-[#f76c3a] text-white h-[30px] w-[35px] cursor-pointer"
        onClick={open}
      >
        <i className="fa fa-edit"></i>
      </button>
    </>
  );
}
