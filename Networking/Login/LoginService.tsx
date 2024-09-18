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
  console.log('\nREQUEST BODY', requestBody);

  try {
    const response = await axios.post(`${API.Login_URL1}`, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('\nLOGIN RESPONSE:\n', response);
    return response;
  } catch (error) {
    console.error('Error while submitting training data:', error);
    throw error;
  }
};