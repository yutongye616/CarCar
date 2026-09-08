import { useEffect, useState } from 'react';
import { SALES_API } from '../apiConfig';

function CustomerList() {
    const [customers, setCustomers] = useState([]);

    const getData = async () => {
    const response = await fetch(`${SALES_API}/api/customers/`);

    if (response.ok) {
        const data = await response.json();
        setCustomers(data.customer);
    }
    }


    const handleDelete = async (id) => {
        const response = await fetch(`${SALES_API}/api/customers/${id}/`, {
            method: 'DELETE',
        });

        if (response.ok) {
            setCustomers((prevCustomers) => prevCustomers.filter((customer) => customer.id !== id));
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
            <h1>Customers</h1>
            <div className="table-responsive">
            <table className="table table-striped">
            <thead>
            <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {customers.map((customer) => {
                return (
                <tr key={customer.id}>
                    <td>{ customer.first_name } { customer.last_name }</td>
                    <td>{ customer.address }</td>
                    <td>{ customer.phone_number }</td>
                    <td className="text-nowrap">
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(customer.id)}
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

export default CustomerList;
