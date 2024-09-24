// ClassTrainingServices.ts

import axios from 'axios';
import { API } from '../../Constants/GlobalData';

const API_BASE_URL = API.TestBaseURL

export const submitTraining = async (requestBody: any) => {
  const url = API_BASE_URL + '/submitTraining';
  try {
    console.log('\nsubmitTraining started')
    console.log('\nsubmitTraining REQUEST URL', url);
    console.log('\nsubmitTraining REQUEST BODY', requestBody);  
    const response = await axios.post(url, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('\nsubmitTraining resp data', response.data);  
    return response.data;
  } catch (error) {
    console.error('Error while submitting training data:', JSON.stringify(error));
    throw error;
  }
};

export const updateTrainingStatus = async (trainingData: any) => {
  const url = API_BASE_URL + '/updateScheduleStatus';
  console.log('\nupdateTrainingStatus URL', url)
  console.log('\nupdateTrainingStatus body', trainingData)
  try {
    const response = await axios.put(url, trainingData);
    console.log('\nupdateTrainingStatus response', response)
    console.log('\nupdateTrainingStatus response.data.TrainingSchedule.Status', response.data.TrainingSchedule.Status)
    return response.data;
  } catch (error) {
    console.error('Error updating training status:', error);
    console.log('\nupdateTrainingStatus error', error)
    throw error;
  }
};

export const getTrainingScheduleById = async (trainingId: string) => {
  const url = API_BASE_URL + '/getTrainingScheduleById';
  console.log('\nupdateTrainingStatus URL', url)
  try {
    const response = await axios.get(url, {
      params: { TrainingId: trainingId },
    });
    console.log('\ngetTrainingScheduleById response', response.data)
    return response.data;
  } catch (error) {
    console.log('\ngetTrainingScheduleById error', JSON.stringify(error))
    throw error;
  }
};