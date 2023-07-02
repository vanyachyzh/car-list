import React from 'react';
import './Pagination.scss';

interface PaginationProps {
    totalItems: number;
    pageSize: number;
    currentPage: number;
    handlePageChange: (pageNumber: number) => void;
}

export const Pagination: React.FunctionComponent<PaginationProps> = ({ totalItems, currentPage, pageSize, handlePageChange }) => {
    const pageInput = React.useRef<HTMLInputElement>(null);
    const totalPages = Math.ceil(totalItems / pageSize);
    const [inputVal, setIntputVal] = React.useState(currentPage || 1);

    const handlePrevClick = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
            setIntputVal(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
            setIntputVal(currentPage + 1);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIntputVal(+e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        let newVal = parseInt(String(inputVal), 10);

        if (newVal < 1) {
            newVal = 1;
        }

        if (newVal > totalPages) {
            newVal = totalPages;
        }

        handlePageChange(newVal);
        setIntputVal(newVal);

        pageInput.current!.blur();
    };

    return (
        <form className="pagination" onSubmit={handleSubmit}>
            <button
                className="button prev"
                onClick={handlePrevClick}
                type={"button"}
                aria-label={"Previous"}
                disabled={currentPage <= 1}
            >
                <i className="icon">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M17 5.88L15.29 4 8 12l7.29 8L17 18.12 11.44 12z"
                            fillRule="evenodd"
                        />
                    </svg>
                </i>
            </button>
            <span className="text pageText">Page:</span>
            <input
                className="input"
                type="number"
                value={inputVal > totalPages ? totalPages : inputVal}
                onChange={handleInputChange}
                ref={pageInput}
            />
            <span className="text">of {totalPages}</span>
            <button
                className="button next"
                onClick={handleNextClick}
                type={"button"}
                aria-label={"Next"}
                disabled={currentPage >= totalPages}
            >
                <i className="icon">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8 5.88L9.71 4 17 12l-7.29 8L8 18.12 13.56 12z"
                            fillRule="evenodd"
                        />
                    </svg>
                </i>
            </button>
        </form>
    );
};

