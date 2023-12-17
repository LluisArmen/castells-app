import React, { useEffect, useState } from 'react';
import { FIREBASE_DB } from '../../../FirebaseConfig';
import { collection, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { typography } from "../../design/Typography";
import { HStack, Spacer } from 'react-native-stacks';
import { RequestStatus } from '../../models/Request';
import useOrganisationStore from '../../store/OrganisationStore';
import { AppUser, Role } from '../../models/User';
import useUserStore from '../../store/UserStore';

const RoleStatusScreen = ({route}) => {
    const {user, setUser} = useUserStore()
    const {selectedUser} = route.params;
    const [stateUser, setStateUser] = useState(selectedUser);
    enum Action {
        upgrade = 'UPGRADE',
        downgrade = 'DOWNGRADE'
    }

    async function updateUserRole(action: Action) {
        await setUserRole(action)
    };

    async function setUserRole(action: Action) {
        try {
            const newUserRole = action == Action.upgrade ? Role.admin : Role.user
            await updateDoc(doc(FIREBASE_DB, "users", user.id), { 
                role: newUserRole,
            })
            const updatedUser = { ...stateUser, role: newUserRole };
            setStateUser(updatedUser);
            console.log("✅ User role ID been successfully updated to:", newUserRole);
        } catch (error) {
            throw new Error("Could not update User role. Please try again");
        }
    };

    return (
        <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.requestsContainer}>
                        <HStack>
                            <Text>{stateUser.name}</Text>
                            <Text>{" "}</Text>
                            <Text>{stateUser.surname}</Text>
                        </HStack>

                        <HStack>
                            <Text>{"Role: " + stateUser.role}</Text>
                        </HStack>

                        {stateUser.id != user.id && (
                            <View>
                                {stateUser.role == Role.user ? (
                                    <Text>{"Upgrade user's role?"}</Text>
                                ) : (stateUser.role == Role.admin) && (
                                    <Text>{"Downgrade user's role?"}</Text>
                                )}

                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity 
                                        style={styles.button} 
                                        onPress={() => updateUserRole(stateUser.role == Role.user ? Action.upgrade : Action.downgrade)}
                                    >
                                        {stateUser.role == Role.user ? (
                                            <Text>{"Upgrade to " + Role.admin}</Text>
                                        ) : (stateUser.role == Role.admin) && (
                                            <Text>{"Downgrade to " + Role.user}</Text>
                                        )}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        
                        

                        
                        
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

    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    button: {
        textAlign: 'center',
        marginTop: 50,
    },
});

export default RoleStatusScreen