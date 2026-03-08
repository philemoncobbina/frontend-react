import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import { blogService } from '../../Services/BlogService';

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await blogService.getPublishedPosts({
          page_size: 6 // Fetch 6 posts to maintain 2 per row on mobile, 3 per row on desktop
        });
        setBlogs(response.results || []);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load blogs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className="w-full mt-9 max-w-screen-xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="mb-2 text-lg font-semibold text-indigo-600">From Our Students</h3>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl md:text-40 md:leading-1.2">Student Blogs</h2>
          <p className="text-base text-gray-700 dark:text-gray-400">
            Discover the latest insights, experiences, and stories from our students through their blogs.
          </p>
        </div>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="w-full mt-9 max-w-screen-xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="mb-2 text-lg font-semibold text-indigo-600">From Our Students</h3>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl md:text-40 md:leading-1.2">Student Blogs</h2>
          <p className="text-base text-gray-700 dark:text-gray-400">
            Discover the latest insights, experiences, and stories from our students through their blogs.
          </p>
        </div>
        <div className="text-center py-12">
          <p className="text-red-500 dark:text-red-400">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mt-9 max-w-screen-xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="mb-2 text-lg font-semibold text-indigo-600">From Our Students</h3>
        <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl md:text-40 md:leading-1.2">Student Blogs</h2>
        <p className="text-base text-gray-700 dark:text-gray-400">
          Discover the latest insights, experiences, and stories from our students through their blogs.
        </p>
      </div>

      <div className="flex flex-wrap mx-auto">
        {blogs.length > 0 ? (
          blogs.map(blog => (
            <div key={blog.id} className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
              <BlogCard 
                id={blog.slug}
                slug={blog.slug}
                image={blogService.getImageUrl(blog.image)}
                categories={blog.categories.map(cat => cat.name)}
                title={blog.title}
                excerpt={blog.excerpt}
                author={blog.author.name}
                authorImage={blogService.getAuthorImageUrl(blog.author.profile_image)}
                date={blog.published_date || blog.created_at}
              />
            </div>
          ))
        ) : (
          <div className="w-full text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No blog posts available.</p>
          </div>
        )}
      </div>

      <div className="mt-10 flex justify-center">
        <a
          className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
          href="/blog"
        >
          <span>View all Posts</span>
        </a>
      </div>
    </div>
  );
};

export default BlogSection;