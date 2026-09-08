import { useEffect, useState } from 'react';
import { SERVICE_API } from '../apiConfig';

function TechList() {
    const [techs, setTech] = useState([]);

    const getData = async() => {
        const response = await fetch(`${SERVICE_API}/api/technicians/`);

        if (response.ok) {
            const data = await response.json();
            setTech(data.techs)
        }
    }

    useEffect(()=>{
        getData()
    }, [])

    const handleDelete = async (id) => {
        const response = await fetch(`${SERVICE_API}/api/technicians/${id}/`, {
            method: 'DELETE',
        });

        if (response.ok) {
            setTech((prevTechs) => prevTechs.filter((tech) => tech.id !== id));
        }
    }

    return (
        <div className="hero px-4">
        <div className="row w-100 justify-content-center">
        <div className="col-11 col-lg-6">
        <div className="shadow p-4 rounded bg-white">
            <h1>Technicians List</h1>
        <div className="table-responsive">
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {techs.map(tech => {
                    const key = tech.id
                    return (
                    <tr key={key}>
                        <td>{ tech.employee_id } </td>
                        <td>{ tech.first_name } </td>
                        <td>{ tech.last_name } </td>
                        <td className="text-nowrap">
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(tech.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                    );
                })
            }
            </tbody>
        </table>
        </div>
        </div>
        </div>
        </div>
        </div>
    )
}


export default TechList;
