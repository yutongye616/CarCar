import { useEffect, useState } from 'react';
import { INVENTORY_API } from '../apiConfig';

function VehicleModelList() {
    const [models, setModels] = useState([]);

    const getData = async () => {
    const response = await fetch(`${INVENTORY_API}/api/models/`);

    if (response.ok) {
        const data = await response.json();
        setModels(data.models);
    }
    }


    const handleDelete = async (id) => {
        const response = await fetch(`${INVENTORY_API}/api/models/${id}/`, {
            method: 'DELETE',
        });

        if (response.ok) {
            setModels((prevModels) => prevModels.filter((model) => model.id !== id));
        }
    }

    useEffect(()=>{
        getData()
    }, [])
    return (
        <div className="hero px-4">
        <div className="row w-100 justify-content-center">
        <div className="col-11 col-lg-8">
        <div className="shadow p-4 rounded bg-white">
            <h1>Models</h1>
            <table className="table table-striped">
            <thead>
            <tr>
                <th>Name</th>
                <th>Manufacturer</th>
                <th>Picture</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {models.map((model) => {
                return (
                <tr key={model.href}>
                    <td>{ model.name }</td>
                    <td>{ model.manufacturer.name }</td>
                    <td>
                        {model.picture_url && (
                            <img
                                src={model.picture_url}
                                alt={`Image of ${model.name}`}
                                style={{ maxWidth: '100px', maxHeight: '100px' }}
                            />
                        )}
                    </td>
                    <td>
                        <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(model.id)}
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

export default VehicleModelList;
