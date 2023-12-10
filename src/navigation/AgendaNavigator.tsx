import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AgendaScreen from '../screens/AgendaScreen';
import EventScreen from '../screens/Agenda/EventScreen';
import EventAssistanceScreen from '../screens/Agenda/EventAssistanceScreen';

const Stack = createNativeStackNavigator();

export function AgendaNavigator() {
  return (
    <Stack.Navigator initialRouteName='Agenda'>
      <Stack.Screen name="AgendaScreen" component={AgendaScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="EventScreen" component={EventScreen} options={eventScreenOptions}/>
      <Stack.Screen name="EventAssistanceScreen" component={EventAssistanceScreen} options={eventAssistanceScreenOptions}/>
    </Stack.Navigator>
  )
}

const eventScreenOptions = {
  headerShown: true,
  headerStyle: {
      backgroundColor: 'white',
      shadowColor: 'transparent',
      elevation: 0, // Remove the shadow (Android)
  }
};

const eventAssistanceScreenOptions = {
  headerTitle: 'Assistance',
  headerShown: true,
  headerStyle: {
      backgroundColor: 'white',
      shadowColor: 'transparent',
      elevation: 0, // Remove the shadow (Android)
  }
};