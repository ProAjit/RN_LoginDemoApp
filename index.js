/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './navigation/StackNavigator'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
