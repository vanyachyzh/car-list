import { ICar } from "../types";

export const getLastIndex = (cars: ICar[]): number => {
    return cars[cars.length - 1].id;
};