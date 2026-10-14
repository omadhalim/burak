import Errors, { HttpCode, Message } from "../libs/Errors";
import {
  Product,
  ProductInput,
  ProductUpdateInput,
} from "../libs/types/product";
import { shapeIntoMongooseObjectId } from "../libs/types/config";
import ProductModel from "../schema/Product.model";

class ProductService {
  private readonly productModel = ProductModel;

  /** SPA */

  /** SSR */

  public async createProduct(input: ProductInput): Promise<Product> {
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