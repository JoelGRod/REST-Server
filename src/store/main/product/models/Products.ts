// Model DB
import { ProductDb } from "../../../../shared/dbModels";
// Interfaces
import { Product, ProductsDb, ProductData } from "../interfaces/Product";

export class Products {
  public constructor() {}

  public async getAllProducts(from: any, limit: any): Promise<ProductsDb> {
    const [total, products] = await Promise.all([
      ProductDb.count({ status: true }),
      ProductDb.find({ status: true })
        .select("-__v")
        .populate({
          path: "user",
          select: "name",
        })
        .populate({
          path: "category",
          select: "name",
        })
        .limit(Number(limit))
        .skip(Number(from)),
    ]);
    return { total, products };
  }

  public async saveProduct(productData: ProductData): Promise<Product> {
    const newProduct = new ProductDb(productData);
    await newProduct.save();
    return newProduct;
  }

  public async updateProduct(id: string, productData: ProductData): Promise<Product> {
    return await ProductDb.findByIdAndUpdate(id, productData, { new: true });
  }

  public async deleteProduct(id: string, user: string): Promise<Product> {
    return await ProductDb.findByIdAndUpdate(id, {status: false, user}, { new: true });
  }

}
