import axios from 'axios';

// Get dashboard data
export const getDashboardData = async () => {
  try {
    const token = localStorage.getItem('token');
    const headers = token ? { 'x-auth-token': token } : {};
    
    const response = await axios.get('/api/dashboard', { 
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};


