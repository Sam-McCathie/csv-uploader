import "./App.css";
import { useFileUpload } from "./hooks/useFileUpload";

function App() {
  const { handleFileUpload } = useFileUpload();

  return (
    <>
      <h1>CSV Upload</h1>
      <p>Add disclaimer about format</p>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <button>Upload</button>
    </>
  );
}

export default App;
