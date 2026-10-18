// TicketService.ts
import axios from 'axios';
import { API_URL } from '../Services/http'; // adjust the path if this file lives elsewhere

const TICKETS_URL = `${API_URL}tickets/`;

export interface TicketData {
  full_name: string;
  email: string;
  phone_number: string;
  section: string;
  severity: string;
  description: string;
  screenshot?: File;
}

export const submitTicket = async (ticketData: TicketData) => {
  const formData = new FormData();
  formData.append('full_name', ticketData.full_name);
  formData.append('email', ticketData.email);
  formData.append('phone_number', ticketData.phone_number);
  formData.append('section', ticketData.section);
  formData.append('severity', ticketData.severity);
  formData.append('description', ticketData.description);

  if (ticketData.screenshot) {
    formData.append('screenshot', ticketData.screenshot);
  }

  try {
    // No Content-Type header: the browser must add it itself, because it includes the multipart boundary.
    // If the visitor is logged in, the interceptors add the CSRF header automatically.
    const response = await axios.post(TICKETS_URL, formData);
    return response.data;
  } catch (error) {
    console.error('Error submitting ticket:', error);
    throw error;
  }
};