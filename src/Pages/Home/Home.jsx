import React from 'react';
import { ComputerDesktopIcon } from '@heroicons/react/24/solid';
import { BriefcaseIcon } from '@heroicons/react/24/solid';
import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/solid';
import { RectangleStackIcon } from '@heroicons/react/24/solid';
import { RectangleGroupIcon } from '@heroicons/react/24/solid';
import { SquaresPlusIcon } from '@heroicons/react/24/solid';
import { Link, Outlet } from 'react-router-dom';

const Home = () => {
    return (
        <div className="drawer lg:drawer-open bg-[#1E293B]">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
            </div>
            <div className="drawer-side h-screen pb-6">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className=" pl-6 p-4 w-60 min-h-full bg-[#10172A] m-3 rounded-2xl text-[#CBD5E1] text-[16px] gap-y-4">
                    {/* Sidebar content here */}
                    <h2 className='text-center font-semibold text-[#F1F5F9]'>Fatmonk Dashboard</h2>
                    <li className='mt-6 hover:text-white cursor-pointer'>
                        <div className='gap-5 flex items-center'>
                        <ComputerDesktopIcon className="h-5 w-5 text-[#CBD5E1]" />
                        <a>Dashboard</a>
                        </div>
                    </li>
                    <li className='mt-6 hover:text-white cursor-pointer'>
                        <div className='gap-5 flex items-center'>
                        <BriefcaseIcon className="h-5 w-5 text-[#CBD5E1]" />
                        <a>Job Post</a>
                        </div>
                    </li>
                    <li className='mt-6 hover:text-white cursor-pointer'>
                        <Link to="/clients" className='gap-5 flex items-center'>
                        <ClipboardDocumentCheckIcon className="h-5 w-5 text-[#CBD5E1]" />
                        <a>Client</a>
                        </Link>
                    </li>
                    <li className='mt-6 hover:text-white cursor-pointer'>
                        <div className='gap-5 flex items-center'>
                        <RectangleStackIcon className="h-5 w-5 text-[#CBD5E1]" />
                        <a>Review</a>
                        </div>
                    </li>
                    <li className='mt-6 hover:text-white cursor-pointer'>
                        <div className='gap-5 flex items-center'>
                        <RectangleGroupIcon className="h-5 w-5 text-[#CBD5E1]" />
                        <a>Projects</a>
                        </div>
                    </li>
                    <li className='mt-6 hover:text-white cursor-pointer'>
                        <div className='gap-5 flex items-center'>
                        <SquaresPlusIcon className="h-5 w-5 text-[#CBD5E1]" />
                        <a>Services</a>
                        </div>
                    </li>
                    
                </ul>

            </div>
        </div>
    );
};

export default Home;