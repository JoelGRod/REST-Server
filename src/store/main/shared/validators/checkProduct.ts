import { ProductDb } from "../dbModels";

export const productExistsById = async ( id: string ) => {
    const product = await ProductDb.findById(id) ? true : false;
    if(product) return true;
    throw new Error("The provided product id does not exist");
}

export const productNotExistsByName = async ( name: string ) => {
    name = name.toUpperCase();
    const product = await ProductDb.findOne({ name }) 
                    ? true 
                    : false;
    if(product) throw new Error("Product name exists");
    return true;
}

