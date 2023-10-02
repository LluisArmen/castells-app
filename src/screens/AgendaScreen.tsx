import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { typography } from '../design/Typography';

const AgendaScreen = () => {
  return (
    <View style={styles.container}>
        <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false} // Optional: Hide the vertical scroll indicator  
        >
            <Text style={typography.header}>{"Agenda"}</Text>
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
      paddingLeft: 16,
      paddingRight: 16,
  },
});

export default AgendaScreen;