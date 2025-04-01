import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FileData } from "./useFileConversion";

export const useFileUpload = () => {
  const queryClient = useQueryClient(); // Access the QueryClient instance

  const uploadFileDataMutation = async (fileData: FileData) => {
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
        throw new Error(errorMessage);
      }
      return response.json();
    } catch (error) {
      const errorMessage =
        (error as Error).message || "An unexpected error occurred";
      throw new Error(errorMessage);
    }
  };
  const {
    mutateAsync: handleFileUpload,
    isPending: uploadPending,
    isSuccess: uploadSuccess,
    error: uploadError,
  } = useMutation({
    mutationFn: uploadFileDataMutation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      console.log("File data successfully sent to backend:", data);
    },
  });

  return { handleFileUpload, uploadError, uploadPending, uploadSuccess };
};
