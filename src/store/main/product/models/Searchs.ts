import { isValidObjectId } from "mongoose";
// Models DB
import { ProductDb } from "../../../../shared/main/dbModels";
// Interfaces
import { Product } from "../interfaces/Product";

export class Searchs {
  public constructor() {}

  public async searchProduct(searchTerm: string): Promise<Product[]> {
    
    const isMongoId = isValidObjectId(searchTerm);

    if (isMongoId) {
      const product = await this.getProductById(searchTerm);
      return product && product.status ? [product] : [];
    }

    const regex = new RegExp(searchTerm, "i");
    return await ProductDb.find({
                              $or: [{ name: regex }, { description: regex }],
                              $and: [{ status: true }],
                            })
                            .select("-__v")
                            .populate({
                              path: "user",
                              select: "name",
                            })
                            .populate({
                              path: "category",
                              select: "name",
                            });
  }

  public async getProductById(id: string): Promise<Product> {
    return await ProductDb.findById(id)
                          .select("-__v")
                          .populate({
                            path: "user",
                            select: "name",
                          })
                          .populate({
                            path: "category",
                            select: "name",
                          });
  }
}