// Use environment variable for API URL, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// API service for job operations
export const jobService = {
  /**
   * Get all jobs with optional filters
   * @param {Object} filters - Filter parameters
   * @returns {Promise<Array>} Array of jobs
   */
  async getJobs(filters = {}) {
    try {
      const params = new URLSearchParams();
      
      if (filters.keyword) params.append('keyword', filters.keyword);
      if (filters.job_type) params.append('job_type', filters.job_type);
      if (filters.location) params.append('location', filters.location);
      if (filters.sort) params.append('sort', filters.sort);
      
      const url = `${API_BASE_URL}/jobs${params.toString() ? '?' + params.toString() : ''}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching jobs:', error);
      // Fallback to mock data if API is not available
      return this.getMockJobs(filters);
    }
  },

  /**
   * Get a single job by ID
   * @param {number} id - Job ID
   * @returns {Promise<Object|null>} Job object or null
   */
  async getJob(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching job:', error);
      return null;
    }
  },

  /**
   * Create a new job
   * @param {Object} jobData - Job data
   * @returns {Promise<Object>} Created job
   */
  async createJob(jobData) {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating job:', error);
      throw error;
    }
  },

  /**
   * Update an existing job
   * @param {number} id - Job ID
   * @param {Object} updates - Job updates
   * @returns {Promise<Object>} Updated job
   */
  async updateJob(id, updates) {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating job:', error);
      throw error;
    }
  },

  /**
   * Delete a job
   * @param {number} id - Job ID
   * @returns {Promise<boolean>} Success status
   */
  async deleteJob(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || `HTTP error! status: ${response.status}`);
      }
      
      return true;
    } catch (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  },

  /**
   * Check API health
   * @returns {Promise<Object>} Health status
   */
  async checkHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return await response.json();
    } catch (error) {
      console.error('API health check failed:', error);
      return { status: 'unhealthy', error: error.message };
    }
  },

  /**
   * Fallback mock data when API is unavailable
   */
  getMockJobs(filters = {}) {
    const mockJobs = [
      {
        id: 1,
        title: 'Senior Life Insurance Actuary',
        company: 'MetLife',
        location: 'New York, NY',
        posting_date: '2024-01-15T00:00:00Z',
        job_type: 'Full-time',
        tags: ['Life Insurance', 'Pricing', 'Reserving', 'Excel', 'SQL'],
        description: 'Join our dynamic Life Insurance team as a Senior Actuary. Lead pricing initiatives, develop innovative products, and mentor junior staff in a collaborative environment.',
        salary: '$120,000 - $150,000'
      },
      {
        id: 2,
        title: 'P&C Actuarial Analyst',
        company: 'Prudential',
        location: 'Newark, NJ',
        posting_date: '2024-01-14T00:00:00Z',
        job_type: 'Full-time',
        tags: ['Property & Casualty', 'Modeling', 'R', 'Python', 'Statistics'],
        description: 'Exciting opportunity for an analytical professional to join our Property & Casualty team. Work on cutting-edge modeling projects and risk assessment.',
        salary: '$75,000 - $95,000'
      },
      {
        id: 3,
        title: 'Healthcare Consulting Actuary',
        company: 'Milliman',
        location: 'Remote',
        posting_date: '2024-01-13T00:00:00Z',
        job_type: 'Remote',
        tags: ['Consulting', 'Healthcare', 'Medicare', 'Medicaid', 'Valuation'],
        description: 'Remote consulting opportunity for experienced healthcare actuary. Work with diverse clients on Medicare, Medicaid, and commercial health insurance projects.',
        salary: '$140,000 - $180,000'
      },
      {
        id: 4,
        title: 'Entry Level Actuary - Training Program',
        company: 'Aon',
        location: 'Chicago, IL',
        posting_date: '2024-01-12T00:00:00Z',
        job_type: 'Full-time',
        tags: ['Entry Level', 'Reinsurance', 'Excel', 'VBA', 'Training Program'],
        description: 'Comprehensive training program for new graduates. Excellent opportunity to start your actuarial career with industry-leading mentorship and development.',
        salary: '$65,000 - $80,000'
      },
      {
        id: 5,
        title: 'Part-time Retirement Consultant',
        company: 'Willis Towers Watson',
        location: 'Boston, MA',
        posting_date: '2024-01-11T00:00:00Z',
        job_type: 'Part-time',
        tags: ['Consulting', 'Retirement', 'Pension', 'Benefits', 'Flexible'],
        description: 'Flexible part-time consulting role perfect for experienced professionals seeking work-life balance. Focus on retirement and pension plan consulting.',
        salary: '$80 - $120/hour'
      },
      {
        id: 6,
        title: 'Contract Pricing Actuary',
        company: 'Liberty Mutual',
        location: 'Boston, MA',
        posting_date: '2024-01-10T00:00:00Z',
        job_type: 'Contract',
        tags: ['Pricing', 'Auto Insurance', 'GLM', 'SAS', 'Contract'],
        description: '6-month contract opportunity for auto insurance pricing project. Work with advanced statistical models and contribute to rate filing initiatives.',
        salary: '$110,000 - $130,000'
      },
      {
        id: 7,
        title: 'Chief Actuary',
        company: 'Travelers',
        location: 'Hartford, CT',
        posting_date: '2024-01-09T00:00:00Z',
        job_type: 'Full-time',
        tags: ['Leadership', 'Strategy', 'Risk Management', 'Executive', 'FSA'],
        description: 'Senior executive role leading actuarial function. Drive strategic initiatives, manage regulatory compliance, and lead a team of actuarial professionals.',
        salary: '$200,000 - $300,000'
      },
      {
        id: 8,
        title: 'Catastrophe Risk Modeler',
        company: 'RMS',
        location: 'Newark, CA',
        posting_date: '2024-01-08T00:00:00Z',
        job_type: 'Full-time',
        tags: ['Catastrophe Modeling', 'Risk Assessment', 'Python', 'Machine Learning', 'Climate'],
        description: 'Innovative role developing catastrophe risk models. Work on climate change impact assessment and natural disaster risk quantification.',
        salary: '$95,000 - $125,000'
      }
    ];

    // Apply filters to mock data
    let filteredJobs = [...mockJobs];

    if (filters.job_type) {
      filteredJobs = filteredJobs.filter(job => job.job_type === filters.job_type);
    }

    if (filters.location) {
      filteredJobs = filteredJobs.filter(job => 
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(keyword) ||
        job.company.toLowerCase().includes(keyword) ||
        job.tags.some(tag => tag.toLowerCase().includes(keyword))
      );
    }

    // Apply sorting
    if (filters.sort) {
      filteredJobs.sort((a, b) => {
        switch (filters.sort) {
          case 'posting_date_desc':
            return new Date(b.posting_date) - new Date(a.posting_date);
          case 'posting_date_asc':
            return new Date(a.posting_date) - new Date(b.posting_date);
          case 'title_asc':
            return a.title.localeCompare(b.title);
          case 'title_desc':
            return b.title.localeCompare(a.title);
          default:
            return 0;
        }
      });
    }

    return Promise.resolve(filteredJobs);
  }
};