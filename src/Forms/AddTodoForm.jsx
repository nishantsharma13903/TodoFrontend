import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";

export default function AddTodoForm() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add Todo" centered>
        {/* Modal content */}
            <form action="" className="">
                <div className="">
                    <label htmlFor="">Title</label><br />
                    <input type="text" className="outline-none border-b border-black w-full mt-1 text-sm" placeholder="Title Here ..."/>
                </div>
                <div className="mt-4">
                    <label htmlFor="">Description</label><br />
                    <textarea name="" id="" cols="30" rows="10" className="outline-none border border-black w-full mt-1 resize-none h-[100px] p-1 text-sm" placeholder="Description Here ..."></textarea>
                </div>
                <div className="mt-6">
                    <button className="bg-[#f96a36] text-white py-[6px] w-full rounded-sm tracking-wide font-medium">Save</button>
                </div>
            </form>
      </Modal>
      <button
        className="text-white border-2 border-white rounded-md py-1 px-3 text-sm"
        onClick={open}
      >
        <i className="fa fa-plus mr-2"></i> Add Task
      </button>
    </>
  );
}
