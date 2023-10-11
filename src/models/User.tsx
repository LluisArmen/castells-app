export interface User {
    id?: string;
    email: string;
    name?: string;
    surname?: string;
    organisation?: string;
    isAdmin?: boolean;
}

export const defaultUser: User = {
    id: '123',
    email: 'test@email.com',
    name: 'Test',
    surname: 'User',
    organisation: 'My Organisation',
    isAdmin: true,
};