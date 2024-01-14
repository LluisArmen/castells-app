import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { onAuthStateChanged, User } from 'firebase/auth'
import { FIREBASE_AUTH } from './FirebaseConfig';
import useUserStore from './src/store/UserStore';
import { LoginNavigator, OrganisationBifurcationNavigator, WaitRequestAcceptanceNavigator } from './src/navigation/AuthNavigator';
import { Role } from './src/models/User'
import useOrganisationStore from './src/store/OrganisationStore';
import { RequestStatus } from './src/models/Request';
import LoginViewModel from './src/screens/Auth/LoginViewModel';
import useAuthStatus from './src/store/AuthStatusStore';
import UserViewModel from './src/screens/Auth/UserViewModel';

const App = () => {
  const {user} = useUserStore();
  const {organisation} = useOrganisationStore();
  const {isSignedIn, hasJoinedOrg, requestStatus, setHasJoinedOrg, setRequestStatus} = useAuthStatus();
  const loginViewModel = LoginViewModel();
  const userViewModel = UserViewModel();

  useEffect(() => {
    const handleAuthStateChange = async (currentUser: User) => {
      try {
        if (currentUser && currentUser.emailVerified) {
          await userViewModel.getUserData(currentUser.uid);
          loginViewModel.logIn();
        } else {
          console.log('-> 👋 User is logged out');
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
          userViewModel.setRequestStatusState()
          setHasJoinedOrg(true);
        } else {
          setRequestStatus(RequestStatus.accepted);
          userViewModel.getOrganisationData(user.organisationId);
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
      console.log('-> ✅ User is logged in');
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