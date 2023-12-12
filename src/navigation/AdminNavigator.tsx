import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AdminScreen from '../screens/AdminScreen';
import ModulPinyesScreen from '../screens/Admin/ModulPinyesScreen';
import JoinRequestsScreen from '../screens/Admin/JoinRequestsScreen';


const Stack = createNativeStackNavigator();

export function AdminNavigator() {
  return (
    <Stack.Navigator initialRouteName='Admin'>
      <Stack.Screen name="AdminScreen" component={AdminScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="ModulPinyesScreen" component={ModulPinyesScreen} options={modulPinyesScreenOptions}/>
      <Stack.Screen name="JoinRequestsScreen" component={JoinRequestsScreen} options={joinRequestsScreenOptions}/>
    </Stack.Navigator>
  )
}

const modulPinyesScreenOptions = {
    headerTitle: 'Mòdul de Pinyes',
    headerShown: true,
    headerStyle: {
        backgroundColor: 'white',
        shadowColor: 'transparent',
        elevation: 0, // Remove the shadow (Android)
    }
};

const joinRequestsScreenOptions = {
  headerTitle: 'Requests',
  headerShown: true,
  headerStyle: {
      backgroundColor: 'white',
      shadowColor: 'transparent',
      elevation: 0, // Remove the shadow (Android)
  }
};