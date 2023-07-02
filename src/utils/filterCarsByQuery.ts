import { ICar } from "../types";

export function filterCarsByQuery(cars: ICar[], filterString: string): ICar[] {
    const filter = filterString.toLowerCase();

    return cars.filter(car =>
        (car.availability ? 'available' : 'unavailable').includes(filter) ||
        car.car.toLowerCase().includes(filter) ||
        car.car_color.toLowerCase().includes(filter) ||
        car.car_model.toLowerCase().includes(filter) ||
        car.car_model_year.toString().toLowerCase().includes(filter) ||
        car.car_vin.toLowerCase().includes(filter) ||
        car.price.toLowerCase().includes(filter)
    );
}