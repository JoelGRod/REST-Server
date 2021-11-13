import { Category as CategoryDb } from "../../../../shared/dbModels";

export class Category {
  public constructor() {}

  public async categoryExists(name: string): Promise<boolean> {
    const categoryExists = await CategoryDb.findOne({ name });
    if (categoryExists) return true;
    return false;
  }

  public async saveCategory(categoryData: any): Promise<any> {
    const newCategory = new CategoryDb(categoryData);
    await newCategory.save();
    return newCategory;
  }
}
