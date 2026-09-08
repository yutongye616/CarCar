import React, { useEffect, useState } from 'react';
import { SALES_API } from '../apiConfig';

function SalesList() {
    const [sales, setSales] = useState([]);
    const [filteredSales, setFilteredSales] = useState([]);
    const [selectedSalesperson, setSelectedSalesperson] = useState('');
    const [salespeople, setSalespeople] = useState([]);

    const getData = async () => {
        const salesResponse = await fetch(`${SALES_API}/api/sales/`);
        const salespeopleResponse = await fetch(`${SALES_API}/api/salespeople/`);

        if (salesResponse.ok && salespeopleResponse.ok) {
            const salesData = await salesResponse.json();
            const salespeopleData = await salespeopleResponse.json();

            setSales(salesData.sale);
            setSalespeople(salespeopleData.salesperson);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (selectedSalesperson) {
            const filtered = sales.filter(sale => sale.salesperson.employee_id === selectedSalesperson);
            setFilteredSales(filtered);
        } else {
            setFilteredSales(sales);
        }
    }, [selectedSalesperson, sales]);

    const handleSalespersonChange = (e) => {
        const value = e.target.value;
        setSelectedSalesperson(value);
    }

    const handleDelete = async (id) => {
        const response = await fetch(`${SALES_API}/api/sales/${id}/`, {
            method: 'DELETE',
        });

        if (response.ok) {
            setSales((prevSales) => prevSales.filter((sale) => sale.id !== id));
        }
    }

    return (
        <div className="hero px-4">
        <div className="row w-100 justify-content-center">
        <div className="col-11 col-lg-9">
        <div className="shadow p-4 rounded bg-white">
            <h1>Sales</h1>
            <div className="mb-3">
                <label htmlFor="salespersonFilter">Filter by Salesperson:</label>
                <select
                    id="salespersonFilter"
                    className="form-select"
                    value={selectedSalesperson}
                    onChange={handleSalespersonChange}
                >
                    <option value="">All Salespeople</option>
                    {salespeople.map(salesperson => (
                        <option key={salesperson.id} value={salesperson.employee_id}>
                            {salesperson.first_name} {salesperson.last_name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Salesperson Name</th>
                        <th>Salesperson Employee ID</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSales.map((sale) => (
                        <tr key={sale.id}>
                            <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                            <td>{sale.salesperson.employee_id}</td>
                            <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                            <td>{sale.automobile.vin}</td>
                            <td>${sale.price}</td>
                            <td className="text-nowrap">
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(sale.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
        </div>
        </div>
        </div>
    );
}

export default SalesList;
