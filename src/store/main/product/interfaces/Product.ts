export interface ProductsDb {
    total: number;
    products: Product[];
}

export interface Product {
    _id: string;
    name: string;
    price: number;
    description: string;
    available: boolean;
    category: string;
    status: boolean;
    user: string;
}

export interface ProductData {
    name?: string;
    price?: number;
    description?: string;
    available?: boolean;
    category?: string;
    status?: boolean;
    user?: string;
}

