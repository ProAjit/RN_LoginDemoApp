import axios from 'axios';
import { API, USER } from '../Constants/GlobalData';

export const submitQueriesData = async (name: string, email: string, phone: string,
  description: string, region: string, title: string, subject: string) => {
    
    const formData = new FormData();
    formData.append('Name', name);
    formData.append('Email', email);
    formData.append('Phone', phone);
    formData.append('Title', title);
    formData.append('Region', region);
    formData.append('Subject', subject);
    formData.append('Description', description);
    formData.append('Status', 'New');
    formData.append('BadgeId', USER.badgeId);

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