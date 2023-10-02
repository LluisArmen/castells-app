import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AppNavigator from './src/navigation/AppNavigator';
import LoginScreen from './src/screens/auth/LoginScreen';
import { User, onAuthStateChanged } from 'firebase/auth'
import { FIREBASE_AUTH } from './FirebaseConfig';
import RegistrationScreen from './src/screens/auth/RegistrationScreen';
// import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });

const Stack = createNativeStackNavigator();

function StackLayout() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name="Register" component={RegistrationScreen}/>
    </Stack.Navigator>
  )
}

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('-> LogIn sucess!!');
      setUser(user);
    });
  }, [])
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        
        {user ? (
          <Stack.Screen name='Cappstells' component={AppNavigator} options={{ headerShown: false }}/>
        ) : (
          <Stack.Screen name='Login' component={StackLayout}  options={{ headerShown: false }}/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;