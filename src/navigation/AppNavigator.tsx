import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import AgendaScreen from '../screens/AgendaScreen';
import AdminScreen from '../screens/AdminScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DevScreen from '../screens/DevScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useUserStore from '../store/UserStore';
import { Role } from '../models/User';
import { AdminNavigator } from './AdminNavigator';
import { AgendaNavigator } from './AgendaNavigator';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const {user} = useUserStore()
    return (
      <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} options={homeTabOptions} />
          <Tab.Screen name="Agenda" component={AgendaNavigator} options={agendaTabOptions} />

          {(user.role === Role.admin || user.role === Role.owner) && (
            <Tab.Screen name="Admin" component={AdminNavigator} options={adminTabOptions} />
          )}
          
          <Tab.Screen name="Profile" component={ProfileScreen} options={profileTabOptions} />

          {user.role === Role.owner && (
            <Tab.Screen name="Dev" component={DevScreen} options={devTabOptions} />
          )}
      </Tab.Navigator>
    );
};

export default AppNavigator;


const homeTabOptions = {
  headerTitle: '',
  headerShown: false,
  headerStyle: {
      backgroundColor: 'white',
      shadowColor: 'transparent', // Set the shadow color to transparent
      elevation: 0, // Remove the shadow (Android)
  },
  tabBarIcon: ({ focused, color, size }) => (
    <MaterialIcons 
        name="home"
        color={focused ? 'blue' : 'gray'}
        size={24}
    />
  ),
  tabBarStyle: {
      backgroundColor: 'white',
  },
};

const agendaTabOptions = {
  headerTitle: '',
  headerShown: false,
  headerStyle: {
      backgroundColor: 'white',
      shadowColor: 'transparent', // Set the shadow color to transparent
      elevation: 0, // Remove the shadow (Android)
  },
  tabBarIcon: ({ focused, color, size }) => (
    <MaterialIcons 
        name="list"
        color={focused ? 'blue' : 'gray'}
        size={24}
    />
  ),
  tabBarStyle: {
      backgroundColor: 'white',
  },
};

const adminTabOptions = {
  headerTitle: '',
  headerShown: false,
  headerStyle: {
    backgroundColor: 'white',
    shadowColor: 'transparent', // Set the shadow color to transparent
    elevation: 0, // Remove the shadow (Android)
  },
  tabBarIcon: ({ focused, color, size }) => (
    <MaterialIcons 
        name="admin-panel-settings"
        color={focused ? 'blue' : 'gray'}
        size={24}
    />
  ),
  tabBarStyle: {
      backgroundColor: 'white',
  },
};

const profileTabOptions = {
  headerTitle: '',
  headerShown: false,
  headerStyle: {
      backgroundColor: 'white',
      shadowColor: 'transparent', // Set the shadow color to transparent
      elevation: 0, // Remove the shadow (Android)
  },
  tabBarIcon: ({ focused, color, size }) => (
    <MaterialIcons 
        name="person"
        color={focused ? 'blue' : 'gray'}
        size={24}
    />
  ),
  tabBarStyle: {
      backgroundColor: 'white',
  },
};

const devTabOptions = {
  headerTitle: '',
  headerShown: false,
  headerStyle: {
      backgroundColor: 'white',
      shadowColor: 'transparent', // Set the shadow color to transparent
      elevation: 0, // Remove the shadow (Android)
  },
  tabBarIcon: ({ focused, color, size }) => (
    <MaterialIcons 
        name="code"
        color={focused ? 'blue' : 'gray'}
        size={24}
    />
  ),
  tabBarStyle: {
      backgroundColor: 'white',
  },
};