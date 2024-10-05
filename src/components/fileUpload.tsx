import { Loader2, Upload } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";


const FileUploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSeleected, setIsSelected] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size (max 3MB)
      if (file.size > 3 * 1024 * 1024) {
        setFileError("File size exceeds 3MB.");
        setSelectedFile(null);
      } else if (!["image/jpeg", "image/png"].includes(file.type)) {
        setFileError("Invalid file format. Only JPG/PNG allowed.");
        setSelectedFile(null);
      } else {
        setFileError(null);
        setSelectedFile(file);
        setFileUploaded(false);
        setIsSelected(true);
      }
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setFileError("Please select a file to upload.");
      return;
    }
    
    // Simulate file upload
    setIsUploading(true);
    setTimeout(() => {
      alert("File uploaded successfully!");
      setIsUploading(false);
    toast.success("File uploaded successfully!");
      
      setFileUploaded(true);
    }, 2000); // Simulated upload time
  };

  return (
    <div className="">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Picture (JPG, PNG of max size 3MB)
        </label>
    <div className="max-w-lg  px-6  bg-white border-2  border-gray-300 rounded-lg">
      {/* File Input with Beautiful Design */}
      <div className=" ">
        
        <div className="relative w-full overflow-x-clip ">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="flex items-center justify-center w-full px-6 py-4 m-2  border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-300 ease-in-out"
          >
            {selectedFile ? (
              <span className="text-sm text-gray-600 max-w-80 ">{selectedFile.name}</span>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-2 text-wrap">
           <Upload size={24} color="#B4B4B8" />
                <span className="text-sm text-gray-500  ">
                Click to select a file
                </span>
              </div>
            )}
          </label>
          {fileError && <p className="text-red-500 text-xs mt-2">{fileError}</p>}
        </div>
      </div>

      {/* Beautiful Upload Button */}

{isSeleected && !fileUploaded && 


      <div className="flex justify-center my-2">
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className={`relative px-6 py-2 text-sm font-bold text-white rounded-md transition-all duration-300 ease-in-out focus:outline-none ${
            isUploading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-main"
          }`}
        >
          {isUploading ? (
            <div className="flex flex-row justify-center gap-2">
            <Loader2 size={24} color="white"  className="animate-spin "/>
              Uploading...
            </div>
          ) : (
            "Upload"
          )}
        </button>
      </div>
}


    </div>
    </div>
  );
};

export default FileUploadComponent;
