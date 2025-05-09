import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ApplicationModal from './ApplicationModal';

const Recruitments = () => {
  const [jobs] = useState([
    { id: 1, name: 'Frontend Developer', date: '2023-05-15' },
    { id: 2, name: 'Backend Developer', date: '2023-05-10' },
    { id: 3, name: 'UX Designer', date: '2023-05-05' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleApply = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleSubmitApplication = (formData) => {
    console.log('Application submitted for:', selectedJob.name, 'with data:', formData);
    setIsModalOpen(false);
    toast.success('Applied successfully!');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Toaster position="top-right" reverseOrder={false} />
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Job Openings</h2>
      <div className="overflow-x-auto">
        <table className="table-auto mx-auto border border-gray-300 rounded-lg shadow-md w-full max-w-4xl">
          <thead className="bg-indigo-100 text-gray-700">
            <tr>
              <th className="border border-gray-300 px-6 py-3 text-sm font-semibold text-left">ID</th>
              <th className="border border-gray-300 px-6 py-3 text-sm font-semibold text-left">Post Name</th>
              <th className="border border-gray-300 px-6 py-3 text-sm font-semibold text-left">Post Date</th>
              <th className="border border-gray-300 px-6 py-3 text-sm font-semibold text-left">Apply</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr
                key={job.id}
                className={index % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100'}
              >
                <td className="border border-gray-300 px-6 py-4 text-sm text-gray-600">{job.id}</td>
                <td className="border border-gray-300 px-6 py-4 text-sm font-medium text-gray-800">{job.name}</td>
                <td className="border border-gray-300 px-6 py-4 text-sm text-gray-600">{job.date}</td>
                <td className="border border-gray-300 px-6 py-4 text-sm">
                  <button
                    onClick={() => handleApply(job)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                  >
                    APPLY
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {isModalOpen && (
        <ApplicationModal
          job={selectedJob}
          onSubmit={handleSubmitApplication}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Recruitments;
