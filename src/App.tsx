import React, { useState, useEffect } from 'react';
import './App.scss';
import { Table } from './components/Table/Table';
import { Pagination } from './components/Pagination/Pagination';
import Modal from './components/Modal/Modal';
import { ICar, IModal } from './types';
import { COLORS, ITEMS_PER_PAGE } from './common/constants';
import { filterCarsByQuery } from './utils/filterCarsByQuery';
import { splitArrayByStep } from './utils/splitArrayByStep';
import { getServerCars } from './common/api';
import { getValue } from './utils/getValue';
import { getLastIndex } from './utils/getLastIndex';
import { getLocalCars, setLocalCars} from './utils/localStorage';

function App() {
    const [currentPage, setCurrentPage] = useState(1);
    const [carList, setCarList] = useState<ICar[]>([]);
    const [query, setQuery] = useState('');
    const [visibleCars, setVisibleCars] = useState<ICar[]>([]);
    const [modalType, setModalType] = useState<IModal>(IModal.None);
    const [pickedCar, setPickedCar] = useState(0);
    const isVisibleCarsEmpty = visibleCars.length === 0;
    const isVisibleCarsEnough = visibleCars.length > ITEMS_PER_PAGE * (currentPage - 1);


    useEffect(() => {
        if (getLocalCars()) {
            const localCars = getLocalCars();

            setCarList(localCars);
            setVisibleCars(localCars);

            return;
        }

        getServerCars()
            .then(cars => {
                setCarList(cars)
                setVisibleCars(cars)
            })
    }, [])

    useEffect(() => {
        if (carList.length !== 0) {
            setLocalCars(carList)
        }
    }, [carList])

    useEffect(() => {
        setVisibleCars(filterCarsByQuery(carList, query))
    }, [query, carList])

    const openModal = (modal: IModal, id?: number) => {
        const index = carList.findIndex(car => car.id === id);
        setModalType(modal)
        setPickedCar(index)
    }

    const closeModal = () => {
        setModalType(IModal.None)
    }

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    }

    const onCreate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { elements } = event.currentTarget;

        setCarList(prev => ([
            ...prev,
            {
                car: getValue(elements, 'car'),
                car_color: getValue(elements, 'car_color'),
                car_model: getValue(elements, 'car_model'),
                car_model_year: parseInt(getValue(elements, 'car_model_year')),
                car_vin: getValue(elements, 'car_vin'),
                price: getValue(elements, 'price'),
                availability: getValue(elements, 'availability') === 'available' ? true : false,
                id: getLastIndex(carList) + 1,
            }
        ]))

        closeModal()
    };

    const onRemove = () => {
        setCarList(prev => prev.filter((car, index) => {
            if (index !== pickedCar) {
                return car;
            }
        }))

        closeModal()
    }

    const onEdit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { elements } = event.currentTarget;

        setCarList(prev => prev.map((car, index) => {
            if (index === pickedCar) {
                return {
                    ...car,
                    car_color: getValue(elements, 'car_color'),
                    price: `$${getValue(elements, 'price')}`,
                    availability: getValue(elements, 'availability') === 'available' ? true : false,
                }
            }

            return car;
        }))

        closeModal()
    };

    return (
        <div className="App">

            <header className='App__header'>
                <Pagination
                    currentPage={currentPage}
                    totalItems={visibleCars.length}
                    pageSize={50}
                    handlePageChange={handlePageChange}
                />

                <h1 className='App__logo'>🚗</h1>

                <div>
                    <input
                        className='App__input'
                        value={query}
                        onChange={(e) => {
                            setQuery(e.currentTarget.value)
                        }}
                    />

                    <button
                        className='App__button'
                        onClick={() => openModal(IModal.Creating)}>Add car</button>
                </div>
            </header>

            {!isVisibleCarsEmpty && isVisibleCarsEnough && (
                <Table openModal={openModal} cars={splitArrayByStep(visibleCars, ITEMS_PER_PAGE)[currentPage - 1]} />
            )}

            {!isVisibleCarsEmpty && !isVisibleCarsEnough && (
                <Table openModal={openModal} cars={splitArrayByStep(visibleCars, ITEMS_PER_PAGE)[0]} />
            )}
            {isVisibleCarsEmpty && <h2 className='App__warning'>There is no car that matched this request</h2>}


            {modalType === IModal.Creating && (
                <Modal closeModal={closeModal}>
                    <h2>To add a car fill in all the fields</h2>

                    <form onSubmit={onCreate}>
                        <input
                            type="text"
                            name="car"
                            placeholder="Company"
                            required
                        />

                        <input
                            type="text"
                            name="car_model"
                            placeholder="Model"
                            required
                        />

                        <input
                            type="text"
                            name="car_vin"
                            placeholder="VIN"
                            required
                        />

                        <select name="car_color">
                            {COLORS.map(color => (
                                <option
                                    key={color}
                                    value={color}
                                >
                                    {color}
                                </option>
                            ))}
                        </select>

                        <input
                            required
                            type="number"
                            name="car_model_year"
                            placeholder="Year"
                            min="1900"
                            max="2099"
                            step="1"
                        />

                        <input
                            required
                            type="number"
                            name="price"
                            placeholder="Price"
                            min="1"
                            step="1"
                        />

                        <select name="availability">
                            <option value="available">Available</option>
                            <option value="unavailable">Unavailable</option>
                        </select>

                        <button type="submit">Add car</button>
                    </form>
                </Modal>)}

            {modalType === IModal.Editing && (
                <Modal closeModal={closeModal}>
                    <h2>To edit fill in all the fields</h2>

                    <form onSubmit={onEdit}>
                        <input
                            type="text"
                            name="car"
                            placeholder="Company"
                            defaultValue={carList[pickedCar].car}
                            disabled
                        />

                        <input
                            type="text"
                            name="car_model"
                            placeholder="Model"
                            defaultValue={carList[pickedCar].car_model}
                            disabled
                        />

                        <input
                            type="text"
                            name="car_vin"
                            defaultValue={carList[pickedCar].car_vin}
                            disabled
                        />

                        <select name="car_color">
                            {COLORS.map(color => (
                                <option
                                    key={color}
                                    value={color}
                                >
                                    {color}
                                </option>
                            ))}
                        </select>

                        <input
                            required
                            type="number"
                            name="car_model_year"
                            defaultValue={carList[pickedCar].car_model_year}
                            disabled
                        />

                        <input
                            required
                            type="number"
                            name="price"
                            placeholder="Price"
                            min="1"
                            step="1"
                        />

                        <select name="availability">
                            <option value="available">Available</option>
                            <option value="unavailable">Unavailable</option>
                        </select>

                        <button type="submit">Edit</button>
                    </form>
                </Modal>)}

            {modalType === IModal.Removing && (
                <Modal closeModal={closeModal}>
                    <h2>Confirm the removing</h2>
                    <button onClick={onRemove}>Confirm</button>
                </Modal>)}
        </div>
    );
}

export default App;
