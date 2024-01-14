import { AppUser } from '../../models/User';
import { FIREBASE_DB } from '../../../FirebaseConfig';
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import useUserStore from '../../store/UserStore';
import useOrganisationStore from '../../store/OrganisationStore';
import { Organisation } from '../../models/Organisation';
import { RequestStatus } from '../../models/Request';
import { useState } from 'react';
import useAuthStatus from '../../store/AuthStatusStore';

const UserViewModel = () => {
  const {user, setUser} = useUserStore();
  const {setOrganisation} = useOrganisationStore();
  const {setRequestStatus} = useAuthStatus();
  const [loading, setLoading] = useState(false);

  async function getUserData(userId: string) {
    console.log('-> ⏳ Getting user data...');
    const docRef = doc(FIREBASE_DB, "users", userId);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) { 
        const usr = docSnap.data() as AppUser;
        setUser(usr);
      } else {
        console.log('❌ Error fetching user data');
        throw new Error("Could not get User data. Please try again");
      }
    } catch (error) {
      console.error("❌ Error fetching user data: ", error);
      throw new Error("Could not get User data. Please try again");
    }
  }

  async function getOrganisationData(organisationId: string) {
    console.log('-> ⏳ Getting organisation data...');
    try {
      const docRef = doc(FIREBASE_DB, "organisations", organisationId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const org = docSnap.data() as Organisation;
        setOrganisation(org);
      } else {
        console.log("❌ Error: could not get Organisation data1");
        throw new Error("Could not get Organisation data. Please try again");
      }
    } catch (error) {
      console.log("❌ Error: could not get Organisation data2:", error);
      throw new Error("❌ Error: could not get Organisation data3: ", error);
    }
  }

  // async function getRequestStatus() {
  //   var requestStatus: RequestStatus = null;
  //   const requests = collection(FIREBASE_DB, "requests");
  //   const q = query(requests, where('userId', 'in', user.id));
  //   try {
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach((doc) => {
  //       const data = doc.data();
  //       requestStatus = data.requestStatus as RequestStatus;
  //       console.debug('Request status:', requestStatus)
  //     });
  //   } catch (error) {
  //       console.error('Could not get request status', error);
  //   }
  //   return requestStatus;
  // }

  async function getRequestStatus(): Promise<void | RequestStatus> {
    try {
        const requestRef = collection(FIREBASE_DB, "requests");
        const requestQuery = query(requestRef, where("userId", "==", user.id));
        console.log('-> 🕥 Checking again...');
        const querySnapshot = await getDocs(requestQuery);

        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            const requestStatus = doc.data().status as RequestStatus;
            return requestStatus;
        } else {
            setLoading(false)
            console.log('Could not check request status');
        }
    } catch (error) {
        setLoading(false)
        throw new Error("Could not update User. Please try again:", error);
    }
}

async function setRequestStatusState() {
  console.log('-> ⏳ Setting request status...');
  if (user.organisationId == RequestStatus.pending) {
    setRequestStatus(RequestStatus.pending);
  } else if (user.organisationId == RequestStatus.declined) {
    setRequestStatus(RequestStatus.declined);
  }
}

async function checkRequestStatus() {
  setLoading(true)
  const status = await getRequestStatus() as RequestStatus;
  switch (status) {
    case RequestStatus.pending:
        console.log('-> ⏳ Request', status);
        setLoading(false)
        break;
    case RequestStatus.accepted:
        console.log('-> ✅ Request', status);
        await getUserData(user.id)
        console.debug("My organisation ID is:", user.organisationId)
        await getOrganisationData(user.organisationId);
        setLoading(false)
        break;
    case RequestStatus.declined:
        console.log('-> ❌ Request', status);
        await getUserData(user.id);
        setLoading(false)
        break;
  }
}

  return {
    loading,
    setLoading,
    getUserData,
    getOrganisationData,
    checkRequestStatus,
    setRequestStatusState,
  };
};

export default UserViewModel;