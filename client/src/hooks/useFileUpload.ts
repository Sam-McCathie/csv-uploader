import { useState } from "react";
import { convertCSV } from "../helpers/convertCSV";

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
        const rawFileData = event.target?.result;
        const convertedFileData = convertCSV(rawFileData as string);
        setFileData(convertedFileData);
      };
      reader.readAsText(file);
    }
  };

  return { handleFileUpload, fileData };
};
