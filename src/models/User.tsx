export const UserRole = {
    Admin: 'admin',
    User: 'user',
};

export interface User {
    id: string;
    email: string;
    name: string;
    surname: string;
    organisation: string;
    role: string;
}

export const defaultUser: User = {
    id: '123',
    email: 'test@email.com',
    name: 'Test',
    surname: 'User',
    organisation: 'My Organisation',
    role: UserRole.User
};