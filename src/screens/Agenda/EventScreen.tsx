import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Button, View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { typography } from '../../design/Typography';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { FIREBASE_DB } from '../../../FirebaseConfig';
import { addDoc, updateDoc, doc } from 'firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import { HStack, Spacer, VStack } from 'react-native-stacks';
import { format } from 'date-fns';
import { AttendanceType } from '../../models/Event';
import useUserStore from '../../store/UserStore';
import { Role } from '../../models/User';

const EventScreen = ({ route, navigation }: any) => {
  const {user, setUser} = useUserStore()
  const { event } = route.params;

  interface UserData {
    id: string;
    name: string;
  }

  const [updatedEvent, setUpdatedEvent] = useState(event);
  const [headerTitle, setHeaderTitle] = useState<string>(event?.title || '');

  const startDate: Date = new Date(event.start_date.seconds * 1000);
  const endDate: Date = new Date(event.end_date.seconds * 1000);

  const startDateHours = startDate.getHours().toString().padStart(2, '0');
  const startDateMinutes = startDate.getMinutes().toString().padStart(2, '0');

  const endDateHours = endDate.getHours().toString().padStart(2, '0');
  const endDateMinutes = endDate.getMinutes().toString().padStart(2, '0');

  const getDuration = (startDate: Date, endDate: Date) => {
    const durationInMilliseconds = endDate.getTime() - startDate.getTime();

    const durationInHours = Math.floor(durationInMilliseconds / (1000 * 60 * 60));
    const remainingMilliseconds = durationInMilliseconds % (1000 * 60 * 60);

    const durationInMinutes = Math.floor(remainingMilliseconds / (1000 * 60));

    return { durationHours: durationInHours, durationMinutes: durationInMinutes };
  };

  const { durationHours, durationMinutes } = getDuration(startDate, endDate);

  const isSameDay = (startDate: Date, endDate: Date) => {
    return (startDate.getDay() == endDate.getDay())
  };

  const userHasResponded = (attendanceList: [any]) => {
    return attendanceList.some((userData: UserData) => userData.id === user.id)
}

  const optionClicked = () => {
    if (updatedEvent.attendance.positive.list.some((userData) => userData.id === user.id)) {
        return AttendanceType.positive
    } else if (updatedEvent.attendance.negative.list.some(userData => userData.id === user.id)) {
        return AttendanceType.negative
    } else if (updatedEvent.attendance.optional.list.some(userData => userData.id === user.id)) {
        return AttendanceType.optional
    } else {
        return null
    }
}

  const handleAttendance = async (type: AttendanceType) => {
    if (userHasResponded(updatedEvent.attendance.positive.list) || 
        userHasResponded(updatedEvent.attendance.negative.list) ||
        userHasResponded(updatedEvent.attendance.optional.list)) {
        console.log('User has already responded...');
        return;
    }

    switch(type) {
      case AttendanceType.positive:
        if (!userHasResponded(updatedEvent.attendance.positive.list)) {
            updatedEvent.attendance.positive.count += 1;
            const userData: UserData = {
              id: user.id,
              name: (user.name + " " + user.surname)
            }
            updatedEvent.attendance.positive.list.push(userData);
        }
        break;
        
      case AttendanceType.negative:
        if (!userHasResponded(updatedEvent.attendance.negative.list)) {
            updatedEvent.attendance.negative.count += 1;
            const userData: UserData = {
              id: user.id,
              name: (user.name + " " + user.surname)
            }
            updatedEvent.attendance.negative.list.push(userData);
        }
        break;
  
      case AttendanceType.optional:
        if (!userHasResponded(updatedEvent.attendance.optional.list)) {
            updatedEvent.attendance.optional.count += 1;
            const userData: UserData = {
              id: user.id,
              name: (user.name + " " + user.surname)
            }
            updatedEvent.attendance.optional.list.push(userData);
        }
        break;
    }

    await updateEvent();
    await updateEventInFirestore();
  };

  const updateEvent = async () => {
    setUpdatedEvent(updatedEvent);
  }

  const updateEventInFirestore = async () => {
    try {
      const eventDocRef = doc(FIREBASE_DB, 'events', updatedEvent.id);
  
      // Update the document with the modified event data
      await updateDoc(eventDocRef, updatedEvent);
      console.log('✅ Event updated successfully in Firestore!');
    } catch (error) {
      console.error('❌ Error updating event in Firestore:', error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: event.title,
    });
  }, [navigation, headerTitle]);
  
  return (
    <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.eventView}>
            <Text style={[typography.title.small, {fontWeight: "bold"}]}>{"Description"}</Text>
            <View style={styles.stackView}>
              <Text style={typography.body.small}>{event.description}</Text>
            </View>

            <Text style={[typography.title.small, {fontWeight: "bold"}]}>{"Location"}</Text>
            <View style={styles.stackView}>
              <Text style={typography.body.small}>{event.location}</Text>
            </View>

            <Text style={[typography.title.small, {fontWeight: "bold"}]}>{"When?"}</Text>
            <View style={styles.stackView}>
              { isSameDay(startDate, endDate) ? (
                <View>
                  <HStack>
                      <Text style={typography.body.small}>
                          {startDate.toDateString()}
                      </Text>
                      <Spacer/>

                      <VStack>
                          <Text style={typography.body.small}>
                              {startDateHours}:{startDateMinutes}h
                          </Text>
                      </VStack>
                  </HStack>

                  <Text style={typography.body.small}>
                      Duration: {durationHours}h{durationMinutes > 0 ? durationMinutes : null}
                  </Text>
                </View>
              ) : (
                <View>
                  <HStack>
                    <Text style={typography.body.small}>
                        {startDate.toDateString()}
                    </Text>
                    <Spacer/>
                    <Text style={typography.body.small}>
                        {startDateHours}:{startDateMinutes}h
                    </Text>
                  </HStack>

                  <HStack>
                    <Text style={typography.body.small}>
                        {endDate.toDateString()}
                    </Text>
                    <Spacer/>
                    <Text style={typography.body.small}>
                        {endDateHours}:{endDateMinutes}h
                    </Text>
                  </HStack>
                </View>
              )}
            </View>


            <HStack style={{paddingTop: 100, paddingBottom: 30}}>
              <View style={[
                  styles.buttonContainer, 
                  optionClicked() == AttendanceType.positive ? { backgroundColor: 'gray'} : null]}
              >
                  <Button title={event.attendance.positive.title} onPress={() => handleAttendance(AttendanceType.positive)} color='black' />
              </View>
              <Spacer/>

              <View style={[
                  styles.buttonContainer, 
                  optionClicked() == AttendanceType.negative ? { backgroundColor: 'gray' } : null]}
              >
                  <Button title={event.attendance.negative.title} onPress={() => handleAttendance(AttendanceType.negative)} color='black' />
              </View>

              <Spacer/>

              <View style={[
                  styles.buttonContainer, 
                  optionClicked() == AttendanceType.optional ? { backgroundColor: 'gray' } : null]}
              >
                  <Button title={event.attendance.optional.title} onPress={() => handleAttendance(AttendanceType.optional)} color='black' />
              </View>
            </HStack>

            {user.role == Role.admin || user.role == Role.owner && (
              <Button onPress={() => navigation.navigate('EventAssistanceScreen', { event: event as Event })} title='Assistance'/>
            )}

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
    paddingTop: 40,
  },

  eventView: {
    flex: 1,
    justifyContent: 'center',
    minWidth: '100%', 
  },

  stackView: {
    flex: 1,
    justifyContent: 'flex-start',
    minWidth: '100%',
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 8,
    marginBottom: 25,
  },

  buttonContainer: {
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
}
});

export default EventScreen;