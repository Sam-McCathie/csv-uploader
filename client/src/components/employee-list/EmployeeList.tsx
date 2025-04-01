import { useEffect, useState } from "react";
import { useEmployeeService } from "../../hooks/useEmployeeService";
import { EmployeeInformation } from "../employee-information/EmployeeInformation";
import { Modal as UpdateEmployeeModal } from "../modal/Modal";
import { Employee } from "../../types/employee";

const defaultEmployee = {
  company_name: "",
  employee_name: "",
  email: "",
  employee_id: 0,
  salary: 0,
};

export const EmployeeList = () => {
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [employeeInformation, setEmployeeInformation] =
    useState<Employee>(defaultEmployee);

  const { company_name, employee_id, employee_name, salary } =
    employeeInformation;

  useEffect(() => {
    if (employeeInformation) {
      setEmail(employeeInformation?.email || "");
    }
  }, [employeeInformation]);

  const {
    employees,
    averageSalary,
    isEmployeesLoading,
    handleUpdateEmployeeEmail,
  } = useEmployeeService();

  const handleOpenModal = (employee: Employee) => {
    setEmployeeInformation(employee);
    setIsEmployeeModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEmployeeModalOpen(false);
    setEmployeeInformation(defaultEmployee);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const updateEmployeeEmail = () => {
    handleUpdateEmployeeEmail({
      employeeId: employeeInformation.employee_id,
      email: email,
    });
    handleCloseModal();
  };

  if (isEmployeesLoading) {
    return <p>Loading...</p>;
  }

  if (employees.length === 0) {
    return <p>No employees found - please upload above :)</p>;
  }

  return (
    <div className="employee-list">
      {employees &&
        employees.map((employee) => (
          <EmployeeInformation
            key={employee.employee_id}
            employee={employee}
            openModal={handleOpenModal}
          />
        ))}
      <p className="average">Average Salary: {averageSalary}</p>

      {/* Could extract to a separate component */}
      <UpdateEmployeeModal
        isOpen={isEmployeeModalOpen}
        onClose={handleCloseModal}
      >
        <h1>Update Email</h1>
        <p>Update the email address of the employee.</p>
        <p>Id: {employee_id}</p>
        <p>Company name: {company_name}</p>
        <label>Email: </label>
        <input value={email} onChange={handleEmailChange} />
        <p>Employee name: {employee_name}</p>
        <p>Salary: {salary}</p>
        <button onClick={updateEmployeeEmail}>Update Email</button>
      </UpdateEmployeeModal>
    </div>
  );
};
