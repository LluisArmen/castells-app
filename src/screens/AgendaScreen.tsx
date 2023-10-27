import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { typography } from '../design/Typography';
import { collection, onSnapshot } from 'firebase/firestore';
import { FIREBASE_DB } from '../../FirebaseConfig';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

const AgendaScreen = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [initialFetchCompleted, setInitialFetchCompleted] = useState(false);

  useEffect(() => {
    const eventRef = collection(FIREBASE_DB, 'events');

    const subscriber = onSnapshot(eventRef, {
      next: (snapshot) => {
        const newEvents = [];
        snapshot.docs.forEach(doc => {
          newEvents.push({
            id: doc.id,
            ...doc.data()
          });
        });

        // Check if the initial fetch has completed
        if (initialFetchCompleted) {
          // Compare the previous events with the newEvents length
          if (events.length != newEvents.length) {
            console.log('🗓️ New Event has been added!');
            setEvents(newEvents);
          }
        } else {
          // If it's the initial fetch, set the initialFetchCompleted flag to true
          setEvents(newEvents);
          setInitialFetchCompleted(true);
        }
        setEvents(newEvents)
      }
    })

    return () => subscriber();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
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
    </TouchableWithoutFeedback>
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