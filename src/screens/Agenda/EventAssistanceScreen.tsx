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

const EventAssistanceScreen = ({ route }: any) => {
    const { event } = route.params;
  
  return (
    <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Text style={[typography.title.small, {fontWeight: "bold"}]}>{event.attendance.positive.title}</Text>
            <View style={styles.stackView}>
                {event.attendance.positive.count > 0 ? (
                    event.attendance.positive.list.map((item, index) => (
                        <View key={index} style={styles.attendant}>
                            <Text style={typography.body.small}>{item.name}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={typography.body.small}>{"-"}</Text>
                )}
            </View>

            <Text style={[typography.title.small, {fontWeight: "bold"}]}>{event.attendance.negative.title}</Text>
            <View style={styles.stackView}>
                {event.attendance.negative.count > 0 ? (
                    event.attendance.negative.list.map((item, index) => (
                        <View key={index} style={styles.attendant}>
                            <Text style={typography.body.small}>{item.name}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={typography.body.small}>{"-"}</Text>
                )}
            </View>

            {event.attendance.optional.title && (
                <View>
                    <Text style={[typography.title.small, {fontWeight: "bold"}]}>{event.attendance.optional.title}</Text>
                    <View style={styles.stackView}>
                        {event.attendance.optional.count > 0 ? (
                            event.attendance.optional.list.map((item, index) => (
                                <View key={index} style={styles.attendant}>
                                    <Text style={typography.body.small}>{item.name}</Text>
                                </View>
                        ))
                ) : (
                    <Text style={typography.body.small}>{"-"}</Text>
                )}
                    </View>
                </View>
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
    paddingHorizontal: 16,
    paddingTop: 30,
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

  attendant: {
    flexGrow: 1, // Allow the content to take up the available space horizontally
    backgroundColor: 'white',
    justifyContent: 'center',
    minWidth: '100%',
  },
});

export default EventAssistanceScreen;