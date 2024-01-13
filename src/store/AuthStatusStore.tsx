import { create } from 'zustand';
import { RequestStatus } from '../models/Request';

interface AuthState {
    isSignedIn: Boolean,
    hasJoinedOrg: Boolean,
    requestStatus: RequestStatus,
    setSignIn: (willSignIn: Boolean) => void,
    setHasJoinedOrg: (willJoinOrg: Boolean) => void
    setRequestStatus: (newStatus: RequestStatus) => void
}
    
const useAuthStatus = create<AuthState>((set) => ({
    isSignedIn: false,
    hasJoinedOrg: null,
    requestStatus: null,
    setSignIn: (newSignInStatus: Boolean) =>
        set((state) => ({
            isSignedIn: newSignInStatus
        })),
    setHasJoinedOrg: (newJoinOrgStatus: Boolean) =>
        set((state) => ({
            hasJoinedOrg: newJoinOrgStatus
        })),
    setRequestStatus: (newStatus: RequestStatus) =>
        set((state) => ({
            requestStatus: newStatus
        })),
}));

export default useAuthStatus;