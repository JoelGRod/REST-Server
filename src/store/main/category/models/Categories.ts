// Model DB
import { CategoryDb } from "../../../../shared/dbModels";
// Interfaces
import { CategoriesDb, Category, CategoryData } from "../interfaces/Category";

export class Categories {
  public constructor() {}

  public static async getAllCategories(from: any, limit: any): Promise<CategoriesDb> {
    const [total, categories] = await Promise.all([
      CategoryDb.count({ status: true }),
      CategoryDb.find({ status: true })
        .select("-__v")
        .populate({
          path: "user",
          select: "name role",
        })
        .limit(Number(limit))
        .skip(Number(from)),
    ]);
    return { total, categories };
  } // 1

  public static async getCategoryById(id: string): Promise<Category> {
    return await CategoryDb.findById(id);
  } // 2

  public async categoryExistsById(id: string): Promise<boolean> {
    return (await CategoryDb.findById(id)) ? true : false;
  }

  public async categoryExistsByName(name: string): Promise<boolean> {
    return (await CategoryDb.findOne({ name })) ? true : false;
  }

  public async saveCategory(categoryData: CategoryData): Promise<Category> {
    const newCategory = new CategoryDb(categoryData);
    await newCategory.save();
    return newCategory;
  }

  public async updateCategory(id: string,categoryData: CategoryData): Promise<Category> {
    return await CategoryDb.findByIdAndUpdate(id, categoryData);
  }

  public async deleteCategory(id: string): Promise<Category> {
    return await CategoryDb.findByIdAndUpdate(id, {status: false});
  }
}
