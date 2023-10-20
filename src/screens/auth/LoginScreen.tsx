import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView, Alert } from 'react-native';
import { typography } from '../../design/Typography';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';
import { HStack, Spacer } from 'react-native-stacks';
import { sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import { NavigationProp } from '@react-navigation/native';
import { User } from 'firebase/auth'

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const LoginScreen = ({ navigation }: RouterProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  function validateInputValues() {
    if (email && password) {
      return true
    } else {
      return false
    }
  }

  function isUserEmailVerified(currentUser: User) {
    if (currentUser && currentUser.emailVerified) {
      console.log('-> User email is verified');
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
      } else {
        Alert.alert('Error', 'Please fill in all the fields', [
          {text: 'OK'},
        ]);
      }
    } catch (error: any) {
      console.log(error);
      alert('Sign In failed: ' + error.message);
    } finally {
      setLoading(false);
      }
  }

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <KeyboardAvoidingView behavior='position'>
          <HStack style={styles.title}>
            <Spacer></Spacer>
            <Text style={typography.title.large}>{"Login"}</Text>
            <Spacer></Spacer>
          </HStack>
          
          <TextInput value={email} style={styles.textInput} placeholder='Email' autoCapitalize='none' onChangeText={(text) => setEmail(text)}></TextInput>
          <TextInput secureTextEntry={true} value={password} style={styles.textInput} placeholder='Password' autoCapitalize='none' onChangeText={(text) => setPassword(text)}></TextInput>
          
          { loading ? ( <ActivityIndicator size="large" color="#0000ff"/> ) 
          : (
            <>
              <Button title="Login" onPress={signIn} />
              <Button title="Create account" onPress={() => navigation.navigate('Register')} />
            </>
          )}

        </KeyboardAvoidingView>
      </View>
    </View>
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
    marginHorizontal: 20,
    flex: 1,
  },
  title: {
    marginVertical: 16,
    marginHorizontal: 20,
  },
  textInput: {
    marginVertical: 6,
    marginHorizontal: 20,
    height: 50,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 24,
    backgroundColor: 'white',
  },
});

export default LoginScreen;