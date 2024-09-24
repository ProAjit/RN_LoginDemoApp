import { Dimensions } from "react-native";
import AppSingleton from "../AppSingleton/AppSingleton";
const singleton = AppSingleton.getInstance();

export interface Item {
  id: string;
  title: string;
}

export const API = {
  // Profile_URL: 'https://jawal.ngha.med.sa/soa-infra/resources/default/NghaMobileRestServicesB4!1.0/getter/getempprofile',
  // Login_URL: 'https://jawal.ngha.med.sa/soa-infra/resources/default/NghaMobileRestServices/api/validateuser',
  // TestBaseURL: 'https://jawal.ngha.med.sa/soa-infra/resources/default/Safety24By7Service!1.0/api',
  // TestTwoBaseURL: 'https://jawal.ngha.med.sa/soa-infra/resources/default/Safety24By7ServiceTwo!1.0/api',
  Profile_URL: 'http://dvriylcm-002.kamc-rd.ngha.med:7003/soa-infra/resources/default/NghaMobileRestServicesB4!1.0/getter/getempprofile',
  Login_URL: 'http://dvriylcm-002.kamc-rd.ngha.med:7003/soa-infra/resources/default/NghaMobileRestServices/api/validateuser',
  TestBaseURL: 'http://dvriylcm-002.kamc-rd.ngha.med:7003/soa-infra/resources/default/Safety24By7Service!1.0/api',
  TestTwoBaseURL: 'http://dvriylcm-002.kamc-rd.ngha.med:7003/soa-infra/resources/default/Safety24By7ServiceTwo!1.0/api',
}

export const HomeCategoriesArr: Item[] = [
  { id: '1', title: 'TOP MANAGEMENT MESSAGES' },
  { id: '2', title: 'ENDORSE YOUR SAFETY ISSUE' },
  { id: '3', title: 'SCHEDULE IN CLASS TRAINING' },
  { id: '4', title: 'QUERIES' },
  { id: '5', title: 'E-TRAINING' },
  { id: '6', title: 'LINKS' },
  { id: '7', title: 'SAFETY ALERTS' },
  { id: '8', title: 'SAFETY NEWS' },
  { id: '9', title: 'ADMIN' },
  { id: '10', title: 'ABOUT' },
];

export const CATEGORY = {
  topManangement: "TOP MANAGEMENT MESSAGES",
  safetyIssue: "ENDORSE YOUR SAFETY ISSUE",
  scheduleTraining: "SCHEDULE IN CLASS TRAINING",
  queries: "QUERIES",
  eTraining: "E-TRAINING",
  links: "LINKS",
  safetyAlert: "SAFETY ALERTS",
  safetyNews: "SAFETY NEWS",
  admin: "ADMIN",
  about: "ABOUT",
};

export const SCREEN_NAME = {
  dashboard: "Be Safe",
  updateTrainings: "Update Trainings",
  updateIncidents: "Update Incidents",
  trainingDetails: "Training Details",
  queriesDetails: "Queries Details",
};

export const COLORS = {
  appBackground: '#F4F6FF',
  appThemeBlue: 'rgba(2, 28, 52, 1.0)',
  white: '#fff',
}

export const DEVICE = {
 height: Dimensions.get('window').height,
 width: Dimensions.get('window').width,
}

export const REGIONS = {
   data: ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Hessa']
}

export const FormatDate = (dateString: string): string => {
  // Create a new Date object from the input date string
  const date = new Date(dateString);

  // Define month names
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Extract the day, month, and year
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Extract the hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes();

  // Determine AM or PM suffix
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert 24-hour format to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle the case for 0 hours

  // Format the minutes with leading zeros if necessary
  const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;

  // Return the formatted date string
  return `${day}-${month}-${year} ${hours}:${minutesFormatted}${ampm}`;
};

// export const USER = {
//   badgeId: singleton.badgeNumber,
//   badgeNumber: singleton.badgeNumber,
//   email: 'ajit.s@test.com',
//   phone: singleton.mobileNumber,
//   title: 'App developer',
//   name: singleton.fullName,
//   status: 'New',
// }