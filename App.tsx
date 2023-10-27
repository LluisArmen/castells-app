import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AppNavigator from './src/navigation/AppNavigator';
import { onAuthStateChanged, User } from 'firebase/auth'
import { FIREBASE_AUTH, FIREBASE_DB } from './FirebaseConfig';
import useUserStore from './src/store/UserStore';
import { LoginNavigator, OrganisationBifurcationNavigator, WaitRequestAcceptanceNavigator } from './src/navigation/AuthNavigator';
import { doc, getDoc, getDocs, updateDoc, collection, onSnapshot, query, where, limit, QueryDocumentSnapshot } from "firebase/firestore";
import { Role, AppUser, defaultUser } from './src/models/User'
import { Organisation } from './src/models/Organisation';
import useOrganisationStore from './src/store/OrganisationStore';

const Stack = createNativeStackNavigator();

const App = () => {
  const {user, setUser} = useUserStore()
  const {organisation, setOrganisation} = useOrganisationStore()

  async function getUserData(currentUser: User) {
    const docRef = doc(FIREBASE_DB, "users", currentUser.uid);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) { 
        const usr = docSnap.data() as AppUser;
        setUser(usr);
        console.log('-> 🙋‍♀️ Current user: ', usr);
        return usr.organisationId
      } else {
        console.log('❌ Error fetching user data');
        throw new Error("Could not get User data. Please try again");
      }
    } catch (error) {
      console.error("❌ Error fetching user data: ", error);
      throw new Error("Could not get User data. Please try again");
    }
  }

  async function getOrganisationData(organisationId: string) {
    console.log('-> ⏳ Getting organisation data...');
    try {
      const docRef = doc(FIREBASE_DB, "organisations", organisationId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const org = docSnap.data() as Organisation;
        console.log("-> 📎 My organisation is called: ", org.title);
        setOrganisation(org);
      } else {
        console.log("❌ Error: could not get Organisation data1");
        throw new Error("Could not get Organisation data. Please try again");
      }
    } catch (error) {
      console.log("❌ Error: could not get Organisation data2:", error);
      throw new Error("❌ Error: could not get Organisation data3: ", error);
    }
  }

  useEffect(() => {
    // AUTHENTICATION STATE OBSERVATION
    const handleAuthStateChange = async (currentUser: User) => {
      try {
        if (currentUser && currentUser.emailVerified) {
          const organisationId = await getUserData(currentUser);
          console.log('-> OrganisationId:', organisationId);
          if (organisationId) {
            await getOrganisationData(organisationId);
            console.log('-> LogIn success!!');
          } else {
            console.log('-> LogIn but no organisation...');
          }
        } else {
          console.log('-> User is logged out');
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };

    const authStateUnsubscribe = onAuthStateChanged(FIREBASE_AUTH, handleAuthStateChange);

    return () => { 
      authStateUnsubscribe();
    };
  }, []);

  return (
    <NavigationContainer>
      { user && user.organisationId ? (
        user.organisationId ? (
          (user.organisationId === "pending") ? (
            <Stack.Navigator initialRouteName="WaitRequestAcceptanceScreen">
              <Stack.Screen name='WaitRequestAcceptanceNavigator' component={WaitRequestAcceptanceNavigator} options={{ headerShown: false }}/>
            </Stack.Navigator>
          ) : (user.organisationId === "declined") ? (
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name='LoginNavigator' component={LoginNavigator}  options={{ headerShown: false }}/>
            </Stack.Navigator>
          ) : (
            <AppNavigator />
          )
        ) : (
          <Stack.Navigator initialRouteName="OrganisationBifurcationScreen">
            <Stack.Screen name='OrganisationBifurcationNavigator' component={OrganisationBifurcationNavigator} options={{ headerShown: false }}/>
          </Stack.Navigator>
        )
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name='LoginNavigator' component={LoginNavigator}  options={{ headerShown: false }}/>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;