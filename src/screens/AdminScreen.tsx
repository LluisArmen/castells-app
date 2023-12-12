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
  const [requestsCount, setRequestsCount] = useState(0);
  const [showSheet, setShowSheet] = useState(false);

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

          <Button title={`Join requests (${requestsCount})`} onPress={() => navigation.navigate('JoinRequestsScreen')} />

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