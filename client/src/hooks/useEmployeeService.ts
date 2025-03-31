import { useEffect, useState } from "react";

export const useEmployeeService = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeError, setEmployeeError] = useState<string | null>(null);
  const [averageSalary, setAverageSalary] = useState<number | null>(null);

  const handleUpdateEmployeeEmail = async (
    employeeId: number,
    email: string
  ) => {
    try {
      const response = await fetch(
        `http://localhost:8000/employees/${employeeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage =
          errorData.error || "Failed to update employee email";
        setEmployeeError(errorMessage);

        throw new Error(errorMessage);
      }

      console.log("Employee email updated successfully");
    } catch (error) {
      setEmployeeError("Failed to update employee email");
      console.error("Error updating employee email:", error);
    }
  };

  const handleFetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:8000/employees", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage =
          errorData.error || "Failed to retrieve employee data";
        setEmployeeError(errorMessage);

        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      setEmployees(responseData.slice(0, -1));
      setAverageSalary(responseData[responseData.length - 1].salary);
      console.log("Employee data recieved", responseData);
    } catch (error) {
      setEmployeeError("Failed to send file data to backend");
      console.error("Error sending file data to backend:", error);
    }
  };

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        await handleFetchEmployees();
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, []);

  console.log(employees, employeeError);
  console.log(averageSalary);

  return {
    handleFetchEmployees,
    handleUpdateEmployeeEmail,
    employeeError,
    employees,
    averageSalary,
  };
};
