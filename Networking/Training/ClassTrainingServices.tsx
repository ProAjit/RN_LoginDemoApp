// ClassTrainingServices.ts

import axios from 'axios';
import { API } from '../../Constants/GlobalData';

const API_BASE_URL = API.TestBaseURL

export const submitTraining = async (requestBody: any) => {
  try {
    console.log('\nsubmitTraining started')
    console.log('\submitTraining REQUEST URL', `${API.TestBaseURL}/submitEndorsement`);
    console.log('\submitTraining REQUEST BODY', requestBody);  
    const response = await axios.post(`${API_BASE_URL}/submitTraining`, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('\submitTraining resp data', response.data);  
    return response.data;
  } catch (error) {
    console.error('Error while submitting training data:', error);
    throw error;
  }
};

export const postTrainingStatus = async (trainingData: any) => {
  const url = API.TestBaseURL + '/updateTraining';
  console.log('\npostTrainingStatus URL', url)
  console.log('\npostTrainingStatus body', trainingData)
  try {
    const response = await axios.post(url, trainingData);
    console.log('\npostTrainingStatus data', response.data)
    return response.data;
  } catch (error) {
    console.error('Error updating training status:', error);
    console.log('\npostTrainingStatus error', error)
    throw error;
  }
};