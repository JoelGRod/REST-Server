export interface CategoriesDb {
    total: number;
    categories: Category[];
}

export interface Category {
    _id: string;
    name: string;
    status: boolean;
    user: string;
}

export interface CategoryData {
    name?: string;
    status?: boolean;
    user?: string;
}

