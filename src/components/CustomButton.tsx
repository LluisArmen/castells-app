import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {   
    backgroundColor: 'red', // Background color of the button
    height: 40,
    width: 150,
    padding: 10,
    borderRadius: 20,
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center', // Center content vertically
    marginBottom: 30,
  },
  buttonText: {
    color: 'white', // Text color
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;