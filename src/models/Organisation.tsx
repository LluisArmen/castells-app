export interface Organisation {
  id?: string;
  title?: string;
  email?: string;
  description?: string;
  creationDate?: Date;
  owerId?: string;
  admins?: [string];
  users?: [string];
}

export const emptyOrganisation: Organisation = {
  id: null,
  title: null,
  email: null,
  description: null,
  creationDate: null,
  owerId: null,
  admins: null,
  users: null,
};