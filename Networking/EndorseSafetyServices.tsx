import axios from 'axios';

const BASE_URL = 'https://example.com/api'; // Replace with your actual API base URL

export const submitSafetyEndorsement = async ( name: string, badgeNumber: string, location: string,
  description: string, imageUri: string | null ) => {
    
  const formData = new FormData();

  formData.append('name', name);
  formData.append('badgeNumber', badgeNumber);
  formData.append('location', location);
  formData.append('description', description);

  if (imageUri) {
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg', 
      name: 'photo.jpg', 
    } as any);
  }// Check appropriate MIME type and Change the file name if need be

  try {
    const response = await axios.post(`${BASE_URL}/submitEndorsement`, formData, {
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