import React, { useState, useEffect } from 'react';
import { Button, View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { typography } from '../../design/Typography';
import { HStack, Spacer, VStack } from 'react-native-stacks';
import { FIREBASE_DB } from '../../../FirebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

const EventComponent = ({ event }) => {
    return (
        <View style={styles.container}>
            <VStack style={{alignItems: 'flex-start'}}>
                <Text style={[typography.body.medium, {fontWeight: "bold"}]}>{event.title}</Text>
                <Text style={typography.body.small}>{event.description}</Text>

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
  });

export default EventComponent;