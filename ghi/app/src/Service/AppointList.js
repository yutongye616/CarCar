import React, { useEffect, useState } from 'react';
import { SERVICE_API } from '../apiConfig';

function ServList() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFiltered] = useState([]);
  const [searchVin, setSearchVin] = useState('');

  const getData = async () => {
    const url = `${SERVICE_API}/api/appointments/`;
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      const filteredAppointments = data.appointments.filter(
        (appointment) =>
          appointment.status !== 'cancelled' &&
          appointment.status !== 'finished'
      );
      setAppointments(filteredAppointments);
      setFiltered(filteredAppointments);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setFiltered(
      appointments.filter((appointment) =>
        appointment.vin.toLowerCase().includes(searchVin.toLowerCase())
      )
    );
  }, [searchVin, appointments]);

  const handleStatusUpdate = async (id, status) => {
    const data ={
      status,
    }
    try {
      const url = `${SERVICE_API}/api/appointments/${id}/`;
      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (response.ok) {
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment.id !== id)
        );
      } else {
        console.error('Failed to update appointment status');
      }
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };


  return (
    <div className="hero px-4">
    <div className="row w-100 justify-content-center">
    <div className="col-11">
    <div className="shadow p-4 rounded bg-white">
        <h1>Service Appointments</h1>
          <div className="mb-3">
            <label htmlFor="vinSearch" className="form-label">
              Search by VIN:
            </label>
            <input
              type="text"
              className="form-control"
              id="vinSearch"
              value={searchVin}
              onChange={(car) => setSearchVin(car.target.value)}
            />
          </div>
        <div className="table-responsive">
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Customer</th>
                    <th>VIP?</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Technician</th>
                    <th>Reason</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {filteredAppointments.map((appointment) => {
                if (appointment.status !== 'cancelled' && appointment.status !== 'finished');
                const key = appointment.id;
                const [date, fullTime] = appointment.date_time.split('T');
                const time = fullTime.slice(0, 5);
                const formattedTime = new Date(`2000-01-01T${time}Z`).toLocaleTimeString([], {hour: '2-digit',minute: '2-digit',});
                    return (
                        <tr key={key}>
                            <td> { appointment.vin } </td>
                            <td> { appointment.customer } </td>
                            <td> { appointment.vip ? 'Yes' : 'No' } </td>
                            <td> { date } </td>
                            <td> { formattedTime }  </td>
                            <td> { appointment.techname } </td>
                            <td> { appointment.service_reason } </td>
                            <td> { appointment.status } </td>
                            <td className="text-nowrap">
                              <button
                                className="btn btn-danger btn-sm me-1"
                                onClick={() => handleStatusUpdate(appointment.id, 'cancelled')}
                              >
                                Cancel
                              </button>
                              <button
                                className="btn btn-success btn-sm"
                                onClick={() => handleStatusUpdate(appointment.id, 'finished')}
                              >
                                Finish
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
    );
}

export default ServList;
