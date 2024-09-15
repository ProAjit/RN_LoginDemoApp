import axios from 'axios';
import { API } from '../Constants/GlobalData';

export const submitQueriesData = async (name: string, email: string, phone: string,
  description: string, region: string, title: string, subject: string) => {
    
    const formData = new FormData();

    formData.append('Name', name);
    formData.append('Email', email);
    formData.append('Phone', phone);
    formData.append('Description', description);
    formData.append('Title', title);
    formData.append('Subject', subject);
    formData.append('Status', 'New');
    formData.append('BadgeId', 'BadgeId40');

  try {
    const response = await axios.post(`${API.TestBaseURL}/createQuery`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};