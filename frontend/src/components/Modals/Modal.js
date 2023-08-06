import React, { useEffect, useState } from "react";

export default function Modal({ buttonText, modalComponent }) {
    const [modal, setModal] = useState(false);
    const toggleModal = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setModal(!modal);
    }


    if (modal) document.body.classList.add("active-modal");
    else document.body.classList.remove("active-modal");

    useEffect(() => {
        const closeBtn = document.querySelector('.modal-close-btn');
        if (modal) {
            closeBtn.addEventListener('click', toggleModal)
        }
    }, [toggleModal]);

    return (
        <>
            <button onClick={toggleModal} className="open-modal-button">{buttonText}</button>
            {modal && (
                <div className="modal-container">
                    {modalComponent}
                </div>
            )}
        </>
    );
}