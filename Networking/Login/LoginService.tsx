// LoginService.tsx
import axios from 'axios';
import { API, getEncryptedData } from '../../Constants/GlobalData';
import * as Keychain from 'react-native-keychain';

export const loginApi = async (userName: string, password: string) => {

  const requestBody = {
    UserName: String(userName).toUpperCase(),
    Password: getEncryptedData(password),//'EvLUHwePskmmbPOXBMbwag==',
    InFuture1: `ANDROID`,
    InFuture2: '12~OPPO~CPH2471~~ANDROID',
    InFuture3: '-',
    InFuture4: ' ',
    InFuture5: ' ',
  };
  console.log('\Login REQUEST URL', `${API.Login_URL}`);
  console.log('\nLogin REQUEST BODY', requestBody);

  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      const { password: storedEncodedCredentials } = credentials;
      const response = await axios.post(`${API.Login_URL}`, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${storedEncodedCredentials}`,
        },
      });
      console.log('\nLOGIN RESPONSE:\n', response);
      return response;
    } else {
      console.log('No credentials stored');
    }
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
};


export const profileApi = async (userName: string, sessionId: string, sessionToken: string) => {
  const requestBody = {
    UserName: String(userName).toUpperCase(),
    lang: 'EN',
    session_id: sessionId,
    session_token: sessionToken,
  };
  console.log('\nProfile REQUEST URL', `${API.Profile_URL}`);
  console.log('\nProfile REQUEST BODY', requestBody);
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      const { password: storedEncodedCredentials } = credentials;
      const response = await axios.post(`${API.Profile_URL}`, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${storedEncodedCredentials}`,
        },
      });
      console.log('\nPrfoile RESPONSE:\n', response);
      return response.data;
      } else {
      console.log('No credentials stored');
    }
  } catch (error) {
    console.error('Error fetching employee profile:', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

export const adminUserCheckAPI = async (userName: string, sessionId: string, sessionToken: string) => {

  const UserName = String(userName).toUpperCase()
  const API_URL: String = `${API.TestAdminBaseURL}` + "/isAdmin?Username=" + UserName
  console.log('\nadminUserCheckAPI REQUEST URL', API_URL);
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
      console.log('\nadminUserCheckAPI RESPONSE:\n', response);
      return response.data.User;
    } else {
      console.log('No credentials stored');
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error; // Re-throw error to handle in component
  }
};