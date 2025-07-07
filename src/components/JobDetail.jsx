import React from 'react';
import { 
  MapPin, Calendar, Tag, Building2, Edit, Trash2, Star, Award, 
  ExternalLink, ArrowLeft, Clock, DollarSign, Users, Briefcase,
  CheckCircle, Globe, Mail, Phone
} from 'lucide-react';

export const JobDetail = ({ job, onEdit, onDelete, onBack }) => {
  if (!job) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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

  const handleApplyClick = () => {
    // In a real application, this would redirect to the original job posting
    // For now, we'll show an alert
    alert(`This would redirect to the original job posting for ${job.title} at ${job.company}`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-indigo-500/10 rounded-3xl blur-xl"></div>
        
        <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* New Job Badge */}
          {isNewJob() && (
            <div className="absolute top-6 right-6 z-10">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur-sm animate-pulse"></div>
                <div className="relative px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-bold rounded-full flex items-center space-x-2">
                  <Star className="w-4 h-4" />
                  <span>NEW POSTING</span>
                </div>
              </div>
            </div>
          )}

          <div className="p-8">
            {/* Back Button */}
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-300 mb-6 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="font-semibold">Back to Jobs</span>
            </button>

            {/* Job Title and Company */}
            <div className="flex justify-between items-start mb-8">
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {job.title}
                </h1>
                <div className="flex items-center text-gray-700 mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl mr-4">
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold">{job.company}</h2>
                    <p className="text-gray-500">Leading Insurance Company</p>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => onEdit(job)}
                  className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 hover:scale-110"
                >
                  <Edit className="w-6 h-6" />
                </button>
                <button
                  onClick={() => onDelete(job.id)}
                  className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 hover:scale-110"
                >
                  <Trash2 className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Job Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 border border-purple-100">
                <div className="flex items-center space-x-3 mb-2">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-semibold text-purple-800">Location</span>
                </div>
                <p className="text-lg font-bold text-purple-900">{job.location}</p>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-100">
                <div className="flex items-center space-x-3 mb-2">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-semibold text-emerald-800">Posted</span>
                </div>
                <p className="text-lg font-bold text-emerald-900">{formatDate(job.posting_date)}</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center space-x-3 mb-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-800">Type</span>
                </div>
                <span className={`inline-block px-3 py-1 rounded-lg text-sm font-bold ${getJobTypeColor(job.job_type)}`}>
                  {job.job_type}
                </span>
              </div>

              {job.salary && (
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-100">
                  <div className="flex items-center space-x-3 mb-2">
                    <DollarSign className="w-5 h-5 text-amber-600" />
                    <span className="text-sm font-semibold text-amber-800">Salary</span>
                  </div>
                  <p className="text-lg font-bold text-amber-900">{job.salary}</p>
                </div>
              )}
            </div>

            {/* Job Description */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-3">
                <Briefcase className="w-6 h-6 text-blue-600" />
                <span>Job Description</span>
              </h3>
              <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-6 border border-gray-200">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {job.description || `Join ${job.company} as a ${job.title} and be part of a dynamic team that's shaping the future of actuarial science. This role offers excellent opportunities for professional growth and development in a collaborative environment.`}
                </p>
              </div>
            </div>

            {/* Skills & Technologies */}
            {job.tags && job.tags.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-3">
                  <Tag className="w-6 h-6 text-purple-600" />
                  <span>Required Skills & Technologies</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {job.tags.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-800 rounded-xl border border-blue-200 hover:shadow-md transition-all duration-300 hover:scale-105"
                    >
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Company Information */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-3">
                <Building2 className="w-6 h-6 text-emerald-600" />
                <span>About {job.company}</span>
              </h3>
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200">
                <p className="text-gray-700 leading-relaxed mb-4">
                  {job.company} is a leading insurance company committed to providing innovative actuarial solutions. 
                  We offer a collaborative work environment where professionals can grow their careers while making 
                  a meaningful impact in the insurance industry.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2 text-emerald-700">
                    <Users className="w-4 h-4" />
                    <span className="text-sm font-medium">1000+ Employees</span>
                  </div>
                  <div className="flex items-center space-x-2 text-emerald-700">
                    <Globe className="w-4 h-4" />
                    <span className="text-sm font-medium">Global Presence</span>
                  </div>
                  <div className="flex items-center space-x-2 text-emerald-700">
                    <Award className="w-4 h-4" />
                    <span className="text-sm font-medium">Industry Leader</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Section */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Ready to Apply?</h3>
                  <p className="text-blue-100 mb-4">
                    Take the next step in your actuarial career with {job.company}
                  </p>
                  <div className="flex items-center space-x-4 text-blue-200">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">careers@{job.company.toLowerCase().replace(/\s+/g, '')}.com</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">+1 (555) 123-4567</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleApplyClick}
                  className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-bold hover:bg-blue-50 transition-all duration-300 flex items-center space-x-3 hover:scale-105 shadow-xl"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>Apply Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};