import { useEffect, useState } from 'react';
import { INVENTORY_API } from '../apiConfig';

function ManufacturerList() {
    const [manufacturers, setManufacturers] = useState([]);

    const getData = async () => {
    const response = await fetch(`${INVENTORY_API}/api/manufacturers/`);

    if (response.ok) {
        const data = await response.json();
        setManufacturers(data.manufacturers);
    }
    }


    const handleDelete = async (id) => {
        const response = await fetch(`${INVENTORY_API}/api/manufacturers/${id}/`, {
            method: 'DELETE',
        });

        if (response.ok) {
            setManufacturers((prevManufacturers) => prevManufacturers.filter((manufacturer) => manufacturer.id !== id));
        }
    }

    useEffect(()=>{
        getData()
    }, [])
    return (
        <div className="hero px-4">
        <div className="row w-100 justify-content-center">
        <div className="col-11 col-lg-6">
        <div className="shadow p-4 rounded bg-white">
            <h1>Manufacturers</h1>
            <table className="table table-striped">
            <thead>
            <tr>
                <th>Name</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {manufacturers.map((manufacturer) => {
                return (
                <tr key={manufacturer.href}>
                    <td>{ manufacturer.name }</td>
                    <td>
                        <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(manufacturer.id)}
                        >
                            Delete
                        </button>
                    </td>
                </tr>
                );
            })}
            </tbody>
        </table>
        </div>
        </div>
        </div>
        </div>
        )
}

export default ManufacturerList;
