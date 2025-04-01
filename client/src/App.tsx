import { useState } from "react";
import { EmployeeList } from "./components/employee-list/EmployeeList";
import { Modal as CSVUploadModal } from "./components/modal/Modal";
import { useFileConversion } from "./hooks/useFileConversion";
import { useFileUpload } from "./hooks/useFileUpload";
import "./App.css";

function App() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const { handleFileConversion, fileData } = useFileConversion();
  const { handleFileUpload } = useFileUpload();

  const fileUpload = () => {
    handleFileUpload(fileData);
  };

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
        <p>Add disclaimer about format</p>
        <input type="file" accept=".csv" onChange={handleFileConversion} />
        <button onClick={fileUpload} disabled={fileData === null}>
          Upload
        </button>
      </CSVUploadModal>
    </div>
  );
}

export default App;
