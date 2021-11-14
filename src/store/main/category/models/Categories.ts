// Model DB
import { CategoryDb } from "../../../../shared/dbModels";
// Interfaces
import { Category } from "../interfaces/Category";

export class Categories {
  private _categories: { [name: string]: Category } = {};

  public constructor() {}

  public async categoriesDb(): Promise<void> {
    const categoriesDb = await CategoryDb.find().select("-__v");
    categoriesDb.map((category) => {
      this._categories[category.name] = category;
    });
  }

  public categoryExists( name: string ): boolean {
      return this._categories[name] ? true : false;
  }

  public async saveCategory(name: string, user: string): Promise<Category> {
    const newCategory = new CategoryDb({name, user});
    await newCategory.save();
    return newCategory;
  }
}
