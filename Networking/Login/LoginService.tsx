// LoginService.tsx
import axios from 'axios';
import { API } from '../../Constants/GlobalData';

export const loginApi = async (userName: string, password: string) => {

  const requestBody = {
    UserName: String(userName).toUpperCase(),
    Password: 'EvLUHwePskmmbPOXBMbwag==',
    InFuture1: `ANDROID`,
    InFuture2: '12~OPPO~CPH2471~~ANDROID',
    InFuture3: '-',
    InFuture4: ' ',
    InFuture5: ' ',
  };
  console.log('\Login REQUEST URL', `${API.Login_URL}`);
  console.log('\nLogin REQUEST BODY', requestBody);
  try {
    const response = await axios.post(`${API.Login_URL}`, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('\nLOGIN RESPONSE:\n', response);
    return response;
  } catch (error) {
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
    const response = await axios.post(`${API.Profile_URL}`, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('\nPrfoile RESPONSE:\n', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching employee profile:', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};