import axios from 'axios';
import { API } from '../Constants/GlobalData';

export const submitQueriesData = async (name: string, email: string, phone: string,
  description: string, region: string, title: string, subject: string, badgeId: string) => {

    const requestBody = {
      Name: String(name).toUpperCase(),
      Email: email,
      Phone: phone,
      Title: title,
      Region: region,
      Subject: subject,
      Description: description,
      Status: 'New',
      BadgeId: badgeId
    };

    console.log('\submitQueriesData REQUEST URL', `${API.TestBaseURL}/createQuery`);
    console.log('\submitQueriesData REQUEST BODY', requestBody);
  
  try {
    const response = await axios.post(`${API.TestBaseURL}/createQuery`, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('\submitQueriesData resp data', response.data);
    return response.data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};