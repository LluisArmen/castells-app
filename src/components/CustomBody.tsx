import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { typography } from '../design/Typography';

interface CustomBodyProps {
  title: string;
}

const CustomBody: React.FC<CustomBodyProps> = ({ title }) => {
  return (
    <View style={styles.container}>
    <Text style={typography.body.medium}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingBottom: 8,
  },
});

export default CustomBody;