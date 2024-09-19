import axios from 'axios';
import { API } from '../../Constants/GlobalData';

export const submitSafetyEndorsement = async ( name: string, badgeNumber: string, location: string,
  description: string, region: string ) => {
    
  // const formData = new FormData();
  // formData.append('Name', name);
  // formData.append('Badgenumber', badgeNumber);
  // formData.append('Location', location);
  // formData.append('Description', description);
  // formData.append('Region', region);
  // formData.append('image', '');

  const requestBody = {
    Name: name,
    Badgenumber: badgeNumber,
    Location: location,
    Description: description,
    Imageuri: ' ',
    Region: region
  };

  // if (imageUri) {
  //   formData.append('image', {
  //     uri: imageUri,
  //     type: 'image/jpeg', 
  //     name: 'photo.jpg', 
  //   } as any);
  // }// Check appropriate MIME type and Change the file name if need be
  console.log('\nsubmitEndorsement REQUEST URL', `${API.TestBaseURL}/submitEndorsement`);
  console.log('\nsubmitEndorsement REQUEST BODY', requestBody);

  try {
    const response = await axios.post(`${API.TestBaseURL}/submitEndorsement`, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('\nsubmitEndorsement resp data', response.data);
    return response.data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

// Import the new API function
export const updateIncidentStatus = async (incidentData: any) => {
  try {
    const response = await axios.post(`${API.TestBaseURL}/updateIncidentStatus`, incidentData);
    if (response.data.success) {
      return true;
    } else {
      console.error('Failed to update incident status:', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error while updating incident status:', error);
    return false;
  }
};