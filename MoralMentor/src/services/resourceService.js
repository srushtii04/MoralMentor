// src/services/resourceService.js
import axios from 'axios';

const API_URL = '/api/resources';

const resourceService = {
  // Get all resources with optional filter params
  getAllResources: async (params = {}) => {
    try {
      const response = await axios.get(API_URL, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching resources:', error);
      throw error;
    }
  },

  // Get a single resource by ID
  getResourceById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching resource with ID ${id}:`, error);
      throw error;
    }
  },

  // Add a new resource
  addResource: async (resourceData) => {
    try {
      const response = await axios.post(API_URL, resourceData);
      return response.data;
    } catch (error) {
      console.error('Error adding resource:', error);
      throw error;
    }
  },

  // Delete a resource by ID
  deleteResource: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting resource with ID ${id}:`, error);
      throw error;
    }
  }
};

export default resourceService;