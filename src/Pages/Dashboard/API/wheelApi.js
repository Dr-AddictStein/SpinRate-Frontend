import axios from 'axios';

// Base API URL from environment or default
const API_URL = 'http://localhost:4000/api';

const wheelApi = {
  // Upload a file (using the existing file upload route)
  uploadFile: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file); // Make sure this matches 'file' in multer.single('file')
      
      const response = await axios.post(`${API_URL}/file/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error) {
      console.error('Error uploading file:', error.response?.data || error.message);
      throw error.response?.data || { error: error.message };
    }
  },
  
  // Get all wheels
  getAllWheels: async () => {
    try {
      const response = await axios.get(`${API_URL}/wheel/getAllWheel`);
      return response.data;
    } catch (error) {
      console.error('Error getting all wheels:', error);
      throw error.response?.data || error;
    }
  },
  
  // Get wheel by ID
  getWheelById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/wheel/getSingleWheel/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error getting wheel by ID:', error);
      throw error.response?.data || error;
    }
  },
  
  // Get wheels by user ID
  getWheelsByUserId: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/wheel/getSingleWheelByUserId/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting wheels by user ID:', error);
      throw error.response?.data || error;
    }
  },
  
  // Create a new wheel
  createWheel: async (wheelData, logoFile = null) => {
    try {
      // First, upload the logo file if provided
      let logoUrl = '';
      if (logoFile) {
        const fileUploadResponse = await this.uploadFile(logoFile);
        logoUrl = fileUploadResponse.filePath;
      }
      
      // Then create the wheel with the logo URL
      const response = await axios.post(`${API_URL}/wheel/create`, {
        ...wheelData,
        logoUrl,
      });
      
      return response.data;
    } catch (error) {
      console.error('Error creating wheel:', error);
      throw error.response?.data || error;
    }
  },
  
  // Update a wheel
  updateWheel: async (id, wheelData, logoFile = null) => {
    try {
      // Upload new logo if provided
      if (logoFile) {
        const fileUploadResponse = await this.uploadFile(logoFile);
        wheelData.logoUrl = fileUploadResponse.filePath;
      }
      
      // Update the wheel
      const response = await axios.put(`${API_URL}/wheel/update/${id}`, wheelData);
      return response.data;
    } catch (error) {
      console.error('Error updating wheel:', error);
      throw error.response?.data || error;
    }
  },
  
  // Delete a wheel
  deleteWheel: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/wheel/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting wheel:', error);
      throw error.response?.data || error;
    }
  },
  
  // Generate game URL
  generateGameUrl: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/wheel/generateGameUrl/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error generating game URL:', error);
      throw error.response?.data || error;
    }
  }
};

export default wheelApi;