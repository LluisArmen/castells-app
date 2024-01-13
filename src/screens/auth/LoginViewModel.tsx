import { RequestStatus } from '../../models/Request';
import { AppUser } from '../../models/User';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../FirebaseConfig';
import { getDocs, collection, query, where } from "firebase/firestore";
import useUserStore from '../../store/UserStore';
import useAuthStatus from '../../store/AuthStatusStore';


const LoginViewModel = () => {
    const {user, setUser} = useUserStore();
    const {isSignedIn, setSignIn, setHasJoinedOrg, setRequestStatus} = useAuthStatus();

    function logIn() {
      console.debug("User should be logged in...");
      setSignIn(true);
    }

    function logOut() {
      FIREBASE_AUTH.signOut();
      console.debug("User should be logged out...");
      setSignIn(false);
      setHasJoinedOrg(null);
      setRequestStatus(null);
      console.debug("isSignedIn:", isSignedIn);
      //setNavigator(<LoginNavigator/>)
      //setUser(null)
      // setOrganisation(null)
    }

    async function getRequestStatus(user: AppUser) {
      var requestStatus: RequestStatus = null;
      const requests = collection(FIREBASE_DB, "requests");
      const q = query(requests, where('userId', 'in', user.id));
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          requestStatus = data.requestStatus as RequestStatus;
          console.debug('Request status:', requestStatus)
        });
      } catch (error) {
          console.error('Could not get request status', error);
      }
      return requestStatus;
  }

  // Return an object with the properties and methods
  return {
    logIn,
    logOut,
  };
};

// Export the ViewModel component
export default LoginViewModel;