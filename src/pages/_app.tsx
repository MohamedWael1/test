import { CartProvider } from "@/components/cart-provider";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer position="top-center" />
      <SEO />
    </CartProvider>
  );
}
