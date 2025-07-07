import React from 'react';
import { Building2, Users, MapPin, Briefcase, TrendingUp, Star } from 'lucide-react';

export const CompanyList = ({ companies, onCompanyClick }) => {
  const getCompanyLogo = (companyName) => {
    // In a real app, you'd have actual company logos
    const colors = [
      'from-blue-500 to-indigo-600',
      'from-emerald-500 to-green-600',
      'from-purple-500 to-violet-600',
      'from-orange-500 to-red-600',
      'from-cyan-500 to-blue-600',
      'from-pink-500 to-rose-600'
    ];
    const colorIndex = companyName.length % colors.length;
    return colors[colorIndex];
  };

  const getCompanyDescription = (companyName) => {
    const descriptions = {
      'MetLife': 'Leading life insurance and employee benefits company',
      'Prudential': 'Global financial services leader',
      'Milliman': 'Premier actuarial consulting firm',
      'Aon': 'Global professional services firm',
      'Willis Towers Watson': 'Leading advisory and solutions company',
      'Liberty Mutual': 'Diversified global insurer'
    };
    return descriptions[companyName] || 'Leading insurance and financial services company';
  };

  if (companies.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-full blur-3xl"></div>
          <div className="relative mx-auto w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-2xl">
            <Building2 className="w-16 h-16 text-gray-400" />
          </div>
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">No companies found</h3>
        <p className="text-gray-500 text-lg">Add some jobs to see companies here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-4">
          Top Actuarial Employers
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover leading companies in the actuarial field and explore career opportunities with industry leaders.
        </p>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {companies.map((company, index) => (
          <div
            key={company.name}
            className="group relative cursor-pointer"
            onClick={() => onCompanyClick(company.name)}
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-green-500/10 to-blue-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden">
              <div className="p-8">
                {/* Company Logo */}
                <div className="flex items-center justify-between mb-6">
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${getCompanyLogo(company.name)} rounded-2xl blur-lg opacity-75 animate-pulse`}></div>
                    <div className={`relative p-4 bg-gradient-to-br ${getCompanyLogo(company.name)} rounded-2xl shadow-xl`}>
                      <Building2 className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Job Count Badge */}
                  <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full border border-emerald-200">
                    <Briefcase className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-bold text-emerald-800">
                      {company.jobCount} {company.jobCount === 1 ? 'Job' : 'Jobs'}
                    </span>
                  </div>
                </div>

                {/* Company Info */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-green-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                    {company.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {getCompanyDescription(company.name)}
                  </p>
                </div>

                {/* Company Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center space-x-2 mb-1">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-semibold text-blue-800">Team Size</span>
                    </div>
                    <p className="text-lg font-bold text-blue-900">1000+</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-100">
                    <div className="flex items-center space-x-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                      <span className="text-xs font-semibold text-purple-800">Growth</span>
                    </div>
                    <p className="text-lg font-bold text-purple-900">15%</p>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">Industry Leader</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <MapPin className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Multiple Locations</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Great Benefits</span>
                  </div>
                </div>

                {/* Click to explore indicator */}
                <div className="pt-4 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="flex items-center justify-center text-emerald-600 text-sm font-medium">
                    <Building2 className="w-4 h-4 mr-2" />
                    <span>Click to explore jobs</span>
                  </div>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-emerald-500/50 group-hover:to-green-500/50 transition-all duration-500 pointer-events-none"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};