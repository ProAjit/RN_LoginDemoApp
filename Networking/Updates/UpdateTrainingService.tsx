import axios from 'axios';
import { API } from '../../Constants/GlobalData';
import * as Keychain from 'react-native-keychain';

const fetchTrainingData = async (region: string) => {
    try {
        const getTrainingsURL = `${API.TestAdminBaseURL}/getTrainingListByRegion?Region=${region}`;
        console.log('API call getTrainingsURL:', getTrainingsURL);
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
            const { password: storedEncodedCredentials } = credentials;
            const response = await axios.get(getTrainingsURL, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${storedEncodedCredentials}`,
                },
            });
            console.log('TrainingList SUCCESS', response.data);
            return response.data; // Return the response to be handled by the component
        } else {
            console.log('No credentials stored');
        }
    } catch (error) {
        console.error('API call failed', error);
        throw error; // Propagate the error to be handled in the component
    }
};

export default fetchTrainingData;