import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Button, TextInput, ActivityIndicator } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { typography } from '../design/Typography';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import { doc, getDoc } from "firebase/firestore";
import { HStack, Spacer, VStack } from 'react-native-stacks';
import CustomButton from '../components/CustomButton';
import useUserStore from '../store/UserStore';
import { Organisation } from '../models/Organisation';
import useOrganisationStore from '../store/OrganisationStore';
import { Role } from '../models/User';
import * as Clipboard from 'expo-clipboard';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const ProfileScreen = ({ navigation }: RouterProps) => {
  const {user, setUser} = useUserStore()
  const {organisation, setOrganisation} = useOrganisationStore()
  const [isTextCopied, setIsTextCopied] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [organisationExists, setOrganisationExists] = useState(null);
  const [loading, setLoading] = useState(false);

  function copyToClipboard(text: string) {
    Clipboard.setStringAsync(text);
  }

  async function verifyOrganisationId(organisationId: string) {
    setLoading(true)
    console.log("-> ⏳ Checking...");
    const docRef = doc(FIREBASE_DB, "organisations", organisationId);

    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const org = docSnap.data() as Organisation
        console.log("Organisation exists: ", org.title);
        setOrganisationExists(true)
        setLoading(false)
      } else {
        setLoading(false)
        throw new Error("Organisation does not exist or could not get the data");
      }
    } catch (error) {
      setOrganisationExists(false)
      console.log("❌", error);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
      <View style={styles.container}>
          <ScrollView
              contentContainerStyle={styles.scrollViewContent}
              showsVerticalScrollIndicator={false} // Optional: Hide the vertical scroll indicator  
          >
            <VStack>
              <HStack>
                <Text style={typography.header}>{"Profile"}</Text>
                <Spacer></Spacer>
              </HStack>
              <Text style={typography.body.medium}>{user.name}</Text>
              <Text style={typography.body.medium}>{user.surname}</Text>
              <Text style={typography.body.medium}>{user.email}</Text>
              <Text style={typography.body.medium}>{`You belong to the organisation:\n${organisation.title}`}</Text>
              <Text style={typography.body.medium}>{"Contact details of your Organisation:"}</Text>

              <HStack>
                <Text style={typography.body.medium}>{organisation.email}</Text>
                <Button title="Copy" onPress={() => copyToClipboard(organisation.email)} />
              </HStack>

              {(user.role === Role.admin || user.role === Role.owner) ? (
                <VStack>
                  <HStack>
                    <Text style={typography.body.medium}>{`Organisation ID:\n${organisation.id}`}</Text>
                    <Button title="Copy" onPress={() => copyToClipboard(organisation.id)} />  
                  </HStack>
                  <TextInput value={textInput} style={styles.textInput} placeholder='check if organisation exists' onChangeText={(text) => setTextInput(text)}></TextInput>
                  <HStack>
                    { loading ? ( 
                      <ActivityIndicator size="large" color="#0000ff"/> 
                    ) : (
                      <>
                        <Button title="Check" onPress={() => verifyOrganisationId(textInput)} />
                      </>
                    )}
                    
                    { organisationExists ? (
                      <Text style={typography.body.medium}>{"✅"}</Text>
                    ) : (
                      organisationExists === false ? (
                        <Text style={typography.body.medium}>{"❌"}</Text>
                      ) : (
                        <Text style={typography.body.medium}>{"❓"}</Text>
                      )
                    )}
                  </HStack>
                </VStack>
              ) : (
                <Text style={typography.body.small}>{"You are just a simple and plain User"}</Text>
              )}

              <Spacer></Spacer>
              <HStack>
                <Spacer></Spacer>
                <CustomButton title="Log Out" onPress={() => {
                    FIREBASE_AUTH.signOut(), 
                    setUser(null),
                    setOrganisation(null)
                  }} />
                <Spacer></Spacer>
              </HStack>
            </VStack>
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

  signOutButton: {
    marginBottom: 30
  },

  textInput: {
    marginVertical: 6,
    minWidth: '90%',
    height: 50,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 24,
    backgroundColor: 'white',
},
});

export default ProfileScreen;