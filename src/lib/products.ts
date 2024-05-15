import data from "./products.json";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  gallery: Array<string>;
  mainImage: string;
}

export const getProducts = async (page: number = 1) => {
  const limit = 8;
  const skip = (page - 1) * limit;
  const products = data.slice(skip, skip + limit);
  return {
    products,
    totalCount: data.length,
    totalPages: Math.ceil(data.length / limit),
    currentPage: page,
  };
};

export const getProduct = async (id: number): Promise<Product | undefined> => {
  const product = data.find((product) => product.id === id);
  if (!product) {
    throw new Error(`Product with id ${id} not found`);
  }
  return product;
};

export const formatPrice = (price: number): string => {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};
