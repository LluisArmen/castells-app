import React, { useEffect, useState } from 'react';
import { FIREBASE_DB } from '../../../FirebaseConfig';
import { collection, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { View, Text, TouchableWithoutFeedback, Keyboard, Button, StyleSheet, ScrollView } from "react-native";
import { typography } from "../../design/Typography";
import { HStack, Spacer } from 'react-native-stacks';
import { RequestStatus } from '../../models/Request';
import useOrganisationStore from '../../store/OrganisationStore';

const JoinRequestsScreen = () => {
    const {organisation, setOrganisation} = useOrganisationStore();
    const [requests, setRequests] = useState<any[]>([]);

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
      }, []);

    return (
        <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
            <View style={styles.container}>
                <ScrollView>
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
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1, // Allow the content to take up the available space horizontally
        backgroundColor: 'white',
        justifyContent: 'center',
        minWidth: '100%', 
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 100,
    },

    requestsContainer: {
        marginTop: 50,
      },
});

export default JoinRequestsScreen