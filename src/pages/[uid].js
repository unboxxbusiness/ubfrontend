import Head from "next/head";
import * as prismic from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";

const Page = ({ page, navigation, settings }) => {
  const metaTitle = prismic.asText(page.data.title);
  const metaDescription = prismic.asText(page.data.description);
  const metaImageUrl = page.data.image;

  const pageVariants = {
    initial: {
      opacity: 0,
      x: -100,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
  };

  return (
    <Layout navigation={navigation} settings={settings}>
      <Head>
        <title>
          {metaTitle} | {prismic.asText(settings.data.siteTitle)}
        </title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={metaImageUrl} />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaImageUrl} />
        <link rel="icon" href="../src/images/logo.png" type="image/png" />
      </Head>
      <motion.div
        initial="initial"
        animate="animate"
        variants={pageVariants}
        transition={{ duration: 0.5 }}
      >
        <SliceZone slices={page.data.slices} components={components} />
      </motion.div>
    </Layout>
  );
};

export default Page;

export async function getStaticProps({ params, locale, previewData }) {
  const client = createClient({ previewData });

  const page = await client.getByUID("page", params.uid, { lang: locale });
  const navigation = await client.getSingle("navigation", { lang: locale });
  const settings = await client.getSingle("settings", { lang: locale });

  return {
    props: {
      page,
      navigation,
      settings,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const pages = await client.getAllByType("page", { lang: "*" });

  return {
    paths: pages.map((page) => {
      return {
        params: { uid: page.uid },
        locale: page.lang,
      };
    }),
    fallback: false,
  };
}
