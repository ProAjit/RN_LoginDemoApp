import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import { API } from '../../Constants/GlobalData';
import AppSingleton from '../../AppSingleton/AppSingleton';
const singleton = AppSingleton.getInstance();

export const fetchIncidents = async () => {
    try {
        const getIncidentURL = API.TestAdminBaseURL + '/getIncidentByRegion?Region=' + singleton.region;
        console.log('\nAPI call getIncidentURL', getIncidentURL);

        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
            const { password: storedEncodedCredentials } = credentials;
            const response = await axios.get(getIncidentURL, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${storedEncodedCredentials}`,
                },
            });
            // Parse the response to map to DataItem format
            const parsedData = response.data["Incidents"].map((incident: any) => ({
                badgeNumber: incident["Badgenumber"].trim(),
                name: incident["Name"].trim(),
                location: incident["Location"].trim(),
                description: incident["Description"].trim(),
                status: incident["incidentstatus"].trim(),
                region: incident["Region"].trim(),
                incidentdate: incident["incidentdate"].trim(),
                incidentId: Number(incident["incidentid"].trim()),
            }));

            return parsedData;
        } else {
            console.log('No credentials stored');
        }
    } catch (error) {
        console.log('\nAPI call failed, error:', error);
        throw error;  // Throw error to handle it in the main file
    }
};
