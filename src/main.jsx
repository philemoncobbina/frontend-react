import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';

import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import ChangePasswordPage from './Pages/ChangePasswordPage';
import ForgetPassword from './Pages/ForgetPassword';
import TeamPostPage from './Pages/TeamPostPage';
import AdmissionPage from './Pages/AdmissionPage';
import BlogPage from './Pages/BlogPage';
import BlogPostPage from './Pages/BlogPostPage';
import ContactPage from './Pages/ContactPage';
import ReservationPage from './Pages/ReservationPage';
import Application from './Pages/Application';
import CareerPage from './Pages/CareerPage';
import DashboardPage from './Pages/DashboardPage';
import EditAdmission from './layouts/AdmissionReview/EditAdmission';
import RaiseTicketPage from './Pages/RaiseTicketPage';
import JobDetailspage from './Pages/JobDetailspage';
import JobApplicationpage from './Pages/JobApplicationpage';
import JobVacancyPage from './Pages/JobVacancyPage';

import SchoolDashboardPage from './Pages/SchoolDashboardPage';
import BookListPage from './Pages/BookListPage';
import ResultsPage from './Pages/ResultsPage';

// Import general auth components
import { AuthProvider, RequireAuth, AuthModalWrapper } from './Services/RequireAuth';

// Import student-specific auth components
import { StudentAuthProvider, RequireStudentAuth } from './Services/StudentAuth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  
  {
    path: '/student-portal',
    element: (
      <RequireStudentAuth>
        <SchoolDashboardPage />
      </RequireStudentAuth>
    ),
  },
  {
    path: '/student-portal/results',
    element: (
      <RequireStudentAuth>
        <ResultsPage />
      </RequireStudentAuth>
    ),
  },
  {
    path: '/student-portal/booklist',
    element: (
      <RequireStudentAuth>
        <BookListPage />
      </RequireStudentAuth>
    ),
  },
  {
    path: '/careers',
    element: <CareerPage />,
  },
  {
    path: '/careers/vacancy',
    element: <JobVacancyPage />,
  },
  {
    path: '/careers/vacancy/:jobId/:jobSlug',
    element: <JobDetailspage />,
  },
  {
    path: '/careers/vacancy/:jobId/:jobSlug/apply',
    element: <JobApplicationpage />,
  },
  {
    path: '/contact/raiseticket',
    element: <RaiseTicketPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/changepassword',
    element: <ChangePasswordPage />,
  },
  {
    path: '/forgetpassword',
    element: <ForgetPassword />,
  },
  {
    path: '/about/:id',
    element: <TeamPostPage />,
  },
  {
    path: '/admission',
    element: <AdmissionPage />,
  },
  {
    path: '/blog',
    element: <BlogPage />,
  },
  {
    path: '/blog/:id',
    element: <BlogPostPage />,
  },
  {
    path: '/admission/apply',
    element: (
      <RequireAuth>
        <Application />
      </RequireAuth>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <RequireAuth>
        <DashboardPage />
      </RequireAuth>
    ),
  },
  {
    path: '/admission/edit/:id',
    element: (
      <RequireAuth>
        <EditAdmission />
      </RequireAuth>
    ),
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '/contact/reservation',
    element: <ReservationPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      {/* Wrap with both auth providers - general auth first, then student auth */}
      <AuthProvider>
        <StudentAuthProvider>
          <RouterProvider router={router} />
          <AuthModalWrapper />
        </StudentAuthProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);