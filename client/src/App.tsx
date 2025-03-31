import "./App.css";
import { useFileConversion } from "./hooks/useFileConversion";
import { useFileUpload } from "./hooks/useFileUpload";

function App() {
  const { handleFileConversion, fileData } = useFileConversion();
  const { handleFileUpload } = useFileUpload();

  console.log(fileData);

  return (
    <>
      <h1>CSV Upload</h1>
      <p>Add disclaimer about format</p>
      <input type="file" accept=".csv" onChange={handleFileConversion} />
      <button onClick={handleFileUpload(fileData)} disabled={fileData === null}>
        Upload
      </button>
    </>
  );
}

export default App;
