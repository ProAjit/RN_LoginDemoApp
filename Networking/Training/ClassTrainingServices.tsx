// ClassTrainingServices.ts

import axios from 'axios';
import { API } from '../../Constants/GlobalData';
import * as Keychain from 'react-native-keychain';

const API_BASE_URL = API.TestBaseURL

export const submitTraining = async (requestBody: any) => {
  const url = API_BASE_URL + '/submitTraining';
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      const { password: storedEncodedCredentials } = credentials;
      console.log('\nsubmitTraining started')
      console.log('\nsubmitTraining REQUEST URL', url);
      console.log('\nsubmitTraining REQUEST BODY', requestBody);  
      const response = await axios.post(url, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${storedEncodedCredentials}`,
        },
      });
      console.log('\nsubmitTraining resp data', response.data);  
      return response.data;  
    } else {
      console.log('No credentials stored');
    }
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
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      const { password: storedEncodedCredentials } = credentials;
      const response = await axios.put(url, trainingData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${storedEncodedCredentials}`,
        },
      });
      console.log('\nupdateTrainingStatus response', response)
      console.log('\nupdateTrainingStatus response.data.TrainingSchedule.Status', response.data.TrainingSchedule.Status)
      return response.data;
    } else {
      console.log('No credentials stored');
    }
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
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      const { password: storedEncodedCredentials } = credentials;
      const response = await axios.get(url, {
        params: { TrainingId: trainingId },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${storedEncodedCredentials}`,
        },
      });
      console.log('\ngetTrainingScheduleById response', response.data)
      return response.data;
    } else {
      console.log('No credentials stored');
    }
  } catch (error) {
    console.log('\ngetTrainingScheduleById error', JSON.stringify(error))
    throw error;
  }
};