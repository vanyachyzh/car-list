import { ICar } from "../types";

export function splitArrayByStep(array: ICar[], step: number): ICar[][] {
    const result: ICar[][] = [];
    let currentIndex = 0;

    while (currentIndex < array.length) {
        result.push(array.slice(currentIndex, currentIndex + step));
        currentIndex += step;
    }

    return result;
}