import axios from 'axios';
import { API } from '../../Constants/GlobalData';

const alert_url = API.TestTwoBaseURL + '/getAllActiveAlert'; 
const count_url = API.TestTwoBaseURL + '/getActiveAlertCount'; 

// Function to fetch alerts data from the API
export const fetchAlertsData = async () => {
  try {
    const response = await axios.get(alert_url);
    return response.data;
  } catch (error) {
    console.error('Error fetching alerts data:', error);
    throw error;
  }
};


export const getActiveAlertCount = async () => {
  try {
    const response = await axios.get(count_url);
    return response.data;
  } catch (error) {
    console.error('Error fetching active alert count:', JSON.stringify(error));
    throw error;
  }
};