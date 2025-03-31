import { useState } from "react";

type FileData = Record<string, string>[] | null;

export const useFileUpload = () => {
  const [fileData, setFileData] = useState<FileData>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      console.log("File selected:", file.name);
      const reader = new FileReader();
      // Add try catch below?
      reader.onload = (event) => {
        const fileData = event.target?.result;
        const convertedData = convertCSVData(fileData as string);
        setFileData(convertedData);
      };
      reader.readAsText(file);
    }
  };

  const convertCSVData = (fileData: string) => {
    const rows = fileData.split("\n");

    // remove column headers if they exist - TODO: make more explicit
    if (rows[0].includes("Company Name")) {
      rows.shift();
    }

    const result = [];
    const headers = ["companyName", "employeeName", "emailAddress", "salary"];

    for (let i = 0; i < rows.length - 1; i++) {
      const rowData: Record<string, string> = {};
      const rowColumns = rows[i].split(",");

      // Create an object for each row with the headers as keys
      headers.forEach((header, index) => (rowData[header] = rowColumns[index]));

      result.push(rowData);
    }

    return result;
  };

  return { handleFileUpload, fileData };
};
