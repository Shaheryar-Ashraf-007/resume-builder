import DashboardLayout from '@/layout/DashboardLayout';
import { axiosInstance } from '@/lib/axios';
import { Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment'; // Ensure moment is imported
import ResumeSummaryCard from '@/cards/ResumeSummaryCard';

const Dashboard = () => {
    const navigate = useNavigate();

    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [allresume, setAllresume] = useState(null);

    const fetchAllResume = async () => {
        try {
            console.log("Fetching resumes...");
            const response = await axiosInstance.get('/resume');
            console.log("Resumes fetched successfully:", response.data);
            setAllresume(response.data);
            return response.data;
        } catch (error) {
            console.error("Error in response", error);
        }
    };

    useEffect(() => {
        fetchAllResume();
    }, []);

    return (
        <DashboardLayout>
            <div className='h-screen flex flex-col items-center md:flex-row justify-start p-4'>
                <div className='bg-[#0c0c0c] max-w-md w-[300px] h-[300px] border border-gray-200 hover:border-blue-400 rounded-md p-4 md:p-6 flex flex-col items-center lg:absolute top-28'>
                    <div className="relative w-full h-full ">
                        <div className="absolute inset-0 rounded-md"></div>
                        <div className="relative z-10 flex flex-col items-center justify-center text-white text-center p-4">
                            <div 
                                className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-pink-300 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200"
                                onClick={() => {
                                    console.log("Opening create modal...");
                                    setOpenCreateModal(true);
                                }} // Placeholder for modal functionality
                            >
                                <Plus className='text-black' size={28} />
                            </div>
                            <p className="mt-2 text-sm md:text-base">Add New Resume</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-4 mt-4 md:mt-0 md:ml-4 w-[300px] lg:absolute top-28 left-88'>
                    {allresume?.map((resume) => {
                        console.log("Rendering resume:", resume);
                        return (
                            <ResumeSummaryCard
                                key={resume._id}
                                imageUrl={resume.thumbnailLink || null}
                                title={resume.title}
                                lastUpdate={
                                    resume.updatedAt 
                                    ? moment(resume.updatedAt).format("Do MMM YYYY")
                                    : ""
                                }
                                onSelect={() => {
                                    console.log("Navigating to resume:", resume._id);
                                    navigate(`/resume/${resume?._id}`);
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;