export enum Role {
    user = 'USER',
    admin = 'ADMIN',
    owner = 'OWNER',
}

export interface User {
    id?: string;
    email: string;
    name?: string;
    surname?: string;
    joinDate?: Date;
    organisation?: string;
    role?: Role;
}

export const defaultUser: User = {
    id: '123',
    email: 'test@email.com',
    name: 'Test',
    surname: 'User',
    joinDate: new Date(),
    organisation: 'My Organisation',
    role: Role.user,
};

export const emptyUser: User = {
    id: null,
    email: null,
    name: null,
    surname: null,
    joinDate: null,
    organisation: null,
    role: Role.user
};