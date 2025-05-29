import React, { useEffect, useState } from 'react';
import blogData from '../../data/blogData.json';
import BlogCard from '../Home/BlogCard';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const blogsPerPage = 9; // Show 9 blogs per page (2 large + 7 smaller cards)

  useEffect(() => {
    setBlogs(blogData);
    setTotalBlogs(blogData.length);
  }, []);

  // Get current blogs for pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  
  // Split current blogs into first two (larger display) and remaining (smaller display)
  const firstTwoBlogs = currentBlogs.slice(0, 2);
  const remainingBlogs = currentBlogs.slice(2);
  
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  const startCount = indexOfFirstBlog + 1;
  const endCount = Math.min(indexOfLastBlog, totalBlogs);

  return (
    <div style={{ marginTop: '5rem' }} className="mx-auto max-w-screen-lg px-4">
      {blogs.length > 0 && (
        <div className="text-gray-600 mb-6 text-center">
          Showing {startCount}-{endCount} of {totalBlogs} Blog posts
        </div>
      )}

      {/* First two blogs (larger display) */}
      <div className="flex flex-wrap -mx-2">
        {firstTwoBlogs.map(blog => (
          <div key={blog.id} className="w-full md:w-1/2 px-2 mb-4">
            <BlogCard {...blog} />
          </div>
        ))}
      </div>

      {/* Remaining blogs (smaller display) */}
      <div className="flex flex-wrap -mx-2">
        {remainingBlogs.map(blog => (
          <div key={blog.id} className="w-full md:w-1/3 px-2 mb-4">
            <BlogCard {...blog} />
          </div>
        ))}
      </div>

      {/* No blogs message */}
      {blogs.length === 0 && (
        <div className="text-center text-gray-600 py-8">
          No blog posts available at the moment.
        </div>
      )}

      {/* Pagination */}
      {blogs.length > 0 && (
        <div className="mt-12 mb-8">
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

export default Blogs;