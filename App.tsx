import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AppNavigator from './src/navigation/AppNavigator';
import { onAuthStateChanged, User } from 'firebase/auth'
import { FIREBASE_AUTH, FIREBASE_DB } from './FirebaseConfig';
import useUserStore from './src/store/UserStore';
import LoginNavigator from './src/navigation/AuthNavigator';
import { doc, getDoc } from "firebase/firestore";
import { Role, AppUser, defaultUser } from './src/models/User'

const Stack = createNativeStackNavigator();

const App = () => {
  const {user, setUser} = useUserStore()

  async function getUserData(currentUser: User): Promise<void> {
    const docRef = doc(FIREBASE_DB, "users", currentUser.uid);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) { 
        const usr = docSnap.data() as AppUser
        setUser(usr)
      } else {
        console.log('❌ Error fetching user data');
        throw new Error("Could not get User data. Please try again");
      }
    } catch (error) {
      console.error("❌ Error fetching user data: ", error);
      throw new Error("Could not get User data. Please try again");
    }
  }

  useEffect(() => {
    const handleAuthStateChange = async (currentUser: User) => {
      try {
        if (currentUser && currentUser.emailVerified) {
          console.log('-> LogIn success!!');
          await getUserData(currentUser);
          console.log('-> Current user: ', user);
        } else {
          console.log('-> User is logged out');
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };

    const authStateUnsubscribe = onAuthStateChanged(FIREBASE_AUTH, handleAuthStateChange);

    return () => {
      // Cleanup by unsubscribing from the onAuthStateChanged event
      authStateUnsubscribe();
    };
  }, []); // Empty dependency array to run the effect once on mount


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ? (
          <Stack.Screen name='Cappstells' component={AppNavigator} options={{ headerShown: false }}/>
        ) : (
          <Stack.Screen name='LoginNavigator' component={LoginNavigator}  options={{ headerShown: false }}/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;