import { Alert } from 'react-native';
import { submitTraining } from './ClassTrainingServices';
import { USER } from '../../Constants/GlobalData';

export const handleSubmit = async (
  region: string,
  department: string,
  supervisor: string,
  noOfTrainees: string,
  location: string,
  subject: string,
  fromDate: Date | undefined,
  toDate: Date | undefined,
  setLoading: (loading: boolean) => void,
  handleCancel: () => void
) => {
  if (
    region.trim() === '' ||
    department.trim() === '' ||
    supervisor.trim() === '' ||
    noOfTrainees.trim() === '' ||
    location.trim() === '' ||
    subject.trim() === ''
  ) {
    Alert.alert('Error', 'Please enter values in all fields.');
    return;
  }

  const numTrainees = parseInt(noOfTrainees);
  if (isNaN(numTrainees) || numTrainees < 5 || numTrainees > 30) {
    Alert.alert('Invalid Input', 'Please enter a number between 5 and 30.');
    return;
  }

  setLoading(true);

  const requestBody = {
    Badgenumber: USER.badgeNumber,
    Department: department,
    Supervisor: supervisor,
    NumberOfTrainees: numTrainees,
    Location: location,
    Subject: subject,
    FromDate: fromDate?.toISOString(),
    ToDate: toDate?.toISOString(),
    Region: region,
  };

  console.log('REQUEST BODY', requestBody);

  try {
    const responseData = await submitTraining(requestBody);
    if (responseData.TrainingRequestId) {
      Alert.alert('Success', `Training Request ID: ${responseData.TrainingRequestId}`);
      handleCancel();
    } else {
      Alert.alert('Error', 'Failed to submit data.');
    }
    console.log('submitTraining SUCCESS', responseData);
  } catch (error) {
    console.warn('submitTraining Failed');
  } finally {
    setLoading(false);
  }
}; 