import { Platform } from 'react-native';

export const primaryFont = Platform.select({
  ios: 'Helvetica',
  android: 'Roboto',
  default: 'Arial',
});

export const typography = {
    heading: {
      fontFamily: 'Helvetica',
      fontSize: 32,
      fontWeight: 'bold',
    },
    title: {
        large: {
            fontFamily: primaryFont,
            fontSize: 28,
            fontWeight: 'bold',
        },

        medium: {
            fontFamily: primaryFont,
            fontSize: 26,
            fontWeight: 'bold',
        },

        small: {
            fontFamily: primaryFont,
            fontSize: 24,
            fontWeight: 'regular',
        },
    },
    body: {
        medium: {
            fontFamily: primaryFont,
            fontSize: 16,
            fontWeight: 'regular',
        },

        small: {
            fontFamily: primaryFont,
            fontSize: 14,
            fontWeight: 'regular',
        },
    },

    label: {
        medium: {
            fontFamily: primaryFont,
            fontSize: 24,
            fontWeight: 'bold',
        },

        small: {
            fontFamily: primaryFont,
            fontSize: 24,
            fontWeight: 'bold',
        },
    },

    button: {
        fontFamily: primaryFont,
        fontSize: 24,
        fontWeight: 'bold',
    },
    
    tag: {
        fontFamily: primaryFont,
        fontSize: 24,
        fontWeight: 'bold',
    },
};