import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import { API } from '../../Constants/GlobalData';

const API_URL = API.TestTwoBaseURL + '/getAllActiveNews'; 

// Function to fetch safety news
export const fetchSafetyNews = async () => {
  console.log('fetchSafetyNews API_URL', API_URL)
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
      console.log('fetchSafetyNews response', response)
      return response.data.ActiveNews;
    } else {
      console.log('No credentials stored');
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error; // Re-throw error to handle in component
  }
};
