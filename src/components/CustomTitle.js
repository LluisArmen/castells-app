import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { typography } from '../design/Typography';

const TitleStyles = {
    large: typography.title.large,
    medium: typography.title.medium,
    small: typography.title.small,
};

const CustomTitle = ({ title, style }) => {
    const textStyle = TitleStyles[style] || typography.title.medium;
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

export default CustomTitle;