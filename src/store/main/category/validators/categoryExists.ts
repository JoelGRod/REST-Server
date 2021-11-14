import { Categories } from "../models/Categories";

export const categoryExists = async ( id: string ) => {
    const category = await Categories.getCategoryById(id);
    if(category && category.status) return true;
    throw new Error("The provided id does not exist");
}

