import React from 'react';
import { ScrollView, View, Text, StyleSheet, Button } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { typography } from '../design/Typography';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { HStack, Spacer, VStack } from 'react-native-stacks';
import CustomButton from '../components/CustomButton';
import useUserStore from '../store/UserStore';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const ProfileScreen = ({ navigation }: RouterProps) => {
  const {user} = useUserStore()

  return (
    <View style={styles.container}>
        <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false} // Optional: Hide the vertical scroll indicator  
        >
          <VStack>
            <HStack>
              <Text style={typography.header}>{"Profile"}</Text>
              <Spacer></Spacer>
            </HStack>
            <Text style={typography.body.medium}>{user.name}</Text>
            <Text style={typography.body.medium}>{user.email}</Text>
            <Spacer></Spacer>
            <HStack>
              <Spacer></Spacer>
              <CustomButton title="Log Out" onPress={() => FIREBASE_AUTH.signOut()} />
              <Spacer></Spacer>
            </HStack>
          </VStack>

        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
      flexGrow: 1, // Allows the content to take up the available space vertically
      alignItems: 'flex-start', // Align content to the left
  },

  container: {
      flexGrow: 1, // Allow the content to take up the available space horizontally
      backgroundColor: 'white',
      justifyContent: 'center',
      minWidth: '100%',
      paddingLeft: 16,
      paddingRight: 16,
  },

  signOutButton: {
    marginBottom: 30
  }
});

export default ProfileScreen;