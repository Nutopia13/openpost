import Head from "next/head";

export default function Metatags({
  title = "OpenPost | A blog platform for developers",
  description = "Blog Platform where you can share your code, read great code and discuss with other developers",
  image = "OpenPost.png",
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@V_Nechytailo" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  );
}
