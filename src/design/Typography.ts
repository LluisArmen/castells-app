import { Platform } from 'react-native';

export const primaryFont = Platform.select({
  ios: 'Helvetica',
  android: 'Roboto',
  default: 'Arial',
});

export const typography = {
    header: {
      fontFamily: primaryFont,
      fontSize: 32,
      fontWeight: 'bold' as 'bold',
    },
    title: {
        large: {
            fontFamily: primaryFont,
            fontSize: 28,
            fontWeight: 'bold' as 'bold',
        },

        medium: {
            fontFamily: primaryFont,
            fontSize: 26,
            fontWeight: 'bold' as 'bold',
        },

        small: {
            fontFamily: primaryFont,
            fontSize: 24,
            fontWeight: 'regular' as 'bold',
        },
    },
    body: {
        medium: {
            fontFamily: primaryFont,
            fontSize: 16,
            fontWeight: 'regular' as 'bold',
        },

        small: {
            fontFamily: primaryFont,
            fontSize: 14,
            fontWeight: 'regular' as 'bold',
        },
    },

    label: {
        medium: {
            fontFamily: primaryFont,
            fontSize: 24,
            fontWeight: 'bold' as 'bold',
        },

        small: {
            fontFamily: primaryFont,
            fontSize: 24,
            fontWeight: 'bold' as 'bold',
        },
    },

    button: {
        fontFamily: primaryFont,
        fontSize: 24,
        fontWeight: 'bold' as 'bold',
    },
    
    tag: {
        fontFamily: primaryFont,
        fontSize: 24,
        fontWeight: 'bold' as 'bold',
    },
};