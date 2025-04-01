import { useState } from "react";
import { useEmployeeService } from "../../hooks/useEmployeeService";
import { EmployeeInformation } from "../employee-information/employee-information";
import { Modal as UpdateEmployeeModal } from "../modal/Modal";

export const EmployeeList = () => {
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const { employees, averageSalary, handleUpdateEmployeeEmail } =
    useEmployeeService();

  const handleOpenModal = () => {
    setIsEmployeeModalOpen(true);
    // Set props of modal with employee data
  };

  const handleCloseModal = () => {
    setIsEmployeeModalOpen(false);
  };

  // TODO add a case where there are no employees

  return (
    <div className="employee-list">
      {employees &&
        employees.map((employee) => (
          <EmployeeInformation
            employee={employee}
            openModal={handleOpenModal}
          />
        ))}
      <p>Average Salary: {averageSalary}</p>

      {/* Could extract to a separate component */}
      <UpdateEmployeeModal
        isOpen={isEmployeeModalOpen}
        onClose={handleCloseModal}
      >
        <h1>Update Email</h1>
        <p>Update the email address of the employee.</p>
        <button
          onClick={() =>
            handleUpdateEmployeeEmail({ employeeId: 1, email: "email@co" })
          }
        >
          Update Email
        </button>
      </UpdateEmployeeModal>
    </div>
  );
};
