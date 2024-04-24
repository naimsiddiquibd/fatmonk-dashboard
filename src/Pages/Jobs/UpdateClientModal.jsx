import React, { useState, useEffect } from "react";
import axios from "axios";
import { BriefcaseIcon, ArrowUpOnSquareIcon } from "@heroicons/react/24/solid";

const UpdateClientModal = ({ isOpen, onClose, clientId, onClientUpdated }) => {
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [clients, setClients] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    logo: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://fatmonk.dupbsdaa.com/api/clients/${clientId}`
        );
        setClients(response.data);
        setLoading(false);
        setFormData((prevFormData) => ({
          ...prevFormData,
          name: response.data.name,
        }));
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (isOpen) {
      setLoading(true);
      fetchData();
    } else {
      setClients({}); // Reset clients state when closing the modal
    }
  }, [isOpen, clientId]);

  const handleNameChange = (e) => {
    setFormData({
      ...formData,
      name: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      logo: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("logo", formData.logo);

    try {
      const response = await axios.put(
        `https://fatmonk.dupbsdaa.com/api/clients/${clientId}`,
        formDataToSend
      );

      onClientUpdated(response.data);
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#141C2F] bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-zinc-900 p-5 rounded-lg shadow-md">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              <form onSubmit={handleSubmit}>
                <p className="font-semibold text-2xl mb-2">{clients.name}</p>

                <div className="relative">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={handleNameChange}
                    placeholder="Enter new name"
                    className="px-3 py-2 max-w-full border-gray-700 rounded w-full placeholder-gray-400 focus:ring focus:ring-blue-600 focus:border-blue-600 focus:outline-none h-12 border bg-[#1E293B]  pl-10"
                  />
                  <span className="inline-flex justify-center items-center w-10 h-12 absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-slate-400 pl-1">
                    <BriefcaseIcon className="h-[18px] w-[18px]  text-gray-400" />
                  </span>
                </div>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="mb-2 pt-3 w-full rounded"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className={`px-4 py-2 bg-zinc-800 rounded mr-2 ${updating && 'opacity-50 cursor-not-allowed'}`}
                    disabled={updating}
                  >
                    {updating ? 'Updating...' : 'Update'}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-zinc-800 rounded"
                    disabled={updating}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateClientModal;
