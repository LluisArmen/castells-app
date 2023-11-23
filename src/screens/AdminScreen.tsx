import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Button, TextInput, Modal } from 'react-native';
import { typography } from '../design/Typography';
import { FIREBASE_DB } from '../../FirebaseConfig';
import { collection, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { HStack, Spacer } from 'react-native-stacks';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import useOrganisationStore from '../store/OrganisationStore';
import { RequestStatus } from '../models/Request';
import { NavigationProp } from '@react-navigation/native';
import CreateNewEventScreen from './Admin/CreateNewEventScreen';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const AdminScreen = ({ navigation }: RouterProps) => {
  const {organisation, setOrganisation} = useOrganisationStore();
  const [requests, setRequests] = useState<any[]>([]);
  const [showSheet, setShowSheet] = useState(false);

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
      }
    });

    return () => subscriber();
  }, [requests]);

  return (
    <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false} // Optional: Hide the vertical scroll indicator  
        >
          <Text style={typography.header}>{"Admin"}</Text>
          <Button title="Mòdul de Pinyes" onPress={() => navigation.navigate('ModulPinyesScreen')} />
  
          <Button title="Events Manager" onPress={() => setShowSheet(true)} />
          <Modal
            animationType="slide"
            presentationStyle='pageSheet'
            visible={showSheet}
            onRequestClose={() => { setShowSheet(false);}}
            >
              <CreateNewEventScreen closeSheet={setShowSheet}/>
          </Modal>

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

export default AdminScreen;