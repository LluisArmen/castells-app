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
import ModulPinyesScreen from './Admin/ModulPinyesScreen';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const AdminScreen = ({ navigation }: RouterProps) => {
  const [requestsCount, setRequestsCount] = useState(0);
  const [showEventsManager, setShowEventsManager] = useState(false);
  const [showModulPinyes, setShowModulPinyes] = useState(false);

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
        const pendingRequests = newRequests.filter(request => request.status === 'pending');
        setRequestsCount(pendingRequests.length);
      }
    });

    return () => subscriber();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false} // Optional: Hide the vertical scroll indicator  
        >
          <Text style={typography.header}>{"Admin"}</Text>
          {/* <Button title="Mòdul de Pinyes" onPress={() => navigation.navigate('ModulPinyesScreen')} /> */}
          <Button title="Mòdul de Pinyesr" onPress={() => setShowModulPinyes(true)} />
          <Modal
            animationType='slide'
            presentationStyle='overFullScreen'
            visible={showModulPinyes}
            onRequestClose={() => { setShowModulPinyes(false);}}
            >
              <ModulPinyesScreen showSheet={setShowModulPinyes}/>
          </Modal>

          <Button title="Events Manager" onPress={() => setShowEventsManager(true)} />
          <Modal
            animationType="slide"
            presentationStyle='pageSheet'
            visible={showEventsManager}
            onRequestClose={() => { setShowEventsManager(false);}}
            >
              <CreateNewEventScreen closeSheet={setShowEventsManager}/>
          </Modal>

          <Button title={`Join requests (${requestsCount})`} onPress={() => navigation.navigate('JoinRequestsScreen')} />

          <Button title="Roles Manager" onPress={() => navigation.navigate('RolesManagerScreen', { navigation: navigation as NavigationProp<any, any> })} />

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
});

export default AdminScreen;