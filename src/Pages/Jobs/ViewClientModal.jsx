import React, { useEffect, useState, useMemo } from "react";

const CreateClientModal = ({ isOpen, onClose, clientId }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clients, setClients] = useState({});

  const fetchData = async () => {
    try {
      const response = await fetch(`https://fatmonk.dupbsdaa.com/api/clients/${clientId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setClients(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetchData();
    } else {
      // Reset clients when modal is closed
      setClients({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, clientId]); // Remove clientId from dependency array if fetchData doesn't depend on it

  const clientLogo = useMemo(() => clients.logo ? `https://fatmonk.dupbsdaa.com/uploads/${clients.logo.filename}` : null, [clients]);

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
              <>
                <p className="font-semibold text-2xl mb-2">{clients.name}</p>
                {clientLogo && (
                  <img
                    src={clientLogo}
                    alt={clients.name}
                    className="h-60 rounded-lg object-container "
                  />
                )}
                <div className="flex justify-end mt-4">
                  <button
                    className="px-4 py-2 bg-zinc-800 rounded"
                    onClick={onClose}
                  >
                    Okay, Done!
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CreateClientModal;
