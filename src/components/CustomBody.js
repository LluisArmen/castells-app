import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { typography } from '../design/Typography';

const BodyStyles = {
    medium: typography.body.medium,
    small: typography.body.small,
};

const CustomBody = ({ title, style }) => {
    const textStyle = BodyStyles[style] || typography.body.medium;
    return (
        <View style={styles.container}>
        <Text style={textStyle}>{title}</Text>
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