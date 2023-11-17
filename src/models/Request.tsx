export enum RequestStatus {
  pending = 'pending',
  accepted = 'accepted',
  declined = 'declined',
}

export interface Request {
  id?: string;
  userId: string;
  name?: string;
  surname?: string;
  imageUrl?: string;
  requestDate?: Date;
  organisationId?: String;
  status: RequestStatus;
}

export const emptyRequest: Request = {
  id: null,
  userId: null,
  name: null,
  surname: null,
  imageUrl: null,
  requestDate: null,
  organisationId: null,
  status: RequestStatus.pending,
};