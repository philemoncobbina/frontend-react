// admissionService.ts
import axios from 'axios';
import { API_URL } from './http'; // adjust the path if this file lives in another folder

// No auth headers here: the HttpOnly cookies are sent by the browser, and the CSRF header
// is added by the interceptors that initAuth() installs.
const ADMISSIONS_URL = `${API_URL}admissions/`;

type AdmissionId = string | number;
// A FormData body (file uploads) must not get a hand-set Content-Type: axios adds the boundary.
type AdmissionPayload = FormData | Record<string, unknown>;

const handleAxiosError = (error: unknown): void => {
  if (axios.isAxiosError(error)) {
    console.error('Error message:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);

      if (error.response.status === 404) {
        console.error('No admissions found.');
      }
    } else {
      console.error('No response received from server.');
    }
  } else {
    console.error('Unexpected error:', error);
  }
};

const submitForm = async (formData: AdmissionPayload) => {
  try {
    const response = await axios.post(ADMISSIONS_URL, formData);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

const editStudent = async (id: AdmissionId, formData: AdmissionPayload) => {
  try {
    const response = await axios.put(`${ADMISSIONS_URL}${id}/`, formData);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

const fetchAdmissions = async () => {
  try {
    const response = await axios.get(`${ADMISSIONS_URL}my_admissions/`); // only the signed-in user's admissions
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

const deleteAdmission = async (id: AdmissionId): Promise<void> => {
  try {
    await axios.delete(`${ADMISSIONS_URL}${id}/`);
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export default { submitForm, editStudent, fetchAdmissions, deleteAdmission };