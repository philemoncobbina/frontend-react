// my-project/src/Services/ReservationService.ts

import axios from 'axios';
import { API_URL } from './http';

const RESERVATIONS_URL = `${API_URL}reservations/`;

type ReservationPayload = Record<string, unknown> | FormData;

const FALLBACK_MESSAGE = 'An error occurred while submitting the reservation.';

// Public endpoint. If the visitor happens to be logged in, the interceptors attach the CSRF
// header automatically, so the request is not rejected.
const postReservation = async (reservationData: ReservationPayload) => {
  try {
    const response = await axios.post(RESERVATIONS_URL, reservationData);
    return response;
  } catch (error: any) {
    // The API answers with { detail } or { error } (for example when rate limited).
    if (error.response && error.response.data) {
      console.error('API Error Response:', error.response.data);
      throw new Error(error.response.data.detail || error.response.data.error || FALLBACK_MESSAGE);
    }

    console.error('API Error:', error.message);
    throw new Error(FALLBACK_MESSAGE);
  }
};

export { postReservation };