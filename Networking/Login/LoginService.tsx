// LoginService.tsx
import axios from 'axios';
import { API } from '../../Constants/GlobalData';

export const loginApi = async (userName: string, password: string) => {
  const postData = {
    UserName: String(userName).toUpperCase(),
    Password: 'EvLUHwePskmmbPOXBMbwag==',
    InFuture1: `ANDROID`,
    InFuture2: '12~OPPO~CPH2471~~ANDROID',
    InFuture3: '-',
    InFuture4: ' ',
    InFuture5: ' ',
  };

  return axios
    .post(API.Login_URL1, postData, {
      headers: { UsernameToken: String(userName).toUpperCase() },
    })
    .then(resp => {
      const data = {
        username: userName?.toUpperCase(),
        token: resp?.data?.token,
        fullName: resp?.data?.fullName,
        mobileNumber: resp?.data?.mobileNumber,
      };
      console.log('\nLogin Success with Resp', data);
      return data;
    })
    .catch((err: any) => {
      console.log('\nLogin Error', JSON.stringify(err));
      throw new Error('\nLogin failed');
    });
};
