import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogService } from '../../Services/BlogService';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setError('No slug provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const foundPost = await blogService.getPostBySlug(slug);

        if (foundPost) {
          setPost(foundPost);
        } else {
          setError('Blog post not found');
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to load blog post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // Alternating color schemes - green and yellow
  const colorSchemes = [
    'bg-green-100 text-green-800 border border-green-200',
    'bg-yellow-100 text-yellow-800 border border-yellow-200'
  ];

  const getCategoryClass = (index) => {
    // Alternate between green (index 0) and yellow (index 1)
    return colorSchemes[index % 2];
  };

  if (loading) {
    return (
      <div style={{ marginTop: '5rem' }} className="container px-8 mx-auto xl:px-5 max-w-screen-lg py-5 lg:py-8 !pt-0">
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-gray-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div style={{ marginTop: '5rem' }} className="container px-8 mx-auto xl:px-5 max-w-screen-lg py-5 lg:py-8 !pt-0">
        <div className="text-center text-red-600 py-12">
          <p className="text-lg font-medium">{error || 'Blog post not found'}</p>
          <a
            href="/blog"
            className="inline-block mt-4 px-4 py-2 text-sm text-blue-600"
          >
            ← View all posts
          </a>
        </div>
      </div>
    );
  }

  // Process text blocks
  const textBlocks = post.text_blocks || [];
  const content = textBlocks
    .sort((a, b) => a.order - b.order)
    .map(block => block.content)
    .join('\n\n');

  // Split content into paragraphs
  const paragraphs = content.split('\n\n').filter(p => p.trim());
  const blogText1 = paragraphs[0] || '';
  const blogText2 = paragraphs[1] || '';
  const remainingParagraphs = paragraphs.slice(2);

  // Get categories
  const categories = post.categories ? post.categories.map(cat => cat.name) : [];

  return (
    <div style={{ marginTop: '7rem' }} className="container  px-8 mx-auto xl:px-5 max-w-screen-lg py-5 lg:py-8 !pt-0">
      <div className="mx-auto  max-w-screen-md">
        <div className="flex  justify-center">
          <div className="flex gap-2 flex-wrap justify-center">
            {categories.map((category, index) => (
              <span
                key={`${category}-${index}`}
                className={`inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase rounded-full ${getCategoryClass(index)}`}
              >
                {category}
              </span>
            ))}
          </div>
        </div>
        <h1 className="text-brand-primary title mb-3 mt-2 text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
          {post.title}
        </h1>
        <div className="mt-3 flex justify-center space-x-3 text-gray-500">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 flex-shrink-0">
              <div className="rounded-full overflow-hidden">
                <img
                  alt={post.author ? post.author.name : 'Author'}
                  loading="lazy"
                  decoding="async"
                  className="rounded-full object-cover authorImage"
                  sizes="40px"
                  src={post.author && post.author.profile_image ? blogService.getAuthorImageUrl(post.author.profile_image) : 'https://ui-avatars.com/api/?name=Author&background=random'}
                  onError={(e) => {
                    e.currentTarget.src = 'https://ui-avatars.com/api/?name=' +
                      encodeURIComponent(post.author ? post.author.name : 'Author') + '&background=random';
                  }}
                  style={{ height: '100%', width: '100%', color: 'transparent' }}
                />
              </div>
            </div>
            <div>
              <p className="text-gray-800 author dark:text-gray-400">
                {post.author ? post.author.name : 'Unknown Author'}
              </p>
              <div className="flex items-center space-x-2 text-sm">
                <time className="text-gray-500 date dark:text-gray-400" dateTime={post.published_date || post.created_at}>
                  {blogService.formatDate(post.published_date || post.created_at)}
                </time>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-0 mt-5 mx-auto aspect-video max-w-screen-lg overflow-hidden lg:rounded-lg">
        <img
          alt="Thumbnail"
          loading="eager"
          decoding="async"
          className="object-cover image"
          sizes="100vw"
          src={post.image ? blogService.getImageUrl(post.image) : 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
          }}
          style={{ position: 'absolute', height: '100%', width: '100%', inset: '0px', color: 'transparent' }}
        />
      </div>
      <div style={{ width: '90%' }} className="prose mx-auto mt-10 dark:prose-invert prose-a:text-blue-600">
        {blogText1 && (
          <p className="mb-4">{blogText1}</p>
        )}
        {blogText2 && (
          <p>{blogText2}</p>
        )}
        {remainingParagraphs.map((paragraph, index) => (
          <p key={index} className={index === 0 ? 'mt-4' : 'mt-4'}>{paragraph}</p>
        ))}
      </div>

      <div className="mb-7 mt-7 flex justify-center">
        <Link
          to="/blog"
          className="bg-brand-secondary/20 rounded-full px-5 py-2 text-sm text-blue-600 dark:text-blue-500"
        >
          ← View all posts
        </Link>
      </div>

      {post.author && (
        <div style={{ width: '90%' }} className="mt-3 rounded-2xl bg-gray-50 px-8 py-8 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
          <div className="flex flex-wrap items-start sm:flex-nowrap sm:space-x-6">
            <div className="relative mt-1 h-24 w-24 flex-shrink-0">
              <img
                alt={post.author.name}
                loading="lazy"
                decoding="async"
                className="rounded-full object-cover"
                style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, color: 'transparent' }}
                sizes="96px"
                src={post.author.profile_image ? blogService.getAuthorImageUrl(post.author.profile_image) : 'https://ui-avatars.com/api/?name=' + encodeURIComponent(post.author.name) + '&background=random'}
                onError={(e) => {
                  e.currentTarget.src = 'https://ui-avatars.com/api/?name=' +
                    encodeURIComponent(post.author.name) + '&background=random';
                }}
              />
            </div>
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-300">
                  About <span>{post.author.name}</span>
                </h3>
              </div>
              <div>
                <p>{post.author.bio || 'No biography available.'}</p>
              </div>
              <div className="mt-3">
                <Link
                  to={`/author/${post.author.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-brand-secondary/20 rounded-full px-5 py-2 text-sm text-blue-600 dark:text-blue-500"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPost;