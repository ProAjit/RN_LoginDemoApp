import axios from 'axios';
import { API } from '../../Constants/GlobalData';
import { Alert } from 'react-native';
import * as Keychain from 'react-native-keychain';
import AppSingleton from '../../AppSingleton/AppSingleton';
const singleton = AppSingleton.getInstance();

export const submitSafetyEndorsement = async (
  name: string,
  badgeNumber: string,
  location: string,
  description: string,
  region: string,
  image: string | null,
  imageName: string | null,
) => {
  const requestBody = {
    Name: name,
    Badgenumber: badgeNumber,
    Location: location,
    Description: description,
    Imageuri: image,
    Region: region,
    ImageName: imageName,
  }

  console.log('\nsubmitEndorsement REQUEST URL', `${API.TestBaseURL}/submitEndorsement`);
  console.log('\nsubmitEndorsement REQUEST BODY', requestBody);

  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      const { password: storedEncodedCredentials } = credentials;
      const response = await axios.post(`${API.TestBaseURL}/submitEndorsement`, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${storedEncodedCredentials}`,
        },
      });
      console.log('\nsubmitEndorsement resp data', response.data);
      return response.data;
    } else {
      console.log('No credentials stored');
    }
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

// Import the new API function
export const updateIncidentStatus = async (incidentData: any) => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      const { password: storedEncodedCredentials } = credentials;
      const apiURL = `${API.TestBaseURL}/updateIncident`
      console.log('updateIncident URL', apiURL)
      console.log('updateIncident request body', incidentData)
      const response = await axios.post(`${API.TestBaseURL}/updateIncident`, incidentData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${storedEncodedCredentials}`,
        },
      });
      console.log('updateIncident response', response.data.Status)
      if (response.data.Status) {
        console.log('Success in updating incident status:', response.data.Status);
        Alert.alert('Success', response.data.Status);
        return true;
      } else {
        console.error('Unable to update incident status:', response.data);
        return false;
      }
    } else {
      console.log('No credentials stored');
    }
  } catch (error) {
    console.error('Error while updating incident status:', error);
    return false;
  }
};

export const getIncidentsById = async (incidentId: string) => {
  const url = `${API.TestBaseURL}/getIncidentById`;
  console.log('\getIncidentsById URL', url)
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      const { password: storedEncodedCredentials } = credentials;
      const response = await axios.get(`${url}`, {
        params: { IncidentId: incidentId },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${storedEncodedCredentials}`,
        },
      });
      console.log('\ngetIncidentById response', response.data.Incident[0])
      return response.data;
    } else {
      console.log('No credentials stored');
    }
  } catch (error) {
    console.log('\ngetIncidentById error', JSON.stringify(error))
    throw error;
  }
};

// Define the DataItem interface here if necessary
export interface DataItem {
  incidentId: string;
  name: string;
  location: string;
  description: string;
  status: string;
  incidentdate: string;
  region: string;
  badgeNumber: string;
}

export const fetchIncidentList = async () => {
  try {
    const getIncidentURL = `${API.TestBaseURL}/getIncidentList?BadgeNumber=${singleton.badgeNumber}`;
    console.log('API call getIncidentURL', getIncidentURL);
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      const { password: storedEncodedCredentials } = credentials;
      const response = await axios.get(getIncidentURL, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${storedEncodedCredentials}`,
        },
      });

      // Make GET request using axios
      const json = response.data;

      console.log('IncidentList SUCCESS');
      console.log('IncidentList JSON:', json);

      // Parse and return the data in the format of DataItem[]
      // Parse the response to map to DataItem format
      const parsedData: DataItem[] = json["Incidents"].map((incident: any) => ({
        badgeNumber: incident["Badgenumber"].trim(),
        name: incident["Name"].trim(),
        location: incident["Location"].trim(),
        description: incident["Description"].trim(),
        status: incident["incidentstatus"].trim(),
        region: incident["Region"].trim(),
        incidentdate: incident["incidentdate"].trim(),
        incidentId: incident["incidentid"].trim(),
      }));
      return parsedData
    } else {
      console.log('No credentials stored');
    }
  } catch (error) {
    console.error('Error fetching incident list', error);
    throw error;  // Re-throw the error to handle it in the main file
  }
};