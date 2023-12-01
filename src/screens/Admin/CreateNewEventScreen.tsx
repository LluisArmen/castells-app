import React, { useState, useEffect } from 'react';
import { Button, View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { typography } from '../../design/Typography';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { FIREBASE_DB } from '../../../FirebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import { HStack, Spacer, VStack } from 'react-native-stacks';
import { format } from 'date-fns'

const CreateNewEventScreen = ({ closeSheet }) => {
  const minimumInterval = 15;
  const currentTimestamp = new Date().getTime();
  const interval = minimumInterval * 60 * 1000;
  const remainder = currentTimestamp % interval;
  const roundedTimestamp = currentTimestamp + (interval - remainder);
  const today = new Date(roundedTimestamp);
  const today_interval = new Date(roundedTimestamp + interval);

  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventStartDateString, setEventStartDateString] = useState('');
  const [eventStartTimeString, setEventStartTimeString] = useState('');
  const [eventEndDateString, setEventEndDateString] = useState('');
  const [eventEndTimeString, setEventEndTimeString] = useState('');
  const [eventStartDateTime, setEventStartDateTime] = useState(today);
  const [eventEndDateTime, setEventEndDateTime] = useState(today_interval);

  const [eventMinimumStartDateTime, setEventMinimumStartDateTime] = useState(today);
  const [eventMinimumEndDateTime, setEventMinimumEndDateTime] = useState(today_interval);

  const [eventLocation, setEventLocation] = useState('');

  const [positiveReponse, setPositiveReponse] = useState('');
  const [negativeResponse, setNegativeResponse] = useState('');
  const [optionalResponse, setOptionalResponse] = useState('');

  useEffect(() => {}, []);
      const addEvent = async () => {
      const doc = await addDoc(collection(FIREBASE_DB, 'events'), { 
        title: eventTitle,
        description: eventDescription,
        start_date: eventStartDateTime,
        end_date: eventEndDateTime,
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
      setEventStartDateTime(new Date());
      setEventEndDateTime(new Date());
      setEventLocation('');
      setPositiveReponse('');
      setNegativeResponse('');
      setOptionalResponse('');
      closeSheet(false);
  };

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const closeAllPickers = () => {
    if (showStartDatePicker) {
      setShowStartDatePicker(!showStartDatePicker);
    }
    if (showEndDatePicker) {
      setShowEndDatePicker(!showEndDatePicker);
    }
    if (showStartTimePicker) {
      setShowStartTimePicker(!showStartTimePicker);
    }
    if (showEndTimePicker) {
      setShowEndTimePicker(!showEndTimePicker);
    }
  }

  // TOGGLE - START DATE
  const toggleStartDatePicker = () => {
    setShowStartDatePicker(!showStartDatePicker);
    closeAllPickers();
  };

  // TOGGLE - END DATE
  const toggleEndDatePicker = () => {
    setShowEndDatePicker(!showEndDatePicker);
    closeAllPickers();
  };

  // TOGGLE - START TIME
  const toggleStartTimePicker = () => {
    setShowStartTimePicker(!showStartTimePicker);
    closeAllPickers();
  };

  // TOGGLE - END TIME
  const toggleEndTimePicker = () => {
    setShowEndTimePicker(!showEndTimePicker);
    closeAllPickers();
  };

  // ONCHANGE - START DATE
  const onChangeStartDateTime = (event, selectedDate: Date) => {
    setEventStartDateTime(selectedDate);
  };

  // ONCHANGE - END DATE
  const onChangeEndDateTime = (event, selectedDate: Date) => {
    setEventEndDateTime(selectedDate);
  };

  // CONFIRM - START DATE
  const confirmIOSStartDate = () => {
    setEventStartDateString(eventStartDateTime.toDateString());
    // Set new min end time for time picker
    setEventMinimumEndDateTime(eventStartDateTime);
    console.log("START:", eventStartDateTime)
    console.log("END:", eventEndDateTime)
    if (eventStartDateTime > eventEndDateTime) {
      setEventEndDateTime(eventStartDateTime);
      setEventEndDateString("");
    }
    toggleStartDatePicker();
  }

  // CONFIRM - END DATE
  const confirmIOSEndDate = () => {
    setEventEndDateString(eventEndDateTime.toDateString());
    toggleEndDatePicker();
  }

  // CONFIRM - START TIME
  const confirmIOSStartTime = () => {
    var formattedDate = format(eventStartDateTime, "H:mm");
    setEventStartTimeString(formattedDate);
    // Set new min end time for time picker
    const newMinimumEndTime = new Date(eventStartDateTime);
    newMinimumEndTime.setMinutes(newMinimumEndTime.getMinutes() + 15);
    setEventMinimumEndDateTime(newMinimumEndTime);
    
    if (eventStartDateTime > eventEndDateTime) {
      setEventEndDateTime(newMinimumEndTime);
      setEventEndTimeString("");
    }
    toggleStartTimePicker();
  }

  // CONFIRM - END TIME
  const confirmIOSEndTime = () => {
    var formattedDate = format(eventEndDateTime, "H:mm");
    setEventEndTimeString(formattedDate);
    toggleEndTimePicker();
  }

    return (
      <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.eventsView}>
              <View style={styles.addEventContainer}>
                <Text style={typography.body.medium}>{"Create a new Event"}</Text>
                <TextInput style={styles.inputText} placeholder='Event Title' onChangeText={(text: string) => setEventTitle(text)} value={eventTitle} />
                <TextInput style={styles.inputText} placeholder='Location' onChangeText={(text: string) => setEventLocation(text)} value={eventLocation} />
                
                <HStack>
                  <TextInput 
                    style={[
                      styles.dateTimePickerToggleButton,
                      showStartDatePicker ? { borderWidth: 2 } : null
                    ]} 
                    placeholder='Start Date'
                    value={eventStartDateString} 
                    editable={false} 
                    onPressIn={toggleStartDatePicker}
                  />

                  <TextInput 
                    style={[
                      styles.dateTimePickerToggleButton,
                      showStartTimePicker ? { borderWidth: 2 } : null,
                      {marginLeft:10}
                    ]} 
                    placeholder='Start Time'
                    value={eventStartTimeString} 
                    editable={false} 
                    onPressIn={toggleStartTimePicker}/>
                </HStack>


                { showStartDatePicker && (
                  <VStack>
                    <DateTimePicker
                      mode='date'
                      display='spinner'
                      value={eventStartDateTime}
                      onChange={onChangeStartDateTime}
                      minimumDate={eventMinimumStartDateTime}
                      style={styles.dateTimePicker}
                    />

                    <HStack>
                      <Button
                        title="Cancel"
                        onPress={() => {
                          toggleStartDatePicker()
                        }}
                      />

                      <Button
                        title="Confirm"
                        onPress={() => {
                          confirmIOSStartDate()
                        }}
                      />
                    </HStack>
                  </VStack>
                )}

                { showStartTimePicker && (
                  <VStack>
                    <DateTimePicker
                      mode='time'
                      display='spinner'
                      value={eventStartDateTime}
                      is24Hour={true}
                      onChange={onChangeStartDateTime}
                      minimumDate={eventMinimumStartDateTime}
                      minuteInterval={minimumInterval}
                      style={styles.dateTimePicker}
                    />

                    <HStack>
                      <Button
                        title="Cancel"
                        onPress={() => {
                          toggleStartTimePicker()
                        }}
                      />

                      <Button
                        title="Confirm"
                        onPress={() => {
                          confirmIOSStartTime()
                        }}
                      />
                    </HStack>
                  </VStack>
                )}

                <HStack>
                  <TextInput 
                    style={[
                      styles.dateTimePickerToggleButton,
                      showEndDatePicker ? { borderWidth: 2 } : null
                    ]}
                    placeholder='End Date'
                    value={eventEndDateString} 
                    editable={false} 
                    onPressIn={toggleEndDatePicker}
                  />
                  <TextInput 
                    style={[
                      styles.dateTimePickerToggleButton,
                      showEndTimePicker ? { borderWidth: 2 } : null,
                      {marginLeft:10}
                    ]}
                    placeholder='End Time'
                    value={eventEndTimeString} 
                    editable={false} 
                    onPressIn={toggleEndTimePicker}/>
                </HStack>

                { showEndDatePicker && (
                  <VStack>
                    <DateTimePicker
                      mode='date'
                      display='spinner'
                      value={eventEndDateTime}
                      onChange={onChangeEndDateTime}
                      minimumDate={eventMinimumEndDateTime}
                      style={styles.dateTimePicker}
                    />
                    <HStack>
                      <Button
                        title="Cancel"
                        onPress={() => {
                          toggleEndDatePicker()
                        }}
                      />

                      <Button
                        title="Confirm"
                        onPress={() => {
                          confirmIOSEndDate()
                        }}
                      />
                    </HStack>
                  </VStack>
                )}

                { showEndTimePicker && (
                  <VStack>
                    <DateTimePicker
                      mode='time'
                      display='spinner'
                      value={eventEndDateTime}
                      is24Hour={true}
                      onChange={onChangeEndDateTime}
                      minimumDate={eventMinimumEndDateTime}
                      minuteInterval={minimumInterval}
                      style={styles.dateTimePicker}
                    />
                    <HStack>
                      <Button
                        title="Cancel"
                        onPress={() => {
                          toggleEndTimePicker()
                        }}
                      />

                      <Button
                        title="Confirm"
                        onPress={() => {
                          confirmIOSEndTime()
                        }}
                      />
                    </HStack>
                  </VStack>
                )}

                <TextInput style={styles.inputText} placeholder='Description (optional)' onChangeText={(text: string) => setEventDescription(text)} value={eventDescription} />
                
                <Text style={[typography.body.medium, {paddingTop: 20}]}>{"Response options"}</Text>
                <TextInput style={styles.inputText} placeholder='Option 1' onChangeText={(text: string) => setPositiveReponse(text)} value={positiveReponse} />
                <TextInput style={styles.inputText} placeholder='Option 2' onChangeText={(text: string) => setNegativeResponse(text)} value={negativeResponse} />
                <TextInput style={styles.inputText} placeholder='Option 3 (optional)' onChangeText={(text: string) => setOptionalResponse(text)} value={optionalResponse} />

                <Button onPress={() => addEvent()} title='Add Event' 
                  disabled={
                    eventTitle == '' || 
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
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 100,
  },

  eventsView: {
    flex: 1,
    justifyContent: 'center',
    minWidth: '100%', 
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

  dateTimePickerToggleButton: {
    flex: 1,
    marginVertical: 6,
    height: 40,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    textAlign: 'center',
  },

  dateTimePicker: {
    height: 150,
    marginTop: -10,
  }
});

export default CreateNewEventScreen;