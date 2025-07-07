import React from 'react';
import { JobCard } from './JobCard';
import { Briefcase, Sparkles, Search, TrendingUp } from 'lucide-react';

export const JobList = ({ jobs, loading, onEdit, onDelete, onJobClick }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl animate-pulse"></div>
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8 animate-pulse">
              <div className="flex items-center justify-between mb-6">
                <div className="space-y-3 flex-1">
                  <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4"></div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl"></div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-2/3"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-1/2"></div>
              </div>
              <div className="flex space-x-2">
                <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl w-20"></div>
                <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl w-24"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
          <div className="relative mx-auto w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-2xl">
            <div className="relative">
              <Briefcase className="w-16 h-16 text-gray-400" />
              <div className="absolute -top-2 -right-2">
                <Search className="w-6 h-6 text-gray-300" />
              </div>
            </div>
          </div>
        </div>
        
        <h3 className="text-3xl font-bold text-gray-900 mb-4">No jobs found</h3>
        <p className="text-gray-500 mb-8 text-lg max-w-md mx-auto">
          Try adjusting your filters or add some jobs to get started on your actuarial career journey.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="flex items-center space-x-2 text-gray-400">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm">Discover amazing opportunities</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-400">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm">Build your actuarial career</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl">
            <Briefcase className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {jobs.length} {jobs.length === 1 ? 'Position' : 'Positions'} Found
            </h2>
            <p className="text-gray-600">Discover your next actuarial opportunity</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full border border-green-200">
          <TrendingUp className="w-4 h-4 text-green-600" />
          <span className="text-sm font-semibold text-green-800">Live Updates</span>
        </div>
      </div>

      {/* Job Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map((job, index) => (
          <div
            key={job.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <JobCard
              job={job}
              onEdit={onEdit}
              onDelete={onDelete}
              onJobClick={onJobClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
};