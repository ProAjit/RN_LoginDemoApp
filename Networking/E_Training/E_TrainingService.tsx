import axios from 'axios';
import { API } from '../../Constants/GlobalData';

const API_URL = API.TestTwoBaseURL + '/getTrainingContent'; 


export const getETrainingData = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data['e-Training'];
  } catch (error) {
    console.error('Error fetching e-Training data:', error);
    throw error;
  }
};
