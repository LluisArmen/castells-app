import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TextInput, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { HStack, Spacer } from 'react-native-stacks';
import { FIREBASE_DB } from '../../../FirebaseConfig';
import { doc, setDoc, getDoc, updateDoc, or } from "firebase/firestore";
import { typography } from '../../design/Typography';
import useUserStore from '../../store/UserStore';
import { Organisation } from '../../models/Organisation';
import { RequestStatus, emptyRequest } from '../../models/Request';
import { NavigationProp } from '@react-navigation/native';
import useOrganisationStore from '../../store/OrganisationStore';
import { v4 as uuid } from 'uuid';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button } from 'react-native-paper';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const JoinOrganisationScreen = ({ navigation }: RouterProps) => {
    const {user, setUser} = useUserStore()
    const {setOrganisation} = useOrganisationStore()
    const [organisationId, setOrganisationId] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    async function joinOrganisation() {
        try {
            setLoading(true)
            const org = await verifyOrganisationId(organisationId)
            if (org) {
                await sendJoinRequest(org.id)
                await updateUserData()
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error("❌ Error: could send request: ", error);
        }
        
    }

    async function verifyOrganisationId(organisationId: string) {
        console.log("-> ⏳ Checking...");
        setErrorMessage("")
        const docRef = doc(FIREBASE_DB, "organisations", organisationId);
        try {
            const docSnap = await getDoc(docRef);
            const org = docSnap.data() as Organisation;
            setOrganisation(org);
            console.log("✅ Organisation exists: ", org.title);
            return org
        } catch (error) {
            setErrorMessage("❌ This organisation does not exist");
            console.error("Organisation does not exist or could not get the data: id:", organisationId);
        }
    }

    async function sendJoinRequest(organisationId: String): Promise<void> {
        setLoading(true);
        // create request object
        const newRequest = emptyRequest;
        newRequest.id = uuid();
        newRequest.userId = user.id;
        newRequest.name = user.name;
        newRequest.surname = user.surname;
        newRequest.requestDate = new Date();
        newRequest.organisationId = organisationId;
        newRequest.status = RequestStatus.pending;

        // add request to firestore
        try {
            await setDoc(doc(FIREBASE_DB, "requests", newRequest.id), newRequest);
            setLoading(false);
            console.log("✅ New request has been sent");
        } catch (error) {
            setLoading(false);
            throw new Error("Could not create Request. Please try again:", error);
        }
    }

    async function updateUserData(): Promise<void> {
        try {
            await updateDoc(doc(FIREBASE_DB, "users", user.id), { 
                organisationId: "pending",
            })
            console.log("⏳ Waiting for acceptance...");
            const updatedUser = user;
            updatedUser.organisationId = "pending";
            setUser(updatedUser);
            navigation.navigate('WaitRequestAcceptanceScreen');
        } catch (error) {
            console.error("❌ Error updating user data: ", error);
            throw new Error("Could not update User. Please try again");
        }
    }

    return (
        <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
            <View style={styles.container}>
                <Text style={typography.header}>{"Join Organisation"}</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <HStack>
                            <Spacer></Spacer>
                            <View style={styles.rectangle} />
                            <Spacer></Spacer>
                        </HStack>
                        <KeyboardAvoidingView behavior='position'>
                        <TextInput value={organisationId} style={styles.textInput} placeholder='title' onChangeText={(text) => setOrganisationId(text)}></TextInput>

                        { loading ? ( <ActivityIndicator size="large" color="#0000ff"/> ) 
                        : (
                            <>
                                <View style={styles.buttonContainer}>
                                    <Button mode="contained" onPress={joinOrganisation}>
                                        Join
                                    </Button>
                                </View>
                            </>
                        )}
                        
                        <Text style={typography.body.medium}>{errorMessage}</Text>
                        
                        </KeyboardAvoidingView>
                    </View>
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1, // Allow the content to take up the available space horizontally
        backgroundColor: 'white',
        justifyContent: 'center',
        minWidth: '100%', 
        paddingLeft: 16,
        paddingRight: 16,
    },

    textInput: {
        marginVertical: 6,
        height: 45,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 24,
        backgroundColor: 'white',
    },

    rectangle: {
        minWidth: '100%', // Adjust width as needed
        height: 180, // Adjust height as needed
        backgroundColor: 'blue', // Set the background color
        borderRadius: 12, // Set the corner radius
        marginVertical: 24,
        
    },

    buttonContainer: {
        marginTop: 48,
    },
});
  
export default JoinOrganisationScreen;