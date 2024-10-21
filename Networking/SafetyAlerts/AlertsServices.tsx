import axios from 'axios';
import { API } from '../../Constants/GlobalData';
import * as Keychain from 'react-native-keychain';

const alert_url = API.TestTwoBaseURL + '/getAllActiveAlert'; 
const count_url = API.TestTwoBaseURL + '/getActiveAlertCount'; 

// Function to fetch alerts data from the API
export const fetchAlertsData = async () => {
  console.log('fetchAlertsData alert_url', alert_url);
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      const { password: storedEncodedCredentials } = credentials;
      const response = await axios.get(`${alert_url}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${storedEncodedCredentials}`,
        },
      });
      console.log('fetchAlertsData response', response);
      return response.data;
      } else {
      console.log('No credentials stored');
    }
  } catch (error) {
    console.error('Error fetching alerts data:', error);
    throw error;
  }
};


export const getActiveAlertCount = async () => {
  console.log('\ngetActiveAlertCount count_url', count_url);
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      const { password: storedEncodedCredentials } = credentials;
      const response = await axios.get(`${count_url}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${storedEncodedCredentials}`,
        },
      });
      console.log('\ngetActiveAlertCount response', response);
      return response.data;
    } else {
      console.log('No credentials stored');
    }
  } catch (error) {
    console.error('Error fetching active alert count:', JSON.stringify(error));
    throw error;
  }
};