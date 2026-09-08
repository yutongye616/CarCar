import { useEffect, useState } from 'react';
import { SALES_API } from '../apiConfig';

function SalesPeopleList() {
    const [salespeople, setSalespeople] = useState([]);

    const getData = async () => {
    const response = await fetch(`${SALES_API}/api/salespeople/`);

    if (response.ok) {
        const data = await response.json();
        setSalespeople(data.salesperson);
        console.log(data.salesperson)
    }
    }


    const handleDelete = async (id) => {
        const response = await fetch(`${SALES_API}/api/salespeople/${id}/`, {
            method: 'DELETE',
        });

        if (response.ok) {
            setSalespeople((prevSalespeople) => prevSalespeople.filter((salesperson) => salesperson.id !== id));
        }
    }

    useEffect(()=>{
        getData()
    }, [])
    return (
        <div className="hero px-4">
        <div className="row w-100 justify-content-center">
        <div className="col-11 col-lg-9">
        <div className="shadow p-4 rounded bg-white">
            <h1>Salespeople</h1>
            <div className="table-responsive">
            <table className="table table-striped">
            <thead>
            <tr>
                <th>Name</th>
                <th>Employee ID</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {salespeople.map((salesperson) => {
                return (
                <tr key={salesperson.id}>
                    <td>{ salesperson.first_name } { salesperson.last_name }</td>
                    <td>{ salesperson.employee_id }</td>
                    <td className="text-nowrap">
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(salesperson.id)}
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
        </div>
        )
}

export default SalesPeopleList;
