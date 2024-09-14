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