import { ProductDb } from "../dbModels";

// export const categoryExistsById = async ( id: string ) => {
//     const category = await CategoryDb.findById(id) ? true : false;
//     if(category) return true;
//     throw new Error("The provided category id does not exist");
// }

export const productNotExistsByName = async ( name: string ) => {
    name = name.toUpperCase();
    const category = await ProductDb.findOne({ name }) 
                    ? true 
                    : false;
    if(category) throw new Error("Product name exists");
    return true;
}

