import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPublishedJobs } from '../../Services/jobService';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

const JobOpeningsSection = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const jobsPerPage = 12;
  const navigate = useNavigate();

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await fetchPublishedJobs();
        
        // Sort jobs by published_date (newest first)
        const sortedJobs = data.sort((a, b) => new Date(b.published_date) - new Date(a.published_date));
        
        setJobs(sortedJobs);
        setTotalJobs(sortedJobs.length);
      } catch (err) {
        setError('Failed to load job openings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    loadJobs();
  }, []);

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Remove consecutive hyphens
  };

  const handleJobClick = (job) => {
    const slug = generateSlug(job.title);
    navigate(`/careers/vacancy/${job.id}/${slug}`); // URL: /vacancy/14/software-developer
  };

  const isNewJob = (publishedDate) => {
    const now = new Date();
    const published = new Date(publishedDate);
    const diffTime = Math.abs(now - published);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3;
  };

  // Get current jobs for pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Current Job Openings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 animate-pulse"
            >
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  const startCount = indexOfFirstJob + 1;
  const endCount = Math.min(indexOfLastJob, totalJobs);

  return (
    <div id="vacancies-section" className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Current Job Openings
      </h2>
      
      {jobs.length > 0 && (
        <div className="text-gray-600 mb-6 text-center">
          Showing {startCount}-{endCount} of {totalJobs} Job opportunities for you
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {currentJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-xl hover:shadow-xl transition-shadow duration-100 p-5 border border-gray-200 cursor-pointer relative"
            onClick={() => handleJobClick(job)}
          >
            {isNewJob(job.published_date) && (
              <div className="absolute -top-2 -right-2 bg-blue-500 text-white px-2 py-1 rounded-lg text-sm font-semibold shadow-md">
                New
              </div>
            )}
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              {job.title}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-3">
              {job.location}
            </p>
            <div className="text-sm text-gray-500">
              Published: {new Date(job.published_date).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      {jobs.length === 0 && (
        <div className="text-center text-gray-600 py-8">
          No job openings available at the moment.
        </div>
      )}
      
      {jobs.length > 0 && (
        <div className="mt-12">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={goToPrevPage} 
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {/* First page */}
              {currentPage > 2 && (
                <PaginationItem>
                  <PaginationLink onClick={() => paginate(1)}>1</PaginationLink>
                </PaginationItem>
              )}
              
              {/* Ellipsis if needed */}
              {currentPage > 3 && (
                <PaginationItem>
                  <PaginationLink className="cursor-default">...</PaginationLink>
                </PaginationItem>
              )}
              
              {/* Previous page if not on first page */}
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationLink onClick={() => paginate(currentPage - 1)}>
                    {currentPage - 1}
                  </PaginationLink>
                </PaginationItem>
              )}
              
              {/* Current page */}
              <PaginationItem>
                <PaginationLink isActive>{currentPage}</PaginationLink>
              </PaginationItem>
              
              {/* Next page if not on last page */}
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationLink onClick={() => paginate(currentPage + 1)}>
                    {currentPage + 1}
                  </PaginationLink>
                </PaginationItem>
              )}
              
              {/* Ellipsis if needed */}
              {currentPage < totalPages - 2 && (
                <PaginationItem>
                  <PaginationLink className="cursor-default">...</PaginationLink>
                </PaginationItem>
              )}
              
              {/* Last page */}
              {currentPage < totalPages - 1 && (
                <PaginationItem>
                  <PaginationLink onClick={() => paginate(totalPages)}>
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              )}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={goToNextPage} 
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default JobOpeningsSection;