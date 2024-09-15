import axios from 'axios';
import { API } from '../../Constants/GlobalData';

const API_URL = API.TestTwoBaseURL + '/getLinks'; 

// Function to fetch links data from the API
export const fetchLinksData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching links data:', error);
    throw error;
  }
};