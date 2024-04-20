import React, { useState } from "react";
import { BriefcaseIcon, ArrowUpOnSquareIcon } from "@heroicons/react/24/solid";
import axios from "axios"; // Import Axios

const CreateClientModal = ({ isOpen, onClose, onClientCreated }) => {
  const [companyName, setCompanyName] = useState("");
  const [file, setFile] = useState(null); // State to hold the file object
  const [loading, setLoading] = useState(false); // Loading state for form submission

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleClientCreation = async () => {
    setLoading(true); // Set loading state to true when submitting the form
    // Prepare form data
    const formData = new FormData();
    formData.append("name", companyName);
    formData.append("logo", file);

    try {
      // Make POST request
      const response = await axios.post("http://localhost:7878/api/clients", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data); // Log response if needed
      onClientCreated(response.data);
      setCompanyName("");
      setFile("");
      onClose(); // Close modal after successful submission
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Reset loading state after form submission completes
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#141C2F] bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-zinc-900 p-5 rounded-lg shadow-md">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-1">
              <div className="relative">
                <input
                  placeholder="Company name"
                  className="px-3 py-2 max-w-full border-gray-700 rounded w-full placeholder-gray-400 focus:ring focus:ring-blue-600 focus:border-blue-600 focus:outline-none h-12 border bg-[#1E293B]  pl-10"
                  onChange={(e) => setCompanyName(e.target.value)}
                />
                <span className="inline-flex justify-center items-center w-10 h-12 absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-slate-400 pl-1">
                  <BriefcaseIcon className="h-[18px] w-[18px]  text-gray-400" />
                </span>
              </div>

              <div className="relative">
                <div className="flex items-stretch justify-start relative">
                  <label className="inline-flex">
                    <a className="inline-flex justify-center items-center border cursor-pointer rounded border-blue-600  ring-blue-300  bg-blue-600  text-white hover:bg-blue-700  py-2 px-3">
                      <span className="inline-flex justify-center items-center  ">
                        <ArrowUpOnSquareIcon className="h-5 w-5  text-gray-200" />
                      </span>
                      <span className="px-2">Upload</span>
                    </a>
                    <input
                      type="file"
                      className="absolute top-0 left-0 w-full h-full opacity-0 outline-none cursor-pointer -z-1"
                      onChange={handleFileChange}
                    />
                  </label>
                  {file && (
                    <div className="px-4 py-2 max-w-full flex-grow-0 overflow-x-hidden bg-[#1E293B] border-gray-500 border rounded-r">
                      <span className="text-ellipsis max-w-full line-clamp-1">
                        {file.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                className={`px-4 py-2 mr-2 bg-red-500 text-white rounded ${loading && 'opacity-50 cursor-not-allowed'}`} // Disable button and add opacity when loading
                onClick={handleClientCreation} // Call handleClientCreation function
                disabled={loading} // Disable button when loading
              >
                {loading ? 'Creating...' : 'Yes'} {/* Change button text when loading */}
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={onClose}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateClientModal;
