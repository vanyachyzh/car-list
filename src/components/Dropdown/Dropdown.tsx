import React, { useState, useEffect, useRef } from 'react';
import './Dropdown.scss';
import { IModal } from '../../types';


type Props = {
    openModal: (type: IModal, id: number) => void,
    carId: number
}

const Dropdown: React.FC<Props> = ({ openModal, carId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectOption = (modalType: IModal) => {
        openModal(modalType, carId);
        setIsOpen(false);
    };

    return (
        <div className="dropdown" ref={dropdownRef}>
            <button className="dropdown__toggle" onClick={toggleDropdown}>
                Action
            </button>

            {isOpen && (
                <ul className="dropdown__menu">
                    <button
                        className="dropdown__option"
                        onClick={() => selectOption(IModal.Editing)}
                    >
                        Edit
                    </button>
                    <button
                        className="dropdown__option"
                        onClick={() => selectOption(IModal.Removing)}
                    >
                        Remove
                    </button>
                </ul>
            )}
        </div>
    );
};

export default Dropdown;

