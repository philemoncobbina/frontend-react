import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import admissionService from '../../Services/admissionService';
import PersonalInformation from './PersonalInformation';
import ParentGuardianInformation from './ParentGuardianInformation';
import EducationHistory from './EducationHistory';
import HealthInformation from './HealthInformation';
import ConfirmationModal from '../DashBoard/ConfirmationModal';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const EditAdmission = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    middle_name: '',
    home_address: '',
    age: '',
    language_spoken: '',
    country_of_citizenship: '',
    gender: '',
    date_of_birth: '',
    parent_full_name: '',
    occupation: '',
    phone_number: '',
    email: '',
    parent_home_address: '',
    previous_school_name: '',
    previous_class: '',
    previous_school_address: '',
    start_date: '',
    end_date: '',
    emergency_contact: '',
    emergency_contact_number: '',
    medical_conditions: '',
    allergies: '',
    disabilities: '',
    vaccinated: '',
    status: 'pending' // Added status field
  });
  const [originalData, setOriginalData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAdmission = async () => {
      try {
        const data = await admissionService.fetchAdmissions();
        const admissionToEdit = data.find(ad => ad.id === parseInt(id));
        if (admissionToEdit) {
          setFormData(admissionToEdit);
          setOriginalData(admissionToEdit);
        } else {
          setError('Admission not found.');
        }
      } catch (err) {
        setError('Failed to load admission data.');
      }
    };
    fetchAdmission();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    console.log('Edit button clicked');
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      await admissionService.editStudent(id, formData);
      alert('Student updated successfully!');
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to update student.');
    }
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await admissionService.deleteAdmission(id);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to delete admission.');
    }
    setIsModalOpen(false);
  };

  if (error) return <div>{error}</div>;

  // Check if admission is approved
  const isApproved = formData.status === 'approved';

  // Helper function to render action buttons
  const renderActionButtons = () => {
    if (isEditing) {
      return (
        <>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={handleCancelEdit}
            className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            Cancel
          </button>
        </>
      );
    }

    return (
      <>
        <button
          type="button"
          onClick={handleEditClick}
          className={`px-4 py-2 ${isApproved ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500'} text-white rounded-md`}
          disabled={isApproved}
          title={isApproved ? "Cannot edit approved admissions" : "Edit admission"}
        >
          <FaEdit className="inline mr-2" /> Edit
        </button>
        <button
          type="button"
          onClick={handleDeleteClick}
          className={`ml-4 px-4 py-2 ${isApproved ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500'} text-white rounded-md`}
          disabled={isApproved}
          title={isApproved ? "Cannot delete approved admissions" : "Delete admission"}
        >
          <FaTrashAlt className="inline mr-2" /> Delete
        </button>
      </>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Admission</h1>
      {isApproved && (
        <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
          This admission has been approved and cannot be modified or deleted.
        </div>
      )}
      <form onSubmit={handleSaveChanges} className="space-y-6">
        <PersonalInformation formData={formData} handleChange={handleChange} editable={isEditing && !isApproved} />
        <ParentGuardianInformation formData={formData} handleChange={handleChange} editable={isEditing && !isApproved} />
        <EducationHistory formData={formData} handleChange={handleChange} editable={isEditing && !isApproved} />
        <HealthInformation formData={formData} handleChange={handleChange} editable={isEditing && !isApproved} />
        <div className="mt-4">
          {renderActionButtons()}
        </div>
      </form>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        admissionNumber={formData.admission_number}
      />
    </div>
  );
};

export default EditAdmission;