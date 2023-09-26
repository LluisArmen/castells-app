import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import AgendaScreen from '../screens/AgendaScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DevScreen from '../screens/DevScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
            headerTitle: '',
            headerShown: true,
            headerStyle: {
                backgroundColor: 'white',
                shadowColor: 'transparent', // Set the shadow color to transparent
                elevation: 0, // Remove the shadow (Android)
            },
            tabBarIcon: ({ focused, color, size }) => (
                <MaterialIcons 
                name="home"
                color={focused ? 'blue' : 'gray'}
                size={24} />
            ),
            tabBarStyle: {
                backgroundColor: 'white',
                //borderTopColor: 'transparent'
            }
        }}
      />
      <Tab.Screen
        name="Agenda"
        component={AgendaScreen}
        options={{
          headerTitle: '',
          headerShown: true,
          headerStyle: {
              backgroundColor: 'white',
              shadowColor: 'transparent', // Set the shadow color to transparent
              elevation: 0, // Remove the shadow (Android)
          },
          tabBarIcon: ({ focused, color, size }) => (
              <MaterialIcons 
              name="list"
              color={focused ? 'blue' : 'gray'}
              size={24} />
          ),
          tabBarStyle: {
              backgroundColor: 'white',
              //borderTopColor: 'transparent'
          }
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: '',
          headerShown: true,
          headerStyle: {
              backgroundColor: 'white',
              shadowColor: 'transparent', // Set the shadow color to transparent
              elevation: 0, // Remove the shadow (Android)
          },
          tabBarIcon: ({ focused, color, size }) => (
              <MaterialIcons 
              name="person"
              color={focused ? 'blue' : 'gray'}
              size={24} />
          ),
          tabBarStyle: {
              backgroundColor: 'white',
              //borderTopColor: 'transparent'
          }
        }}
      />
      <Tab.Screen
        name="Dev"
        component={DevScreen}
        options={{
          headerTitle: 'Dev',
          headerShown: true,
          headerStyle: {
              backgroundColor: 'bisque',
          //     shadowColor: 'transparent', // Set the shadow color to transparent
          //     elevation: 0, // Remove the shadow (Android)
          },
          tabBarIcon: ({ focused, color, size }) => (
              <MaterialIcons 
              name="code"
              color={focused ? 'coral' : 'gray'}
              size={24} />
          ),
          tabBarStyle: {
              backgroundColor: 'white',
              //borderTopColor: 'transparent'
          }
      }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;