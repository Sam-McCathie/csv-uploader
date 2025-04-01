import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface Employee {
  employee_id: number | null;
  company_name: string;
  employee_name: string;
  email: string | null;
  salary: number | null;
}

export const useEmployeeService = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [averageSalary, setAverageSalary] = useState<number | null>(null);
  const queryClient = useQueryClient(); // Access the QueryClient instance

  const fetchEmployees = async () => {
    const response = await fetch("http://localhost:8000/employees", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to retrieve employee data");
    }

    return response.json();
  };

  const {
    data: employeesData,
    error: employeeError,
    isLoading: isEmployeesLoading,
  } = useQuery<Employee[]>({
    queryFn: fetchEmployees,
    queryKey: ["employees"],
  });

  useEffect(() => {
    if (employeesData) {
      setEmployees(employeesData.slice(0, -1));
      setAverageSalary(employeesData[employeesData.length - 1].salary);
    }
  }, [employeesData]);

  const updateEmployeeEmail = async (employeeId: number, email: string) => {
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
      throw new Error(errorData.error || "Failed to update employee email");
    }

    return response.json();
  };

  const {
    mutateAsync: handleUpdateEmployeeEmail,
    isPending: isUpdatingEmail,
    error: updateEmailError,
  } = useMutation({
    mutationFn: ({
      employeeId,
      email,
    }: {
      employeeId: number;
      email: string;
    }) => updateEmployeeEmail(employeeId, email),
    onSuccess: () => {
      // Invalidate the employees query to refetch data
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      console.log("Employee email updated successfully");
    },
  });

  return {
    isEmployeesLoading,
    employeeError,
    employees,
    averageSalary,
    handleUpdateEmployeeEmail,
    isUpdatingEmail,
    updateEmailError,
  };
};
