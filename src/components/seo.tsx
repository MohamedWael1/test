import Head from "next/head";

const meta = {
  title: "Kngu",
  description: "Kngu is a modern e-commerce platform",
  image: "/imgs/website-screenshot.png",
  url: "https://kngu.com",
};

export const SEO = () => {
  return (
    <Head>
      <title>{meta.title}</title>
      <meta name={meta.description} />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />

      <meta name="keywords" content="ecommerce" />

      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />

      <meta property="og:image" content={meta.image} />
      <meta property="og:url" content={meta.url} />
      <meta property="og:site_name" content={meta.title} />
      <meta
        name="twitter:card"
        content={meta.description}
      />
      <meta
        name="twitter:image:alt"
        content={meta.description}
      />
    </Head>
  );
};
