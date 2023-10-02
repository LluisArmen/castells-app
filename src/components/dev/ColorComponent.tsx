// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { VStack, HStack, Spacer } from "react-native-stacks";
// import { generateColors } from '../../design/Colors';
// import { palette1, palette2 } from '../../design/Palettes';

// const ColorComponent = () => {
//   const [colors, setColors] = useState<any>({});

//   useEffect(() => {
//     // Generate the colors object based on the selected palette
//     // const selectedPalette = user.selectedPalette || palette1;
//     const generatedColors = generateColors(palette1);

//     // Update the colors state with the generated colors
//     setColors(generatedColors);
//   }, []); // Empty dependency array to run the effect only once on component mount

//   // Define a function to generate the color sections
//   const renderColorSections = (colors: any) => {
//     const sections = [];

//     for (const category in colors) {
//       const categoryColors = colors[category];
//       const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
//       sections.push(
//         <VStack key={category} style={styles.section} alignment='leading' >
//           <Text style={styles.sectionTitle}>{capitalizedCategory}</Text>
//           {Object.entries(categoryColors).map(([name, color]) => (
//             // <HStack key={name} style={styles.colorItem}>
//             //   <View style={[styles.colorBox, { backgroundColor: color }]} />
//             //   <Text style={styles.colorName}>{` ${name.charAt(0).toUpperCase() + name.slice(1)} `}</Text>
//             //   <Spacer />
//             //   <Text style={styles.colorName}>{` ${color} `}</Text>
//             // </HStack>
//           ))}
          
//         </VStack>
//       );
//     }

//     return sections;
//   };

//   return (
//     <View style={styles.container}>
//       {renderColorSections(colors)}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   section: {
//     marginBottom: 16,
//     flexDirection: 'column',
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   colorList: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   colorItem: {
//     flexDirection: 'row',
//     alignItems: 'leading',
//     marginRight: 16,
//     marginBottom: 8,
//   },
//   colorName: {
//     marginRight: 8,
//   },
//   colorBox: {
//     width: 20,
//     height: 20,
//     borderRadius: 4,
//   },
// });

// export default ColorComponent;