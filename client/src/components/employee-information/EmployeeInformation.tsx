import { FC } from "react";
import { Employee } from "../../types/employee";
import "./EmployeeInformation.css";

interface EmployeeInformationProps {
  employee: Employee;
  openModal: (employee: Employee) => void;
}

export const EmployeeInformation: FC<EmployeeInformationProps> = ({
  employee,
  openModal,
}) => {
  const handleOpenModal = () => {
    openModal(employee);
  };

  return (
    <div className="employee-info">
      <p>{employee.company_name}</p>
      <p>{employee.employee_name}</p>
      <p>{employee.email}</p>
      <p>{employee.salary}</p>
      <button onClick={handleOpenModal}>Update Email</button>
    </div>
  );
};
