import "./App.css";
import { useFileConversion } from "./hooks/useFileConversion";

function App() {
  const { handleFileConversion, fileData } = useFileConversion();

  console.log(fileData);

  return (
    <>
      <h1>CSV Upload</h1>
      <p>Add disclaimer about format</p>
      <input type="file" accept=".csv" onChange={handleFileConversion} />
      <button>Upload</button>
    </>
  );
}

export default App;
