import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AppNavigator from './src/navigation/AppNavigator';
import { onAuthStateChanged, User } from 'firebase/auth'
import { FIREBASE_AUTH } from './FirebaseConfig';
import useUserStore from './src/store/UserStore';
import LoginNavigator from './src/navigation/AuthNavigator';

const Stack = createNativeStackNavigator();

const App = () => {
  const {user, setUser} = useUserStore()
  useEffect(() => {
    try {
      onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
        if (currentUser && currentUser.emailVerified) {
          console.log('-> LogIn sucess!!');
          setUser(currentUser);
        } else {
          console.log('-> user is logged out');
        }
      });
    } catch (error: any) {
      console.log(error)
    }
    
  }, [])
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ? (
          <Stack.Screen name='Cappstells' component={AppNavigator} options={{ headerShown: false }}/>
        ) : (
          <Stack.Screen name='LoginNavigator' component={LoginNavigator}  options={{ headerShown: false }}/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;