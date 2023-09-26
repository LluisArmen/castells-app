import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { VStack, HStack, Spacer } from "react-native-stacks";
import * as Components from '../components';

const DevScreen = () => {
  return (
    <View style={styles.container}>
        <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false} // Optional: Hide the vertical scroll indicator  
        >
            {/* Your content goes here */}
            <Components.CustomHeader title="Header" />
            <Components.CustomTitle title="Title Large" style='large' />
            <Components.CustomTitle title="Title Medium" style='medium' />
            <Components.CustomTitle title="Title Small" style='small' />
            <Components.CustomBody title="Body Medium" style='medium' />
            <Components.CustomBody title="Body Small" style='small' />
            <Components.ColorComponent />
        </ScrollView>
    </View>
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
    },
});
  
export default DevScreen;