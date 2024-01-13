import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { onAuthStateChanged, User } from 'firebase/auth'
import { FIREBASE_AUTH, FIREBASE_DB } from './FirebaseConfig';
import useUserStore from './src/store/UserStore';
import { LoginNavigator, OrganisationBifurcationNavigator, WaitRequestAcceptanceNavigator } from './src/navigation/AuthNavigator';
import { doc, getDoc} from "firebase/firestore";
import { Role, AppUser } from './src/models/User'
import { Organisation } from './src/models/Organisation';
import useOrganisationStore from './src/store/OrganisationStore';
import { RequestStatus } from './src/models/Request';
import LoginViewModel from './src/screens/Auth/LoginViewModel';
import useAuthStatus from './src/store/AuthStatusStore';

const App = () => {
  const {user, setUser} = useUserStore();
  const {organisation, setOrganisation} = useOrganisationStore();
  const {isSignedIn, hasJoinedOrg, requestStatus, setHasJoinedOrg, setRequestStatus} = useAuthStatus();
  const loginViewModel = LoginViewModel();

  async function getUserData(currentUser: User) {
    console.log('-> ⏳ Getting user data...');
    const docRef = doc(FIREBASE_DB, "users", currentUser.uid);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) { 
        const usr = docSnap.data() as AppUser;
        setUser(usr);
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
          await getUserData(currentUser);
          loginViewModel.logIn();
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

  useEffect(() => {
    if (user) {
      console.log('-> 🙋‍♀️ Current user: ', user);
      if (user.organisationId) {
        if (user.organisationId in RequestStatus) {
          if (user.organisationId == RequestStatus.accepted) {
            setRequestStatus(RequestStatus.accepted);
          } else if (user.organisationId == RequestStatus.pending) {
            setRequestStatus(RequestStatus.pending);
          } else if (user.organisationId == RequestStatus.declined) {
            setRequestStatus(RequestStatus.declined);
          }
          setHasJoinedOrg(true);
        } else {
          getOrganisationData(user.organisationId);
          setHasJoinedOrg(true);
        }
      } else {
        console.log('User exists but no organisation id...')
        setHasJoinedOrg(false);
      }
    }
  }, [user]);

  useEffect(() => {
    if (organisation) {
      console.log("-> 📎 My organisation is called: ", organisation.title);
    }
  }, [organisation]);

  return (
    <NavigationContainer>
      {(isSignedIn && hasJoinedOrg != null) ? (
          hasJoinedOrg == true ? (
            (requestStatus == RequestStatus.accepted || user.role == Role.owner) ? (
              <AppNavigator/>
            ) : (
              requestStatus == RequestStatus.pending) ? (
                <WaitRequestAcceptanceNavigator/> 
              ) : (
                requestStatus == RequestStatus.declined) && (
                  <LoginNavigator/>
                )
          ) : (
            <OrganisationBifurcationNavigator/>
          )
      ) : (
        <LoginNavigator/>
      )}
    </NavigationContainer>
  );
};

export default App;