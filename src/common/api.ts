import { ICar } from "../types";

export const getServerCars = async (): Promise<ICar[]> => {
    const response = await fetch('https://myfakeapi.com/api/cars/');
    const jsonResponse = await response.json();
    
    return jsonResponse.cars;
}