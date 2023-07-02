import React from 'react';
import './Modal.scss';

interface ModalProps {
    closeModal: () => void;
    children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ closeModal, children }) => {
    return (
        <div className="modal">
            <div className="modal__content">
                <span className="modal__close" onClick={closeModal}>
                    &times;
                </span>
                
                {children}
            </div>
        </div>
    );
};

export default Modal;

