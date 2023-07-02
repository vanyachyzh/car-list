import { ICar, IModal } from '../../types';
import Dropdown from '../Dropdown/Dropdown';
import './Table.scss';

type Props = {
    cars: ICar[];
    openModal: (type: IModal, id: number) => void,
}

export const Table: React.FC<Props> = ({ cars, openModal }) => {
    return (
        <table id="carTable">
            <thead>
                <tr>
                    <th>Company</th>
                    <th>Model</th>
                    <th>VIN</th>
                    <th>Color</th>
                    <th>Year</th>
                    <th>Price</th>
                    <th>Availability</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {cars.map(car => (
                    <tr key={car.id}>
                        <td>{car.car}</td>
                        <td>{car.car_model}</td>
                        <td>{car.car_vin}</td>
                        <td>{car.car_color}</td>
                        <td>{car.car_model_year}</td>
                        <td>{car.price}</td>
                        <td>{car.availability ? 'Available' : 'Unavailable'}</td>
                        <td>
                            <Dropdown openModal={openModal} carId={car.id} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
