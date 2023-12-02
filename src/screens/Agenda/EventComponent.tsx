import React, { useState, useEffect } from 'react';
import { Button, View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { typography } from '../../design/Typography';
import { HStack, Spacer, VStack } from 'react-native-stacks';
import { FIREBASE_DB } from '../../../FirebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { Event } from '../../models/Event';

const EventComponent = ({ event }) => {
    const startDate: Date = new Date(event.start_date.seconds * 1000);
    const endDate: Date = new Date(event.end_date.seconds * 1000);

    const startDateHours = startDate.getHours().toString().padStart(2, '0');
    const startDateMinutes = startDate.getMinutes().toString().padStart(2, '0');

    const endDateHours = endDate.getHours().toString().padStart(2, '0');
    const endDateMinutes = endDate.getMinutes().toString().padStart(2, '0');

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

    
    return (
        <View style={styles.container}>
            <VStack style={{alignItems: 'flex-start'}}>
                <Text style={[typography.body.medium, {fontWeight: "bold"}]}>{event.title}</Text>
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
                    <Text style={[typography.body.small, {fontWeight: "bold"}]}>{event.attendance.positive.title}</Text>
                    <Spacer/>
                    <Text style={[typography.body.small, {fontWeight: "bold"}]}>{event.attendance.negative.title}</Text>
                    <Spacer/>
                    {event.attendance.optional.title ? (
                        <Text style={[typography.body.small, {fontWeight: "bold"}]}>{event.attendance.optional.title}</Text>
                    ) : (
                        <Spacer/>
                    )}
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
        paddingLeft: 24,
        paddingRight: 24,
    },

    dateContainer: {
        marginBottom: 10,
        minWidth: '100%',
    },
  });

export default EventComponent;