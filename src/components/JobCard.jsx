import React from 'react';
import { MapPin, Calendar, Tag, Building2, Edit, Trash2, Star, Zap, Award, ExternalLink } from 'lucide-react';

export const JobCard = ({ job, onEdit, onDelete, onJobClick }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getJobTypeColor = (type) => {
    switch (type) {
      case 'Full-time':
        return 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border-emerald-200';
      case 'Part-time':
        return 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200';
      case 'Contract':
        return 'bg-gradient-to-r from-purple-100 to-violet-100 text-purple-800 border-purple-200';
      case 'Remote':
        return 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200';
    }
  };

  const isNewJob = () => {
    const postingDate = new Date(job.posting_date);
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    return postingDate >= threeDaysAgo;
  };

  const handleCardClick = (e) => {
    // Don't trigger card click if clicking on action buttons
    if (e.target.closest('.action-buttons')) {
      return;
    }
    onJobClick(job);
  };

  return (
    <div className="group relative cursor-pointer" onClick={handleCardClick}>
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-indigo-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
      
      <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden">
        {/* New Job Badge */}
        {isNewJob() && (
          <div className="absolute top-4 right-4 z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur-sm animate-pulse"></div>
              <div className="relative px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold rounded-full flex items-center space-x-1">
                <Star className="w-3 h-3" />
                <span>NEW</span>
              </div>
            </div>
          </div>
        )}

        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1 pr-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                {job.title}
              </h3>
              <div className="flex items-center text-gray-600 mb-2">
                <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl mr-3">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-semibold text-lg">{job.company}</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="action-buttons flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(job);
                }}
                className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 hover:scale-110"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(job.id);
                }}
                className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 hover:scale-110"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Location and Date */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center text-gray-600">
              <div className="p-2 bg-gradient-to-br from-purple-100 to-violet-100 rounded-lg mr-3">
                <MapPin className="w-4 h-4 text-purple-600" />
              </div>
              <span className="font-medium">{job.location}</span>
            </div>

            <div className="flex items-center text-gray-500">
              <div className="p-2 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg mr-3">
                <Calendar className="w-4 h-4 text-emerald-600" />
              </div>
              <span>Posted {formatDate(job.posting_date)}</span>
            </div>
          </div>

          {/* Job Type and Salary */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <span className={`px-4 py-2 rounded-xl text-sm font-semibold border shadow-sm ${getJobTypeColor(job.job_type)}`}>
                {job.job_type}
              </span>
              {job.salary && (
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-bold text-green-700 bg-green-50 px-3 py-1 rounded-lg">
                    {job.salary}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          {job.tags && job.tags.length > 0 && (
            <div className="pt-6 border-t border-gray-100">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-lg mr-3">
                  <Tag className="w-4 h-4 text-amber-600" />
                </div>
                <span className="text-sm font-semibold text-gray-700">Skills & Technologies</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {job.tags.slice(0, 4).map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-lg text-sm font-medium border border-gray-200 hover:shadow-md transition-all duration-300 hover:scale-105"
                  >
                    {tag}
                  </span>
                ))}
                {job.tags.length > 4 && (
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-200 flex items-center space-x-1">
                    <Zap className="w-3 h-3" />
                    <span>+{job.tags.length - 4} more</span>
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Click to view indicator */}
          <div className="mt-6 pt-4 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="flex items-center justify-center text-blue-600 text-sm font-medium">
              <ExternalLink className="w-4 h-4 mr-2" />
              <span>Click to view details</span>
            </div>
          </div>
        </div>

        {/* Hover Effect Border */}
        <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-blue-500/50 group-hover:to-indigo-500/50 transition-all duration-500 pointer-events-none"></div>
      </div>
    </div>
  );
};