import { Button } from "@/components/button";
import { ProductsList } from "@/components/products-list";
import { Product, getProducts } from "@/lib/products";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";

const ProductsPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { products, currentPage, totalPages } = data;

  return (
    <>
      <Head>
        <title>Products</title>
      </Head>

      <div className="container py-10">
        <h1 className="text-4xl font-medium mb-10 text-center">All Products</h1>

        <div className="mb-10">
          <ProductsList products={products} />
        </div>

        <div className="flex items-center justify-between gap-2">
          {currentPage > 1 ? (
            <Button href={`/products?page=${currentPage - 1}`}>Back</Button>
          ) : (
            <span />
          )}

          <p className="text-center text-gray-500 text-sm">
            {currentPage} / {totalPages}
          </p>

          {currentPage < totalPages ? (
            <Button href={`/products?page=${currentPage + 1}`}>Next</Button>
          ) : (
            <span />
          )}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = (async ({ query }) => {
  const page = query.page ? parseInt(query.page as string) : 1;
  const data = await getProducts(page);
  return { props: { data } };
}) satisfies GetServerSideProps<{
  data: { products: Product[]; currentPage: number; totalPages: number };
}>;

export default ProductsPage;
