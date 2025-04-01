import "./App.css";
import { useEmployeeService } from "./hooks/useEmployeeService";
import { useFileConversion } from "./hooks/useFileConversion";
import { useFileUpload } from "./hooks/useFileUpload";

function App() {
  const { handleFileConversion, fileData } = useFileConversion();
  const { handleFileUpload } = useFileUpload();
  const { employees, handleUpdateEmployeeEmail } = useEmployeeService();

  console.log(employees);

  const testingUpdateEmail = async () => {
    const employeeId = 2; // Replace with the actual employee ID you want to update
    handleUpdateEmployeeEmail(employeeId, "testing@email.com");
  };

  const fileUpload = () => {
    handleFileUpload(fileData);
  };

  return (
    <>
      <h1>CSV Upload</h1>
      <p>Add disclaimer about format</p>
      <input type="file" accept=".csv" onChange={handleFileConversion} />
      <button onClick={fileUpload} disabled={fileData === null}>
        Upload
      </button>
      <button onClick={testingUpdateEmail}>Update email test</button>
      {/* <div>
        {employees &&
          employees.map((employee) => <p>{employee.employee_name}</p>)}
      </div> */}
    </>
  );
}

export default App;
