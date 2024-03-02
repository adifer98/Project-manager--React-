import Input from './Input.jsx'
import {useRef} from "react";
import Modal from "./Modal.jsx";

export default function NewProject({onSaveProject, onCancel}) {

    const errorModal = useRef();

    const title = useRef();
    const description = useRef();
    const dueDate = useRef();


    function handleSave() {
        const projTitle = title.current.value.trim();
        const projDescription = description.current.value.trim();
        const projDueDate = dueDate.current.value.trim();

        if (!projTitle || !projDescription || !projDueDate) {
            errorModal.current.open();
            return;
        }

        //validation passed
        const project = {
            id: Math.random(),
            title: projTitle,
            description: projDescription,
            dueDate: projDueDate
        };
        onSaveProject(project);

    }

    return (
        <>
            <Modal ref={errorModal} btnContent="Okay">
                <h2 className="text-xl font-bold text-stone-700 my-4">Input Error</h2>
                <p className="text-stone-600 mb-4">Oops... looks like you didn't enter a value somewhere</p>
                <p className="text-stone-600 mb-4">Please enter a value</p>
            </Modal>
            <div className="w-[35rem] mt-16">
                <menu className="flex items-center justify-end gap-4 my-4">
                    <li>
                        <button className="text-stone-800 hover:text-stone-950" onClick={onCancel}>
                            Cancel
                        </button>
                    </li>
                    <li>
                        <button className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:text-stone-950" onClick={handleSave}>
                            Save
                        </button>
                    </li>
                </menu>
                <div>
                    <Input type="text" ref={title} label="Title" />
                    <Input ref={description} label="Description" textarea />
                    <Input type="date" ref={dueDate} label="Due Date" />
                </div>
            </div>
        </>
    )
}