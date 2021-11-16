import { isValidObjectId } from "mongoose";
// Models DB
import { CategoryDb } from "../../shared/dbModels";
// Interfaces
import { Category } from "../interfaces/Category";

export class Searchs {
  public constructor() {}

  public async searchCategory(searchTerm: string): Promise<Category[]> {
    
    const isMongoId = isValidObjectId(searchTerm);

    if (isMongoId) {
      const category = await this.getCategoryById(searchTerm);
      return category && category.status ? [category] : [];
    }

    const regex = new RegExp(searchTerm, "i");
    return await CategoryDb.find({
                              $or: [{ name: regex }],
                              $and: [{ status: true }],
                            })
                            .select("-__v")
                            .populate({
                              path: "user",
                              select: "name",
                            });
  }

  public async getCategoryById(id: string): Promise<Category> {
    return await CategoryDb.findById(id)
                           .select("-__v")
                           .populate({
                              path: "user",
                              select: "name",
                           });
  }
}
