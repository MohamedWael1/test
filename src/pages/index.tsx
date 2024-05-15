import { Button } from "@/components/button";
import { Hero } from "@/components/hero";
import { ProductsList } from "@/components/products-list";
import { Product, getProducts } from "@/lib/products";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <Hero />

      <div className="container py-20">
        <div className="flex flex-col items-center text-center mb-16 space-y-8">
          <h2 className="text-2xl">New Products</h2>
          <h3
            className="text-sm text-gray-500 ml-2 text-center max-w-lg"
            style={{ fontFamily: "cursive" }}
          >
            A perfect blend of creativity, energy, communication, happiness and
            love. Let us arrange a smile for you.
          </h3>
        </div>

        <ProductsList products={products} />

        <div className="flex justify-center mt-14">
          <Button href="/products">View all products</Button>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = (async () => {
  const data = await getProducts();
  return {
    props: {
      products: data.products,
    },
  };
}) satisfies GetStaticProps<{ products: Array<Product> }>;
