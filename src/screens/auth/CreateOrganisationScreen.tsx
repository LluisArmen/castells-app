import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Button, TextInput, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { FIREBASE_DB } from '../../../FirebaseConfig';
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { typography } from '../../design/Typography';
import useUserStore from '../../store/UserStore';
import { HStack, Spacer } from 'react-native-stacks';
import { emptyOrganisation } from '../../models/Organisation';
import { v4 as uuid } from 'uuid';
import { Role } from '../../models/User';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

const CreateOrganisationScreen = () => {
    const {user, setUser} = useUserStore()
    const [title, setTitle] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    async function createOrganisation() {
        setLoading(true);
        // create organisation object
        const newOrganisation = emptyOrganisation
        newOrganisation.id = uuid()
        newOrganisation.title = title
        newOrganisation.email = email
        newOrganisation.description = description
        newOrganisation.creationDate = new Date()
        newOrganisation.owerId = user.id
        newOrganisation.users = [user.id]

        // add organisation to firestore
        try {
            await setDoc(doc(FIREBASE_DB, "organisations", newOrganisation.id), newOrganisation);
            await updateUserData(newOrganisation.id)
            setLoading(false);
            console.log("🎉 New organisation added to DB!");
        } catch (error) {
            console.error("❌ Error adding document: ", error);
            setLoading(false);
            throw new Error("Could not create Organisation. Please try again");
        }
    }

    async function updateUserData(organisationId: string) {
        try {
            await updateDoc(doc(FIREBASE_DB, "users", user.id), { 
                organisationId: organisationId,
                role: user.role
            })
            console.log("🎉 User added to DB!");
            const updatedUser = user
            updatedUser.organisationId = organisationId
            updatedUser.role = Role.owner
            setUser(updatedUser)
          } catch (error) {
            console.error("❌ Error updating user data: ", error);
            throw new Error("Could not update User. Please try again");
          }
    }

    return (
        <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
            <View style={styles.container}>
                <Text style={typography.header}>{"Create Organisation"}</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <HStack>
                            <Spacer></Spacer>
                            <View style={styles.rectangle} />
                            <Spacer></Spacer>
                        </HStack>
                        <KeyboardAvoidingView behavior='position'>
                        <TextInput value={title} style={styles.textInput} placeholder='title' onChangeText={(text) => setTitle(text)}></TextInput>
                        <TextInput value={email} style={styles.textInput} placeholder='email' autoCapitalize='none' onChangeText={(text) => setEmail(text)}></TextInput>
                        <TextInput value={description} style={styles.textInput} placeholder='description' onChangeText={(text) => setDescription(text)}></TextInput>

                        { loading ? ( <ActivityIndicator size="large" color="#0000ff"/> ) 
                        : (
                            <>
                            <Button title="Create" onPress={ createOrganisation } />
                            </>
                        )}

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
  
export default CreateOrganisationScreen;