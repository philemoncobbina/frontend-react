import React, { useEffect, useState } from 'react';
import BlogCard from '../Home/BlogCard';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { blogService } from '../../Services/BlogService';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const blogsPerPage = 9;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await blogService.getPublishedPosts({
          page: currentPage,
          page_size: blogsPerPage,
        });
        
        // Ensure response data is valid
        if (response && response.results) {
          setBlogs(response.results || []);
          setTotalBlogs(response.count || 0);
        } else {
          setBlogs([]);
          setTotalBlogs(0);
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load blog posts. Please try again later.');
        setBlogs([]);
        setTotalBlogs(0);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [currentPage]);

  // Use safe default values and ensure blogs is always an array
  const blogsArray = Array.isArray(blogs) ? blogs : [];
  
  // Calculate pagination indices for display count
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  
  // Split current blogs into first two (larger display) and remaining (smaller display)
  const firstTwoBlogs = blogsArray.slice(0, 2);
  const remainingBlogs = blogsArray.slice(2);
  
  const totalPages = Math.ceil(totalBlogs / blogsPerPage);

  // Calculate display counts (same as old version)
  const startCount = indexOfFirstBlog + 1;
  const endCount = Math.min(indexOfLastBlog, totalBlogs);

  // Change page functions
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Helper function to prepare blog props for BlogCard
  const prepareBlogProps = (blog) => {
    // Ensure blog object has all required properties
    if (!blog) return null;
    
    // Generate the blog URL using slug instead of ID
    const blogUrl = blog.slug ? `/blog/${blog.slug}/` : '#';
    
    // Generate excerpt from the first text block
    const getExcerpt = () => {
      if (blog.text_blocks && blog.text_blocks.length > 0) {
        const firstBlock = blog.text_blocks[0]?.content || '';
        // Remove HTML tags if any and trim to 150 characters
        const text = firstBlock.replace(/<[^>]*>/g, '');
        const maxLength = 150;
        
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
      }
      return blog.excerpt || '';
    };
    
    return {
      // Use slug for URL generation
      id: blog.slug || blog.id || '', // Keep id as fallback, but slug is preferred
      slug: blog.slug || '',
      url: blogUrl, // Add URL property for navigation
      image: blog.image ? blogService.getImageUrl(blog.image) : '',
      categories: Array.isArray(blog.categories) 
        ? blog.categories.map(cat => cat?.name || '').filter(Boolean)
        : [],
      title: blog.title || 'Untitled',
      author: blog.author?.name || 'Unknown Author',
      authorImage: blog.author?.profile_image 
        ? blogService.getAuthorImageUrl(blog.author.profile_image)
        : '',
      date: blog.published_date || blog.created_at || '',
      excerpt: getExcerpt(), // Use local helper function instead of removed service method
    };
  };

  // Render loading state
  if (loading) {
    return (
      <div style={{ marginTop: '5rem' }} className="mx-auto max-w-screen-lg px-4">
        <div className="text-center text-gray-600 py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div style={{ marginTop: '5rem' }} className="mx-auto max-w-screen-lg px-4">
        <div className="text-center text-red-600 py-12">
          <p>{error}</p>
          <button 
            onClick={() => {
              setCurrentPage(1);
              setError(null);
            }} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '5rem' }} className="mx-auto max-w-screen-lg px-4">
      {/* Results count - same as old version */}
      {blogsArray.length > 0 && totalBlogs > 0 && (
        <div className="text-gray-600 mb-6 text-center">
          Showing {startCount}-{endCount} of {totalBlogs} Blog posts
        </div>
      )}

      {/* First two blogs (larger display) - same as old version */}
      <div className="flex flex-wrap -mx-2">
        {firstTwoBlogs.map(blog => {
          const blogProps = prepareBlogProps(blog);
          return blogProps ? (
            <div key={blog.slug || blog.id || `blog-${Math.random()}`} className="w-full md:w-1/2 px-2 mb-4">
              <BlogCard {...blogProps} />
            </div>
          ) : null;
        })}
      </div>

      {/* Remaining blogs (smaller display) - same as old version */}
      <div className="flex flex-wrap -mx-2">
        {remainingBlogs.map(blog => {
          const blogProps = prepareBlogProps(blog);
          return blogProps ? (
            <div key={blog.slug || blog.id || `blog-${Math.random()}`} className="w-full md:w-1/3 px-2 mb-4">
              <BlogCard {...blogProps} />
            </div>
          ) : null;
        })}
      </div>

      {/* No blogs message - same as old version */}
      {blogsArray.length === 0 && !loading && (
        <div className="text-center text-gray-600 py-8">
          No blog posts available at the moment.
        </div>
      )}

      {/* Pagination - EXACT SAME UI as old version */}
      {blogsArray.length > 0 && totalPages > 1 && (
        <div className="mt-12 mb-8">
          <Pagination>
            <PaginationContent>
              {/* Previous button */}
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
              
              {/* Next button */}
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