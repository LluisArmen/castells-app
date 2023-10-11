import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { HStack, Spacer } from "react-native-stacks";
import useUserStore from '../../store/UserStore';


const RoleSwitchComponent = () => {
  const {user, setRole} = useUserStore()
        
  const toggleRole = () => {
    // Toggle the user role between 'Admin' and 'User'
    const isAdmin = user.isAdmin === true ? false : true;
    setRole(!user.isAdmin)
  };

  return (
    // <HStack style={styles.container}>
    //   <Text style={styles.label}>Role: </Text>
    //   <Text style={styles.role}>{user.role}</Text>
    //   <Spacer></Spacer>
    //   <Button title="Toggle Role" onPress={toggleRole} />
    // </HStack>

//     <View style={styles.container}>
//       <Text style={styles.label}>Role:</Text>
//       <Text style={styles.role}>{user.role}</Text>
//       <Button title="Toggle Role" onPress={toggleRole} />
//     </View>

    <HStack style={styles.container}>
      <Text style={styles.label}>Is Admin? </Text>
      <Text style={styles.role}>{user.isAdmin ? "YES" : "NO"}</Text>
      <Spacer />
      <View>
        <Button title="Toggle Role" onPress={toggleRole} />
      </View>
    </HStack>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  label: {
    fontSize: 16,
  },
  role: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RoleSwitchComponent;
