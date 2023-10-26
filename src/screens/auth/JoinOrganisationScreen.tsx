import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Button, TextInput, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { HStack, Spacer } from 'react-native-stacks';
import { FIREBASE_DB } from '../../../FirebaseConfig';
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { typography } from '../../design/Typography';
import useUserStore from '../../store/UserStore';
import { Organisation } from '../../models/Organisation';
import useOrganisationStore from '../../store/OrganisationStore';

const JoinOrganisationScreen = () => {
    const {user, setUser} = useUserStore()
    const {setOrganisation} = useOrganisationStore()
    const [organisationId, setOrganisationId] = useState('');
    const [loading, setLoading] = useState(false);

    async function joinOrganisation() {
        try {
            setLoading(true)
            const org = await verifyOrganisationId(organisationId)
            if (org) {
                await updateOrganisationData(org)
                await updateUserData(org.id)
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error("❌ Error: could not join Organisation: ", error);
        }
        
    }

    async function verifyOrganisationId(organisationId: string) {
        console.log("-> ⏳ Checking...");
        const docRef = doc(FIREBASE_DB, "organisations", organisationId);
        try {
            const docSnap = await getDoc(docRef);
            const org = docSnap.data() as Organisation;
            setOrganisation(org);
            console.log("✅ Organisation exists: ", org.title);
            return org
        } catch (error) {
            throw new Error("Organisation does not exist or could not get the data");
        }
    }

    async function updateOrganisationData(org: Organisation): Promise<void> {
        const updatedOrganisation = org;
        updatedOrganisation.users.push(user.id);
        setOrganisation(updatedOrganisation);

        try {
            await updateDoc(doc(FIREBASE_DB, "organisations", organisationId), { 
                users: updatedOrganisation.users,
            })
            console.log("✅ Organisation data has been successfully updated!");
        } catch (error) {
            throw new Error("Could not update Organisation data. Please try again");
        }
    }

    async function updateUserData(organisationId: string): Promise<void> {
        try {
            await updateDoc(doc(FIREBASE_DB, "users", user.id), { 
                organisation: organisationId,
            })
            console.log("✅ User data has been updated!");
            const updatedUser = user;
            updatedUser.organisation = organisationId;
            setUser(updatedUser);
        } catch (error) {
            console.error("❌ Error updating user data: ", error);
            throw new Error("Could not update User. Please try again");
        }
    }

    return (
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
                        <Button title="Join" onPress={ joinOrganisation } />
                        </>
                    )}

                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
        </View>
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
        marginHorizontal: 20,
        height: 50,
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 24,
        backgroundColor: 'white',
    },

    rectangle: {
        minWidth: '85%', // Adjust width as needed
        height: 180, // Adjust height as needed
        backgroundColor: 'blue', // Set the background color
        borderRadius: 12, // Set the corner radius
        marginVertical: 24,
        
      },
});
  
export default JoinOrganisationScreen;