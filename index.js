import { AppRegistry } from 'react-native';
import App from './src/App'; // Adjust the import path based on your project structure
import { name as appName } from './app.json';
import { PaperProvider } from 'react-native-paper';

export default function Main() {
    return (
      <PaperProvider>
        <App />
      </PaperProvider>
    );
  }

AppRegistry.registerComponent(appName, () => App);