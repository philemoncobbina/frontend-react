// my-project/src/Services/ContactService.ts
import axios from 'axios';
import { API_URL } from './http';

const CONTACTS_URL = `${API_URL}contacts/`;

type ContactPayload = Record<string, unknown>;

// Public endpoint. If the visitor happens to be logged in, the interceptors attach the CSRF
// header automatically, so the request is not rejected.
export const submitContactForm = async (data: ContactPayload) => {
  const response = await axios.post(CONTACTS_URL, data);
  return response.data;
};