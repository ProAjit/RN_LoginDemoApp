import { Alert } from 'react-native';
import { submitTraining } from './ClassTrainingServices';
import AppSingleton from '../../AppSingleton/AppSingleton';
const singleton = AppSingleton.getInstance();

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
  handleCancel: () => void,
  onSuccess: (trainingRequestId: string) => void  // Add callback for success
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
    Badgenumber: singleton.badgeNumber,
    Department: department,
    Supervisor: supervisor,
    NumberOfTrainees: numTrainees,
    Location: location,
    Subject: subject,
    FromDate: fromDate?.toISOString().substring(0, fromDate?.toISOString().length - 1),
    ToDate: toDate?.toISOString().substring(0, toDate?.toISOString().length - 1),
    Region: region,
  };

  console.log('\nREQUEST BODY', requestBody);

  try {
    const responseData = await submitTraining(requestBody);
    if (responseData.TrainingRequestId) {
      Alert.alert('Success', `Training Request ID: ${responseData.TrainingRequestId}`);
      onSuccess(responseData.TrainingRequestId);  // Call success callback
      handleCancel();
    } else {
      Alert.alert('Error', 'Unable to submit data.');
    }
    console.log('\nsubmitTraining SUCCESS', responseData);
  } catch (error) {
    Alert.alert('Unable to Submit Training');
    console.error('\n', JSON.stringify(error));
  } finally {
    setLoading(false);
  }
}; 