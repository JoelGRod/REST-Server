export interface Users {
    total: number;
    products: User[];
}

export interface User {
    uid: string;
    name: string;
    email: string;
    password: string;
    role: string;
    status: boolean;
    google: boolean;
    img?: string;
}

export interface UserData {
    uid?: string;
    name?: string;
    email?: string;
    password?: string;
    role?: string;
    status?: boolean;
    google?: boolean;
    img?: string;
}