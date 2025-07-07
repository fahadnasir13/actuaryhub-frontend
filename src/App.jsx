import React, { useState, useEffect } from 'react';
import { Briefcase, Users, TrendingUp, MapPin, Sparkles, Star, Award, Building, Home, ArrowLeft } from 'lucide-react';
import { FilterBar } from './components/FilterBar';
import { JobList } from './components/JobList';
import { JobForm } from './components/JobForm';
import { JobDetail } from './components/JobDetail';
import { CompanyList } from './components/CompanyList';
import { LocationList } from './components/LocationList';
import { jobService } from './services/jobService';

function App() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('home'); // home, companies, locations, job-detail
  const [selectedJob, setSelectedJob] = useState(null);
  const [filters, setFilters] = useState({
    keyword: '',
    job_type: '',
    location: '',
    sort: 'posting_date_desc'
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  // Load jobs on component mount
  useEffect(() => {
    loadJobs();
  }, []);

  // Apply filters when filters or jobs change
  useEffect(() => {
    applyFilters();
  }, [filters, jobs]);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const jobsData = await jobService.getJobs();
      setJobs(jobsData);
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = async () => {
    try {
      const filtered = await jobService.getJobs(filters);
      setFilteredJobs(filtered);
    } catch (error) {
      console.error('Error filtering jobs:', error);
    }
  };

  const handleAddJob = () => {
    setEditingJob(null);
    setIsFormOpen(true);
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setIsFormOpen(true);
  };

  const handleDeleteJob = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await jobService.deleteJob(id);
        await loadJobs();
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
  };

  const handleSubmitJob = async (jobData) => {
    try {
      if (editingJob) {
        await jobService.updateJob(editingJob.id, jobData);
      } else {
        await jobService.createJob(jobData);
      }
      await loadJobs();
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setCurrentView('job-detail');
  };

  const handleCompanyFilter = (company) => {
    setFilters(prev => ({ ...prev, keyword: company }));
    setCurrentView('home');
  };

  const handleLocationFilter = (location) => {
    setFilters(prev => ({ ...prev, location: location }));
    setCurrentView('home');
  };

  const getStats = () => {
    const totalJobs = jobs.length;
    const companies = new Set(jobs.map(job => job.company)).size;
    const locations = new Set(jobs.map(job => job.location)).size;
    const recentJobs = jobs.filter(job => {
      const postingDate = new Date(job.posting_date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return postingDate >= weekAgo;
    }).length;

    return { totalJobs, companies, locations, recentJobs };
  };

  const getUniqueCompanies = () => {
    const companies = [...new Set(jobs.map(job => job.company))];
    return companies.map(company => ({
      name: company,
      jobCount: jobs.filter(job => job.company === company).length
    }));
  };

  const getUniqueLocations = () => {
    const locations = [...new Set(jobs.map(job => job.location))];
    return locations.map(location => ({
      name: location,
      jobCount: jobs.filter(job => job.location === location).length
    }));
  };

  const stats = getStats();

  const renderNavigation = () => {
    if (currentView === 'home') return null;
    
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <button
          onClick={() => setCurrentView('home')}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-300 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-semibold">Back to Home</span>
        </button>
      </div>
    );
  };

  const renderContent = () => {
    switch (currentView) {
      case 'companies':
        return (
          <CompanyList 
            companies={getUniqueCompanies()} 
            onCompanyClick={handleCompanyFilter}
          />
        );
      case 'locations':
        return (
          <LocationList 
            locations={getUniqueLocations()} 
            onLocationClick={handleLocationFilter}
          />
        );
      case 'job-detail':
        return (
          <JobDetail 
            job={selectedJob} 
            onEdit={handleEditJob}
            onDelete={handleDeleteJob}
            onBack={() => setCurrentView('home')}
          />
        );
      default:
        return (
          <>
            <FilterBar
              filters={filters}
              onFiltersChange={setFilters}
              onAddJob={handleAddJob}
            />
            <JobList
              jobs={filteredJobs}
              loading={loading}
              onEdit={handleEditJob}
              onDelete={handleDeleteJob}
              onJobClick={handleJobClick}
            />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl blur-lg opacity-75 animate-pulse"></div>
                <div className="relative p-3 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl">
                  <Briefcase className="w-10 h-10 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                  ActuaryHub
                </h1>
                <p className="text-gray-600 font-medium">Premier Actuarial Career Platform</p>
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => setCurrentView('home')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  currentView === 'home' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Home className="w-4 h-4" />
                <span className="font-medium">Jobs</span>
              </button>
              <button
                onClick={() => setCurrentView('companies')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  currentView === 'companies' 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
                }`}
              >
                <Building className="w-4 h-4" />
                <span className="font-medium">Companies</span>
              </button>
              <button
                onClick={() => setCurrentView('locations')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  currentView === 'locations' 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span className="font-medium">Locations</span>
              </button>
            </nav>

            {/* Premium Badge */}
            <div className="hidden lg:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-full border border-amber-200">
              <Star className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-semibold text-amber-800">Premium Platform</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Breadcrumb */}
      {renderNavigation()}

      {/* Stats Section - Only show on home */}
      {currentView === 'home' && (
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="group relative cursor-pointer" onClick={() => setCurrentView('home')}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl">
                    <Briefcase className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-600 mb-1">Total Jobs</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      {stats.totalJobs}
                    </p>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className="group relative cursor-pointer" onClick={() => setCurrentView('companies')}>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-green-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-4 bg-gradient-to-br from-emerald-100 to-green-200 rounded-xl">
                    <Building className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-600 mb-1">Companies</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                      {stats.companies}
                    </p>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full animate-pulse delay-200"></div>
                </div>
              </div>
            </div>

            <div className="group relative cursor-pointer" onClick={() => setCurrentView('locations')}>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-violet-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-4 bg-gradient-to-br from-purple-100 to-violet-200 rounded-xl">
                    <MapPin className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-600 mb-1">Locations</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                      {stats.locations}
                    </p>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-violet-500 rounded-full animate-pulse delay-300"></div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-4 bg-gradient-to-br from-orange-100 to-red-200 rounded-xl">
                    <TrendingUp className="w-8 h-8 text-orange-600" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-600 mb-1">This Week</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      {stats.recentJobs}
                    </p>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse delay-500"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {renderContent()}
      </main>

      {/* Job Form Modal */}
      <JobForm
        job={editingJob}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmitJob}
      />

      {/* Floating Action Button - Only show on home */}
      {currentView === 'home' && (
        <div className="fixed bottom-8 right-8 z-40">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full blur-lg opacity-75 animate-pulse"></div>
            <button
              onClick={handleAddJob}
              className="relative p-4 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group"
            >
              <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;