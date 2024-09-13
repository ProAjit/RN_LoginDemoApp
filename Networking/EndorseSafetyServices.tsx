import axios from 'axios';
import { API } from '../Constants/GlobalData';

export const submitSafetyEndorsement = async ( name: string, badgeNumber: string, location: string,
  description: string, region: string, imageUri: string | null ) => {
    
  const formData = new FormData();

  formData.append('Name', name);
  formData.append('Badgenumber', badgeNumber);
  formData.append('Location', location);
  formData.append('Description', description);
  formData.append('Region', region);

  if (imageUri) {
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg', 
      name: 'photo.jpg', 
    } as any);
  }// Check appropriate MIME type and Change the file name if need be

  try {
    const response = await axios.post(`${API.TestBaseURL}/submitEndorsement`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

