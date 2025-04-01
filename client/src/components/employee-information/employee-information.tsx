import { FC } from "react";
import { Employee } from "../../types/employee";

interface EmployeeInformationProps {
  employee: Employee;
  openModal: () => void;
}

export const EmployeeInformation: FC<EmployeeInformationProps> = ({
  employee,
  openModal,
}) => (
  <div>
    <p>
      {employee.employee_name} {employee.email}
    </p>
    <button onClick={openModal}>Update Email</button>
  </div>
);
