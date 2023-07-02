import { ICar } from "../types";

export const setLocalCars = (cars: ICar[]) => {
    localStorage.setItem('cars', JSON.stringify(cars))
};

export const getLocalCars = () => {
    const storedCars = localStorage.getItem('cars');
    if (storedCars !== null && storedCars !== undefined) {
        return JSON.parse(storedCars);
    }
    return null;
};

// export const setPageNumber = (number: number) => {
//     localStorage.setItem('pageNumber', JSON.stringify(number))
// };

// export const getPageNumber = () => {
//     const storedNumber = localStorage.getItem('pageNumber');
//     if (storedNumber !== null && storedNumber !== undefined) {
//         return JSON.parse(storedNumber);
//     }
//     return null;
// };

