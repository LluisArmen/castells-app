import React, { useEffect, useState } from 'react';
import { FIREBASE_DB } from '../../../FirebaseConfig';
import { collection, onSnapshot, updateDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { typography } from "../../design/Typography";
import { HStack, Spacer } from 'react-native-stacks';
import { RequestStatus } from '../../models/Request';
import useOrganisationStore from '../../store/OrganisationStore';
import { AppUser } from '../../models/User';

const RolesManagerScreen = ( {navigation} ) => {
    const {organisation, setOrganisation} = useOrganisationStore()
    const [users, setUsers] = useState<AppUser[]>([]);

    const navigateToRoleStatusScreen = (user: AppUser) => {
        navigation.navigate('RoleStatusScreen', { selectedUser: user as AppUser });
    };

    async function getUsers(usersId: string[]): Promise<AppUser[]> {
        const userObjects: AppUser[] = [];
        const organisationUsers = collection(FIREBASE_DB, "users");
        const q = query(organisationUsers, where('id', 'in', usersId));
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                userObjects.push({ id: doc.id, ...doc.data() } as AppUser);
            });
        } catch (error) {
            console.error('Error fetching users:', error);
        }

        return userObjects
    }

    // Function to batch array into chunks
    function chunkArray(array: string[], chunkSize: number): string[][] {
        return Array(Math.ceil(array.length / chunkSize))
            .fill(null)
            .map((_, index) => array.slice(index * chunkSize, (index + 1) * chunkSize));
    } 

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const chunkedIds = chunkArray(organisation.users, 30);
            const fetchedUsers: AppUser[] = [];
            for (const chunk of chunkedIds) {
                const usersChunk = await getUsers(chunk);
                fetchedUsers.push(...usersChunk);
            }
            setUsers(fetchedUsers);
          } catch (error) {
            console.error('Error fetching users:', error);
          }
        };
    
        fetchUsers();
    }, []);

    return (
        <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.requestsContainer}>
                        <Text>Status</Text>
                        <View>
                            {users.map((usr, index) => (
                                <View key={index} style={styles.user}>
                                    <TouchableOpacity onPress={() => navigateToRoleStatusScreen(usr)}>
                                        <HStack>
                                            <Text style={typography.body.small}>{usr.name}</Text>
                                            <Text style={typography.body.small}>{" " + usr.surname}</Text>
                                            <Spacer/>
                                            <Text style={typography.body.small}>{usr.role}</Text>
                                        </HStack>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
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

    user: {
        flexGrow: 1, // Allow the content to take up the available space horizontally
        backgroundColor: 'white',
        justifyContent: 'center',
        minWidth: '100%',
    },
});

export default RolesManagerScreen