import axios from 'axios';
import { API } from '../../Constants/GlobalData';
import * as Keychain from 'react-native-keychain';

const API_URL = API.TestTwoBaseURL + '/getLinks'; 

// Function to fetch links data from the API
export const fetchLinksData = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      const { password: storedEncodedCredentials } = credentials;
      const response = await axios.get(API_URL, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${storedEncodedCredentials}`,
        },
      });
      console.log('\nfetchLinksData response', response.data)
      return response.data;
    } else {
      console.log('No credentials stored');
    }
  } catch (error) {
    console.error('Error fetching links data:', error);
    throw error;
  }
};