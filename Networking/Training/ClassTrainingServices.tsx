// ClassTrainingServices.ts

import axios from 'axios';
import { API } from '../../Constants/GlobalData';

const API_BASE_URL = API.TestBaseURL

export const submitTraining = async (requestBody: any) => {
  try {
    console.log('\nsubmitTraining started')
    console.log('\nsubmitTraining REQUEST URL', `${API.TestBaseURL}/submitEndorsement`);
    console.log('\nsubmitTraining REQUEST BODY', requestBody);  
    const response = await axios.post(`${API_BASE_URL}/submitTraining`, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('\nsubmitTraining resp data', response.data);  
    return response.data;
  } catch (error) {
    console.error('Error while submitting training data:', error);
    throw error;
  }
};

export const updateTrainingStatus = async (trainingData: any) => {
  const url = API.TestBaseURL + '/updateScheduleStatus';
  console.log('\nupdateTrainingStatus URL', url)
  console.log('\nupdateTrainingStatus body', trainingData)
  try {
    const response = await axios.put(url, trainingData);
    console.log('\nupdateTrainingStatus response', response)
    console.log('\nupdateTrainingStatus data', response.data)
    console.log('\nupdateTrainingStatus response.data.TrainingSchedule.Status', response.data.TrainingSchedule.Status)
    return response.data;
  } catch (error) {
    console.error('Error updating training status:', error);
    console.log('\nupdateTrainingStatus error', error)
    throw error;
  }
};