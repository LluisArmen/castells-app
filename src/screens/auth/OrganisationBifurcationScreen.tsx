import React from 'react';
import { ScrollView, View, Text, StyleSheet, Button } from 'react-native';
import { typography } from '../../design/Typography';
import { NavigationProp } from '@react-navigation/native';
import useUserStore from '../../store/UserStore';
import { Spacer } from 'react-native-stacks';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const OrganisationBifurcationScreen = ({ navigation }: RouterProps) => {
    const {user} = useUserStore()

    return (
        <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.scrollViewContent}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={typography.header}>{`Hi ${user.name}!`}</Text>
                    <Text style={typography.title.medium}>{"Welcome to Cappstells. "}</Text>
                    <Text style={typography.body.medium}>{"Now you have to create or join an organisation:"}</Text>

                    <View style={ {marginTop: 25, flex: 1, justifyContent: 'center', alignItems: 'center',} }>
                        <Button title="Create Organisation" onPress={() => navigation.navigate('CreateOrganisationScreen')} />
                        <Button title="Join Organisation" onPress={() => navigation.navigate('JoinOrganisationScreen')} />
                    </View>

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
    },
});
  
export default OrganisationBifurcationScreen;