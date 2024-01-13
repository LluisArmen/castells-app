import { create } from 'zustand'
import { Organisation } from '../models/Organisation'

interface OrganisationState {
  organisation: Organisation,
  setOrganisation: (newOrganisation: Organisation) => void,
}

const useOrganisationStore = create<OrganisationState>((set) => ({
  organisation: null,
  setOrganisation: (newOrganisation: Organisation) =>
    set((state) => ({
      organisation: newOrganisation
    })),
}))

export default useOrganisationStore