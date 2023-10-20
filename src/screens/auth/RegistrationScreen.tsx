import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView, Alert } from 'react-native';
import { typography } from '../../design/Typography';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';
import { HStack, Spacer } from 'react-native-stacks';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { NavigationProp } from '@react-navigation/native';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const RegistrationScreen = ({ navigation }: RouterProps) => {
  const [name, setName] = useState('');
  const [surname, setSurmame] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  function validateInputValues() {
    if (name && surname && email && password && repeatPassword) {
      if (password === repeatPassword) {
        return [true, ""]
      } else {
        return [false, "passwordMissmatch"]
      }
    } else {
      return [false, "emptyValues"]
    }
  }

  const signUp = async () => {
    setLoading(true);
    try {
      let [isValid, errorMessage] = validateInputValues()
      if (isValid) {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        console.log(response);
        Alert.alert('Done!', 'Check your email to verify your account', [
          {text: 'OK', onPress: () => navigation.navigate('Login')},
        ]);
      } else if (errorMessage === "passwordMissmatch") {
        Alert.alert('Error', 'Passwords must match', [
          {text: 'OK'},
        ]);
      } else if (errorMessage === "emptyValues") {
        Alert.alert('Error', 'Please fill in all the fields', [
          {text: 'OK'},
        ]);
      }
    } catch (error: any) {
      console.log(error);
      alert('Registration failed: ' + error.message);
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
            <Text style={typography.title.large}>{"Setup your Profile"}</Text>
            <Spacer></Spacer>
          </HStack>
          
          <TextInput value={name} style={styles.textInput} placeholder='name' onChangeText={(text) => setName(text)}></TextInput>
          <TextInput value={surname} style={styles.textInput} placeholder='surname' onChangeText={(text) => setSurmame(text)}></TextInput>
          <TextInput value={email} style={styles.textInput} placeholder='email' autoCapitalize='none' onChangeText={(text) => setEmail(text)}></TextInput>
          <TextInput secureTextEntry={true} value={password} style={[styles.textInput, {marginTop: 30}]} placeholder='password' autoCapitalize='none' onChangeText={(text) => setPassword(text)}></TextInput>
          <TextInput secureTextEntry={true} value={repeatPassword} style={styles.textInput} placeholder='repeat password' autoCapitalize='none' onChangeText={(text) => setRepeatPassword(text)}></TextInput>

          { loading ? ( <ActivityIndicator size="large" color="#0000ff"/> ) 
          : (
            <>
              <Button title="Create account" onPress={signUp} />
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

  topMargin: {
    marginTop: 30,
  },
});

export default RegistrationScreen;