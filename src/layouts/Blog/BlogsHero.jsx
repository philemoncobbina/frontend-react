import React from 'react'

const BlogsHero = () => {
  return (
    <div className="mt-24 mb-0">
      {/* Optional Breadcrumb Navigation */}
      <div className="w-full py-3">
        <div className="container mx-auto px-6">
          <div className="text-sm text-gray-600">
            <a href="/" className="hover:text-blue-800">Home</a> &gt; <span className="text-gray-800">Blogs </span>
          </div>
        </div>
      </div>
      
      {/* Hero Section with Background Image */}
      <div 
        className="w-full py-16 overflow-hidden bg-no-repeat relative flex items-center"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/618116/pexels-photo-618116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '400px',
          filter: 'brightness(90%)',
        }}
      >
        <div className="container mx-auto px-6 flex flex-col justify-center h-full">
          <h1 className="text-4xl font-serif font-bold text-white mb-4 leading-tight">
          Find Interesting Stories and News!
          </h1>
          <p className="text-white text-lg max-w-2xl mb-6 leading-relaxed">
          From academic tips to personal stories, discover content that sparks curiosity and fosters growth. Join us on this journey of learning and exploration!
          </p>
          
          
        </div>
      </div>
    </div>
  )
}

export default BlogsHero