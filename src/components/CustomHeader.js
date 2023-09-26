import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { typography } from '../design/Typography';

const CustomHeader = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={typography.heading}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingBottom: 8,
  },
});

export default CustomHeader;