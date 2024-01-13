import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AdminScreen from '../screens/AdminScreen';
import ModulPinyesScreen from '../screens/Admin/ModulPinyesScreen';
import JoinRequestsScreen from '../screens/Admin/JoinRequestsScreen';
import RolesManagerScreen from '../screens/Admin/RolesManagerScreen';
import RoleStatusScreen from '../screens/Admin/RoleStatusScreen';

const Stack = createNativeStackNavigator();

export function AdminNavigator() {
  return (
    <Stack.Navigator initialRouteName='Admin'>
      <Stack.Screen name="AdminScreen" component={AdminScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="JoinRequestsScreen" component={JoinRequestsScreen} options={joinRequestsScreenOptions}/>
      <Stack.Screen name="RolesManagerScreen" component={RolesManagerScreen} options={rolesManagerScreenOptions}/>
      <Stack.Screen name="RoleStatusScreen" component={RoleStatusScreen} options={roleStatusScreenOptions}/>
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

const rolesManagerScreenOptions = {
  headerTitle: 'Roles Manager',
  headerShown: true,
  headerStyle: {
      backgroundColor: 'white',
      shadowColor: 'transparent',
      elevation: 0, // Remove the shadow (Android)
  }
};

const roleStatusScreenOptions = {
  headerTitle: '',
  headerShown: true,
  headerStyle: {
      backgroundColor: 'white',
      shadowColor: 'transparent',
      elevation: 0, // Remove the shadow (Android)
  }
};