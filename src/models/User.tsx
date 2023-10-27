export enum Role {
    user = 'USER',
    admin = 'ADMIN',
    owner = 'OWNER',
}

export interface AppUser {
    id?: string;
    email: string;
    name?: string;
    surname?: string;
    joinDate?: Date;
    organisationId?: string;
    role?: Role;
}

export const defaultUser: AppUser = {
    id: '123',
    email: 'test@email.com',
    name: 'Test',
    surname: 'User',
    joinDate: new Date(),
    organisationId: 'My Organisation',
    role: Role.user,
};

export const emptyUser: AppUser = {
    id: null,
    email: null,
    name: null,
    surname: null,
    joinDate: null,
    organisationId: null,
    role: Role.user
};