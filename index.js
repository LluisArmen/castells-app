import { AppRegistry } from 'react-native';
import App from './src/App'; // Adjust the import path based on your project structure
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);