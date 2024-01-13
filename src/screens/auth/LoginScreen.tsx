import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, KeyboardAvoidingView, Alert } from 'react-native';
import { typography } from '../../design/Typography';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../FirebaseConfig';
import { HStack, Spacer } from 'react-native-stacks';
import { sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import { NavigationProp } from '@react-navigation/native';
import { User } from 'firebase/auth'
import { doc, getDoc } from "firebase/firestore";
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import useUserStore from '../../store/UserStore';
import { AppUser } from '../../models/User';
import { Organisation } from '../../models/Organisation';
import useOrganisationStore from '../../store/OrganisationStore';
import { Button } from 'react-native-paper';
import LoginViewModel from './LoginViewModel';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const LoginScreen = ({ navigation }: RouterProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {user, setUser} = useUserStore();
  const {setOrganisation} = useOrganisationStore();
  const auth = FIREBASE_AUTH;
  const viewModel = LoginViewModel();

  function validateInputValues() {
    if (email && password) {
      return true
    } else {
      return false
    }
  }

  // async function getUserData(currentUser: User) {
  //   console.debug("Getting user data...")
  //   const docRef = doc(FIREBASE_DB, "users", currentUser.uid);
  //   try {
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) { 
  //       const usr = docSnap.data() as AppUser;
  //       setUser(usr);
  //       console.log('-> 🙋‍♀️ Current user 2: ', user);
  //     } else {
  //       console.log('❌ Error fetching user data');
  //       throw new Error("Could not get User data. Please try again");
  //     }
  //   } catch (error) {
  //     console.error("❌ Error fetching user data: ", error);
  //     throw new Error("Could not get User data. Please try again");
  //   }
  // }

  function isUserEmailVerified(currentUser: User) {
    if (currentUser && currentUser.emailVerified) {
      console.log('-> User email is verified!');
    } else {
      Alert.alert('Error', 'Check your email to verify your account', [
        {text: 'OK'},
        {text: 'Send verification email again', onPress: () => sendEmailVerification(currentUser) },
      ]);
    }
  }

  const signIn = async () => {
    setLoading(true);
    try {
      if (validateInputValues()) {
        const response = await signInWithEmailAndPassword(auth, email, password);
        isUserEmailVerified(response.user)
        console.debug("Tapped on login...")
        viewModel.logIn();
      } else {
        Alert.alert('Error', 'Please fill in all the fields', [
          {text: 'OK'},
        ]);
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function manageNavigation() {
    console.debug("Navigation...")
    if (user.organisationId === null) {
      console.debug("NO ORG ID")
      navigation.navigate('OrganisationBifurcationScreen');
    } else if (user.organisationId === "pending") {
      console.debug("REQUEST PENDING")
      navigation.navigate('WaitRequestAcceptanceScreen');
    } else if (user.organisationId === "declined") {
      console.debug("Request declided ❌")
    } else {
      console.debug("User already belongs to org")
    }
  }

  async function manageSignIn() {
    await signIn();
  }
  return (
    <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
      <View style={styles.container}>
        <View style={styles.body}>
          <KeyboardAvoidingView behavior='position'>
            <HStack style={styles.title}>
              <Spacer></Spacer>
              <Text style={typography.title.large}>Hello!</Text>
              <Spacer></Spacer>
            </HStack>
            
            <TextInput value={email} style={styles.textInput} placeholder='Email' autoCapitalize='none' onChangeText={(text) => setEmail(text)}></TextInput>
            <TextInput secureTextEntry={true} value={password} style={styles.textInput} placeholder='Password' autoCapitalize='none' onChangeText={(text) => setPassword(text)}></TextInput>
            <View style={styles.spacer}/>

            { loading ? ( <ActivityIndicator size="large" color="#0000ff"/> ) 
            : (
              <>
                <View style={styles.buttonContainer}>
                  <Button mode="contained" onPress={() => manageSignIn()}>
                    Login
                  </Button>
                </View>
                <View style={styles.buttonContainer}>
                  <Button mode="outlined" onPress={() => navigation.navigate('Register')}>
                    Create account
                  </Button>
                </View>
              </>
            )}

          </KeyboardAvoidingView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1,
  },
  body: {
    backgroundColor: 'white',
    justifyContent: 'center',
    //marginHorizontal: 16,
    flex: 1,
  },
  title: {
    marginVertical: 16,
    marginHorizontal: 0,
  },
  textInput: {
    marginVertical: 6,
    marginHorizontal: 24,
    height: 45,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 24,
    backgroundColor: 'white',
  },

  spacer: {
    paddingVertical: 24
  },

  buttonContainer: {
    paddingHorizontal: 24,
    marginVertical: 4
  },
});

export default LoginScreen;