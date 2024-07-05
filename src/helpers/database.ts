import { Product, User } from "../models";

export const getImagesByProductId = async (id: string) => {
  const product = await Product.findById(id)
    .populate("images", {
      _id: 0,
      __v: 0,
    })
    .select({
      _id: 0,
      categories: 0,
      deletedAt: 0,
      updatedAt: 0,
      createdAt: 0,
      name: 0,
      __v: 0,
    });
  return product?.images as { filename: string }[];
};

export const findEmailByEmail = async (email: string) => {
  const query = User.where({ email });
  const result = await query.findOne();
  console.log("HELPERS...", result);
  return result;
};
