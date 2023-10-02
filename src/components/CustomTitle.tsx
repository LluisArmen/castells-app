import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { typography } from '../design/Typography';

interface CustomTitleProps {
  title: string;
}

const CustomTitle: React.FC<CustomTitleProps> = ({ title }) => {
  return (
      <View style={styles.container}>
      <Text style={typography.title.medium}>{title}</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingBottom: 8,
  },
});

export default CustomTitle;