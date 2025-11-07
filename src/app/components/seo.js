import Head from 'next/head';

export default function Seo({ title = 'DigiBima', description }) {
  return (
    <Head>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
    </Head>
  );
}
