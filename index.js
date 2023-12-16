/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import './Src/Screens/StateManagment/ContextState'
AppRegistry.registerComponent(appName, () => App);
