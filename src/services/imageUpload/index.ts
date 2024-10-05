import { Api } from "../config";
import { ImageUploadResponse } from "./imageUpload.type";

export const ImageUpload = async (file: File): Promise<ImageUploadResponse> => {
    // Create a new FormData object
    const formData = new FormData();
    // Append the file to the FormData object
    formData.append("file", file);
    // Log FormData contents for debugging

// Use the appropriate key expected by the backend

    // Send the request
    return (await Api.post("/file/save", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })).data;
};
