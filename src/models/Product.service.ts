import Errors, { HttpCode, Message } from "../libs/Errors";
import {
  Product,
  ProductInput,
  ProductInquiry,
  ProductUpdateInput,
} from "../libs/types/product";
import { shapeIntoMongooseObjectId } from "../libs/types/config";
import ProductModel from "../schema/Product.model";
import { ProductStatus } from "../libs/enums/product.enum";
import { T } from "../libs/types/common";

class ProductService {
  private readonly productModel = ProductModel;

  /** SPA */
 public async getProducts(inquiry: ProductInquiry): Promise<Product[]> {
  const match: T = { productStatus: ProductStatus.PROCESS };

  if (inquiry.productCollection)
    match.productCollection = inquiry.productCollection;

  if (inquiry.search) {
    match.productName = { $regex: new RegExp(inquiry.search, "i") };
  }

  const sort: T =
    inquiry.order === "productPrice"
      ? { [inquiry.order]: 1 }
      : { [inquiry.order]: -1 };

  const result = await this.productModel
    .aggregate([
      { $match: match },
      { $sort: sort },
      { $skip: (inquiry.page * 1 - 1) * inquiry.limit },
      { $limit: inquiry.limit * 1 },
    ])
    .exec();

  if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

  return result;
}

  /** SSR */

  public async getAllProducts(): Promise<Product[]> {
    const result = await this.productModel
      .find().exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result as unknown as Product[];
  }

  public async createNewProduct(input: ProductInput): Promise<Product> {
    try {
      return (await this.productModel.create(input)) as unknown as Product;
    } catch (err) {
      console.log("Error, model:createProduct:", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  public async updateChosenProduct(
    id: string,
    input: ProductUpdateInput
  ): Promise<Product> {
    // string => ObjectId
    const productId = shapeIntoMongooseObjectId(id);

    const result = await this.productModel
      .findOneAndUpdate({ _id: productId }, input, { new: true })
      .exec();

    if (!result) throw new Errors(HttpCode.BAD_REQUEST, Message.UPDATE_FAILED);

    return result as unknown as Product;
  }
}

export default ProductService;