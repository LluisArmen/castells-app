import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { typography } from '../design/Typography';
import { collection, onSnapshot } from 'firebase/firestore';
import { FIREBASE_DB } from '../../FirebaseConfig';

const AgendaScreen = () => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const eventRef = collection(FIREBASE_DB, 'events');

    const subscriber = onSnapshot(eventRef, {
      next: (snapshot) => {
        console.log('🗓️ New Event has been added!')
        const events: any[] = [];
        snapshot.docs.forEach(doc => {
          events.push({
            id: doc.id,
            ...doc.data()
          })
        });
        setEvents(events)
      }
    })

    return () => subscriber();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false} // Optional: Hide the vertical scroll indicator  
      >
        <Text style={typography.header}>{"Agenda"}</Text>

        <View style={styles.eventsContainer}>

          { events.map((event) => (
            <Text key={event.id} style={typography.body.small}>{event.title}</Text>
          ))}
        
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
      flexGrow: 1, // Allows the content to take up the available space vertically
      alignItems: 'flex-start', // Align content to the left
  },

  container: {
      flexGrow: 1, // Allow the content to take up the available space horizontally
      backgroundColor: 'white',
      justifyContent: 'center',
      minWidth: '100%',
      paddingLeft: 16,
      paddingRight: 16,
  },

  eventsContainer: {
    marginTop: 50,
  },
});

export default AgendaScreen;