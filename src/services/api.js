// API service for BugBridge backend communication
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        // If not JSON, it's likely an HTML error page (404, 500, etc.)
        // Only fall back to mock data if explicitly enabled
        const useMockData = process.env.REACT_APP_USE_MOCK_DATA === 'true';
        if (useMockData && (response.status === 404 || response.status >= 500)) {
          console.warn('Backend not available, using mock data for development');
          return this.getMockData(endpoint, options);
        }
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      // Only use mock data if explicitly enabled via environment variable
      const useMockData = process.env.REACT_APP_USE_MOCK_DATA === 'true';
      if (useMockData && (error.message.includes('404') || error.message.includes('Failed to fetch') || error.message.includes('Server error'))) {
        console.warn('Backend not available, using mock data for development');
        return this.getMockData(endpoint, options);
      }
      throw error;
    }
  }

  // Mock data for development when backend is not available
  getMockData(endpoint, options = {}) {
    const mockUsers = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        username: 'johndoe'
      },
      {
        id: '2', 
        name: 'Jane Smith',
        email: 'jane@example.com',
        username: 'janesmith'
      },
      {
        id: '3',
        name: 'Test User',
        email: 'test@bugbridge.com',
        username: 'testuser'
      }
    ];

    const mockCompanies = [
      {
        id: '1',
        name: 'TechCorp Security',
        industry: 'Technology',
        description: 'Leading technology company focused on cybersecurity solutions.',
        website: 'https://techcorp.com',
        bugReportsCount: 15,
        createdAt: '2024-01-15',
        acceptingReports: true
      },
      {
        id: '2',
        name: 'FinanceFlow',
        industry: 'Finance',
        description: 'Modern financial services platform with robust security measures.',
        website: 'https://financeflow.com',
        bugReportsCount: 8,
        createdAt: '2024-02-01',
        acceptingReports: true
      },
      {
        id: '3',
        name: 'StartupXYZ',
        industry: 'Startup',
        description: 'Innovative startup building the next generation of web applications.',
        website: 'https://startupxyz.com',
        bugReportsCount: 3,
        createdAt: '2024-02-15',
        acceptingReports: true
      }
    ];

    const mockBugReports = [
      {
        id: '1',
        title: 'SQL Injection in Login Form',
        description: 'Found a SQL injection vulnerability in the login form that allows unauthorized access.',
        severity: 'high',
        status: 'pending',
        companyName: 'TechCorp Security',
        companyId: '1',
        userId: '1',
        stepsToReproduce: '1. Go to login page\n2. Enter malicious SQL in username field\n3. Observe database error',
        createdAt: '2024-01-20',
        submittedAt: '2024-01-20'
      },
      {
        id: '2',
        title: 'XSS in User Profile',
        description: 'Cross-site scripting vulnerability in user profile page.',
        severity: 'medium',
        status: 'under_review',
        companyName: 'FinanceFlow',
        companyId: '2',
        userId: '1',
        stepsToReproduce: '1. Navigate to profile page\n2. Inject script in bio field\n3. Script executes on page load',
        createdAt: '2024-01-25',
        submittedAt: '2024-01-25'
      }
    ];

    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        switch (endpoint) {
          case '/auth/login':
            if (options.method === 'POST') {
              const body = JSON.parse(options.body);
              const user = mockUsers.find(u => u.email === body.email);
              if (user) {
                resolve({
                  token: 'mock-jwt-token-' + Date.now(),
                  user: user,
                  companyProfile: null
                });
              } else {
                // Simulate invalid credentials error
                const error = new Error('Invalid credentials');
                error.status = 401;
                throw error;
              }
            }
            break;
          
          case '/auth/signup':
            if (options.method === 'POST') {
              const body = JSON.parse(options.body);
              const newUser = {
                id: Date.now().toString(),
                name: `${body.firstName} ${body.lastName}`,
                email: body.email,
                username: body.email.split('@')[0]
              };
              resolve({
                token: 'mock-jwt-token-' + Date.now(),
                user: newUser,
                companyProfile: null
              });
            }
            break;
          
          case '/auth/me':
            const token = localStorage.getItem('authToken');
            if (token && token.includes('mock-jwt-token')) {
              resolve({
                user: mockUsers[0],
                companyProfile: null
              });
            } else {
              throw new Error('Invalid token');
            }
            break;
          
          case '/companies':
            resolve(mockCompanies);
            break;
          
          case '/bug-reports':
            if (options.method === 'POST') {
              const body = JSON.parse(options.body);
              const newReport = {
                id: Date.now().toString(),
                ...body,
                status: 'pending',
                createdAt: new Date().toISOString(),
                submittedAt: new Date().toISOString()
              };
              resolve(newReport);
            } else {
              resolve(mockBugReports);
            }
            break;
          
          default:
            resolve({ message: 'Mock endpoint not implemented' });
        }
      }, 500); // Simulate network delay
    });
  }

  // Authentication endpoints
  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async signup(userData) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  // Company endpoints
  async getCompanies() {
    return this.request('/companies');
  }

  async getCompany(id) {
    return this.request(`/companies/${id}`);
  }

  async createCompany(companyData) {
    return this.request('/companies', {
      method: 'POST',
      body: JSON.stringify(companyData),
    });
  }

  // Bug report endpoints
  async getBugReports(userId = null) {
    const endpoint = userId ? `/bug-reports?userId=${userId}` : '/bug-reports';
    return this.request(endpoint);
  }

  async getBugReport(id) {
    return this.request(`/bug-reports/${id}`);
  }

  async createBugReport(reportData) {
    return this.request('/bug-reports', {
      method: 'POST',
      body: JSON.stringify(reportData),
    });
  }

  async updateBugReport(id, updateData) {
    return this.request(`/bug-reports/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  }

  // User endpoints
  async getUserProfile(userId) {
    return this.request(`/users/${userId}`);
  }

  async updateUserProfile(userId, userData) {
    return this.request(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
