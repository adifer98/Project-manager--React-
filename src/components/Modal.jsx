import {createPortal} from 'react-dom';
import {useRef, forwardRef, useImperativeHandle} from "react";

const Modal = forwardRef(function Modal({children, btnContent}, ref) {
    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open: () => dialog.current.showModal()
        };
    });

    return createPortal(
        <dialog ref={dialog} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
            {children}
            <form method="dialog" className="mt-4 text-right">
                <button className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:text-stone-950">
                    {btnContent}
                </button>
            </form>
        </dialog>
        , document.getElementById('modal-root'));
});

export default Modal;