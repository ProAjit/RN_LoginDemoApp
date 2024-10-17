import axios from 'axios';
import { API } from '../../Constants/GlobalData';

const API_URL = API.TestTwoBaseURL + '/getTrainingContent'; 

export const getETrainingData = async () => {
  console.log('getETrainingData API_URL', API_URL)
  try {
    const response = await axios.get(`${API_URL}`);
    console.log('getETrainingData response', response)
    return response.data['e-Training'];
  } catch (error) {
    console.error('Error fetching e-Training data:', error);
    throw error;
  }
};
