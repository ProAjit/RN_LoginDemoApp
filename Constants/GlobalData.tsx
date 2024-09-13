import { Dimensions } from "react-native";

export interface Item {
  id: string;
  title: string;
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

export const USER = {
  badgeId: '0048690',
  badgeNumber: '67541',
  email: 'ajit.s@mail.com',
  phone: '+9191',
  title: 'app developer',
  name: 'Mr. Ajit S',
  status: 'New',
}

export const API = {
  // TestBaseURL: 'http://riysvlcm-003.kamc-rd.ngha.med:7003/soa-infra/resources/default/Safety24By7Service!1.0/api',
  // TestBaseURL: 'https://jawal.ngha.med.sa/soa-infra/resources/default/Safety24By7ServiceTwo!1.0/api',
  TestBaseURL: 'http://dvriylcm-002.kamc-rd.ngha.med:7003/soa-infra/resources/default/Safety24By7Service!1.0/api',
  TestTwoBaseURL: 'http://dvriylcm-002.kamc-rd.ngha.med:7003/soa-infra/resources/default/Safety24By7ServiceTwo!1.0/api',
}