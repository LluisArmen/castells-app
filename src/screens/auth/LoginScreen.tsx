import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import { typography } from '../../design/Typography';
import { HStack, Spacer } from 'react-native-stacks';
import { NavigationProp } from '@react-navigation/native';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button, ActivityIndicator } from 'react-native-paper';
import LoginViewModel from './LoginViewModel';
import UserViewModel from './UserViewModel';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const LoginScreen = ({ navigation }: RouterProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const viewModel = LoginViewModel();
  const userViewModel = UserViewModel();

  function validateInputValues() {
    if (email && password) {
      return true
    } else {
      return false
    }
  }

  const signIn = async () => {
    setLoading(true);
    try {
      if (validateInputValues()) {
        const userId = await viewModel.logInWithParams(email, password);
        await userViewModel.getUserData(userId);
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
                  <Button mode="contained" onPress={() => signIn()}>
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