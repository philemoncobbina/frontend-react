import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchJobDetails } from '../../Services/jobService';
import { Share2, MapPin, Calendar, Building, ExternalLink, Briefcase, DollarSign, FileText, AlertTriangle, Copy, Check } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  // Function to generate a slug from the job title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Remove consecutive hyphens
  };

  // Function to handle job application click
  const handleJobClick = (job) => {
    const slug = generateSlug(job.title);
    navigate(`/careers/vacancy/${job.id}/${slug}/apply`); // Navigate to the job application page
  };

  // Fetch job details on component mount
  useEffect(() => {
    if (!jobId || isNaN(jobId)) {
      setError('Invalid job ID');
      setLoading(false);
      return;
    }

    const loadJobDetails = async () => {
      try {
        const data = await fetchJobDetails(Number(jobId));
        setJob(data);
      } catch (err) {
        setError('Failed to load job details');
      } finally {
        setLoading(false);
      }
    };

    loadJobDetails();
  }, [jobId]);

  // Function to handle sharing on social media platforms
  const handleShare = (platform) => {
    const url = window.location.href;
    const title = job?.title;

    if (platform === 'copy') {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
      return;
    }

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`
    };

    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  // Error state
  if (error || !job) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 py-16 pt-24">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex justify-center mb-4">
              <AlertTriangle className="h-16 w-16 text-orange-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-3">
              {!job ? "Job Not Found" : "Something Went Wrong"}
            </h1>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              {!job 
                ? "The job you're looking for is no longer available or may have been removed. Please check the URL or browse our other open positions."
                : "We're having trouble loading this job's details. This could be due to a server error or network issue."}
            </p>
            <button
              onClick={() => navigate('/careers')}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
            >
              Back to Job Listings
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Share options for the popover, now including Copy Link
  const shareOptions = [
    { platform: 'copy', label: copied ? 'Copied!' : 'Copy Link', icon: copied ? Check : Copy },
    { platform: 'linkedin', label: 'LinkedIn' },
    { platform: 'twitter', label: 'Twitter' },
    { platform: 'facebook', label: 'Facebook' },
    { platform: 'whatsapp', label: 'WhatsApp' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Back button */}
        <button 
          onClick={() => navigate('/careers/vacancy')} 
          className="flex items-center text-blue-600 hover:text-blue-700 mb-6 transition duration-200"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Back to Jobs
        </button>

        {/* Job Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{job.title}</h1>
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{job.location}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{job.published_date ? new Date(job.published_date).toLocaleDateString() : 'Not published'}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm">Ref. {job.reference_number}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4 sm:mt-0">
              <Popover>
                <PopoverTrigger className="flex bg-white items-center gap-1 text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md transition-colors duration-200">
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">Share</span>
                </PopoverTrigger>
                <PopoverContent className="w-44 p-1.5 bg-white">
                  <div className="flex flex-col">
                    {shareOptions.map(({ platform, label, icon: Icon }) => (
                      <button
                        key={platform}
                        onClick={() => handleShare(platform)}
                        className="w-full px-3 py-2 text-sm text-gray-700 text-left hover:bg-gray-50 rounded-md transition-colors duration-150 flex items-center gap-2"
                      >
                        {Icon && <Icon className="w-4 h-4" />}
                        {label}
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
              <button
                onClick={() => handleJobClick(job)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 flex items-center gap-1 text-sm font-medium"
              >
                Apply Now
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">Description</h2>
              </div>
              <div className="text-gray-700 whitespace-pre-line prose max-w-none">
                {job.description}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">Requirements</h2>
              </div>
              <div className="text-gray-700 whitespace-pre-line prose max-w-none">
                {job.requirements}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">Salary Range</h2>
              </div>
              <p className="text-gray-700">{job.salary_range}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5 text-blue-600" />
                  About the Company
                </h3>
                <div className="text-gray-600 text-sm">
                  <p className="mb-4">
                    A.P. Moller - Maersk is an integrated container logistics company working to connect and simplify its customer's supply chains. As the global leader in shipping services, the company operates in 130 countries and employs roughly 70,000 people.
                  </p>
                  <p>
                    With simple end-to-end offering of products and digital services, seamless customer engagement and a superior end-to-end delivery network, Maersk enables its customers to trade and grow by transporting goods anywhere - all over the world.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">Ready to Apply?</h3>
                <p className="text-blue-600 mb-4 text-sm">
                  Submit your application today and take the next step in your career journey.
                </p>
                <button
                  onClick={() => handleJobClick(job)}
                  className="w-full bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 transition duration-200 flex items-center justify-center gap-2 font-medium"
                >
                  Apply for this Position
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;