import { useEffect, useState } from "react";
import { EmployeeList } from "./components/employee-list/EmployeeList";
import { Modal as CSVUploadModal } from "./components/modal/Modal";
import { useFileConversion } from "./hooks/useFileConversion";
import { useFileUpload } from "./hooks/useFileUpload";
import "./App.css";

function App() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const { handleFileConversion, fileData } = useFileConversion();
  const { handleFileUpload, uploadPending, uploadError, uploadSuccess } =
    useFileUpload();

  const fileUpload = () => {
    handleFileUpload(fileData);
  };

  useEffect(() => {
    if (uploadSuccess) {
      setIsUploadModalOpen(false);
    }
  }, [uploadSuccess]);

  return (
    <div className="app">
      <h1>CSV Upload</h1>
      <div className="upload-section">
        <h3>Employees</h3>
        <button onClick={() => setIsUploadModalOpen(true)}>
          Upload Employees CSV
        </button>
      </div>
      <EmployeeList />
      <CSVUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      >
        <p>
          Please ensure the CSV file follows this format:
          <strong>Company Name, Employee Name, Email Address, Salary</strong>.
        </p>
        <input type="file" accept=".csv" onChange={handleFileConversion} />
        <button
          onClick={fileUpload}
          disabled={fileData === null || uploadPending}
        >
          {uploadPending ? "Uploading..." : "Upload"}
        </button>
        {uploadError && <p>{uploadError.message}</p>}
      </CSVUploadModal>
    </div>
  );
}

export default App;
