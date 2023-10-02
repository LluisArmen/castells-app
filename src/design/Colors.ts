import { Palette } from "./Palettes";

export const generateColors = (chosenPalette: Palette) => {
    return {
        background: {
            primary: chosenPalette.primary,
            secondary: chosenPalette.secondary,
        },
        text: {
            primary: chosenPalette.primary,
            secondary: chosenPalette.secondary,
        },
        icon: {
            primary: chosenPalette.primary,
            secondary: chosenPalette.secondary,
        },
        stroke: {
            primary: chosenPalette.primary,
            secondary: chosenPalette.secondary,
        },
        fill: {
            primary: chosenPalette.primary,
            secondary: chosenPalette.secondary, 
        },
    };
};
  
