import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/Templates/Navbar';
import Footer from '@/Templates/Footer';
import Blogs from '@/layouts/Blog/Blogs';
import BlogsHero from '@/layouts/Blog/BlogsHero';

const BlogPage = () => {
  return (
    <div>
      <Helmet>
        <title>Blog</title>
        <meta name="description" content="Stay updated with the latest news and articles on Ridoana's blog." />
      </Helmet>
      <Navbar />
      <BlogsHero />
      <Blogs />
      <Footer />
    </div>
  );
};

export default BlogPage;
