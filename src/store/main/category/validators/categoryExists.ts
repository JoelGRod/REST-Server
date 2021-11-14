import { Categories } from "../models/Categories";

export const categoryExistsById = async ( id: string ) => {
    const category = await Categories.categoryExistsById(id);
    if(category) return true;
    throw new Error("The provided id does not exist");
}

export const categoryNotExistsByName = async ( name: string ) => {
    const category = await Categories
        .categoryExistsByName(name);
    if(!category) return true;
    throw new Error("Category name exists");
}

