import axios from 'axios';

import { API } from '../../Constants/GlobalData';

const API_URL = API.TestTwoBaseURL + '/getAllActiveNews'; 

// Function to fetch safety news
export const fetchSafetyNews = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data.ActiveNews;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error; // Re-throw error to handle in component
  }
};
