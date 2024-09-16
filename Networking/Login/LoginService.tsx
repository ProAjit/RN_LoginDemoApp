import axios from 'axios';

const BASE_URL = 'http://dvriylcm-002.kamc-rd.ngha.med:7003/soa-infra/resources/default/NghaMobileRestServices/api/validateuser';

export const loginApi = async (userName: string, password: string) => {

  const data = {
    UserName: String(userName).toUpperCase(),
    Password: 'EvLUHwePskmmbPOXBMbwag==',
    InFuture1: `ANDROID`,
    InFuture2: '12~OPPO~CPH2471~~ANDROID',
    InFuture3: '-',
    InFuture4: ' ',
    InFuture5: ' ',
  };

  axios
    .post(BASE_URL, data, {
      headers: {UsernameToken: String(userName).toUpperCase()},
    })
    .then(resp => {
      const data = {
        username: userName?.toUpperCase(),
        token: resp?.data?.InFuture1,
        fullName: resp?.data?.Fullname,
        mobileNumber: resp?.data?.MobileNumber,
      };
      console.log('\nLogin Success with Resp', data)
      return data
    })
    .catch((err: any) => {
      // 'Something_went_wrong_Please_try_again'
      console.log('\nLogin Success with an error', err)
      throw new Error('Login failed');
    });
};