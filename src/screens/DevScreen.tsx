import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { typography } from '../design/Typography';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Components from '../components';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

const DevScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false} // Optional: Hide the vertical scroll indicator  
            >
                <Text style={typography.header}>{"Dev"}</Text>
                {/* Your content goes here */}
                <Components.RoleSwitchComponent />
                <Text style={typography.header}>{"Header"}</Text>
                <Text style={typography.title.large}>{"Title Medium"}</Text>
                <Text style={typography.title.medium}>{"Title Medium"}</Text>
                <Text style={typography.title.small}>{"Title Small"}</Text>
                <Text style={typography.body.medium}>{"Body Medium"}</Text>
                <Text style={typography.body.small}>{"Body Small"}</Text>
                {/* <Components.ColorComponent /> */}
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
        paddingTop: 100,
    },
});
  
export default DevScreen;