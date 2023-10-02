import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { typography } from '../design/Typography';

interface CustomHeaderProps {
  title: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={typography.header}>{title}</Text>
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