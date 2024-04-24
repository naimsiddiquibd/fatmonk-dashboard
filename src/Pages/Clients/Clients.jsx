import React, { useEffect, useState } from 'react';
import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/solid';
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid';
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import CreateClientModal from './CreateClientModal';
import ViewClientModal from './ViewClientModal';
import UpdateClientModal from './UpdateClientModal';

const Clients = () => {
    const [clients, setClients] = useState([]);
    const [deleteClientId, setDeleteClientId] = useState(null);
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [clientId, setClientId] = useState(null);

    // Create Modal
    const openModal = () => {
        setModalOpen(true);
      };
    
      const closeModal = () => {
        setModalOpen(false);
      };

    //   View Modal
      const openViewModal = () => {
        setViewModalOpen(true);
      };
    
      const closeViewModal = () => {
        setViewModalOpen(false);
      };

    // Update Modal
    const openUpdateModal = () => {
        setUpdateModalOpen(true);
      };
    
      const closeUpdateModal = () => {
        setUpdateModalOpen(false);
      };

    useEffect(() => {
        fetch('https://fatmonk.dupbsdaa.com/api/clients')
            .then(response => response.json())
            .then(data => setClients(data))
            .catch(error => console.error('Error fetching clients:', error));
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    const handleIconClick = (id) => {
        setDeleteClientId(id);
        setIsDeleteConfirmationOpen(true);
    };

    const handleViewClientClick = (id) => {
        setClientId(id);
        openViewModal();
    };

    const handleUpdateClientClick = (id) => {
        setClientId(id);
        openUpdateModal();
    };

    const handleDeleteConfirmation = () => {
        // Call the delete API with deleteClientId
        fetch(`https://fatmonk.dupbsdaa.com/api/clients/${deleteClientId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                // Remove the deleted client from the client list
                setClients(clients.filter(client => client._id !== deleteClientId));
            }
        })
        .catch(error => console.error('Error deleting client:', error))
        .finally(() => {
            setIsDeleteConfirmationOpen(false);
        });
    };

    const addNewClient = (newClient) => {
        setClients([...clients, newClient]);
    };

    // Function to update client in the clients state
    const updateClient = (updatedClient) => {
        setClients(clients.map(client => client._id === updatedClient._id ? updatedClient : client));
    };

    return (
        <div className='p-3 pr-6'>
            {/* Delete Confirmation Popup */}
            {isDeleteConfirmationOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
                    <div className="bg-zinc-900 p-5 rounded-lg shadow-md w-96 lg:w-[520px]">
                        <p className='text-gray-200'>Are you sure you want to delete this client?</p>
                        <div className="flex justify-end mt-4">
                            <button className="px-4 py-2 mr-2 bg-red-500 text-white rounded" onClick={handleDeleteConfirmation}>Yes</button>
                            <button className="px-4 py-2 bg-gray-100 rounded" onClick={() => setIsDeleteConfirmationOpen(false)}>No</button>
                        </div>
                    </div>
                </div>
            )}

            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-3'>
                    <ClipboardDocumentCheckIcon className="h-12 w-12 bg-slate-900/70 p-3 rounded-full text-white" />
                    <h2 className='text-3xl leading-tight text-white'>Clients</h2>
                </div>
                <div  onClick={openModal} className='bg-[#FFFFFF] font-semibold py-2 px-4 text-sm rounded-full w-auto flex items-center gap-2 text-[#10172A] cursor-pointer hover:bg-slate-200'>
                    <ArrowUpTrayIcon className="h-5 w-5" />
                    <p>Add a new client</p>
                </div>
            </div>

            <div className="overflow-x-auto bg-[#151C2E] rounded-xl mt-5 text-white">
                <table className="table  text-white">
                    <thead>
                        <tr className='text-white'>
                            <th></th>
                            <th>Company Logo</th>
                            <th>Company Name</th>
                            <th>Created at</th>
                            <th>Updated at</th>
                            <th>View</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client, index) => (
                            <tr className='border-gray-700' key={client._id}>
                                <th>{index + 1}</th>
                                <td>
                                    {client.logo && (
                                        <img src={`https://fatmonk.dupbsdaa.com/uploads/${client.logo.filename}`} alt={client.name} className="h-12 w-12 rounded-sm object-cover" />
                                    )}
                                </td>
                                <td>{client.name}</td>
                                <td>{formatDate(client.createdAt)}</td>
                                <td>{formatDate(client.updatedAt)}</td>

                                <td><EyeIcon onClick={() => handleViewClientClick(client._id)} className="bg-blue-400 cursor-pointer hover:bg-blue-500 rounded-sm p-3 h-10 w-10 text-white" /></td>

                                <td><PencilIcon onClick={() => handleUpdateClientClick(client._id)} className="bg-orange-400 cursor-pointer hover:bg-orange-500 rounded-sm p-3 h-10 w-10 text-white" /></td>

                                <td><TrashIcon onClick={() => handleIconClick(client._id)} className="bg-red-400 cursor-pointer hover:bg-red-500 rounded-sm p-3 h-10 w-10 text-white" /></td>

                            </tr>
                        ))}
                    </tbody>
                </table>
                <CreateClientModal isOpen={modalOpen} onClose={closeModal} onClientCreated={addNewClient} />
                <ViewClientModal isOpen={viewModalOpen} onClose={closeViewModal} clientId={clientId}></ViewClientModal>
                <UpdateClientModal isOpen={updateModalOpen} onClose={closeUpdateModal} clientId={clientId} onClientUpdated={updateClient}></UpdateClientModal>
            </div>
        </div>
    );
};

export default Clients;
