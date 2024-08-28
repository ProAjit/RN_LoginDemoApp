import axios from 'axios';

interface QueriesData {
    name: string;
    email: string;
    phone: string;
    title: string;
    type: string;
    description: string;
}

const API_URL = 'https://dummyapi.com/submitQuery'; 

export const submitQueriesData = async (data: QueriesData) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting queries data:', error);
    throw error;
  }
};
