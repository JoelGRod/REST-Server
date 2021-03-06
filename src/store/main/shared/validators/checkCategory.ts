import { CategoryDb } from "../../../../shared/main/dbModels";

export const categoryExistsById = async ( id: string ) => {
    const category = await CategoryDb.findById(id) ? true : false;
    if(category) return true;
    throw new Error("The provided category id does not exist");
}

export const categoryNotExistsByName = async ( name: string ) => {
    name = name.toUpperCase();
    const category = await CategoryDb.findOne({ name }) 
                    ? true 
                    : false;
    if(category) throw new Error("Category name exists");
    return true;
}

