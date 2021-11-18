// Models
import { Products, Searchs } from "../models";
// Interfaces
import { Request, Response } from "express";
// Helpers
import {
  removeImg,
  uploadImg
} from "../../../../shared/helpers";

export const updateProduct = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;
    let { name } = req.body;
    const { 
      uid: user,
      price, 
      description, 
      available, 
      category
    } = req.body;
    
    if( name ) name = name.toUpperCase();

    const products = new Products();
    const productDb  = await products.updateProduct( 
      id, { user, name, price, description, available, category } 
    );

    return res.status(202).json({
      ok: true,
      productDb
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Please, Contact the Administrator",
    });
  }
};

export const updateImg = async( req: Request, res: Response ) => {
  try {
      const searchs = new Searchs();
      const products = new Products();
      
      const { id } = req.params;
      const productDb = await searchs.getProductById(id);
      const folder: string = "REST_SERVER/products";

      // Delete last img
      if(productDb.img) removeImg(productDb.img, folder);
      // Upload img
      const { tempFilePath } = <any>req.files!.file;
      const secure_url = await uploadImg( tempFilePath, folder);

      productDb.img = secure_url;
      await products.updateProduct(id, productDb);

      return res.status(200).json({
          ok: true,
          msg: "Img uploaded and Updated",
          link: secure_url
      });
      
  } catch (error) {
      return res.status(500).json({
          ok: false,
          msg: "Please, contact the Administrator"
      });
  }
}
