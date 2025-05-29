import React, { useState, useEffect } from 'react';
import { submitTicket } from "../../Services/TicketService";
import { X } from "lucide-react";

const TicketForm = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone_number: '',
        section: 'authentication',
        severity: 'low',
        description: '',
        screenshot: null
    });

    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        let timer;
        if (showModal) {
            timer = setTimeout(() => {
                setShowModal(false);
            }, 30000); // 30 seconds
        }
        return () => clearTimeout(timer);
    }, [showModal]);

    const clearForm = () => {
        setFormData({
            full_name: '',
            email: '',
            phone_number: '',
            section: 'authentication',
            severity: 'low',
            description: '',
            screenshot: null
        });
        // Clear the file input
        const fileInput = document.getElementById('screenshot');
        if (fileInput) fileInput.value = '';
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.full_name.trim()) newErrors.full_name = 'Full name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.phone_number.trim()) newErrors.phone_number = 'Phone number is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.screenshot) newErrors.screenshot = 'Screenshot is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handleFileChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            screenshot: e.target.files[0],
        }));
        if (errors.screenshot) {
            setErrors(prev => ({
                ...prev,
                screenshot: undefined
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await submitTicket(formData);
                setShowModal(true);
                clearForm();
            } catch (error) {
                console.error('Error submitting ticket:', error);
                setErrors({ submit: 'Failed to submit ticket. Please try again later.' });
            }
        }
    };

    return (
        <div className="relative max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg border-1 border-gray-200 flex flex-col md:flex-row mt-16 md:mt-24">
            {/* Custom Success Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="bg-white rounded-lg p-6 max-w-sm mx-4 relative z-50 shadow-xl">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <X size={20} />
                        </button>
                        <div className="mb-1">
                            <div className="h-12 w-12 rounded-full bg-green-100 mx-auto flex items-center justify-center">
                                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold text-center text-gray-900 mt-4">
                            Success
                        </h3>
                        <p className="mt-2 text-center text-gray-600">
                            Ticket submitted successfully!
                        </p>
                    </div>
                </div>
            )}

            <div className="md:w-1/2 pr-8 mb-8 md:mb-0 flex items-center">
                <img 
                    src='https://images.pexels.com/photos/5453808/pexels-photo-5453808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                    alt="Support" 
                    className="rounded-lg shadow-lg w-full object-cover h-full"
                />
            </div>
            <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Report an Issue</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="fullName">
                            <i className="fas fa-user mr-2"></i> Full Name
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            name="full_name"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.full_name ? 'border-red-500' : ''
                            }`}
                            placeholder="Enter your full name"
                            value={formData.full_name}
                            onChange={handleChange}
                        />
                        {errors.full_name && (
                            <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
                            <i className="fas fa-envelope mr-2"></i> Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.email ? 'border-red-500' : ''
                            }`}
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="phone">
                            <i className="fas fa-phone mr-2"></i> Phone Number
                        </label>
                        <input
                            type="tel"
                            id="phone_number"
                            name="phone_number"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.phone_number ? 'border-red-500' : ''
                            }`}
                            placeholder="Enter your phone number"
                            value={formData.phone_number}
                            onChange={handleChange}
                        />
                        {errors.phone_number && (
                            <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="section">
                            <i className="fas fa-sitemap mr-2"></i> Section of the Website
                        </label>
                        <select
                            id="section"
                            name="section"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.section}
                            onChange={handleChange}
                        >
                            <option value="authentication">Authentication</option>
                            <option value="reservation">Reservation Booking</option>
                            <option value="admissions">Admissions</option>
                            <option value="others">Others</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="severity">
                            <i className="fas fa-exclamation-triangle mr-2"></i> Severity Level
                        </label>
                        <select
                            id="severity"
                            name="severity"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.severity}
                            onChange={handleChange}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="critical">Critical</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="description">
                            <i className="fas fa-pencil-alt mr-2"></i> Describe the Error
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.description ? 'border-red-500' : ''
                            }`}
                            placeholder="Describe the issue you are facing"
                            value={formData.description}
                            onChange={handleChange}
                            rows="5"
                        ></textarea>
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                        )}
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="screenshot">
                            <i className="fas fa-camera mr-2"></i> Attach Screenshot or Photo
                        </label>
                        <input
                            type="file"
                            id="screenshot"
                            name="screenshot"
                            accept="image/*"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.screenshot ? 'border-red-500' : ''
                            }`}
                            onChange={handleFileChange}
                        />
                        {errors.screenshot && (
                            <p className="text-red-500 text-sm mt-1">{errors.screenshot}</p>
                        )}
                    </div>

                    {errors.submit && (
                        <div className="mb-4">
                            <p className="text-red-500 text-sm text-center">{errors.submit}</p>
                        </div>
                    )}

                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                        >
                            Submit Ticket
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TicketForm;