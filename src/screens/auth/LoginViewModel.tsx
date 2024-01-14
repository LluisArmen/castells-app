import { Alert } from 'react-native';
import { AppUser } from '../../models/User';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../FirebaseConfig';
import { setDoc, doc } from "firebase/firestore";
import useAuthStatus from '../../store/AuthStatusStore';
import { User, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react';

const LoginViewModel = () => {
  const {setSignIn, setHasJoinedOrg, setRequestStatus} = useAuthStatus();
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  async function logInWithParams(email: string, password: string) {
    console.log('-> ⏳ Logging in...');
    const response = await signInWithEmailAndPassword(auth, email, password);
    if (isUserEmailVerified(response.user)) {
      logIn();
      return response.user.uid;
    }
  }

  async function logIn() {
    setSignIn(true);
  }

  function logOut() {
    FIREBASE_AUTH.signOut();
    setSignIn(false);
    setHasJoinedOrg(null);
    setRequestStatus(null);
  }

  function isUserEmailVerified(currentUser: User) {
    if (currentUser && currentUser.emailVerified) {
      console.log('-> ✅ User email is verified');
      return true;
    } else {
      Alert.alert('Error', 'Check your email to verify your account', [
        {text: 'OK'},
        {text: 'Send verification email again', onPress: () => sendEmailVerification(currentUser) },
      ]);
      return false;
    }
  }
  
  async function storeUserToFirestore(newUser: AppUser): Promise<void> {
    try {
      await setDoc(doc(FIREBASE_DB, "users", newUser.id), newUser);
      console.log("🎉 User added to DB!");
    } catch (error) {
      console.error("❌ Error adding document: ", error);
      throw new Error("Could not create User. Please try again");
    }
  }

  return {
    loading,
    setLoading,
    logIn,
    logInWithParams,
    logOut,
    storeUserToFirestore
  };
};

export default LoginViewModel;