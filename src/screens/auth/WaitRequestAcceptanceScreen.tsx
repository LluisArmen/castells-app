import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Button, TextInput, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { HStack, Spacer } from 'react-native-stacks';
import { FIREBASE_DB } from '../../../FirebaseConfig';
import { doc, collection, getDocs, onSnapshot, setDoc, getDoc, updateDoc, query, where, limit } from "firebase/firestore";
import { typography } from '../../design/Typography';
import useUserStore from '../../store/UserStore';
import { Organisation } from '../../models/Organisation';
import useOrganisationStore from '../../store/OrganisationStore';
import { User } from 'firebase/auth';
import { AppUser } from '../../models/User';
import { RequestStatus } from '../../models/Request';

const WaitRequestAcceptanceScreen = () => {
    const {user, setUser} = useUserStore()
    const {organisation, setOrganisation} = useOrganisationStore()
    const [loading, setLoading] = useState(false);

    async function checkAgain() {
        setLoading(true)
        const status = await checkRequestStatus() as RequestStatus;
        console.log('-> Status:', status);
        switch (status) {
            case "pending":
                console.log('-> ⏳ Request', status);
                setLoading(false)
                break;
            case "accepted":
                console.log('-> ✅ Request', status);
                const organisationId = await getUserData() as string;
                await getOrganisationData(organisationId);
                setLoading(false)
                break;
            case "declined":
                console.log('-> ❌ Request', status);
                await getUserData();
                setLoading(false)
                break;
        }
    }

    async function checkRequestStatus(): Promise<void | RequestStatus> {
        try {
            const requestRef = collection(FIREBASE_DB, "requests");
            const requestQuery = query(requestRef, where("userId", "==", user.id));
            console.log('-> ⏳ Checking again...');
            const querySnapshot = await getDocs(requestQuery);
    
            if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0];
                const requestStatus = doc.data().status as RequestStatus;
                console.log('-> Finished checking');
                return requestStatus;
            } else {
                setLoading(false)
                console.log('Could not check request status');
            }
        } catch (error) {
            setLoading(false)
            throw new Error("Could not update User. Please try again:", error);
        }
    }

    async function getUserData() : Promise<void | string>{
        console.log('-> ⏳ Getting user data...');
        const docRef = doc(FIREBASE_DB, "users", user.id);
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) { 
            const usr = docSnap.data() as AppUser;
            setUser(usr);
            console.log('-> ✅ User data');
            return usr.organisationId
          } else {
            setLoading(false)
            throw new Error("Could not get User data. Please try again");
          }
        } catch (error) {
            setLoading(false)
          throw new Error("Could not get User data. Please try again:", error);
        }
    }

    async function getOrganisationData(organisationId: string) {
        console.log('-> ⏳ Getting organisation data...');
        const docRef = doc(FIREBASE_DB, "organisations", organisationId);
        try {
            const docSnap = await getDoc(docRef);
            const org = docSnap.data() as Organisation;
            setOrganisation(org);
            console.log('-> ✅ Organisation data');
        } catch (error) {
            setLoading(false)
            throw new Error("❌ Error: could not get Organisation data: ", error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={typography.title.medium}>{"Your request has been sent!"}</Text>
            <Text style={typography.body.medium}>{"Waiting to be accepted..."}</Text>

            { loading ? ( <ActivityIndicator size="large" color="#0000ff"/> ) 
            : (
                <>
                    <Button title="Check again" onPress={ checkAgain } />
                </>
            )}
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
  
export default WaitRequestAcceptanceScreen;