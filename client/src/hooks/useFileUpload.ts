import { useState } from "react";
import { FileData } from "./useFileConversion";

// Todo: Add loading state
export const useFileUpload = () => {
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileUpload = (fileData: FileData) => async () => {
    if (!fileData) {
      console.error("No file data to upload");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fileData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage =
          errorData.error || "Failed to send file data to backend";
        setUploadError(errorMessage);
        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      console.log("File data successfully sent to backend:", responseData);
    } catch (error) {
      setUploadError("Failed to send file data to backend");
      console.error("Error sending file data to backend:", error);
    }
  };

  return { handleFileUpload, uploadError };
};
