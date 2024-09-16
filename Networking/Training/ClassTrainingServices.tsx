// ClassTrainingServices.ts

import axios from 'axios';
import { API } from '../../Constants/GlobalData';

const API_BASE_URL = API.TestBaseURL

export const submitTraining = async (requestBody: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/submitTraining`, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error while submitting training data:', error);
    throw error;
  }
};

export const postTrainingStatus = async (trainingData: any) => {
  const url = API.TestBaseURL + '/updateTraining';
  console.log('postTrainingStatus URL', url)
  console.log('postTrainingStatus body', trainingData)
  try {
    const response = await axios.post(url, trainingData);
    console.log('postTrainingStatus data', response.data)
    return response.data;
  } catch (error) {
    console.error('Error updating training status:', error);
    console.log('postTrainingStatus error', error)
    throw error;
  }
};