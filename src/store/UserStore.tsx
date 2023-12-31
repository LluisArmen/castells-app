import { create } from 'zustand'
import { Role, AppUser, defaultUser } from '../models/User'

interface UserState {
  user: AppUser,
  setUser: (newUser: AppUser) => void,
  setRole: (newRole: Role) => void,
}

const useUserStore = create<UserState>((set) => ({
  user: null, //defaultUser
  setUser: (newUser: AppUser) =>
    set((state) => ({
      user: newUser
    })),
  setRole: (newRole: Role) => 
    set((state) => ({
      user: {
        ...state.user,
        role: newRole,
      },
    }
  )),
}))

export default useUserStore



































// import React, { createContext, useContext, useState } from 'react';
// import { User, UserRole } from '../models/User';

// // Create user context
// const UserContext = React.createContext();

// // Create user provider
// export const UserProvider = ({ children }) => {

    // Default user for testing purposes
    // const testUser = {
    //     id: '123',
    //     email: 'test@example.com',
    //     name: 'Test',
    //     surname: 'Admin',
    //     organisation: 'My Organisation',
    //     role: UserRole.User
    // };

//     const [user, setUser] = useState(testUser);

//     // Add a function to update the user's role
//     const updateUserRole = (newRole) => {
//         setUser({ ...user, role: newRole });
//     };

//     return (
//         <UserContext.Provider value={{ user, updateUserRole }}>
//             {children}
//         </UserContext.Provider>
//     );
// };

// export const useUser = () => {
//   return useContext(UserContext);
// };


  // fetch a user from a fake backend API
//   useEffect(() => {
//     const fetchUser = () => {
//       // this would usually be your own backend, or localStorage
//       // for example
//       fetch("https://randomuser.me/api/")
//         .then((response) => response.json())
//         .then((result) => setUser(result.results[0]))
//         .catch((error) => console.log("An error occured"));
//     };

//     fetchUser();
//   }, []);