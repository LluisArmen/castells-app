import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/auth/LoginScreen';
import RegistrationScreen from '../screens/auth/RegistrationScreen';
import OrganisationBifurcationScreen from '../screens/auth/OrganisationBifurcationScreen';
import CreateOrganisationScreen from '../screens/auth/CreateOrganisationScreen';
import JoinOrganisationScreen from '../screens/auth/JoinOrganisationScreen';
import WaitRequestAcceptanceScreen from '../screens/auth/WaitRequestAcceptanceScreen';

const Stack = createNativeStackNavigator();

export function LoginNavigator() {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Register" component={RegistrationScreen}/>
    </Stack.Navigator>
  )
}

export function WaitRequestAcceptanceNavigator() {
  return (
    <Stack.Navigator initialRouteName='WaitRequestAcceptanceNavigator'>
      <Stack.Screen name="WaitRequestAcceptanceScreen" component={WaitRequestAcceptanceScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Register" component={RegistrationScreen}/>
    </Stack.Navigator>
  )
}

export function OrganisationBifurcationNavigator() {
  return (
    <Stack.Navigator initialRouteName='OrganisationBifurcationScreen'>
      <Stack.Screen 
        name="OrganisationBifurcationScreen" 
        component={OrganisationBifurcationScreen} 
        options={{ 
          headerShown: true, 
          headerTitle: '',
          headerShadowVisible: false,
        }}/>
      <Stack.Screen 
        name="CreateOrganisationScreen" 
        component={CreateOrganisationScreen}
        options={{ 
          headerShown: true, 
          headerTitle: '',
          headerShadowVisible: false,
        }}/>
      <Stack.Screen 
        name="JoinOrganisationScreen" 
        component={JoinOrganisationScreen}
        options={{ 
          headerShown: true, 
          headerTitle: '',
          headerShadowVisible: false,
        }}/>
    </Stack.Navigator>
  )
}