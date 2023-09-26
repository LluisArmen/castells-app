import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import * as Components from '../components';

const AgendaScreen = () => {
  return (
    <View style={styles.container}>
        <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false} // Optional: Hide the vertical scroll indicator  
        >
            {/* Your content goes here */}
            <Components.CustomHeader title="Agenda" />
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

export default AgendaScreen;