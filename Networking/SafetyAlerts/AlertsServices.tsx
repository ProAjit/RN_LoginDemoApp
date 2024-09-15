import axios from 'axios';
import { API } from '../../Constants/GlobalData';

const API_URL = API.TestTwoBaseURL + '/getAllActiveAlert'; 

// Function to fetch alerts data from the API
export const fetchAlertsData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching alerts data:', error);
    throw error;
  }
};