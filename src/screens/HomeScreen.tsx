import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { typography } from '../design/Typography';

const HomeScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false} // Optional: Hide the vertical scroll indicator  
            >
                <Text style={typography.header}>{"Home"}</Text>
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
        paddingTop: 60,
    },
});
  
export default HomeScreen;