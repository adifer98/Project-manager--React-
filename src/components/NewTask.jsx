import {useState, useRef} from "react";
import Modal from "./Modal.jsx";

export default function NewTask({onAdd, projId}) {
    const [enteredValue, setEnteredValue] = useState('');
    const errorModal = useRef();
    function changeValue(event) {
        setEnteredValue(event.target.value);
    }

    function addTask() {
        const text = enteredValue.trim();
        if (!text) {
            errorModal.current.open();
            return;
        }
        const newTask = {
            text: text,
            projId: projId,
            taskId: Math.random()
        };
        onAdd(newTask);
        setEnteredValue('');
    }

    return (
        <>
            <Modal ref={errorModal} btnContent="Okay">
                <h2 className="text-xl font-bold text-stone-700 my-4">Input Error</h2>
                <p className="text-stone-600 mb-4">Please enter a real task value</p>
            </Modal>
            <div className="flex items-center gap-4">
                <input type="text"
                       className="w-64 px-2 py-1 rounded-sm bg-stone-200"
                       value={enteredValue}
                       onChange={changeValue}/>
                <button
                    className="text-stone-700 hover:text-stone-950"
                    onClick={addTask}>
                        Add Task
                </button>
            </div>
        </>
    )
}