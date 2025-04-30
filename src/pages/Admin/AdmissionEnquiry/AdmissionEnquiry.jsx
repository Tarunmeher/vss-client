import { useState } from 'react';
import { Search, Plus, Edit, Trash2, Phone, Calendar, BookOpen, Package } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InquiryModal from './InquiryModal';

const AdmissionInquiry = () => {
    // Sample inquiry data
    const [inquiries, setInquiries] = useState([
        {
            id: 1,
            name: 'Rahul Sharma',
            mobile: '9876543210',
            standard: 'Class 10',
            package: 'Gold',
            enquiryDate: '2023-05-15',
            status: 'Pending'
        },
        {
            id: 2,
            name: 'Priya Patel',
            mobile: '8765432109',
            standard: 'Class 12',
            package: 'Platinum',
            enquiryDate: '2023-05-18',
            status: 'Follow Up'
        },
        {
            id: 3,
            name: 'Amit Singh',
            mobile: '7654321098',
            standard: 'Class 9',
            package: 'Silver',
            enquiryDate: '2023-05-20',
            status: 'Converted'
        },
        {
            id: 4,
            name: 'Neha Gupta',
            mobile: '6543210987',
            standard: 'Class 11',
            package: 'Gold',
            enquiryDate: '2023-05-22',
            status: 'Rejected'
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentInquiry, setCurrentInquiry] = useState({
        id: '',
        name: '',
        mobile: '',
        standard: '',
        package: 'Silver',
        enquiryDate: new Date().toISOString().split('T')[0],
        status: 'Pending'
    });
    const [isEditing, setIsEditing] = useState(false);

    // Filter inquiries based on search term
    const filteredInquiries = inquiries.filter(inquiry => {
        const searchLower = searchTerm.toLowerCase();
        return (
            inquiry.name.toLowerCase().includes(searchLower) ||
            inquiry.mobile.includes(searchTerm) ||
            inquiry.standard.toLowerCase().includes(searchLower) ||
            inquiry.package.toLowerCase().includes(searchLower)
        );
    });

    // Format date for display
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // Handle add new inquiry
    const handleAdd = () => {
        setCurrentInquiry({
            id: '',
            name: '',
            mobile: '',
            standard: '',
            package: 'Silver',
            enquiryDate: new Date().toISOString().split('T')[0],
            status: 'Pending'
        });
        setIsEditing(false);
        setIsModalOpen(true);
    };

    // Handle edit inquiry
    const handleEdit = (inquiry) => {
        setCurrentInquiry(inquiry);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    // Handle delete inquiry
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this inquiry?')) {
            setInquiries(inquiries.filter(inquiry => inquiry.id !== id));
            toast.success('Inquiry deleted successfully!');
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditing) {
            // Update existing inquiry
            setInquiries(inquiries.map(inquiry =>
                inquiry.id === currentInquiry.id ? currentInquiry : inquiry
            ));
            toast.success('Inquiry updated successfully!');
        } else {
            // Add new inquiry
            const newInquiry = {
                ...currentInquiry,
                id: Math.max(...inquiries.map(i => i.id)) + 1
            };
            setInquiries([...inquiries, newInquiry]);
            toast.success('New inquiry added successfully!');
        }

        setIsModalOpen(false);
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentInquiry({
            ...currentInquiry,
            [name]: value
        });
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Admission Inquiries</h1>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-4 flex justify-between items-center bg-gray-50 border-b">
                    <div className="relative w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search inquiries..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <button
                        onClick={handleAdd}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center gap-2"
                    >
                        <Plus className="h-4 w-4" />
                        Add Inquiry
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Standard</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enquiry Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredInquiries.map((inquiry, index) => (
                                <tr key={inquiry.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{inquiry.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <Phone className="h-4 w-4 text-gray-500 mr-1" />
                                            {inquiry.mobile}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <BookOpen className="h-4 w-4 text-gray-500 mr-1" />
                                            {inquiry.standard}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <Package className="h-4 w-4 text-gray-500 mr-1" />
                                            {inquiry.package}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                                            {formatDate(inquiry.enquiryDate)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${inquiry.status === 'Converted' ? 'bg-green-100 text-green-800' :
                                                inquiry.status === 'Follow Up' ? 'bg-yellow-100 text-yellow-800' :
                                                    inquiry.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                                        'bg-gray-100 text-gray-800'}`}>
                                            {inquiry.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => handleEdit(inquiry)}
                                            className="text-blue-600 hover:text-blue-900 mr-3 flex items-center gap-1"
                                        >
                                            <Edit className="h-4 w-4" />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(inquiry.id)}
                                            className="text-red-600 hover:text-red-900 flex items-center gap-1"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <InquiryModal
                    isEditing={isEditing}
                    currentInquiry={currentInquiry}
                    onClose={() => setIsModalOpen(false)}
                    onChange={handleInputChange}
                    onSubmit={handleSubmit}
                />
            )}

        </div>
    );
};

export default AdmissionInquiry;