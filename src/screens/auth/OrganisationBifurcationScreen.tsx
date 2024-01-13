import React, { useLayoutEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { typography } from '../../design/Typography';
import { NavigationProp } from '@react-navigation/native';
import useUserStore from '../../store/UserStore';
import { Spacer } from 'react-native-stacks';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-paper';
import LoginViewModel from './LoginViewModel';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const OrganisationBifurcationScreen = ({ navigation }: RouterProps) => {
    const {user} = useUserStore()
    const viewModel = LoginViewModel();

    return (
        <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.scrollViewContent}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={typography.header}>{`Hi ${user.name}!`}</Text>
                    <Text style={typography.title.medium}>{"Welcome to Cappstells. "}</Text>
                
                    <View style={styles.rectangle}>
                        {/* IMAGE */}
                    </View>
                    
                    <View style={styles.textContainer}>
                        <Text style={typography.body.medium}>{"Now you have to create or join an organisation:"}</Text>
                    </View>
                    
                    <View style={styles.buttonContainer}>
                        <Button mode="contained" onPress={() => navigation.navigate('JoinOrganisationScreen')}>
                            Join Organisation
                        </Button>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button mode="outlined" onPress={() => navigation.navigate('CreateOrganisationScreen')}>
                            Create Organisation
                        </Button>
                    </View>

                    <View style={styles.logoutButtonContainer}>
                        <Button mode="text" onPress={() => {
                            console.debug("Tapped on logout");
                            viewModel.logOut();
                        }}>
                            Logout
                        </Button>
                    </View>

                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1, // Allows the content to take up the available space vertically
    },

    container: {
        flexGrow: 1, // Allow the content to take up the available space horizontally
        backgroundColor: 'white',
        justifyContent: 'center',
        minWidth: '100%', 
        paddingLeft: 16,
        paddingRight: 16,
    },

    textContainer: {
        marginVertical: 16,
    },

    buttonContainer: {
        marginTop: 8
    },

    logoutButtonContainer: {
        marginTop: 240
    },

    rectangle: {
        minWidth: '85%', // Adjust width as needed
        height: 180, // Adjust height as needed
        backgroundColor: 'blue', // Set the background color
        borderRadius: 12, // Set the corner radius
        marginVertical: 24,
    },

    iconButton: {
        position: 'absolute',
        top: 16,
        left: 16,
    },
});
  
export default OrganisationBifurcationScreen;