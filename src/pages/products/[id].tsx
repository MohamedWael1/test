import { Product, formatPrice, getProduct, getProducts } from "@/lib/products";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

import Head from "next/head";
import ReactImageGallery from "react-image-gallery";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { useCart } from "@/components/cart-provider";
import { toast } from "react-toastify";

const ProductPage = ({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { dispatch, items } = useCart();

  const handleAddCart: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget));
    const quantity = Number(values.quantity);
    dispatch({
      type: "add_product",
      payload: { productId: product.id, quantity, product },
    });
    toast.success("Product added to cart");
  };

  if (!product) {
    return <div className="h-[80vh] flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Product - {product.title}</title>
      </Head>

      <div className="container py-14">
        <div className="flex flex-col md:flex-row gap-4">
          <div>
            <ReactImageGallery
              items={product.gallery.map((image) => ({
                original: image,
                thumbnail: image,
              }))}
              showPlayButton={false}
              renderRightNav={() => null}
              renderLeftNav={() => null}
            />
          </div>

          <div className="max-w-lg md:max-w-full px-4 space-y-3">
            <h1 className="capitalize font-medium">{product.title}</h1>

            <div className="text-primary-500 text-2xl">
              {formatPrice(product.price)}
            </div>

            <p className="text-gray-600">{product.description}</p>

            <form onSubmit={handleAddCart} className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm">
                <label htmlFor="quantity">Quantity :</label>
                <Input
                  defaultValue={1}
                  name="quantity"
                  min={1}
                  type="number"
                  placeholder="Quantity"
                  required
                  className="text-start"
                />
              </div>

              <Button className="self-start" type="submit">
                Add to Cart
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getProducts();
  const paths = data.products.map((product) => ({
    params: { id: product.id.toString() },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = (async ({ params }) => {
  const id = Number(params?.id as string);
  const product = await getProduct(id);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: { product: product },
  };
}) satisfies GetStaticProps<{ product: Product }>;

export default ProductPage;
