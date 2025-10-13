import axios from "axios";
import React, { useEffect, useState } from "react";

const Carts = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get(
          "https://dummy.restapiexample.com/api/v1/employees"
        );
        if (res.status === 200) {
          setEmployees(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-100 px-5 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {employees.map((employee) => (
        <div
          key={employee.id}
          className="bg-white rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col justify-between"
        >
          {/* Employee Name */}
          <h1 className="text-center font-bold text-gray-800 text-lg mb-4">
            {employee.employee_name}
          </h1>

          {/* Age & Salary */}
          <div className="flex justify-between text-gray-700 mb-3">
            <span className="font-medium">Age: {employee.employee_age}</span>
            <span className="font-semibold text-gray-900">
              ${employee.employee_salary.toLocaleString()}
            </span>
          </div>         
        </div>
      ))}
    </div>
  );
};

export default Carts;
