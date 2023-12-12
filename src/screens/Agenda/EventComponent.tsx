import React, { useState, useEffect } from 'react';
import { Button, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { typography } from '../../design/Typography';
import { HStack, Spacer, VStack, ZStack } from 'react-native-stacks';
import { FIREBASE_DB } from '../../../FirebaseConfig';
import { updateDoc, doc } from 'firebase/firestore';
import useUserStore from '../../store/UserStore';
import { AttendanceType } from '../../models/Event';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Event } from '../../models/Event';

const EventComponent = ({ event, navigation }) => {
    const {user, setUser} = useUserStore()
    const [updatedEvent, setUpdatedEvent] = useState(event);

    interface UserData {
        id: string;
        name: string;
    }

    const startDate: Date = new Date(event.start_date.seconds * 1000);
    const endDate: Date = new Date(event.end_date.seconds * 1000);

    const startDateHours = startDate.getHours().toString().padStart(2, '0');
    const startDateMinutes = startDate.getMinutes().toString().padStart(2, '0');

    const endDateHours = endDate.getHours().toString().padStart(2, '0');
    const endDateMinutes = endDate.getMinutes().toString().padStart(2, '0');

    const navigateToEventScreen = () => {
        navigation.navigate('EventScreen', { event: event as Event });
        navigation.setParams({headerTitle: "aaa"})
    };

    const isSameDay = (startDate: Date, endDate: Date) => {
        return (startDate.getDay() == endDate.getDay())
    };

    const getDuration = (startDate: Date, endDate: Date) => {
        const durationInMilliseconds = endDate.getTime() - startDate.getTime();

        const durationInHours = Math.floor(durationInMilliseconds / (1000 * 60 * 60));
        const remainingMilliseconds = durationInMilliseconds % (1000 * 60 * 60);

        const durationInMinutes = Math.floor(remainingMilliseconds / (1000 * 60));

        return { durationHours: durationInHours, durationMinutes: durationInMinutes };
    };

    const { durationHours, durationMinutes } = getDuration(startDate, endDate);

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
    
    return (
        <View style={styles.container}>           
            <VStack style={{alignItems: 'flex-start'}}>
                <HStack>
                    <Text style={[typography.body.medium, {fontWeight: "bold"}]}>{event.title}</Text>
                    <Spacer/>
                    <TouchableOpacity onPress={navigateToEventScreen}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: -10 }}>
                            <MaterialIcons name="chevron-right" size={24} color="black" />
                        </View>
                    </TouchableOpacity>
                </HStack>
                
                <Text style={typography.body.small}>{event.description}</Text>
                <Text style={typography.body.small}>{event.location}</Text>

                { isSameDay(startDate, endDate) ? (
                    <View style={styles.dateContainer}>
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
                    <View style={styles.dateContainer}>
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

                <HStack style={{paddingTop: 10}}>
                    <View style={[
                        styles.buttonContainer, 
                        optionClicked() == AttendanceType.positive ? { backgroundColor: 'gray'} : null]}
                    >
                        <Button title={updatedEvent.attendance.positive.title} onPress={() => handleAttendance(AttendanceType.positive)} color='black' />
                    </View>
                    <Spacer/>

                    <View style={[
                        styles.buttonContainer, 
                        optionClicked() == AttendanceType.negative ? { backgroundColor: 'gray' } : null]}
                    >
                        <Button title={updatedEvent.attendance.negative.title} onPress={() => handleAttendance(AttendanceType.negative)} color='black' />
                    </View>

                    <Spacer/>

                    <View style={[
                        styles.buttonContainer, 
                        optionClicked() == AttendanceType.optional ? { backgroundColor: 'gray' } : null]}
                    >
                        <Button title={updatedEvent.attendance.optional.title} onPress={() => handleAttendance(AttendanceType.optional)} color='black' />
                    </View>
                </HStack>
            </VStack>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        minWidth: '100%', 
        paddingLeft: 16,
        paddingRight: 16,
    },

    dateContainer: {
        marginBottom: 10,
        minWidth: '100%',
    },

    buttonContainer: {
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 5,
        paddingHorizontal: 10,
    }
  });

export default EventComponent;