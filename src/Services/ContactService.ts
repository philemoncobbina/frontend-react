import axios from 'axios';

const API_URL = 'https://backend-django-5-clix.onrender.com/api/contacts/';

export const submitContactForm = async (data) => {
  try {
    const response = await axios.post(`${API_URL}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
