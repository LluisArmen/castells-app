import React, { useState, useEffect } from 'react';
import { Button, View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { typography } from '../../design/Typography';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { FIREBASE_DB } from '../../../FirebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

const CreateNewEventScreen = ({ closeSheet }) => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventStartDate, setEventStartDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');

  const [positiveReponse, setPositiveReponse] = useState('');
  const [negativeResponse, setNegativeResponse] = useState('');
  const [optionalResponse, setOptionalResponse] = useState('');

  useEffect(() => {}, []);
      const addEvent = async () => {
      const doc = await addDoc(collection(FIREBASE_DB, 'events'), { 
        title: eventTitle,
        description: eventDescription,
        start_date: eventStartDate,
        end_date: eventEndDate,
        location: eventLocation,
        attendance: {
          positive: {
            title: positiveReponse,
            list: [],
            count: 0
          },
          negative: {
            title: negativeResponse,
            list: [],
            count: 0
          },
          optional: {
            title: optionalResponse,
            list: [],
            count: 0
          }
        }
      });
      setEventTitle('');
      setEventDescription('');
      setEventStartDate('');
      setEventStartDate('');
      setEventEndDate('');
      setEventLocation('');
      setPositiveReponse('');
      setNegativeResponse('');
      setOptionalResponse('');
      closeSheet(false);
  };

    return (
      <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.eventsView}>
              <View style={styles.addEventContainer}>
                <Text style={typography.body.medium}>{"Create a new Event"}</Text>
                <TextInput style={styles.inputText} placeholder='Event Title' onChangeText={(text: string) => setEventTitle(text)} value={eventTitle} />
                <TextInput style={styles.inputText} placeholder='Description' onChangeText={(text: string) => setEventDescription(text)} value={eventDescription} />
                <TextInput style={styles.inputText} placeholder='Start Date' onChangeText={(text: string) => setEventStartDate(text)} value={eventStartDate} />
                <TextInput style={styles.inputText} placeholder='End Date' onChangeText={(text: string) => setEventEndDate(text)} value={eventEndDate} />
                <TextInput style={styles.inputText} placeholder='Location' onChangeText={(text: string) => setEventLocation(text)} value={eventLocation} />

                <Text style={[typography.body.medium, {paddingTop: 20}]}>{"Event attendance"}</Text>
                <TextInput style={styles.inputText} placeholder='Option 1' onChangeText={(text: string) => setPositiveReponse(text)} value={positiveReponse} />
                <TextInput style={styles.inputText} placeholder='Option 2' onChangeText={(text: string) => setNegativeResponse(text)} value={negativeResponse} />
                <TextInput style={styles.inputText} placeholder='Option 3 (optional)' onChangeText={(text: string) => setOptionalResponse(text)} value={optionalResponse} />

                <Button onPress={() => addEvent()} title='Add Event' 
                  disabled={
                    eventTitle == '' || 
                    eventDescription == '' || 
                    eventStartDate == '' ||
                    eventEndDate == '' || 
                    eventLocation == '' ||
                    positiveReponse == '' || 
                    negativeResponse == '' 
                  }/>
              </View>
              <Button
                title="Close Sheet"
                onPress={() => {
                  closeSheet(false);
                }}
              />
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
    paddingTop: 100,
  },

  eventsView: {
    flex: 1,
    justifyContent: 'center',
    minWidth: '100%', 
    paddingLeft: 24,
    paddingRight: 24,
  },

  addEventContainer: {
    marginTop: 50,
  },

  inputText: {
    marginVertical: 6,
    height: 40,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },

  requestsContainer: {
    marginTop: 50,
  },
});

export default CreateNewEventScreen;