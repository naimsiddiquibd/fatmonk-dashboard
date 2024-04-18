import React, { useEffect, useState } from 'react';
import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/solid';
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid';
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import ClientModal from './ClientModal';

const Clients = () => {
    const [clients, setClients] = useState([]);
    const [selectedClientId, setSelectedClientId] = useState(null);

    useEffect(() => {
        fetch('http://localhost:7878/api/clients')
            .then(response => response.json())
            .then(data => setClients(data))
            .catch(error => console.error('Error fetching clients:', error));
    }, []);

    // Function to format date string to readable format
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    // Function to log the ID when icon is clicked
    const handleIconClick = (id) => {
        console.log('Clicked icon ID:', id);
    };

    const handleClientSelect = (clientId) => {
        setSelectedClientId(clientId);
        document.getElementById('my_modal_5').showModal(); // Open the modal
    };

    return (
        <div className='p-3 pr-6'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-3'>
                    <ClipboardDocumentCheckIcon className="h-12 w-12 bg-slate-900/70 p-3 rounded-full text-white" />
                    <h2 className='text-3xl leading-tight text-white'>Clients</h2>
                </div>
                <div className='bg-[#FFFFFF] font-semibold py-2 px-4 text-sm rounded-full w-auto flex items-center gap-2 text-[#10172A] cursor-pointer hover:bg-slate-200'>
                    <ArrowUpTrayIcon className="h-5 w-5" />
                    <p>Add a new client</p>
                </div>
            </div>
           {/* table */}
           <div className="overflow-x-auto bg-[#151C2E] rounded-xl mt-5">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
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
                        {/* dynamic rows */}
                        {clients.map((client, index) => (
                            <tr key={client._id}>
                                <th>{index + 1}</th>
                                <td>
                                    {client.logo && (
                                        <img src={`http://localhost:7878/uploads/${client.logo.filename}`} alt={client.name} className="h-12 w-12 rounded-sm" />
                                    )}
                                </td>
                                <td>{client.name}</td>
                                {/* Format dates */}
                                <td>{formatDate(client.createdAt)}</td>
                                <td>{formatDate(client.updatedAt)}</td>
                                <td><EyeIcon onClick={() => handleIconClick(client._id)} className="bg-blue-400 cursor-pointer hover:bg-blue-500 rounded-sm p-3 h-10 w-10 text-white" /></td>
                                <td><PencilIcon onClick={() => handleIconClick(client._id)} className="bg-orange-400 cursor-pointer hover:bg-orange-500 rounded-sm p-3 h-10 w-10 text-white" /></td>
                                <td><TrashIcon onClick={() => handleIconClick(client._id)} className="bg-red-400 cursor-pointer hover:bg-red-500 rounded-sm p-3 h-10 w-10 text-white" /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ClientModal clientId={selectedClientId} />
            </div>
            {/* end table */}
        </div>
    );
};

export default Clients;
