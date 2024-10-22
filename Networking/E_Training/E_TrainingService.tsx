import axios from 'axios';
import { API } from '../../Constants/GlobalData';
import * as Keychain from 'react-native-keychain';

const API_URL = API.TestTwoBaseURL + '/getTrainingContent'; 

export const getETrainingData = async () => {
  console.log('getETrainingData API_URL', API_URL)
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      const { password: storedEncodedCredentials } = credentials;
      const response = await axios.get(`${API_URL}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${storedEncodedCredentials}`,
        },
      });
      console.log('getETrainingData response', response)
      return response.data['e-Training'];
    } else {
      console.log('No credentials stored');
    }
  } catch (error) {
    console.error('Error fetching e-Training data:', error);
    throw error;
  }
};