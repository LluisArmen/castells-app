import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { typography } from '../../design/Typography';
import { NavigationProp } from '@react-navigation/native';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button, ActivityIndicator } from 'react-native-paper';
import LoginViewModel from './LoginViewModel';
import UserViewModel from './UserViewModel';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}
const WaitRequestAcceptanceScreen = ({ navigation }: RouterProps) => {
    const loginViewModel = LoginViewModel();
    const userViewModel = UserViewModel();

    return (
        <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
            <View style={styles.container}>
                <Text style={typography.title.small}>{"Your request has been sent 🚀"}</Text>

                <View style={styles.textContainer}>
                    <Text style={typography.body.medium}>{"Waiting to be accepted..."}</Text>
                </View>

                { userViewModel.loading ? ( <ActivityIndicator size="large" color="#0000ff"/> ) 
                : (
                    <>
                        <View style={styles.buttonContainer}>
                            <Button mode="contained" onPress={() => userViewModel.checkRequestStatus()}>
                                Check again
                            </Button>
                        </View>

                        <View style={styles.buttonContainer}>
                            <Button mode="outlined" onPress={() => loginViewModel.logOut()}>
                                Logout
                            </Button>
                        </View>
                    </>
                )}
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

    textContainer: {
        marginTop: 16,
        marginBottom: 48
    },

    buttonContainer: {
        marginTop: 8,
    },
});
  
export default WaitRequestAcceptanceScreen;