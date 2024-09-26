import axios from 'axios';
import { API } from '../Constants/GlobalData';

export const submitQueriesData = async (name: string, email: string, phone: string,
  description: string, region: string, title: string, subject: string, badgeId: string) => {

    const url = `${API.TestBaseURL}/createQuery`;
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

    console.log('\nsubmitQueriesData REQUEST URL', url);
    console.log('\nsubmitQueriesData REQUEST BODY', requestBody);
  
  try {
    const response = await axios.post(url, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('\nsubmitQueriesData resp data', response.data);
    return response.data;
  } catch (error) {
    console.error('API call error:', JSON.stringify(error));
    throw error;
  }
};

export const getQueryById = async (queryId: string) => {
  const url = `${API.TestBaseURL}/getQueryById`;
  console.log('\ngetQueryById URL', url)
  try {
    const response = await axios.get(url, {
      params: { QueryId: queryId },
    });
    console.log('\ngetQueryById response', response.data)
    return response.data;
  } catch (error) {
    console.log('\ngetQueryById error', JSON.stringify(error))
    throw error;
  }
};
