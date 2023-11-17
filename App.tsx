import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;



// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
// import Ionicons from 'react-native-vector-icons/Ionicons';


// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Home!</Text>
//     </View>
//   );
// }

// function SettingsScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Settings!</Text>
//     </View>
//   );
// }

// function ProfileScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Profile!</Text>
//     </View>
//   );
// }

// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;
            
//             checkSwitch=(route)=>{
//               switch(route.name) {
//                 case 'Home':
//                   iconName = focused
//                   ? 'ios-information-circle'
//                   : 'ios-information-circle-outline';
//                   return <Ionicons name={iconName} size={size} color={color} />;
                  
//                 case 'Settings':
//                   iconName = focused 
//                   ? 'ios-list-box' 
//                   : 'ios-list';
//                   return <Ionicons name={iconName} size={size} color={color} />;

//                 case 'Profile':
//                 iconName = focused 
//                   ? 'ios-list-box' 
//                   : 'ios-list';
//                   return <Ionicons name={iconName} size={size} color={color} />;

//                 default:
//                   return null
//               }
//             }

//             //return <Ionicons name={iconName} size={size} color={color} />;
//             /* if (route.name === 'Home') {
//               iconName = focused
//                 ? 'ios-information-circle'
//                 : 'ios-information-circle-outline';
//             } else if (route.name === 'Settings') {
//               iconName = focused ? 'ios-list-box' : 'ios-list';
//             } */

//             /* // You can return any component that you like here!
//             return <Ionicons name={iconName} size={size} color={color} />; */
//           },
//           tabBarActiveTintColor: 'tomato',
//           tabBarInactiveTintColor: 'gray',
//         })}
//       >
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Settings" component={SettingsScreen} />
//         <Tab.Screen name="Profile" component={ProfileScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });




// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }


// /* export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// } */

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
