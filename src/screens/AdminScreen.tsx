import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { typography } from '../design/Typography';
import { FIREBASE_DB } from '../../FirebaseConfig';
import { addDoc, collection, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { HStack, Spacer, VStack } from 'react-native-stacks';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Organisation } from '../models/Organisation';
import useOrganisationStore from '../store/OrganisationStore';
import { RequestStatus } from '../models/Request';
import { NavigationProp } from '@react-navigation/native';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const AdminScreen = ({ navigation }: RouterProps) => {
  const {organisation, setOrganisation} = useOrganisationStore();
  const [event, setEvent] = useState('');
  const [requests, setRequests] = useState<any[]>([]);
  const [initialFetchCompleted, setInitialFetchCompleted] = useState(false);

  async function respondRequest(requestId: string, userId: string, organisationId: string, status: RequestStatus) {
    await updateUserOrganisationId(userId, organisationId, status)
    await updateRequestData(requestId, status)
    await updateOrganisationData(userId, organisationId)
  }

  // Update request status
  async function updateUserOrganisationId(userId: string, organisationId: string, newStatus: RequestStatus): Promise<void> {
    try {
      const newOrganisationId = newStatus === "accepted" ? organisationId : newStatus
      await updateDoc(doc(FIREBASE_DB, "users", userId), { 
          organisationId: newOrganisationId,
      })
      console.log("✅ User organisation ID has been successfully updated");
    } catch (error) {
        throw new Error("Could not update User organisation ID. Please try again");
    }
  }

  // Update request status
  async function updateRequestData(requestId: string, newStatus: RequestStatus): Promise<void> {
    try {
        await updateDoc(doc(FIREBASE_DB, "requests", requestId), { 
            status: newStatus,
        })
        console.log("✅ Request status has been successfully updated");
    } catch (error) {
        throw new Error("Could not update Request status. Please try again");
    }
  }

  // Update organisation: add new user id to array of users
  async function updateOrganisationData(userId: string, organisationId: string): Promise<void> {
    const updatedOrganisation = organisation;
    updatedOrganisation.users.push(userId);
    try {
        await updateDoc(doc(FIREBASE_DB, "organisations", organisationId), { 
            users: updatedOrganisation.users,
        })
        setOrganisation(updatedOrganisation);
        console.log("✅ Organisation data has been successfully updated");
    } catch (error) {
        throw new Error("Could not update Organisation data. Please try again");
    }
  }

  useEffect(() => {}, []);
      const addEvent = async () => {
      const doc = await addDoc(collection(FIREBASE_DB, 'events'), { title: event });
      setEvent('');
  };
  //console.log('📧 You have a new join request')

  useEffect(() => {
    const requestRef = collection(FIREBASE_DB, 'requests');
    const subscriber = onSnapshot(requestRef, {
      next: (snapshot) => {
        const newRequests = [];
        snapshot.docs.forEach(doc => {
          newRequests.push({
            id: doc.id,
            ...doc.data()
          });
        });
        setRequests(newRequests);
        // // Check if the initial fetch has completed
        // if (initialFetchCompleted) {
        //   // Compare the previous requests with the newRequests length
        //   if (requests.length != newRequests.length) {
        //     console.log('📧 You have a new join request');
        //     setRequests(newRequests);
        //   }
        // } else {
        //   // If it's the initial fetch, set the initialFetchCompleted flag to true
        //   setRequests(newRequests);
        //   setInitialFetchCompleted(true);
        // }
      }
    });

    return () => subscriber();
  }, [requests]);

  return (
    <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
      <View style={styles.container}>
        <ScrollView
          // contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false} // Optional: Hide the vertical scroll indicator  
        >
          <Text style={typography.header}>{"Admin"}</Text>
          <Button title="Mòdul de Pinyes" onPress={() => navigation.navigate('ModulPinyesScreen')} />
  
          <View style={styles.addEventContainer}>
            <Text style={typography.body.medium}>{"Create a new Event"}</Text>
            <TextInput style={styles.inputText} placeholder='Title' onChangeText={(text: string) => setEvent(text)} value={event} />
            <Button onPress={() => addEvent()} title='Add Event' disabled={event === ''} />
          </View>

          <View style={styles.requestsContainer}>
            { requests.map((request) => (
              <HStack key={request.id}>
                <Text style={typography.body.small}>{request.name}</Text>
                <Spacer></Spacer>
                <Text style={typography.body.small}>{request.status}</Text>
                <Button onPress={() => respondRequest(request.id, request.userId, organisation.id, RequestStatus.accepted)} title='Accept' />
                <Button onPress={() => respondRequest(request.id, request.userId, organisation.id, RequestStatus.declined)} title='Decline' />
              </HStack>
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
    paddingTop: 60,
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

export default AdminScreen;