import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/Auth/LoginScreen';
import RegistrationScreen from '../screens/Auth/RegistrationScreen';
import OrganisationBifurcationScreen from '../screens/Auth/OrganisationBifurcationScreen';
import CreateOrganisationScreen from '../screens/Auth/CreateOrganisationScreen';
import JoinOrganisationScreen from '../screens/Auth/JoinOrganisationScreen';
import WaitRequestAcceptanceScreen from '../screens/Auth/WaitRequestAcceptanceScreen';

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
      <Stack.Screen 
        name="WaitRequestAcceptanceScreen" 
        component={WaitRequestAcceptanceScreen} 
        options={{ 
          headerShown: false 
      }}/>
    </Stack.Navigator>
  )
}