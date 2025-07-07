import React from 'react';
import { MapPin, Building, Users, TrendingUp, Globe, Briefcase } from 'lucide-react';

export const LocationList = ({ locations, onLocationClick }) => {
  const getLocationIcon = (locationName) => {
    if (locationName.toLowerCase().includes('remote')) {
      return Globe;
    }
    return MapPin;
  };

  const getLocationColor = (locationName) => {
    const colors = [
      'from-purple-500 to-violet-600',
      'from-blue-500 to-cyan-600',
      'from-emerald-500 to-green-600',
      'from-orange-500 to-red-600',
      'from-pink-500 to-rose-600',
      'from-indigo-500 to-purple-600'
    ];
    const colorIndex = locationName.length % colors.length;
    return colors[colorIndex];
  };

  const getLocationDescription = (locationName) => {
    const descriptions = {
      'New York, NY': 'Financial capital with numerous insurance companies',
      'Newark, NJ': 'Major insurance hub with competitive opportunities',
      'Remote': 'Work from anywhere with flexible arrangements',
      'Chicago, IL': 'Midwest financial center with growing actuarial market',
      'Boston, MA': 'Innovation hub with leading consulting firms',
      'Hartford, CT': 'Insurance capital of America'
    };
    return descriptions[locationName] || 'Great location for actuarial professionals';
  };

  const getCostOfLiving = (locationName) => {
    const costs = {
      'New York, NY': 'High',
      'Newark, NJ': 'Medium-High',
      'Remote': 'Variable',
      'Chicago, IL': 'Medium',
      'Boston, MA': 'High',
      'Hartford, CT': 'Medium'
    };
    return costs[locationName] || 'Medium';
  };

  const getCostColor = (cost) => {
    switch (cost) {
      case 'High':
        return 'text-red-700 bg-red-50 border-red-200';
      case 'Medium-High':
        return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'Medium':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'Variable':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  if (locations.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-full blur-3xl"></div>
          <div className="relative mx-auto w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-2xl">
            <MapPin className="w-16 h-16 text-gray-400" />
          </div>
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">No locations found</h3>
        <p className="text-gray-500 text-lg">Add some jobs to see locations here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-4">
          Top Actuarial Markets
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Explore the best locations for actuarial careers, from major financial centers to remote opportunities.
        </p>
      </div>

      {/* Locations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {locations.map((location, index) => {
          const LocationIcon = getLocationIcon(location.name);
          const costOfLiving = getCostOfLiving(location.name);
          
          return (
            <div
              key={location.name}
              className="group relative cursor-pointer"
              onClick={() => onLocationClick(location.name)}
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-violet-500/10 to-blue-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden">
                <div className="p-8">
                  {/* Location Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-br ${getLocationColor(location.name)} rounded-2xl blur-lg opacity-75 animate-pulse`}></div>
                      <div className={`relative p-4 bg-gradient-to-br ${getLocationColor(location.name)} rounded-2xl shadow-xl`}>
                        <LocationIcon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    
                    {/* Job Count Badge */}
                    <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-violet-100 rounded-full border border-purple-200">
                      <Briefcase className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-bold text-purple-800">
                        {location.jobCount} {location.jobCount === 1 ? 'Job' : 'Jobs'}
                      </span>
                    </div>
                  </div>

                  {/* Location Info */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-violet-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                      {location.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {getLocationDescription(location.name)}
                    </p>
                  </div>

                  {/* Location Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                      <div className="flex items-center space-x-2 mb-1">
                        <Building className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-semibold text-blue-800">Companies</span>
                      </div>
                      <p className="text-lg font-bold text-blue-900">50+</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-100">
                      <div className="flex items-center space-x-2 mb-1">
                        <TrendingUp className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-semibold text-emerald-800">Growth</span>
                      </div>
                      <p className="text-lg font-bold text-emerald-900">12%</p>
                    </div>
                  </div>

                  {/* Cost of Living */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700">Cost of Living</span>
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getCostColor(costOfLiving)}`}>
                        {costOfLiving}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-3 text-gray-600">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">Active Job Market</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600">
                      <Building className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Major Employers</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600">
                      <TrendingUp className="w-4 h-4 text-purple-500" />
                      <span className="text-sm">Career Growth</span>
                    </div>
                  </div>

                  {/* Click to explore indicator */}
                  <div className="pt-4 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex items-center justify-center text-purple-600 text-sm font-medium">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>Click to explore jobs</span>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-purple-500/50 group-hover:to-violet-500/50 transition-all duration-500 pointer-events-none"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};