import React from 'react';
import { useParams } from 'react-router-dom';
import teamMembers from '../../data/teamMembers.json';

const TeamPost = () => {
  const { id } = useParams();
  const member = teamMembers.find(member => member.id === id);

  if (!member) {
    return <div>Member not found</div>;
  }

  return (
    <div className="min-h-screen mt-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            
            {/* Image Section */}
            <div className="relative h-[400px] lg:h-full">
              <img
                src={member.imgSrc}
                alt={member.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:hidden"></div>
              <div className="absolute bottom-0 left-0 p-6 lg:hidden">
                <h1 className="text-3xl font-bold text-white mb-2">{member.name}</h1>
                <p className="text-xl text-gray-200">{member.role}</p>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 lg:p-12">
              <div className="hidden lg:block">
                <h1 className="text-4xl font-bold text-gray-900 mb-3">{member.name}</h1>
                <p className="text-xl text-gray-600 mb-8">{member.role}</p>
              </div>

              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed">{member.desc1}</p>
                <div className="w-12 h-1 bg-blue-600 rounded"></div>
                <p className="text-gray-700 leading-relaxed">{member.desc2}</p>
              </div>

              <div className="mb-7 mt-7 flex justify-center">
                <a
                  className="bg-brand-secondary/20 rounded-full px-5 py-2 text-sm text-blue-600 dark:text-blue-500"
                  href="/about"
                >
                  ← Go Back
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPost;
