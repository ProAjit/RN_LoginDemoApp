// ClassTrainingServices.ts

import axios from 'axios';

interface TrainingData {
  department: string;
  supervisor: string;
  noOfTrainees: number;
  location: string;
  fromDate: Date;
  toDate: Date;
}

const API_URL = 'https://dummyapi.com/submitTraining'; 

export const submitTrainingData = async (data: TrainingData) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting training data:', error);
    throw error;
  }
};
